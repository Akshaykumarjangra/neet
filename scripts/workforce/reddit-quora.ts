/**
 * Reddit + Quora answer-bot (Phase 5/06). Drafts only — human approves.
 * TODO: provide REDDIT_CLIENT_ID/SECRET, APIFY_TOKEN.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { complete } from "../../server/workforce";

const SYSTEM = `Draft a helpful, non-promotional answer for a NEET aspirant.
ONLY mention NEETPrep when genuinely useful. Cite NCERT chapter where relevant.
Tone: peer-to-peer, evidence-based, no fluff. ≤ 280 words.`;

async function main() {
  const out = path.resolve(__dirname, "../../data/marketing-pending/replies");
  await fs.mkdir(out, { recursive: true });
  const posts = await fetchRedditNeet();
  for (const p of posts) {
    const r = await complete({
      task: "long-form",
      system: SYSTEM,
      prompt: `Subreddit: ${p.subreddit}\nTitle: ${p.title}\nBody: ${p.body}\n\nDraft a reply.`,
      maxTokens: 800,
    });
    const file = path.join(out, `reddit-${p.id}.md`);
    await fs.writeFile(file, `# ${p.title}\n\n**URL:** ${p.url}\n\n---\n\n${r.text}\n`);
    console.log(`  ✓ ${file}`);
  }
}

async function fetchRedditNeet(): Promise<any[]> {
  const cid = process.env.REDDIT_CLIENT_ID, secret = process.env.REDDIT_CLIENT_SECRET;
  if (!cid || !secret) {
    console.warn("[reddit-quora] no creds; using public JSON feed (rate-limited)");
    const r = await fetch("https://www.reddit.com/r/NEET/new.json?limit=10", { headers: { "user-agent": "neetprep-bot/1.0" } });
    const j = await r.json();
    return (j?.data?.children ?? []).map((c: any) => ({
      id: c.data.id, subreddit: "NEET", title: c.data.title, body: c.data.selftext, url: `https://reddit.com${c.data.permalink}`,
    }));
  }
  // TODO: OAuth flow with cid/secret
  return [];
}

main().catch(e => { console.error(e); process.exit(1); });
