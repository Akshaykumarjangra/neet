/**
 * Personalized daily plan — aligned with canonical schema.
 * Flashcards SRS state lives in user_flashcard_progress.next_review.
 */
import { db } from "../db";
import { sql } from "drizzle-orm";
import { selectAdaptive } from "./adaptive";
import { complete } from "../workforce";

export interface DailyPlan {
  date: string;
  questions: { subject: string; ids: number[] }[];
  flashcardsDue: number[];
  weakConcepts: { id: number; name: string; pKnown: number }[];
  motivation: string;
}

export async function buildDailyPlan(userId: string): Promise<DailyPlan> {
  const date = new Date().toISOString().slice(0, 10);

  const subjects = ["physics", "chemistry", "biology"];
  const questions = await Promise.all(subjects.map(async s => ({
    subject: s, ids: await selectAdaptive(userId, s, 5),
  })));

  const dueRows = await db.execute(sql`
    SELECT flashcard_id AS id FROM user_flashcard_progress
    WHERE user_id = ${userId} AND (next_review IS NULL OR next_review <= now())
    ORDER BY next_review NULLS FIRST LIMIT 20
  `);
  const flashcardsDue = ((dueRows as any).rows ?? []).map((r: any) => r.id);

  const weakRows = await db.execute(sql`
    SELECT c.id, c.name, m.p_known FROM user_concept_mastery m
    JOIN concepts c ON c.id = m.concept_id
    WHERE m.user_id = ${userId} ORDER BY m.p_known ASC LIMIT 3
  `);
  const weakConcepts = ((weakRows as any).rows ?? []).map((r: any) => ({ id: r.id, name: r.name, pKnown: r.p_known }));

  const streakRow = await db.execute(sql`SELECT study_streak FROM users WHERE id = ${userId}`);
  const streak = (streakRow as any).rows?.[0]?.study_streak ?? 0;

  const motivationR = await complete({
    task: "social-post",
    prompt: `Write ONE encouraging line (≤ 18 words) for a NEET aspirant on day-${streak} streak whose weakest topic is ${weakConcepts[0]?.name ?? "general"}. No emoji.`,
    maxTokens: 60,
  }).catch(() => ({ text: "Today's the day. One concept, one mock, one win." } as any));

  const plan: DailyPlan = { date, questions, flashcardsDue, weakConcepts, motivation: motivationR.text.trim() };

  await db.execute(sql`
    INSERT INTO daily_plans (user_id, date, plan_jsonb)
    VALUES (${userId}, ${date}, ${JSON.stringify(plan)}::jsonb)
    ON CONFLICT (user_id, date) DO UPDATE SET plan_jsonb = EXCLUDED.plan_jsonb
  `);
  return plan;
}
