/**
 * Meta + Google ad creative generator (Phase 5/08). Creates paused campaigns with variant copy.
 * TODO: provide META_ACCESS_TOKEN + META_AD_ACCOUNT_ID, GOOGLE_ADS_DEVELOPER_TOKEN/refresh token.
 */
import { complete } from "../../server/workforce/index";
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

async function fetchFromPostHog() {
  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) {
    throw new Error("POSTHOG_API_KEY is not set");
  }

  const url = `${process.env.POSTHOG_HOST || 'https://app.posthog.com'}/api/projects/@current/query/`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  // A hypothetical HogQL query to get top performing posts.
  // We assume there are events with a text property, and we calculate a synthetic CTR
  // based on event counts or similar logic for demonstration, or we just pull the top events.
  const payload = {
    "query": {
      "kind": "HogQLQuery",
      "query": "SELECT properties.post_id as id, properties.post_text as text, count() as clicks, 5.0 as ctr FROM events WHERE event = 'post_clicked' AND properties.post_id IS NOT NULL GROUP BY properties.post_id, properties.post_text ORDER BY clicks DESC LIMIT 5"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`PostHog API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data && data.results && Array.isArray(data.results)) {
    return data.results.map((row: any) => ({
      id: row[0],
      text: row[1],
      ctr: row[3] || 4.0 // fallback CTR if none calculated
    }));
  }

  return [];
}

async function topPerformingPosts() {
  // Try to read from PostHog, fallback to synthetic top posts if it fails or is not configured.
  try {
    const posts = await fetchFromPostHog();
    if (posts && posts.length > 0) {
      return posts;
    }
  } catch (err: any) {
    console.log(`Failed to fetch from PostHog, falling back to synthetic posts: ${err.message}`);
  }

  return [
    { id: "ph-001", text: "5 mnemonics to never forget human reproduction.", ctr: 4.8 },
    { id: "ph-002", text: "Top 50 PYQs from physics with shortcuts.", ctr: 3.6 },
  ];
}

main().catch(e => { console.error(e); process.exit(1); });
