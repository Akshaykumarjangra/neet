/**
 * Social post publisher (Phase 5/05).
 * Reads content/queue/<date>.json and posts via Postiz / direct platform APIs.
 *
 * TODO: provide POSTIZ_API_URL + POSTIZ_API_KEY (or direct platform tokens).
 */
import fs from "node:fs/promises";
import path from "node:path";

const POSTIZ = process.env.POSTIZ_API_URL ?? "";
const KEY = process.env.POSTIZ_API_KEY ?? "";

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const file = path.resolve(__dirname, "../../content/queue", `${today}.json`);
  const data = JSON.parse(await fs.readFile(file, "utf8"));
  const platforms = ["instagram", "x", "linkedin", "telegram", "youtube_shorts"];

  if (!POSTIZ || !KEY) { console.warn("[post] POSTIZ_* env not set; printing payloads only."); console.log(JSON.stringify(buildPayloads(data, platforms), null, 2)); return; }

  for (const p of buildPayloads(data, platforms)) {
    const r = await fetch(`${POSTIZ}/posts`, {
      method: "POST",
      headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json" },
      body: JSON.stringify(p),
    });
    console.log(`  ${p.platform}: ${r.status}`);
  }

  const log = path.resolve(__dirname, "../../content/queue/_log.json");
  const prev = JSON.parse(await fs.readFile(log, "utf8").catch(() => "{}"));
  prev[today] = { published: true, at: new Date().toISOString() };
  await fs.writeFile(log, JSON.stringify(prev, null, 2));
}

function buildPayloads(d: any, platforms: string[]) {
  return [
    { platform: "instagram", kind: "reel", text: d.reel },
    { platform: "instagram", kind: "carousel", text: d.carousel },
    ...d.tweets.split(/\n+/).filter(Boolean).map((t: string) => ({ platform: "x", kind: "tweet", text: t })),
    { platform: "youtube_shorts", kind: "short", text: d.youtube_short },
    { platform: "telegram", kind: "post", text: d.pyq_card },
  ].filter(p => platforms.includes(p.platform));
}

main().catch(e => { console.error(e); process.exit(1); });
