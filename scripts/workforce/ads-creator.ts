/**
 * Meta + Google ad creative generator (Phase 5/08). Creates paused campaigns with variant copy.
 * TODO: provide META_ACCESS_TOKEN + META_AD_ACCOUNT_ID, GOOGLE_ADS_DEVELOPER_TOKEN/refresh token.
 */
import "dotenv/config";
import { complete } from "../../server/workforce";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM = `Generate 5 ad creative variants for an Indian NEET prep app.
Each: { headline (≤30c), primary (≤90c), description (≤30c), cta }.
Voice: aspirational, exam-truthful, urgency without manipulation. Output JSON {variants}.`;

async function main() {
  const top = await topPerformingPosts();
  const out = path.resolve(__dirname, "../../data/marketing-pending/ads");
  await fs.mkdir(out, { recursive: true });
  for (const post of top) {
    const r = await complete({
      task: "long-form",
      system: SYSTEM,
      prompt: `Inspiration post (organic CTR=${post.ctr}%): ${post.text}`,
      json: true,
      maxTokens: 1500,
    });
    const file = path.join(out, `${post.id}-${Date.now()}.json`);
    await fs.writeFile(file, JSON.stringify({ source: post, variants: (r.json as any)?.variants ?? [] }, null, 2));
    console.log(`  ✓ ${file}`);
  }
  console.log("Next: review and call meta-ads-uploader (TODO) to push as paused campaigns.");
}

async function topPerformingPosts() {
  if (process.env.POSTHOG_API_KEY && process.env.POSTHOG_HOST) {
    try {
      const res = await fetch(`${process.env.POSTHOG_HOST}/api/projects/@current/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.POSTHOG_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            kind: "HogQLQuery",
            query: "SELECT properties.$current_url, count() as views FROM events WHERE event = '$pageview' GROUP BY properties.$current_url ORDER BY views DESC LIMIT 5"
          }
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return data.results.map((row: any, i: number) => ({
            id: `ph-api-${i}`,
            text: `Top content at: ${row[0]} (Views: ${row[1]})`,
            ctr: row[1] // Use actual view count as the metric instead of synthetic CTR
          }));
        }
      } else {
        console.warn("PostHog API returned non-OK status", res.status);
      }
    } catch (e) {
      console.error("Failed to fetch from PostHog", e);
    }
  }

  // Fallback to synthetic data if PostHog variables are not set or if fetch fails
  return [
    { id: "ph-001", text: "5 mnemonics to never forget human reproduction.", ctr: 4.8 },
    { id: "ph-002", text: "Top 50 PYQs from physics with shortcuts.", ctr: 3.6 },
  ];
}

main().catch(e => { console.error(e); process.exit(1); });
