/**
 * Adaptive practice engine — aligned with shared/schema.ts canonical tables.
 *
 * - 1-PL (Rasch) IRT for question difficulty `irt_b` and per-subject ability stored
 *   inside users.adaptive_profile (jsonb): { masteryScores: { [subject]: theta } }.
 * - Bayesian Knowledge Tracing (BKT) per concept in user_concept_mastery.
 *
 * Attempts table is `user_performance` (NOT a table called "attempts"):
 *   user_id varchar, question_id int, is_correct bool, time_taken_sec int, attempt_date.
 * Subject is resolved via questions.topic_id → content_topics.subject (text).
 */
import { db } from "../db";
import { sql } from "drizzle-orm";
import { updateIRT, updateBKT, BKT } from "./adaptive-math";

// Re-export for any existing consumers
export { updateIRT, updateBKT } from "./adaptive-math";

export interface AttemptInput {
  userId: string;        // varchar UUID
  questionId: number;
  subject: string;       // resolved from content_topics.subject
  conceptIds: number[];
  correct: boolean;
  currentTheta: number;
  currentB: number;
}

export interface AttemptUpdate {
  newTheta: number;
  newB: number;
  conceptUpdates: { conceptId: number; pKnown: number }[];
}

export async function recordAttempt(a: AttemptInput): Promise<AttemptUpdate> {
  const { theta: newTheta, b: newB } = updateIRT(a.currentTheta, a.currentB, a.correct);

  // Update users.adaptive_profile.masteryScores[subject]
  await db.execute(sql`
    UPDATE users
    SET adaptive_profile = jsonb_set(
      coalesce(adaptive_profile, '{}'::jsonb),
      '{masteryScores}',
      coalesce(adaptive_profile->'masteryScores', '{}'::jsonb) ||
        jsonb_build_object(${a.subject}, to_jsonb(${newTheta}::real)),
      true
    )
    WHERE id = ${a.userId}
  `);
  await db.execute(sql`UPDATE questions SET irt_b = ${newB} WHERE id = ${a.questionId}`);

  const conceptUpdates: { conceptId: number; pKnown: number }[] = [];
  for (const cid of a.conceptIds) {
    const r = await db.execute(sql`
      SELECT p_known FROM user_concept_mastery
      WHERE user_id = ${a.userId} AND concept_id = ${cid} LIMIT 1
    `);
    const prev = (r as any).rows?.[0]?.p_known ?? BKT.p_init;
    const next = updateBKT(prev, a.correct);
    await db.execute(sql`
      INSERT INTO user_concept_mastery (user_id, concept_id, p_known, updated_at)
      VALUES (${a.userId}, ${cid}, ${next}, now())
      ON CONFLICT (user_id, concept_id) DO UPDATE SET p_known = ${next}, updated_at = now()
    `);
    conceptUpdates.push({ conceptId: cid, pKnown: next });
  }
  return { newTheta, newB, conceptUpdates };
}

/** Pick N questions targeting the user's current ability and weak concepts. */
export async function selectAdaptive(userId: string, subject: string, n: number): Promise<number[]> {
  const r = await db.execute(sql`
    WITH theta AS (
      SELECT coalesce((adaptive_profile->'masteryScores'->>${subject})::real, 0) AS t
      FROM users WHERE id = ${userId}
    ),
    weak AS (
      SELECT concept_id FROM user_concept_mastery
      WHERE user_id = ${userId} AND p_known < 0.7
      ORDER BY p_known ASC LIMIT 20
    ),
    weak_arr AS (SELECT coalesce(array_agg(concept_id), '{}'::int[]) AS ids FROM weak),
    recent AS (
      SELECT question_id FROM user_performance
      WHERE user_id = ${userId} ORDER BY attempt_date DESC LIMIT 200
    )
    SELECT q.id FROM questions q
    JOIN content_topics t ON t.id = q.topic_id
    , theta, weak_arr
    WHERE t.subject = ${subject}
      AND abs(coalesce(q.irt_b, 0) - theta.t) <= 0.5
      AND (cardinality(weak_arr.ids) = 0 OR q.concept_ids && weak_arr.ids)
      AND q.id NOT IN (SELECT question_id FROM recent)
    ORDER BY random() LIMIT ${n}
  `);
  return ((r as any).rows ?? []).map((x: any) => x.id);
}
