/**
 * Meta + Google ad creative generator (Phase 5/08). Creates paused campaigns with variant copy.
 * TODO: provide META_ACCESS_TOKEN + META_AD_ACCOUNT_ID, GOOGLE_ADS_DEVELOPER_TOKEN/refresh token.
 */
import { complete } from "../../server/workforce";
import fs from "node:fs/promises";
import path from "node:path";

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
  // TODO: read from PostHog / GA4. Placeholder returns synthetic top posts.
  return [
    { id: "ph-001", text: "5 mnemonics to never forget human reproduction.", ctr: 4.8 },
    { id: "ph-002", text: "Top 50 PYQs from physics with shortcuts.", ctr: 3.6 },
  ];
}

main().catch(e => { console.error(e); process.exit(1); });
