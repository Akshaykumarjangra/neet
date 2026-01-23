import { db } from "../db";
import { chapterContent, contentTopics, questions } from "../../shared/schema";
import { and, eq, inArray, sql } from "drizzle-orm";

type QuestionSeed = {
  questionText: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  solutionDetail: string;
  solutionSteps?: string[];
  difficultyLevel: number;
  sourceType: string;
  relatedTopics: string[];
  pyqYear?: number | null;
};

type Concept = {
  title: string;
  description: string;
};

const makeOptions = (a: string, b: string, c: string, d: string) => [
  { id: "A", text: a },
  { id: "B", text: b },
  { id: "C", text: c },
  { id: "D", text: d },
];

const parseConcepts = (value: unknown): Concept[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter(Boolean) as Concept[];
  }
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed.filter(Boolean) as Concept[]) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const buildQuestionsForChapter = (
  chapterTitle: string,
  chapterNumber: number,
  concepts: Concept[],
  conceptPool: Concept[],
) => {
  const relatedTopics = [chapterTitle, `Chapter ${chapterNumber}`];
  const questions: QuestionSeed[] = [];

  const fallbackWrongTitles = [
    "Chemical bonding basics",
    "Newton laws of motion",
    "Thermodynamics overview",
    "Organic reaction types",
  ];

  const fallbackWrongDescriptions = [
    "Study of forces and motion in physics",
    "Periodic trends and atomic structure",
    "Heat transfer and state changes",
    "Functional group reactions in organic chemistry",
  ];

  if (concepts.length > 0) {
    const primary = concepts[0];
    const otherTitles = conceptPool
      .map((concept) => concept.title)
      .filter((title) => title && title !== primary.title);
    const titleOptions = [
      primary.title,
      ...otherTitles.slice(0, 3),
    ];
    while (titleOptions.length < 4) {
      titleOptions.push(fallbackWrongTitles[titleOptions.length - 1]);
    }

    questions.push({
      questionText: `Which concept matches: "${primary.description}"?`,
      options: makeOptions(
        titleOptions[0],
        titleOptions[1],
        titleOptions[2],
        titleOptions[3],
      ),
      correctAnswer: "A",
      solutionDetail: `The description refers to ${primary.title}.`,
      solutionSteps: ["Match the description to the correct concept title."],
      difficultyLevel: 1,
      sourceType: "custom",
      relatedTopics,
    });
  }

  if (concepts.length > 1) {
    const secondary = concepts[1];
    const otherDescriptions = conceptPool
      .map((concept) => concept.description)
      .filter((desc) => desc && desc !== secondary.description);
    const descriptionOptions = [
      secondary.description,
      ...otherDescriptions.slice(0, 3),
    ];
    while (descriptionOptions.length < 4) {
      descriptionOptions.push(
        fallbackWrongDescriptions[descriptionOptions.length - 1],
      );
    }

    questions.push({
      questionText: `Which statement best describes "${secondary.title}"?`,
      options: makeOptions(
        descriptionOptions[0],
        descriptionOptions[1],
        descriptionOptions[2],
        descriptionOptions[3],
      ),
      correctAnswer: "A",
      solutionDetail: `The correct description matches ${secondary.title}.`,
      solutionSteps: ["Identify the option that matches the concept definition."],
      difficultyLevel: 1,
      sourceType: "custom",
      relatedTopics,
    });
  }

  while (questions.length < 2) {
    const fallbackQuestion =
      questions.length === 0
        ? {
            questionText: `The chapter "${chapterTitle}" mainly focuses on:`,
            options: makeOptions(
              `Core concepts and definitions in ${chapterTitle}`,
              fallbackWrongTitles[0],
              fallbackWrongTitles[1],
              fallbackWrongTitles[2],
            ),
            correctAnswer: "A",
            solutionDetail: `The chapter focuses on the core concepts of ${chapterTitle}.`,
          }
        : {
            questionText: `Which option is most closely associated with ${chapterTitle}?`,
            options: makeOptions(
              `Key terms from ${chapterTitle}`,
              fallbackWrongTitles[1],
              fallbackWrongTitles[2],
              fallbackWrongTitles[3],
            ),
            correctAnswer: "A",
            solutionDetail: `The correct option references ${chapterTitle} directly.`,
          };

    questions.push({
      ...fallbackQuestion,
      solutionSteps: ["Eliminate unrelated topics and pick the closest match."],
      difficultyLevel: 1,
      sourceType: "custom",
      relatedTopics,
    });
  }

  return questions.slice(0, 2);
};

