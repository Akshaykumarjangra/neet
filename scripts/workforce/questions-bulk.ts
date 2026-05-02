/**
 * Bulk MCQ generator with two-pass QA.
 *
 * Pass 1 (bulk/Gemini flash): generate N MCQs per chapter.
 * Pass 2 (premium/Gemini pro): verify factual correctness, NCERT alignment,
 *   reject ambiguous distractors, return cleaned set.
 *
 * Writes to data/generated-questions/<chapter-slug>.json — admin approval queue
 * imports these via existing admin-content-routes.
 *
 * Run: npx tsx scripts/workforce/questions-bulk.ts --chapter=biomolecules --count=50
 */
import fs from "node:fs/promises";
import path from "node:path";
import { complete } from "../../server/workforce";

interface MCQ {
  stem: string;
  options: { a: string; b: string; c: string; d: string };
  answer: "a" | "b" | "c" | "d";
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  bloom: "recall" | "understand" | "apply" | "analyze";
  ncert_ref?: string;
}

const GEN_SYSTEM = `You generate NEET-grade MCQs strictly anchored in NCERT Class 11/12.
Output VALID JSON: { "questions": MCQ[] } where MCQ has fields:
stem, options{a,b,c,d}, answer, explanation, difficulty, bloom, ncert_ref.
Stems must be unambiguous. All 4 options plausible. Distractors must reflect common misconceptions.
No "all of the above" or "none of the above". No copyrighted question text.`;

const QA_SYSTEM = `You are a NEET subject expert auditing MCQs. For each question, verify:
1) The marked answer is uniquely correct per NCERT.
2) Distractors are plausible but unambiguously wrong.
3) Explanation is accurate and ≤ 80 words.
4) Stem grammar is clean.
Return JSON { "approved": MCQ[], "rejected": [{q: MCQ, reason: string}] }.`;

async function main() {
  const args = Object.fromEntries(process.argv.slice(2).map(a => a.replace(/^--/, "").split("=")));
  const chapter = args.chapter ?? "biomolecules";
  const count = Number(args.count ?? 50);
  console.log(`[q] generating ${count} MCQs for ${chapter}`);

  const gen = await complete({
    task: "question-gen",
    system: GEN_SYSTEM,
    prompt: `Chapter: ${chapter}\nGenerate exactly ${count} MCQs covering the full chapter syllabus, mixed difficulty (40% easy, 40% medium, 20% hard).`,
    json: true,
    maxTokens: 16000,
  });
  const draft = (gen.json as any)?.questions as MCQ[] | undefined;
  if (!draft?.length) throw new Error("generation produced no questions");
  console.log(`  generated ${draft.length} draft (${gen.tier}/${gen.model}, ${gen.latencyMs}ms)`);

  const qa = await complete({
    task: "qa-check",
    tier: "premium",
    system: QA_SYSTEM,
    prompt: `Chapter: ${chapter}\nAudit these MCQs:\n${JSON.stringify(draft)}`,
    json: true,
    maxTokens: 16000,
  });
  const approved = ((qa.json as any)?.approved as MCQ[] | undefined) ?? [];
  const rejected = ((qa.json as any)?.rejected as any[] | undefined) ?? [];
  console.log(`  QA: ${approved.length} approved / ${rejected.length} rejected (${qa.tier}/${qa.model})`);

  const dir = path.resolve(__dirname, "../../data/generated-questions");
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${chapter}.json`);
  await fs.writeFile(file, JSON.stringify({ chapter, approved, rejected, generatedAt: new Date().toISOString() }, null, 2));
  console.log(`[q] wrote ${file}`);
}
main().catch(e => { console.error(e); process.exit(1); });
