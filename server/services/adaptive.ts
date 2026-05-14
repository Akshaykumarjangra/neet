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

const ETA_THETA = 0.10;
const ETA_B = 0.05;
const BKT = { p_init: 0.30, p_transit: 0.10, p_slip: 0.10, p_guess: 0.20 };

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

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

export function updateIRT(theta: number, b: number, correct: boolean): { theta: number; b: number } {
  const p = sigmoid(theta - b);
  const error = (correct ? 1 : 0) - p;
  return { theta: theta + ETA_THETA * error, b: b - ETA_B * error };
}

export function updateBKT(pKnown: number, correct: boolean): number {
  const pCorrectIfKnown = 1 - BKT.p_slip;
  const pCorrectIfNot = BKT.p_guess;
  const pObs = correct
    ? pKnown * pCorrectIfKnown + (1 - pKnown) * pCorrectIfNot
    : pKnown * BKT.p_slip + (1 - pKnown) * (1 - BKT.p_guess);
  const pPosterior = correct
    ? (pKnown * pCorrectIfKnown) / pObs
    : (pKnown * BKT.p_slip) / pObs;
  return pPosterior + (1 - pPosterior) * BKT.p_transit;
}

export async function recordAttempt(a: AttemptInput): Promise<AttemptUpdate> {
  const { theta: newTheta, b: newB } = updateIRT(a.currentTheta, a.currentB, a.correct);

  const conceptUpdates: { conceptId: number; pKnown: number }[] = [];
  const promises: Promise<any>[] = [];

  // 1. Update users.adaptive_profile.masteryScores[subject]
  promises.push(db.execute(sql`
    UPDATE users
    SET adaptive_profile = jsonb_set(
      coalesce(adaptive_profile, '{}'::jsonb),
      '{masteryScores}',
      coalesce(adaptive_profile->'masteryScores', '{}'::jsonb) ||
        jsonb_build_object(${a.subject}, to_jsonb(${newTheta}::real)),
      true
    )
    WHERE id = ${a.userId}
  `));

  // 2. Update questions difficulty
  promises.push(db.execute(sql`UPDATE questions SET irt_b = ${newB} WHERE id = ${a.questionId}`));

  // 3. Batch process concept mastery
  if (a.conceptIds.length > 0) {
    // Read previous states in one query
    const r = await db.execute(sql`
      SELECT concept_id, p_known FROM user_concept_mastery
      WHERE user_id = ${a.userId} AND concept_id IN (${sql.join(a.conceptIds.map(id => sql`${id}`), sql`, `)})
    `);

    const knownMap = new Map();
    for (const row of (r as any).rows || []) {
      knownMap.set(row.concept_id, row.p_known);
    }

    const updateValues = [];
    for (const cid of a.conceptIds) {
      const prev = knownMap.get(cid) ?? BKT.p_init;
      const next = updateBKT(prev, a.correct);
      updateValues.push(sql`(${a.userId}, ${cid}, ${next}, now())`);
      conceptUpdates.push({ conceptId: cid, pKnown: next });
    }

    // Batch insert/update
    const valuesList = sql.join(updateValues, sql`, `);
    promises.push(db.execute(sql`
      INSERT INTO user_concept_mastery (user_id, concept_id, p_known, updated_at)
      VALUES ${valuesList}
      ON CONFLICT (user_id, concept_id) DO UPDATE SET p_known = excluded.p_known, updated_at = now()
    `));
  }

  await Promise.all(promises);

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