async function ensureTopicId(topicName: string, chapterNumber: number, classLevel: string) {
  const existing = await db
    .select({ id: contentTopics.id })
    .from(contentTopics)
    .where(
      and(
        eq(contentTopics.subject, "Biology"),
        eq(contentTopics.classLevel, classLevel),
        eq(contentTopics.topicName, topicName),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    return existing[0].id;
  }

  const inserted = await db
    .insert(contentTopics)
    .values({
      subject: "Biology",
      classLevel,
      topicName,
      ncertChapter: `Chapter ${chapterNumber}`,
      referenceBooks: ["NCERT Biology"],
    })
    .returning({ id: contentTopics.id });

  return inserted[0].id;
}

async function seedBiologyTopicQuestions() {
  console.log("Seeding Biology topics and minimum questions...");

  const chapters = await db
    .select({
      id: chapterContent.id,
      subject: chapterContent.subject,
      classLevel: chapterContent.classLevel,
      chapterNumber: chapterContent.chapterNumber,
      chapterTitle: chapterContent.chapterTitle,
      keyConcepts: chapterContent.keyConcepts,
    })
    .from(chapterContent)
    .where(
      and(
        sql`lower(${chapterContent.subject}) = 'biology'`,
        inArray(chapterContent.classLevel, ["11", "12", "Class 11", "Class 12"]),
      ),
    );

  const conceptPool: Concept[] = [];
  chapters.forEach((chapter) => {
    const concepts = parseConcepts(chapter.keyConcepts);
    concepts.forEach((concept) => {
      if (concept?.title && concept?.description) {
        conceptPool.push({
          title: String(concept.title),
          description: String(concept.description),
        });
      }
    });
  });

  for (const chapter of chapters) {
    const topicId = await ensureTopicId(
      chapter.chapterTitle,
      chapter.chapterNumber,
      chapter.classLevel,
    );

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(questions)
      .where(eq(questions.topicId, topicId));
    const existingCount = Number(countResult[0]?.count ?? 0);

    if (existingCount >= 2) {
      console.log(
        `  Chapter ${chapter.chapterNumber} (${chapter.classLevel}): already has ${existingCount} questions, skipping`,
      );
      continue;
    }

    const concepts = parseConcepts(chapter.keyConcepts);
    const newQuestions = buildQuestionsForChapter(
      chapter.chapterTitle,
      chapter.chapterNumber,
      concepts,
      conceptPool,
    );

    const remaining = Math.max(2 - existingCount, 0);
    const payload = newQuestions.slice(0, remaining).map((question) => ({
      topicId,
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      solutionDetail: question.solutionDetail,
      solutionSteps: question.solutionSteps ?? [],
      difficultyLevel: question.difficultyLevel,
      sourceType: question.sourceType,
      relatedTopics: question.relatedTopics,
      pyqYear: question.pyqYear ?? null,
    }));

    if (payload.length === 0) {
      console.log(
        `  Chapter ${chapter.chapterNumber} (${chapter.classLevel}): no new questions to insert`,
      );
      continue;
    }

    await db.insert(questions).values(payload);
    console.log(
      `  Chapter ${chapter.chapterNumber} (${chapter.classLevel}): inserted ${payload.length} questions`,
    );
  }

  console.log("Biology topic and question seeding completed!");
}

seedBiologyTopicQuestions().catch((error) => {
  console.error("Failed to seed Biology topics/questions:", error);
});
