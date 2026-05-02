/**
 * Weekly parent WhatsApp summary — uses canonical user_performance + mock_exam_attempts.
 */
import { db } from "../../server/db";
import { sql } from "drizzle-orm";
import { complete } from "../../server/workforce";
import { generateParentLinkToken } from "../../server/parent-routes";

const BASE_URL = process.env.BASE_URL || "https://zeroai.neet.com";

async function main() {
  const r = await db.execute(sql`
    SELECT p.parent_phone, u.id AS user_id, u.name
    FROM parent_links p JOIN users u ON u.id = p.student_user_id
    WHERE p.status = 'verified'
  `);
  for (const row of ((r as any).rows ?? []) as any[]) {
    const stats = await db.execute(sql`
      SELECT
        coalesce(sum(time_taken_sec) / 60, 0)::int AS minutes,
        coalesce(sum((is_correct)::int), 0)::int AS correct,
        coalesce(count(*), 0)::int AS attempts,
        (SELECT score FROM mock_exam_attempts
          WHERE user_id = ${row.user_id} AND submitted_at > now() - interval '7 days'
          ORDER BY submitted_at DESC LIMIT 1) AS mock_score
      FROM user_performance WHERE user_id = ${row.user_id} AND attempt_date > now() - interval '7 days'
    `);
    const s = (stats as any).rows?.[0] ?? {};
    const token = generateParentLinkToken(row.user_id);
    const link = `${BASE_URL}/parent/progress/${token}`;
    
    const msg = await complete({
      task: "social-post",
      prompt: `Write a 3-line warm parent update in English about ${row.name}'s week: ${s.minutes ?? 0} min studied, ${s.correct ?? 0}/${s.attempts ?? 0} correct, last mock ${s.mock_score ?? "—"}/720. End with one constructive next step and this link: ${link}`,
      maxTokens: 250,
    }).catch(() => ({ text: `${row.name} studied ${s.minutes ?? 0} minutes this week. View full report: ${link}` } as any));
    console.log(`[parent] ${row.parent_phone}: ${msg.text.trim()}`);
    // TODO: post to MSG91 WhatsApp template here
  }
}
main().catch(e => { console.error(e); process.exit(1); });
