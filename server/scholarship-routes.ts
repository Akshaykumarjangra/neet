/**
 * Scholarship test funnel (Phase 4/04). Reuses mock-test infra; awards coupons.
 */
import { Router } from "express";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { requireAuth } from "./auth";
import { customAlphabet } from "nanoid";

const router = Router();
const couponCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 8);

router.post("/submit", requireAuth, async (req: any, res) => {
  const { score, total } = req.body;
  if (typeof score !== "number" || typeof total !== "number") return res.status(400).json({ error: "score+total required" });
  const pct = (score / total) * 100;
  const couponPct = pct >= 90 ? 50 : pct >= 70 ? 20 : 10;
  const code = couponCode();
  await db.execute(sql`
    INSERT INTO scholarship_attempts (user_id, score, percentile, coupon_code) VALUES (${req.user.id}, ${score}, ${pct}, ${code})
  `);
  await db.execute(sql`
    INSERT INTO coupons (code, discount_pct, valid_until, user_id, source)
    VALUES (${code}, ${couponPct}, now() + interval '14 days', ${req.user.id}, 'scholarship')
    ON CONFLICT (code) DO NOTHING
  `).catch(() => {});
  res.json({ percentile: pct, couponCode: code, discountPct: couponPct });
});

router.get("/leaderboard", async (_req, res) => {
  const r = await db.execute(sql`
    SELECT u.name, s.score, s.percentile FROM scholarship_attempts s
    JOIN users u ON u.id = s.user_id
    WHERE s.attempted_at > now() - interval '30 days'
    ORDER BY s.score DESC LIMIT 100
  `);
  res.json((r as any).rows ?? []);
});

export default router;
