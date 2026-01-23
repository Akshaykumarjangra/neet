// @ts-nocheck
const baseUrl = process.env.BASE_URL || "http://localhost:5001";
const authCookie = process.env.MOCK_EXAM_COOKIE;
const iterations = Number(process.env.ITERATIONS || 50);
const concurrency = Math.max(1, Number(process.env.CONCURRENCY || 10));
const flowMode = String(process.env.MOCK_EXAM_FLOW || "read").toLowerCase();
const paperOverride = process.env.MOCK_EXAM_PAPER_ID ? Number(process.env.MOCK_EXAM_PAPER_ID) : null;
const allowParallelSubmit = String(process.env.MOCK_EXAM_PARALLEL_SUBMIT || "false").toLowerCase() === "true";

if (!authCookie) {
  console.error("Missing MOCK_EXAM_COOKIE env var (session cookie).");
  process.exit(1);
}

const headers = {
  Cookie: authCookie,
  "Content-Type": "application/json",
};

async function fetchJson(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${path}`);
  }
  return res.json();
}

async function resolvePaperId() {
  if (Number.isFinite(paperOverride) && paperOverride) {
    return paperOverride;
  }
  const papers = await fetchJson("/api/mock-exams/papers");
  return papers?.data?.[0]?.id;
}

function buildResponses(questions) {
  if (!Array.isArray(questions) || !questions.length) return [];
  const firstQuestion = questions[0];
  const firstOption = firstQuestion?.options?.[0];
  if (!firstOption) return [];
  return [
    {
      questionId: firstQuestion.id,
      selectedOptionId: firstOption.id,
      timeSpentSeconds: 12,
      flagged: false,
    },
  ];
}

async function runReadBatch(paperId) {
  const paths = [
    "/api/mock-exams/papers",
    paperId ? `/api/mock-exams/papers/${paperId}/leaderboard` : "/api/mock-exams/papers",
  ];

  const tasks = Array.from({ length: iterations }, (_, i) => paths[i % paths.length]);

  const workers = Array.from({ length: concurrency }, async () => {
    while (tasks.length) {
      const path = tasks.pop();
      if (!path) return;
      await fetchJson(path);
    }
  });

  await Promise.all(workers);
}

async function runStartSubmitBatch(paperId) {
  const taskCount = Math.max(1, iterations);
  const effectiveConcurrency = flowMode === "submit" && !allowParallelSubmit ? 1 : concurrency;

  if (flowMode === "submit" && !allowParallelSubmit && concurrency !== 1) {
    console.warn("MOCK_EXAM_FLOW=submit forces CONCURRENCY=1 per cookie to avoid attempt collisions.");
  }

  const tasks = Array.from({ length: taskCount }, () => 1);
  const workers = Array.from({ length: effectiveConcurrency }, async () => {
    while (tasks.length) {
      tasks.pop();
      const startPayload = await fetchJson(`/api/mock-exams/papers/${paperId}/start`, { method: "POST" });
      if (flowMode === "submit") {
        const responses = buildResponses(startPayload?.questions);
        await fetchJson(`/api/mock-exams/attempts/${startPayload.attemptId}/submit`, {
          method: "POST",
          body: JSON.stringify({ responses }),
        });
      }
    }
  });

  await Promise.all(workers);
}

async function runBatch() {
  const paperId = await resolvePaperId();
  if (!paperId) {
    throw new Error("No mock exam papers available to run load test.");
  }

  if (flowMode === "start" || flowMode === "submit") {
    if (flowMode === "start") {
      console.warn("MOCK_EXAM_FLOW=start leaves attempts in progress; use submit to close them.");
    }
    await runStartSubmitBatch(paperId);
    return;
  }

  await runReadBatch(paperId);
}

runBatch()
  .then(() => {
    console.log("Load test completed.");
  })
  .catch((error) => {
    console.error("Load test failed:", error);
    process.exit(1);
  });
