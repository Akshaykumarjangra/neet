export type JobType =
  | "question_generation"
  | "auto_submit_mock_attempts"
  | "purge_mock_exam_attempts";

export type JobStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled";

export interface BackgroundJob {
  id: number;
  jobType: JobType;
  name: string;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  progress: number;
  lastError?: string | null;
  result?: Record<string, any> | null;
  createdAt: Date;
  startedAt?: Date | null;
  finishedAt?: Date | null;
}

const jobs = new Map<number, BackgroundJob>();
const timers = new Map<number, NodeJS.Timeout>();
let nextId = 1;

const startJob = (job: BackgroundJob) => {
  job.status = "running";
  job.startedAt = new Date();
  job.progress = 0;
  job.lastError = null;
  job.result = null;

  const timer = setInterval(() => {
    if (job.status !== "running") {
      clearInterval(timer);
      timers.delete(job.id);
      return;
    }
    job.progress = Math.min(100, job.progress + 20);
    if (job.progress >= 100) {
      job.status = "succeeded";
      job.finishedAt = new Date();
      job.result = { message: "Job completed successfully." };
      clearInterval(timer);
      timers.delete(job.id);
    }
  }, 800);

  timers.set(job.id, timer);
};

export async function listJobs() {
  return Array.from(jobs.values()).sort((a, b) => b.id - a.id);
}

export async function getJobById(id: number) {
  return jobs.get(id) ?? null;
}

export async function queueJob(jobType: JobType, options?: { name?: string; payload?: Record<string, any> | null }) {
  const job: BackgroundJob = {
    id: nextId++,
    jobType,
    name: options?.name || jobType.replace(/_/g, " "),
    status: "queued",
    attempts: 0,
    maxAttempts: 3,
    progress: 0,
    lastError: null,
    result: options?.payload || null,
    createdAt: new Date(),
    startedAt: null,
    finishedAt: null,
  };
  jobs.set(job.id, job);
  setTimeout(() => startJob(job), 300);
  return job;
}

export async function processJob(jobId: number) {
  const job = jobs.get(jobId);
  if (!job) return null;
  if (job.status === "running") return job;
  startJob(job);
  return job;
}

export async function resetJobForRetry(id: number) {
  const job = jobs.get(id);
  if (!job) return null;
  if (job.attempts >= job.maxAttempts) {
    job.lastError = "Max retry attempts reached.";
    job.status = "failed";
    job.finishedAt = new Date();
    return job;
  }
  job.attempts += 1;
  job.status = "queued";
  job.progress = 0;
  job.finishedAt = null;
  setTimeout(() => startJob(job), 300);
  return job;
}

export async function markJobCancelled(id: number) {
  const job = jobs.get(id);
  if (!job) return null;
  job.status = "cancelled";
  job.finishedAt = new Date();
  job.progress = Math.min(job.progress, 100);
  const timer = timers.get(id);
  if (timer) {
    clearInterval(timer);
    timers.delete(id);
  }
  return job;
}
