import { Router } from "express";
import { db } from "./db";
import { userPerformance, questions, contentTopics, testSessions, users, xpTransactions } from "@shared/schema";
import { requireAuthWithPasswordCheck, getCurrentUser } from "./auth";
import { eq, sql, desc } from "drizzle-orm";

const router = Router();
const ensurePerformanceSummaryTable = async () => {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS user_performance_summary (
      user_id varchar PRIMARY KEY,
      total_attempts integer NOT NULL DEFAULT 0,
      correct_answers integer NOT NULL DEFAULT 0,
      incorrect_answers integer NOT NULL DEFAULT 0,
      avg_time_sec numeric,
      total_xp integer NOT NULL DEFAULT 0,
      last_attempt timestamp,
      updated_at timestamp NOT NULL DEFAULT now()
    );
  `);
};

export const recomputePerformanceSummaryJob = async () => {
  await ensurePerformanceSummaryTable();

  const aggregates = await db.execute(sql`
    SELECT
      up.user_id,
      COUNT(*)::int AS total_attempts,
      SUM(CASE WHEN up.is_correct THEN 1 ELSE 0 END)::int AS correct_answers,
      SUM(CASE WHEN NOT up.is_correct THEN 1 ELSE 0 END)::int AS incorrect_answers,
      AVG(up.time_taken_sec)::numeric AS avg_time_sec,
      COALESCE(
        (SELECT SUM(xp.amount) FROM xp_transactions xp WHERE xp.user_id = up.user_id),
        0
      )::int AS total_xp,
      MAX(up.attempt_date) AS last_attempt
    FROM user_performance up
    GROUP BY up.user_id
  `);

  const rows = aggregates?.rows ?? [];

  for (const row of rows) {
    await db.execute(sql`
      INSERT INTO user_performance_summary
        (user_id, total_attempts, correct_answers, incorrect_answers, avg_time_sec, total_xp, last_attempt, updated_at)
      VALUES
        (${row.user_id}, ${row.total_attempts}, ${row.correct_answers}, ${row.incorrect_answers}, ${row.avg_time_sec}, ${row.total_xp}, ${row.last_attempt}, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        total_attempts = EXCLUDED.total_attempts,
        correct_answers = EXCLUDED.correct_answers,
        incorrect_answers = EXCLUDED.incorrect_answers,
        avg_time_sec = EXCLUDED.avg_time_sec,
        total_xp = EXCLUDED.total_xp,
        last_attempt = EXCLUDED.last_attempt,
        updated_at = NOW();
    `);
  }

  return rows.length;
};

router.get("/student", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    await ensurePerformanceSummaryTable();

    const [summary] = await db.execute(sql`
      SELECT total_attempts, correct_answers, incorrect_answers, avg_time_sec, total_xp
      FROM user_performance_summary
      WHERE user_id = ${userId}
      LIMIT 1
    `).then((r: any) => r.rows ?? []);

    const [totalResult] = summary
      ? [{ total: summary.total_attempts }]
      : await db
          .select({ total: sql<number>`COUNT(*)` })
          .from(userPerformance)
          .where(eq(userPerformance.userId, userId));

    const [correctResult] = summary
      ? [{ correct: summary.correct_answers }]
      : await db
          .select({ correct: sql<number>`SUM(CASE WHEN ${userPerformance.isCorrect} THEN 1 ELSE 0 END)` })
          .from(userPerformance)
          .where(eq(userPerformance.userId, userId));

    const avgTimeSec = summary
      ? Number(summary.avg_time_sec ?? 0)
      : Number(
          (
            await db
              .select({ avg: sql<number>`AVG(${userPerformance.timeTakenSec})` })
              .from(userPerformance)
              .where(eq(userPerformance.userId, userId))
          )[0]?.avg ?? 0,
        );

    const totalXp = summary
      ? Number(summary.total_xp ?? 0)
      : Number(
          (
            await db
              .select({ sum: sql<number>`COALESCE(SUM(${xpTransactions.amount}),0)` })
              .from(xpTransactions)
              .where(eq(xpTransactions.userId, userId))
          )[0]?.sum ?? 0,
        );

    const subjectStats = await db
      .select({
        subject: contentTopics.subject,
        correct: sql<number>`SUM(CASE WHEN ${userPerformance.isCorrect} THEN 1 ELSE 0 END)`,
        total: sql<number>`COUNT(*)`,
      })
      .from(userPerformance)
      .innerJoin(questions, eq(userPerformance.questionId, questions.id))
      .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
      .where(eq(userPerformance.userId, userId))
      .groupBy(contentTopics.subject)
      .orderBy(desc(sql<number>`COUNT(*)`));

    const topicStats = await db
      .select({
        topicId: contentTopics.id,
        topicName: contentTopics.topicName,
        subject: contentTopics.subject,
        correct: sql<number>`SUM(CASE WHEN ${userPerformance.isCorrect} THEN 1 ELSE 0 END)`,
        total: sql<number>`COUNT(*)`,
      })
      .from(userPerformance)
      .innerJoin(questions, eq(userPerformance.questionId, questions.id))
      .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
      .where(eq(userPerformance.userId, userId))
      .groupBy(contentTopics.id, contentTopics.topicName, contentTopics.subject);

    const weakTopics = [...topicStats]
      .map((topic) => {
        const total = Number(topic.total ?? 0);
        const correct = Number(topic.correct ?? 0);
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        return {
          topicId: Number(topic.topicId),
          topicName: topic.topicName,
          subject: topic.subject,
          accuracy,
          attempts: total,
        };
      })
      .filter((topic) => topic.attempts > 0)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);

    const mockHistory = await db
      .select({
        sessionId: testSessions.id,
        testType: testSessions.testType,
        score: testSessions.score,
        completedAt: testSessions.completedAt,
        startedAt: testSessions.startedAt,
      })
      .from(testSessions)
      .where(eq(testSessions.userId, userId))
      .orderBy(desc(testSessions.startedAt))
      .limit(6);

    const totalAttempts = Number(totalResult?.total ?? 0);
    const correctAnswers = Number(correctResult?.correct ?? 0);
    const accuracy = totalAttempts > 0 ? Math.round((correctAnswers / totalAttempts) * 100) : 0;

    const practiceSummary = {
      totalAttempts,
      correctAnswers,
      accuracy,
      avgTimeSec,
      totalXp,
      weakTopicsCount: weakTopics.length,
    };

    res.json({
      practiceSummary,
      subjectMastery: subjectStats.map((stat) => ({
        subject: stat.subject,
        accuracy: stat.total ? Math.round((Number(stat.correct ?? 0) / Number(stat.total ?? 1)) * 100) : 0,
        attempts: Number(stat.total ?? 0),
      })),
      weakTopics,
      mockHistory: mockHistory.map((row) => ({
        sessionId: row.sessionId,
        testType: row.testType,
        score: row.score,
        startedAt: row.startedAt,
        status: row.completedAt ? "completed" : "in_progress",
      })),
    });
  } catch (error: any) {
    console.error("Analytics fetch failed:", error);
    res.status(500).json({ error: "Unable to load analytics right now" });
  }
});

// Admin-only: recompute aggregated performance summaries for dashboards
router.post("/recompute-performance-summary", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const [admin] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!admin || (!admin.isOwner && !admin.isAdmin && admin.role !== "admin")) {
      return res.status(403).json({ error: "Admin access required" });
    }

    await ensurePerformanceSummaryTable();

    // Aggregate per-user stats
    const aggregates = await db.execute(sql`
      SELECT
        up.user_id,
        COUNT(*)::int AS total_attempts,
        SUM(CASE WHEN up.is_correct THEN 1 ELSE 0 END)::int AS correct_answers,
        SUM(CASE WHEN NOT up.is_correct THEN 1 ELSE 0 END)::int AS incorrect_answers,
        AVG(up.time_taken_sec)::numeric AS avg_time_sec,
        COALESCE(
          (SELECT SUM(xp.amount) FROM xp_transactions xp WHERE xp.user_id = up.user_id),
          0
        )::int AS total_xp,
        MAX(up.attempt_date) AS last_attempt
      FROM user_performance up
      GROUP BY up.user_id
    `);

    const rows = aggregates?.rows ?? [];

    for (const row of rows) {
      await db.execute(sql`
        INSERT INTO user_performance_summary
          (user_id, total_attempts, correct_answers, incorrect_answers, avg_time_sec, total_xp, last_attempt, updated_at)
        VALUES
          (${row.user_id}, ${row.total_attempts}, ${row.correct_answers}, ${row.incorrect_answers}, ${row.avg_time_sec}, ${row.total_xp}, ${row.last_attempt}, NOW())
        ON CONFLICT (user_id) DO UPDATE SET
          total_attempts = EXCLUDED.total_attempts,
          correct_answers = EXCLUDED.correct_answers,
          incorrect_answers = EXCLUDED.incorrect_answers,
          avg_time_sec = EXCLUDED.avg_time_sec,
          total_xp = EXCLUDED.total_xp,
          last_attempt = EXCLUDED.last_attempt,
          updated_at = NOW();
      `);
    }

    res.json({ updated: rows.length });
  } catch (error: any) {
    console.error("Performance summary recompute failed:", error);
    res.status(500).json({ error: "Failed to recompute performance summary" });
  }
});

// Admin-only: get performance summary metadata (last updated)
router.get("/performance-summary/meta", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const [admin] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!admin || (!admin.isOwner && !admin.isAdmin && admin.role !== "admin")) {
      return res.status(403).json({ error: "Admin access required" });
    }

    await ensurePerformanceSummaryTable();
    const meta = await db.execute(sql`
      SELECT
        MAX(updated_at) AS last_updated,
        COUNT(*) AS user_count
      FROM user_performance_summary
    `);

    const row = meta.rows?.[0];
    res.json({
      lastUpdated: row?.last_updated ?? null,
      userCount: row?.user_count ? Number(row.user_count) : 0,
    });
  } catch (error: any) {
    console.error("Performance summary meta failed:", error);
    res.status(500).json({ error: "Failed to load performance summary metadata" });
  }
});

// Admin-only: list performance summaries for dashboard table
router.get("/performance-summary", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const [admin] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!admin || (!admin.isOwner && !admin.isAdmin && admin.role !== "admin")) {
      return res.status(403).json({ error: "Admin access required" });
    }

    await ensurePerformanceSummaryTable();

    const summaries = await db.execute(sql`
      SELECT
        ups.user_id,
        u.name,
        u.email,
        u.role,
        ups.total_attempts,
        ups.correct_answers,
        ups.incorrect_answers,
        ups.avg_time_sec,
        ups.total_xp,
        ups.last_attempt,
        ups.updated_at
      FROM user_performance_summary ups
      LEFT JOIN users u ON u.id = ups.user_id
      ORDER BY ups.total_attempts DESC NULLS LAST
      LIMIT 200
    `);

    res.json(summaries.rows ?? []);
  } catch (error: any) {
    console.error("Performance summary list failed:", error);
    res.status(500).json({ error: "Failed to load performance summary" });
  }
});

export default router;
