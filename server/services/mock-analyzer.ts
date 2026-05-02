/**
 * AI mock test analyzer — aligned with mock_exam_attempt_questions + mock_exam_responses.
 */
import { db } from "../db";
import { sql } from "drizzle-orm";
import { complete } from "../workforce";

export async function analyzeMock(attemptId: number) {
  // Pull responses + question IRT difficulty + user theta (per subject not currently joined; use 0).
  const stats = await db.execute(sql`
    SELECT
      r.question_id            AS "questionId",
      r.is_correct             AS correct,
      coalesce(r.time_spent_seconds, 0) * 1000 AS "timeMs",
      0::real                  AS theta,
      coalesce(meq.snapshot->>'irt_b', '0')::real AS b
    FROM mock_exam_responses r
    JOIN mock_exam_attempt_questions meq
      ON meq.attempt_id = r.attempt_id AND meq.question_id = r.question_id
    WHERE r.attempt_id = ${attemptId}
  `);
  const rows = ((stats as any).rows ?? []) as any[];

  const heatmap = rows.map(r => ({ id: r.questionId, sec: Math.round(r.timeMs / 1000), correct: !!r.correct }));
  const silly = rows.filter(r => !r.correct && (Number(r.theta) - Number(r.b)) > 1).length;
  const totalCorrect = rows.filter(r => r.correct).length;
  const score = totalCorrect * 4 - (rows.length - totalCorrect) * 1;
  const predictedNeetMarks = rows.length > 0 ? Math.round(score * (720 / (rows.length * 4))) : 0;
  const predictedPercentile = Math.min(99.9, Math.max(0, 30 + score / 5));

  const insightsR = await complete({
    task: "marketing-strategy",
    tier: "premium",
    system: "You are a NEET coach giving 5 actionable, specific insights based on a mock test. Output JSON: { insights: string[] }",
    prompt: `Score: ${score}/${rows.length * 4}. Silly mistakes: ${silly}. Time-per-q stats: ${JSON.stringify(heatmap.slice(0, 30))}`,
    json: true,
    maxTokens: 1500,
  }).catch(() => ({ json: { insights: [] } } as any));

  const analysis = {
    heatmap,
    sillyMistakes: silly,
    score,
    predictedNeetMarks,
    predictedPercentile,
    aiInsights: (insightsR.json as any)?.insights ?? [],
    generatedAt: new Date().toISOString(),
  };

  await db.execute(sql`
    INSERT INTO mock_analysis (attempt_id, json)
    VALUES (${attemptId}, ${JSON.stringify(analysis)}::jsonb)
    ON CONFLICT (attempt_id) DO UPDATE SET json = EXCLUDED.json, generated_at = now()
  `);
  return analysis;
}
