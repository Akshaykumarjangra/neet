/**
 * Chapter component refactor codemod.
 *
 * Problem: 99 hand-written {Botany,Chemistry,Physics}Chapter*.tsx files —
 * massive bundle, copy-paste drift, impossible to maintain.
 *
 * Strategy:
 *   1. Parse each chapter file → use Ollama (qwen2.5-coder) to extract:
 *      { title, intro, sections: [{heading, body, visuals: []}], keyTerms[] }
 *   2. Write structured JSON to data/chapters/<subject>-<n>.json
 *   3. Snapshot originals to .backup/chapters-YYYY-MM-DD/
 *   4. (Manual follow-up) replace imports in client/src/pages/*Content.tsx
 *      with a single <ChapterRenderer subject={...} number={n} />
 *
 * This script ONLY does step 1-3. Step 4 is a separate task in the
 * Antigravity backlog because it touches routing.
 *
 * Run: npx tsx scripts/workforce/refactor-chapters.ts [--dry] [--subject=botany]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { complete } from "../../server/workforce";

const ROOT = path.resolve(__dirname, "../..");
const COMPONENTS = path.join(ROOT, "client/src/components");
const OUT = path.join(ROOT, "data/chapters");
const BACKUP = path.join(ROOT, `.backup/chapters-${new Date().toISOString().slice(0, 10)}`);

const SYSTEM = `You convert React TSX chapter components into structured JSON.
Output ONLY valid JSON matching:
{
  "title": string,
  "intro": string,
  "sections": [{ "heading": string, "body_md": string, "visuals": [{ "kind": "phet"|"three"|"image"|"diagram", "ref": string }] }],
  "keyTerms": [{ "term": string, "definition": string }],
  "questions_inline": [{ "stem": string, "answer": string }]
}
Strip JSX/markup. body_md should be clean markdown. Drop styling/layout cruft.`;

async function main() {
  const dry = process.argv.includes("--dry");
  const subjectFilter = process.argv.find(a => a.startsWith("--subject="))?.split("=")[1];
  await fs.mkdir(OUT, { recursive: true });
  if (!dry) await fs.mkdir(BACKUP, { recursive: true });

  const files = (await fs.readdir(COMPONENTS)).filter(f =>
    /^(Botany|Chemistry|Physics)Chapter\d+\.tsx$/.test(f) &&
    (!subjectFilter || f.toLowerCase().startsWith(subjectFilter))
  );
  console.log(`[refactor] ${files.length} chapter files to process${dry ? " (DRY)" : ""}`);

  for (const f of files) {
    const m = f.match(/^(Botany|Chemistry|Physics)Chapter(\d+)\.tsx$/)!;
    const subject = m[1].toLowerCase(); const n = m[2];
    const outFile = path.join(OUT, `${subject}-${n}.json`);
    try { await fs.access(outFile); console.log(`  skip ${f} (already extracted)`); continue; } catch {}
    const src = await fs.readFile(path.join(COMPONENTS, f), "utf8");
    if (src.length > 60_000) { console.warn(`  skip ${f} (too large for local model)`); continue; }
    try {
      const r = await complete({
        task: "extract",
        system: SYSTEM,
        prompt: `Subject: ${subject}, Chapter ${n}\n\nFile content:\n${src}`,
        json: true,
        maxTokens: 8000,
      });
      const data = r.json ?? JSON.parse(r.text);
      if (!dry) {
        await fs.writeFile(outFile, JSON.stringify(data, null, 2));
        await fs.copyFile(path.join(COMPONENTS, f), path.join(BACKUP, f));
      }
      console.log(`  ✓ ${f} → ${path.basename(outFile)} (${r.tier}/${r.model}, ${r.latencyMs}ms)`);
    } catch (e) {
      console.error(`  ✗ ${f}: ${(e as Error).message}`);
    }
  }
  console.log(`\n[refactor] done. Backup: ${BACKUP}`);
  console.log(`Next: implement <ChapterRenderer> per antigravity/backlog/phase-0/03-chapter-renderer.md`);
}
main().catch(e => { console.error(e); process.exit(1); });
