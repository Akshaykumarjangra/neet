import { db, pool } from "../../server/db";
import { chapterContent } from "../../shared/schema";
import dotenv from "dotenv";
import { isNull, eq } from "drizzle-orm";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

async function generateWithGemini(prompt: string, maxTokens = 8000): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: maxTokens },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");

  return text;
}

async function run() {
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    process.exit(1);
  }

  const chapters = await db.select().from(chapterContent).where(isNull(chapterContent.aiSummary)).limit(10);
  console.log(`Found ${chapters.length} chapters missing study guides.`);

  for (const chapter of chapters) {
    console.log(`Generating study guide for: ${chapter.chapterTitle}`);
    const prompt = `You are an expert NEET faculty. Write a highly detailed, engaging Study Guide and Article for the chapter "${chapter.chapterTitle}" (${chapter.subject}).
Include:
1. A compelling introduction.
2. Key topics to master.
3. Common pitfalls and mistakes students make.
4. Tips for memorization or problem solving.
Format it in beautiful Markdown.`;

    try {
      const summary = await generateWithGemini(prompt);
      await db.update(chapterContent).set({
        aiSummary: summary,
      }).where(eq(chapterContent.id, chapter.id));
      console.log(`✅ Updated chapter: ${chapter.chapterTitle}`);
    } catch (err: any) {
      console.error(`❌ Failed to update chapter: ${chapter.chapterTitle}`, err.message);
    }
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log("🎉 Study Guides generated!");
  process.exit(0);
}

run();
