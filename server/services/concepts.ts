/**
 * Concept-graph API service. Loads precomputed graph + user mastery for visualization.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { db } from "../db";
import { sql } from "drizzle-orm";

let cache: { concepts: any[]; edges: any[] } | null = null;
async function load() {
  if (cache) return cache;
  const file = path.resolve(process.cwd(), "data/concept-graph.json");
  try { cache = JSON.parse(await fs.readFile(file, "utf8")); }
  catch { cache = { concepts: [], edges: [] }; }
  return cache!;
}

export async function getGraphForUser(userId: string) {
  const g = await load();
  if (!g.concepts.length) return g;
  const r = await db.execute(sql`
    SELECT c.slug, m.p_known FROM user_concept_mastery m
    JOIN concepts c ON c.id = m.concept_id
    WHERE m.user_id = ${userId}
  `);
  const map = new Map(((r as any).rows ?? []).map((x: any) => [x.slug, x.p_known]));
  return { ...g, concepts: g.concepts.map(c => ({ ...c, pKnown: map.get(c.id) })) };
}
