/**
 * Multi-touch attribution (Phase 5/09).
 * Linear by default; W-shaped (40/20/40) optional.
 */
import { db } from "../db";
import { sql } from "drizzle-orm";

export interface Touch { ts: string; channel: string; campaign?: string; cost?: number; }

export async function recordTouch(userId: string | null, t: Touch & { fingerprint?: string }) {
  await db.execute(sql`
    INSERT INTO touches (user_id, fingerprint, ts, channel, campaign, cost)
    VALUES (${userId}, ${t.fingerprint ?? null}, ${t.ts}, ${t.channel}, ${t.campaign ?? null}, ${t.cost ?? 0})
  `);
}

export async function attribute(userId: string, model: "linear" | "w-shaped" = "linear") {
  const r = await db.execute(sql`SELECT channel, campaign, cost FROM touches WHERE user_id=${userId} ORDER BY ts ASC`);
  const touches = ((r as any).rows ?? []) as Touch[];
  if (!touches.length) return [];
  if (model === "linear") {
    const w = 1 / touches.length;
    return touches.map(t => ({ ...t, weight: w }));
  }
  // W-shaped: 40% first, 40% last, 20% spread among middle
  const out = touches.map(t => ({ ...t, weight: 0 }));
  out[0].weight += 0.4;
  out[out.length - 1].weight += 0.4;
  const mid = out.slice(1, -1);
  if (mid.length) for (const m of mid) m.weight += 0.2 / mid.length;
  return out;
}

export async function cohortLTV(channel: string, days = 90) {
  const r = await db.execute(sql`
    SELECT date_trunc('week', t.ts) AS cohort, sum(b.amount) AS revenue, count(distinct t.user_id) AS users
    FROM touches t LEFT JOIN billing_events b ON b.user_id = t.user_id
    WHERE t.channel = ${channel} AND t.ts > now() - (${days} || ' days')::interval
    GROUP BY 1 ORDER BY 1
  `);
  return ((r as any).rows ?? []);
}
