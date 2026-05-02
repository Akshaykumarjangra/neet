/**
 * NCERT concept-graph extractor (Phase 1/03).
 * Reads data/chapters/<subject>-<n>.json (from refactor) → extracts concepts + prereqs.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { complete } from "../../server/workforce";

interface Concept { id: string; name: string; chapter: string; }
interface Edge { from: string; to: string; }

const SYSTEM = `Given a chapter's structured content, list its concepts and prerequisite relationships.
Output JSON: { "concepts": [{"id": kebab-case, "name": string}], "prereqs": [{"from": id, "to": id}] }`;

async function main() {
  const dir = path.resolve(__dirname, "../../data/chapters");
  const out = path.resolve(__dirname, "../../data/concept-graph.json");
  const files = await fs.readdir(dir).catch(() => [] as string[]);
  const concepts: Concept[] = []; const edges: Edge[] = [];
  for (const f of files) {
    if (!f.endsWith(".json")) continue;
    const slug = f.replace(".json", "");
    const data = JSON.parse(await fs.readFile(path.join(dir, f), "utf8"));
    const r = await complete({ task: "extract", system: SYSTEM, prompt: JSON.stringify(data), json: true, maxTokens: 4000 });
    const j = (r.json as any) ?? {};
    for (const c of j.concepts ?? []) concepts.push({ id: `${slug}.${c.id}`, name: c.name, chapter: slug });
    for (const e of j.prereqs ?? []) edges.push({ from: `${slug}.${e.from}`, to: `${slug}.${e.to}` });
    console.log(`  ✓ ${slug}: +${(j.concepts ?? []).length} concepts`);
  }
  await fs.writeFile(out, JSON.stringify({ concepts, edges }, null, 2));
  console.log(`[concept-graph] wrote ${concepts.length} concepts, ${edges.length} edges → ${out}`);
}
main().catch(e => { console.error(e); process.exit(1); });
