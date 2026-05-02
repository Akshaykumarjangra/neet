import { db, pool } from "../../server/db";
import { 
  mockTestSeries, mockExamPapers, mockExamSections, mockExamQuestions, 
  mockExamOptions, mockExamPaperQuestions 
} from "../../shared/schema";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

async function generateWithGemini(prompt: string, maxTokens = 8000): Promise<any> {
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
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");

  // Clean JSON block if present
  text = text.replace(/^\s*```json\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  return JSON.parse(text);
}

async function createMockTest(testName: string, subjectName: string) {
  console.log(`🚀 Generating Mock Test: ${testName} for ${subjectName}...`);
  
  const prompt = `You are an expert NEET examiner. Create a full mock test section for ${subjectName}.
Return a JSON object with this structure:
{
  "questions": [
    {
      "stem": "The question text here...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed explanation..."
    }
  ]
}
Generate exactly 10 high-quality, difficult questions.
Strictly valid JSON only. No markdown formatting outside of the JSON.`;

  try {
    const result = await generateWithGemini(prompt);
    
    // 1. Create Paper
    const [paper] = await db.insert(mockExamPapers).values({
      title: testName,
      description: `Comprehensive mock test for ${subjectName}`,
      durationMinutes: 60,
      totalMarks: 40, // 10 questions * 4 marks
      instructions: "Each correct answer awards 4 marks. Each incorrect answer deducts 1 mark.",
      status: "published",
    }).returning();

    // 2. Create Section
    const [section] = await db.insert(mockExamSections).values({
      paperId: paper.id,
      name: subjectName,
      displayOrder: 1,
      questionCount: 10,
      marksCorrect: 4,
      marksIncorrect: -1,
      marksUnanswered: 0,
    }).returning();

    // 3. Insert Questions and Options
    for (let i = 0; i < result.questions.length; i++) {
      const q = result.questions[i];
      const [question] = await db.insert(mockExamQuestions).values({
        subject: subjectName,
        stem: q.stem,
        explanation: q.explanation,
        difficulty: "hard"
      }).returning();

      // Insert Options
      const labels = ['A', 'B', 'C', 'D'];
      for (let j = 0; j < q.options.length; j++) {
        await db.insert(mockExamOptions).values({
          questionId: question.id,
          label: labels[j],
          text: q.options[j],
          isCorrect: j === q.correctIndex
        });
      }

      // Link Question to Paper/Section
      await db.insert(mockExamPaperQuestions).values({
        paperId: paper.id,
        sectionId: section.id,
        questionId: question.id,
        position: i + 1
      });
    }

    console.log(`✅ Successfully created Mock Test: ${testName}`);
  } catch (error: any) {
    console.error(`❌ Failed to create Mock Test: ${testName}`, error.message);
  }
}

async function run() {
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set.");
    process.exit(1);
  }

  await createMockTest("Grand Test 1: Physics", "Physics");
  await new Promise(r => setTimeout(r, 5000));
  await createMockTest("Grand Test 1: Chemistry", "Chemistry");
  await new Promise(r => setTimeout(r, 5000));
  await createMockTest("Grand Test 1: Biology", "Biology");

  console.log("🎉 All Mock Tests generated!");
  process.exit(0);
}

run();
