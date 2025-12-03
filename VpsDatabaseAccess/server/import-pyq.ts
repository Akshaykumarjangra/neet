
import { db } from "./db";
import { contentTopics, questions } from "@shared/schema";
import { neetPYQData, neetExamPattern } from "./neet-pyq-data";

async function importNEETPYQ() {
  console.log("Starting NEET PYQ import...");

  // Create topics for PYQ if not exists
  const pyqTopics = await db.insert(contentTopics).values([
    {
      subject: "Physics",
      classLevel: "NEET PYQ",
      topicName: "Previous Year Questions",
      ncertChapter: "All Chapters",
      referenceBooks: ["NEET 2015-2024 Papers"],
    },
    {
      subject: "Chemistry",
      classLevel: "NEET PYQ",
      topicName: "Previous Year Questions",
      ncertChapter: "All Chapters",
      referenceBooks: ["NEET 2015-2024 Papers"],
    },
    {
      subject: "Botany",
      classLevel: "NEET PYQ",
      topicName: "Previous Year Questions",
      ncertChapter: "All Chapters",
      referenceBooks: ["NEET 2015-2024 Papers"],
    },
    {
      subject: "Zoology",
      classLevel: "NEET PYQ",
      topicName: "Previous Year Questions",
      ncertChapter: "All Chapters",
      referenceBooks: ["NEET 2015-2024 Papers"],
    },
  ]).returning();

  const topicMap = {
    physics: pyqTopics.find(t => t.subject === "Physics")!.id,
    chemistry: pyqTopics.find(t => t.subject === "Chemistry")!.id,
    botany: pyqTopics.find(t => t.subject === "Botany")!.id,
    zoology: pyqTopics.find(t => t.subject === "Zoology")!.id,
  };

  let totalImported = 0;

  // Import questions from each year
  for (const [year, subjects] of Object.entries(neetPYQData)) {
    console.log(`Importing ${year} questions...`);

    for (const [subject, questionsList] of Object.entries(subjects)) {
      const topicId = topicMap[subject as keyof typeof topicMap];
      
      for (const question of questionsList) {
        await db.insert(questions).values({
          topicId,
          questionText: question.questionText!,
          options: question.options!,
          correctAnswer: question.correctAnswer!,
          solutionDetail: question.solutionDetail!,
          solutionSteps: question.solutionSteps || [],
          difficultyLevel: question.difficultyLevel!,
          sourceType: `${question.sourceType} (${year})`,
          relatedTopics: question.relatedTopics || [],
        });
        totalImported++;
      }
    }
  }

  console.log(`✅ Imported ${totalImported} NEET PYQ questions!`);
  process.exit(0);
}

importNEETPYQ().catch((error) => {
  console.error("❌ Error importing PYQ:", error);
  process.exit(1);
});
