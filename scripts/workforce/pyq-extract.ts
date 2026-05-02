/**
 * PYQ extractor (Phase 2/01). Reads PDFs from uploads/pyq-source/ → questions table.
 * Requires: npm i pdf-parse
 */
import fs from "node:fs/promises";
import path from "node:path";
import { complete } from "../../server/workforce";
import { db } from "../../server/db";
import { sql } from "drizzle-orm";

const SYSTEM = `Parse NEET-style MCQs from raw text. Output JSON:
{ "questions": [{ "stem": string, "options": {"a","b","c","d"}, "answer": "a"|"b"|"c"|"d", "year": number, "exam": string, "subject": string }] }`;

async function main() {
  // @ts-ignore optional dep
  const pdfParse = (await import("pdf-parse")).default;
  const dir = path.resolve(__dirname, "../../uploads/pyq-source");
  const files = (await fs.readdir(dir).catch(() => [])).filter(f => f.endsWith(".pdf"));
  for (const f of files) {
    const buf = await fs.readFile(path.join(dir, f));
    const text = (await pdfParse(buf)).text;
    const chunks = chunkText(text, 8000);
    for (const ch of chunks) {
      const r = await complete({ task: "extract", system: SYSTEM, prompt: ch, json: true, maxTokens: 8000 });
      const qs = (r.json as any)?.questions ?? [];
      for (const q of qs) {
        await db.execute(sql`
          INSERT INTO questions (stem, options, answer, year, exam, subject, source)
          VALUES (${q.stem}, ${JSON.stringify(q.options)}::jsonb, ${q.answer}, ${q.year}, ${q.exam}, ${q.subject}, 'pyq')
          ON CONFLICT DO NOTHING
        `);
      }
      console.log(`  ${f}: +${qs.length}`);
    }
  }
}

function chunkText(s: string, max: number) {
  const out: string[] = []; let cur = "";
  for (const para of s.split(/\n\n+/)) {
    if (cur.length + para.length > max) { out.push(cur); cur = ""; }
    cur += para + "\n\n";
  }
  if (cur) out.push(cur); return out;
}

main().catch(e => { console.error(e); process.exit(1); });
