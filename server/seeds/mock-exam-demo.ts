// @ts-nocheck
import { db } from "../db";
import {
  mockTestSeries,
  mockExamPapers,
  mockExamSections,
  mockExamQuestions,
  mockExamOptions,
  mockExamPaperQuestions,
} from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedMockExamDemo() {
  const [existingPaper] = await db
    .select({ id: mockExamPapers.id })
    .from(mockExamPapers)
    .where(eq(mockExamPapers.title, "NEET Full Test 01 - Demo"))
    .limit(1);

  if (existingPaper) {
    console.log("Mock exam demo already seeded. Skipping.");
    return;
  }

  const [series] = await db
    .insert(mockTestSeries)
    .values({
      title: "NEET Full-Length 2025 Demo",
      description: "Demo series with a single full-length NEET-style paper for QA and UX testing.",
      isPublished: true,
    })
    .returning();

  const [paper] = await db
    .insert(mockExamPapers)
    .values({
      seriesId: series?.id,
      title: "NEET Full Test 01 - Demo",
      description: "Full-length NEET simulation with Physics, Chemistry, and Biology sections.",
      durationMinutes: 200,
      totalMarks: 12,
      instructions: "Follow NEET rules. Negative marking: -1 for incorrect; 0 for unanswered.",
      shuffleQuestions: true,
      shuffleOptions: true,
      attemptsAllowed: 1,
      status: "published",
    })
    .returning();

  const sections = await db
    .insert(mockExamSections)
    .values([
      {
        paperId: paper.id,
        name: "Physics",
        displayOrder: 1,
        questionCount: 1,
        marksCorrect: 4,
        marksIncorrect: -1,
        marksUnanswered: 0,
        durationMinutes: 60,
        instructions: "Solve and mark the best option.",
      },
      {
        paperId: paper.id,
        name: "Chemistry",
        displayOrder: 2,
        questionCount: 1,
        marksCorrect: 4,
        marksIncorrect: -1,
        marksUnanswered: 0,
        durationMinutes: 60,
      },
      {
        paperId: paper.id,
        name: "Biology",
        displayOrder: 3,
        questionCount: 1,
        marksCorrect: 4,
        marksIncorrect: -1,
        marksUnanswered: 0,
        durationMinutes: 80,
      },
    ])
    .returning();

  const sectionByName = Object.fromEntries(sections.map((section) => [section.name, section]));

  const questions = await db
    .insert(mockExamQuestions)
    .values([
      {
        subject: "Physics",
        topic: "Kinematics",
        difficulty: "medium",
        stem: "A particle moves along a straight line with constant acceleration. If its velocity changes from 10 m/s to 30 m/s in 10 seconds, what is the displacement during this time?",
        explanation: "Use s = ut + 0.5at^2 with a = (v - u) / t = 2 m/s^2.",
        tags: ["neet", "motion", "class11"],
      },
      {
        subject: "Chemistry",
        topic: "Acid-Base Reactions",
        difficulty: "easy",
        stem: "Which gas is released when dilute HCl reacts with sodium bicarbonate (NaHCO₃)?",
        explanation: "Acid reacts with bicarbonate to release CO₂, salt, and water.",
        tags: ["neet", "class10", "general-chemistry"],
      },
      {
        subject: "Biology",
        topic: "Cell Structure",
        difficulty: "easy",
        stem: "Which cell organelle contains its own DNA and is often called the powerhouse of the cell?",
        explanation: "Mitochondria contain circular DNA and generate ATP.",
        tags: ["neet", "class11", "cell-biology"],
      },
    ])
    .returning();

  const optionsPayload = [
    {
      question: questions[0],
      options: [
        { label: "A", text: "100 m", isCorrect: false },
        { label: "B", text: "200 m", isCorrect: false },
        { label: "C", text: "250 m", isCorrect: true },
        { label: "D", text: "300 m", isCorrect: false },
      ],
    },
    {
      question: questions[1],
      options: [
        { label: "A", text: "Hydrogen", isCorrect: false },
        { label: "B", text: "Carbon dioxide", isCorrect: true },
        { label: "C", text: "Nitrogen", isCorrect: false },
        { label: "D", text: "Oxygen", isCorrect: false },
      ],
    },
    {
      question: questions[2],
      options: [
        { label: "A", text: "Golgi apparatus", isCorrect: false },
        { label: "B", text: "Mitochondria", isCorrect: true },
        { label: "C", text: "Endoplasmic reticulum", isCorrect: false },
        { label: "D", text: "Lysosome", isCorrect: false },
      ],
    },
  ];

  const paperQuestionValues: any[] = [];

  for (const payload of optionsPayload) {
    const insertedOptions = await db
      .insert(mockExamOptions)
      .values(
        payload.options.map((opt) => ({
          questionId: payload.question.id,
          label: opt.label,
          text: opt.text,
          isCorrect: !!opt.isCorrect,
        }))
      )
      .returning();

    const sectionId =
      payload.question.subject === "Physics"
        ? sectionByName["Physics"].id
        : payload.question.subject === "Chemistry"
        ? sectionByName["Chemistry"].id
        : sectionByName["Biology"].id;

    paperQuestionValues.push({
      paperId: paper.id,
      sectionId,
      questionId: payload.question.id,
      position: paperQuestionValues.length + 1,
    });

    console.log(
      `Inserted question ${payload.question.id} with options:`,
      insertedOptions.map((o) => `${o.label}${o.isCorrect ? "*" : ""}`).join(", ")
    );
  }

  await db.insert(mockExamPaperQuestions).values(paperQuestionValues);

  console.log("Seeded mock exam demo with paper ID:", paper.id);
}

seedMockExamDemo()
  .then(() => {
    console.log("Mock exam demo seed completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Mock exam demo seed failed:", error);
    process.exit(1);
  });
