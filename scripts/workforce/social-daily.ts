/**
 * Daily social content factory.
 *
 * Produces today's queue: 1 reel script, 1 carousel (10 slides),
 * 5 tweets, 1 YouTube short script, 1 PYQ-of-the-day card.
 *
 * Output → content/queue/YYYY-MM-DD.json (consumed by Buffer/n8n/Postiz worker).
 *
 * Run: npx tsx scripts/workforce/social-daily.ts
 */
import fs from "node:fs/promises";
import path from "node:path";
import { complete } from "../../server/workforce";

const TOPICS = [
  "Photosynthesis light reactions",
  "Newton's laws applied to NEET problems",
  "Coordination compounds nomenclature",
  "Human reproduction high-yield facts",
  "Thermodynamics first law tricks",
  "Biomolecules structure mnemonics",
];

const SYSTEM = `You are a Gen-Z social content strategist for an Indian NEET prep brand.
Voice: encouraging, witty, exam-truthful, no fluff. Use Hinglish sparingly when natural.
Always include 1 specific NCERT-anchored fact, 1 hook, 1 CTA to "study free at neetprep.app".`;

async function gen(kind: string, topic: string, instructions: string) {
  const r = await complete({
    task: "social-post",
    system: SYSTEM,
    prompt: `Topic: ${topic}\nFormat: ${kind}\n${instructions}\nReturn ONLY the content, no preamble.`,
    maxTokens: 1200,
  });
  return r.text.trim();
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const topic = TOPICS[new Date().getDate() % TOPICS.length];
  const out = {
    date: today,
    topic,
    reel: await gen("Instagram reel script (30s)", topic, "Hook in first 2s. 5 beats. Visual cues in [brackets]. End with CTA."),
    carousel: await gen("Instagram carousel (10 slides)", topic, "One key idea per slide. Slide 1 = hook. Slide 10 = CTA. Format: ### Slide N\\n<text>"),
    tweets: await gen("Five standalone tweets", topic, "Each <280 chars, numbered 1-5, each one usable alone."),
    youtube_short: await gen("YouTube Shorts script (45s)", topic, "Spoken script + on-screen text in [brackets]."),
    pyq_card: await gen("PYQ-of-the-day card text", topic, "One real-style NEET MCQ + 4 options + answer key + 2-line explanation."),
  };
  const dir = path.resolve(__dirname, "../../content/queue");
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${today}.json`);
  await fs.writeFile(file, JSON.stringify(out, null, 2));
  console.log(`[social] wrote ${file}`);
}
main().catch(e => { console.error(e); process.exit(1); });
