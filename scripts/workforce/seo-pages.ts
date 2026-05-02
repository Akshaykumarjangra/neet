/**
 * Programmatic SEO generator.
 *
 * Emits MDX landing pages into ../landing/src/app/(seo)/<slug>/page.mdx
 * for every (subject, chapter, year) tuple. Uses Gemini bulk tier.
 *
 * Run: npx tsx scripts/workforce/seo-pages.ts [--limit N] [--subject biology]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { complete } from "../../server/workforce";

interface Target { slug: string; title: string; brief: string; }

const TARGETS: Target[] = [];
const SUBJECTS = ["biology", "physics", "chemistry"];
const YEARS = Array.from({ length: 38 }, (_, i) => 1988 + i);

for (const s of SUBJECTS) {
  for (const y of YEARS) {
    TARGETS.push({
      slug: `neet-${s}-${y}-pyq`,
      title: `NEET ${s.toUpperCase()} ${y} Previous Year Questions with Solutions`,
      brief: `${s} PYQs from NEET ${y} with detailed solutions, topic tags, difficulty, and direct practice link.`,
    });
  }
}

const SYSTEM = `You write SEO-optimized landing pages for an Indian NEET prep platform.
Output MDX. Include: H1, 150-word intro with target keyword in first 50 words,
3 H2 sections (Overview, Topic-wise breakdown, How to use this page),
a FAQ block with 5 Q&As using FAQPage schema, and a final CTA linking to /signup.
Tone: confident, student-friendly, exam-focused. Do NOT invent specific question text — link to /pyq/{slug} for the live bank.`;

async function main() {
  const limit = Number(process.argv.find(a => a.startsWith("--limit="))?.split("=")[1] ?? "20");
  const subjectFilter = process.argv.find(a => a.startsWith("--subject="))?.split("=")[1];
  const outDir = path.resolve(__dirname, "../../landing/src/app/(seo)");
  await fs.mkdir(outDir, { recursive: true });
  const list = TARGETS.filter(t => !subjectFilter || t.slug.includes(subjectFilter)).slice(0, limit);
  console.log(`[seo] generating ${list.length} pages → ${outDir}`);
  for (const t of list) {
    const dir = path.join(outDir, t.slug);
    const file = path.join(dir, "page.mdx");
    try { await fs.access(file); console.log(`  skip ${t.slug} (exists)`); continue; } catch {}
    const r = await complete({
      task: "seo-page",
      system: SYSTEM,
      prompt: `Title: ${t.title}\nBrief: ${t.brief}\nSlug: ${t.slug}\nWrite the MDX now.`,
      maxTokens: 2000,
    });
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(file, r.text);
    console.log(`  ✓ ${t.slug} (${r.tier}/${r.model}, ${r.latencyMs}ms)`);
  }
}
main().catch(e => { console.error(e); process.exit(1); });
