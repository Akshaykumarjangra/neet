/**
 * Study squads — varchar user IDs, user_performance for activity stats.
 */
import { Router } from "express";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import { requireAuth } from "./auth";
import { recordAuditLog } from "./lib/audit";

const router = Router();
const code = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

router.post("/", requireAuth, async (req: any, res) => {
  const { name, weeklyGoalMinutes = 600 } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  const c = code();
  const r = await db.execute(sql`
    INSERT INTO squads (name, code, weekly_goal_minutes) VALUES (${name}, ${c}, ${weeklyGoalMinutes}) RETURNING id
  `);
  const id = (r as any).rows?.[0]?.id;
  await db.execute(sql`INSERT INTO squad_members (squad_id, user_id) VALUES (${id}, ${req.session.userId})`);
  
  recordAuditLog(req, {
    action: "create_squad",
    entityType: "squad",
    entityId: id,
    newValue: { name, code: c, weeklyGoalMinutes }
  });

  res.json({ id, code: c });
});

router.post("/join", requireAuth, async (req: any, res) => {
  const { code: c } = req.body;
  const r = await db.execute(sql`SELECT id FROM squads WHERE code = ${(c ?? "").toUpperCase()}`);
  const id = (r as any).rows?.[0]?.id;
  if (!id) return res.status(404).json({ error: "invalid code" });
  const cnt = await db.execute(sql`SELECT count(*)::int AS c FROM squad_members WHERE squad_id = ${id}`);
  if (((cnt as any).rows?.[0]?.c ?? 0) >= 4) return res.status(400).json({ error: "squad full" });
  await db.execute(sql`
    INSERT INTO squad_members (squad_id, user_id) VALUES (${id}, ${req.session.userId}) ON CONFLICT DO NOTHING
  `);

  recordAuditLog(req, {
    action: "join_squad",
    entityType: "squad",
    entityId: id,
    newValue: { code: c }
  });

  res.json({ id });
});

router.get("/:id/leaderboard", requireAuth, async (req, res) => {
  const r = await db.execute(sql`
    SELECT u.id, u.name,
      coalesce(sum(up.time_taken_sec) / 60, 0)::int AS minutes,
      count(up.*)::int AS attempts
    FROM squad_members sm
    JOIN users u ON u.id = sm.user_id
    LEFT JOIN user_performance up
      ON up.user_id = u.id AND up.attempt_date > date_trunc('week', now())
    WHERE sm.squad_id = ${Number(req.params.id)}
    GROUP BY u.id, u.name ORDER BY minutes DESC
  `);
  res.json((r as any).rows ?? []);
});

export default router;
