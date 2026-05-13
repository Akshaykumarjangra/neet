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
    const key = process.env.MSG91_AUTH_KEY;
    const whatsappNumber = process.env.MSG91_WHATSAPP_NUMBER;
    if (key && whatsappNumber) {
      await fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/", {
        method: "POST",
        headers: { authkey: key, "content-type": "application/json" },
        body: JSON.stringify({
          integrated_number: whatsappNumber,
          content_type: "template",
          payload: {
            messaging_product: "whatsapp",
            type: "template",
            template: {
              name: process.env.MSG91_PARENT_TEMPLATE_NAME || "parent_weekly_summary",
              language: {
                code: "en",
                policy: "deterministic"
              },
              namespace: process.env.MSG91_TEMPLATE_NAMESPACE || "",
              to_and_components: [
                {
                  to: [row.parent_phone],
                  components: {
                    body_1: {
                      type: "text",
                      value: msg.text.trim()
                    }
                  }
                }
              ]
            }
          }
        }),
      }).catch(err => console.error(`[parent] Failed to post to MSG91:`, err));
    } else {
      console.warn("[parent] MSG91_AUTH_KEY or MSG91_WHATSAPP_NUMBER missing, skipping WhatsApp template message.");
    }
  }
}
main().catch(e => { console.error(e); process.exit(1); });
