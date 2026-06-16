/**
 * Tier-based quota — uses varchar user IDs and usage_events table.
 */
import type { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { sql, eq } from "drizzle-orm";
import { users } from "@shared/schema";

export type Tier = "free" | "plus" | "pro";
type Quota = "practice_per_day" | "mocks_per_week" | "doubt_per_day";

const LIMITS: Record<Tier, Record<Quota, number>> = {
  free: { practice_per_day: 20, mocks_per_week: 1, doubt_per_day: 5 },
  plus: { practice_per_day: 1000, mocks_per_week: 3, doubt_per_day: 20 },
  pro:  { practice_per_day: 100000, mocks_per_week: 100, doubt_per_day: 200 },
};

export function quota(kind: Quota) {
  return async (req: any, res: Response, next: NextFunction) => {
    const userId = req.session?.userId;
    if (!userId) return res.status(401).json({ error: "auth required" });

    // Fetch user details to map to a tier
    const [user] = await db
      .select({ isPaidUser: users.isPaidUser })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const tier: Tier = user?.isPaidUser ? "pro" : "free";
    const limit = LIMITS[tier][kind];
    const window = kind.endsWith("per_week") ? sql`'7 days'` : sql`'1 day'`;
    const event = kind.replace(/_per_(day|week)$/, "");
    
    const r = await db.execute(sql`
      SELECT count(*)::int AS c FROM usage_events
      WHERE user_id = ${userId} AND event = ${event} AND created_at > now() - ${window}::interval
    `);
    
    const used = (r as any).rows?.[0]?.c ?? 0;
    if (used >= limit) return res.status(402).json({ error: "quota_exceeded", tier, limit, used, kind });
    await db.execute(sql`INSERT INTO usage_events (user_id, event) VALUES (${userId}, ${event})`);
    next();
  };
}
