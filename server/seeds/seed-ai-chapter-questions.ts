#!/usr/bin/env tsx
import "dotenv/config";
import OpenAI from "openai";
import { db } from "../db";
import {
  chapterContent,
  contentTopics,
  mockExamOptions,
  mockExamPaperQuestions,
  mockExamPapers,
  mockExamQuestions,
  mockExamSections,
  mockTestSeries,
  questionTags,
  questions,
} from "@shared/schema";
import { eq, inArray, sql } from "drizzle-orm";

type DifficultyLabel = "easy" | "medium" | "hard";

type ChapterInfo = {
  id: number;
  subject: string;
  classLevel: string;
  classNumber: string;
  chapterNumber: number;
  chapterTitle: string;
  updatedAt: Date;
};

type GeneratedQuestion = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  difficulty: DifficultyLabel;
};

const SUBJECTS = ["Physics", "Chemistry", "Biology", "Botany", "Zoology"] as const;
const QUESTIONS_PER_CHAPTER = 20;
const DIFFICULTY_TARGET = {
  easy: 0.2,
  medium: 0.3,
  hard: 0.5,
};
const MAX_ATTEMPTS = 3;
const RATE_LIMIT_MS = 800;
const DEFAULT_MODEL = "gpt-5";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, " ").replace(/\s+([,.;:?])/g, "$1").trim();

const normalizeQuestionKey = (value: string) =>
  normalizeWhitespace(value).toLowerCase();

const normalizeOptionText = (value: string) =>
  normalizeWhitespace(value.replace(/^[A-D][).:-]\s*/i, ""));

const normalizeClassNumber = (value: string) => {
  const match = value.match(/\d+/);
  return match ? match[0] : "";
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const botanyKeywords = [
  "living world",
  "biological classification",
  "plant kingdom",
  "anatomy of flowering plants",
  "transport in plants",
  "morphology of flowering plants",
  "photosynthesis",
  "plant growth",
  "sexual reproduction in flowering plants",
  "ecosystem",
  "biodiversity",
  "conservation",
  "microbes",
  "biotechnology",
  "mineral nutrition",
  "respiration in plants",
  "organisms and populations",
  "environmental",
  "strategies for enhancement",
  "food production",
];

const zoologyKeywords = [
  "animal kingdom",
  "structural organisation in animals",
  "cell",
  "biomolecules",
  "digestion",
  "breathing",
  "body fluids",
  "circulation",
  "excretion",
  "locomotion",
  "movement",
  "neural",
  "human reproduction",
  "reproductive health",
  "evolution",
  "human health",
  "disease",
  "chemical coordination",
  "cell cycle",
  "cell division",
  "inheritance",
  "variation",
  "molecular basis",
];

const class12ZoologyChapters = new Set([3, 4, 7, 8, 10, 11, 12]);
const class12BotanyChapters = new Set([1, 2, 5, 6, 9, 13, 14, 15, 16]);

const categorizeBiologyChapter = (chapter: ChapterInfo) => {
  if (chapter.classNumber === "12") {
    if (class12ZoologyChapters.has(chapter.chapterNumber)) return "Zoology";
    if (class12BotanyChapters.has(chapter.chapterNumber)) return "Botany";
  }

  const title = chapter.chapterTitle.toLowerCase();
  for (const keyword of botanyKeywords) {
    if (title.includes(keyword)) return "Botany";
  }
  for (const keyword of zoologyKeywords) {
    if (title.includes(keyword)) return "Zoology";
  }
  return chapter.chapterNumber % 2 === 0 ? "Zoology" : "Botany";
};

const parseArgs = () => {
  const args = new Map<string, string>();
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--([^=]+)=(.+)$/);
    if (match) args.set(match[1], match[2]);
  }
  return {
    subject: args.get("subject") || args.get("subjects"),
    classLevel: args.get("class"),
    chapter: args.get("chapter"),
    limit: args.get("limit"),
    model: args.get("model"),
  };
};

const getDifficultyTargets = (total: number) => {
  const easy = Math.round(total * DIFFICULTY_TARGET.easy);
  const medium = Math.round(total * DIFFICULTY_TARGET.medium);
  const hard = total - easy - medium;
  return { easy, medium, hard };
};

const normalizeDifficulty = (value: any): DifficultyLabel | null => {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  if (normalized.startsWith("e")) return "easy";
  if (normalized.startsWith("m")) return "medium";
  if (normalized.startsWith("h")) return "hard";
  return null;
};

const extractCorrectLetter = (value: any): string | null => {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") {
    const trimmed = value.trim().toUpperCase();
    if (["A", "B", "C", "D"].includes(trimmed)) return trimmed;
    const numeric = parseInt(trimmed, 10);
    if (!Number.isNaN(numeric)) {
      if (numeric >= 1 && numeric <= 4) return ["A", "B", "C", "D"][numeric - 1];
      if (numeric >= 0 && numeric <= 3) return ["A", "B", "C", "D"][numeric];
    }
  }
  if (typeof value === "number") {
    if (value >= 1 && value <= 4) return ["A", "B", "C", "D"][value - 1];
    if (value >= 0 && value <= 3) return ["A", "B", "C", "D"][value];
  }
  return null;
};

const normalizeGeneratedQuestion = (raw: any): GeneratedQuestion | null => {
  const questionText =
    raw?.question ||
    raw?.questionText ||
    raw?.stem ||
    raw?.prompt ||
    "";
  const explanation =
    raw?.explanation ||
    raw?.solution ||
    raw?.answerExplanation ||
    "";
  const difficulty = normalizeDifficulty(raw?.difficulty || raw?.level);
  const optionsRaw = raw?.options || raw?.choices || [];
  const options = Array.isArray(optionsRaw)
    ? optionsRaw.map((option: any) =>
        normalizeOptionText(
          typeof option === "string" ? option : option?.text || option?.label || ""
        )
      )
    : [];

  if (!questionText || options.length !== 4 || !explanation || !difficulty) {
    return null;
  }

  const correctLetter = extractCorrectLetter(raw?.correct || raw?.correctAnswer || raw?.answer);
  if (!correctLetter) return null;

  return {
    question: normalizeWhitespace(String(questionText)),
    options,
    correct: correctLetter,
    explanation: normalizeWhitespace(String(explanation)),
    difficulty,
  };
};

const safeParseJson = (content: string) => {
  try {
    return JSON.parse(content);
  } catch (error) {
    const start = content.indexOf("{");
    const end = content.lastIndexOf("}");
    if (start >= 0 && end > start) {
      const slice = content.slice(start, end + 1);
      return JSON.parse(slice);
    }
    throw error;
  }
};

const buildPrompt = (
  chapter: ChapterInfo,
  counts: { easy: number; medium: number; hard: number }
) => {
  const total = counts.easy + counts.medium + counts.hard;
  const biologyHint =
    chapter.subject === "Biology"
      ? `This chapter is categorized as ${categorizeBiologyChapter(
          chapter
        )}. Keep questions strictly within that domain.`
      : "";
  return [
    "You are an expert NEET question writer.",
    `Create ${total} ORIGINAL multiple-choice questions for ${chapter.subject} Class ${chapter.classNumber} Chapter ${chapter.chapterNumber}: "${chapter.chapterTitle}".`,
    "Do not copy or closely paraphrase actual exam questions. Keep questions original and chapter-specific.",
    biologyHint,
    `Difficulty mix: ${counts.easy} easy, ${counts.medium} medium, ${counts.hard} hard.`,
    "Each question must have 4 options and exactly one correct answer.",
    "Use plain ASCII text (no LaTeX). Keep explanations concise and accurate.",
    "",
    "Return JSON with this shape:",
    "{",
    '  "questions": [',
    "    {",
    '      "difficulty": "easy|medium|hard",',
    '      "question": "...",',
    '      "options": ["option A", "option B", "option C", "option D"],',
    '      "correct": "A",',
    '      "explanation": "..."',
    "    }",
    "  ]",
    "}",
    "Return ONLY JSON.",
  ].join("\n");
};

const fetchChapters = async () => {
  const rows = await db
    .select({
      id: chapterContent.id,
      subject: chapterContent.subject,
      classLevel: chapterContent.classLevel,
      chapterNumber: chapterContent.chapterNumber,
      chapterTitle: chapterContent.chapterTitle,
      updatedAt: chapterContent.updatedAt,
    })
    .from(chapterContent)
    .where(inArray(chapterContent.subject, SUBJECTS as unknown as string[]));

  const chapterMap = new Map<string, ChapterInfo>();
  for (const row of rows) {
    const classNumber = normalizeClassNumber(row.classLevel);
    if (!classNumber) continue;
    const key = `${row.subject}|${classNumber}|${row.chapterNumber}`;
    const existing = chapterMap.get(key);
    if (!existing || row.updatedAt > existing.updatedAt) {
      chapterMap.set(key, {
        id: row.id,
        subject: row.subject,
        classLevel: row.classLevel,
        classNumber,
        chapterNumber: row.chapterNumber,
        chapterTitle: row.chapterTitle,
        updatedAt: row.updatedAt,
      });
    }
  }
  return Array.from(chapterMap.values());
};

const resolveTopic = async (chapter: ChapterInfo) => {
  const chapterLabel = `Chapter ${chapter.chapterNumber}`;
  const classCandidates = Array.from(
    new Set([
      chapter.classLevel,
      `Class ${chapter.classNumber}`,
      chapter.classNumber,
    ]).values()
  ).filter(Boolean);

  const classLevelConditions = classCandidates.map(
    (level) => sql`${contentTopics.classLevel} = ${level}`
  );
  const classLevelClause =
    classLevelConditions.length === 1
      ? classLevelConditions[0]
      : sql`(${sql.join(classLevelConditions, sql` OR `)})`;

  const existing = await db
    .select({
      id: contentTopics.id,
      classLevel: contentTopics.classLevel,
      topicName: contentTopics.topicName,
      ncertChapter: contentTopics.ncertChapter,
    })
    .from(contentTopics)
    .where(
      sql`${contentTopics.subject} = ${chapter.subject}
        AND ${classLevelClause}
        AND (${contentTopics.topicName} ILIKE ${chapter.chapterTitle}
          OR ${contentTopics.ncertChapter} ILIKE ${chapterLabel})`
    )
    .limit(1);

  if (existing.length > 0) return existing[0];

  const defaultClassLevel =
    chapter.subject === "Biology" ||
    chapter.subject === "Botany" ||
    chapter.subject === "Zoology"
      ? chapter.classNumber
      : `Class ${chapter.classNumber}`;

  const [created] = await db
    .insert(contentTopics)
    .values({
      subject: chapter.subject,
      classLevel: defaultClassLevel,
      topicName: chapter.chapterTitle,
      ncertChapter: chapterLabel,
    })
    .returning({
      id: contentTopics.id,
      classLevel: contentTopics.classLevel,
      topicName: contentTopics.topicName,
      ncertChapter: contentTopics.ncertChapter,
    });

  return created;
};

const getExistingQuestionState = async (topicId: number) => {
  const rows = await db
    .select({
      questionText: questions.questionText,
      sourceType: questions.sourceType,
    })
    .from(questions)
    .where(eq(questions.topicId, topicId));

  const seen = new Set<string>();
  let aiCount = 0;
  for (const row of rows) {
    seen.add(normalizeQuestionKey(row.questionText));
    if (row.sourceType?.toLowerCase().startsWith("ai generated")) {
      aiCount += 1;
    }
  }
  return { seen, aiCount };
};

const generateQuestions = async (
  chapter: ChapterInfo,
  totalNeeded: number,
  seen: Set<string>,
  model: string
) => {
  const targets = getDifficultyTargets(totalNeeded);
  const collected: GeneratedQuestion[] = [];
  const counts: Record<DifficultyLabel, number> = { easy: 0, medium: 0, hard: 0 };

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const remaining = {
      easy: Math.max(targets.easy - counts.easy, 0),
      medium: Math.max(targets.medium - counts.medium, 0),
      hard: Math.max(targets.hard - counts.hard, 0),
    };
    const remainingTotal = remaining.easy + remaining.medium + remaining.hard;
    if (remainingTotal === 0) break;

    const prompt = buildPrompt(chapter, remaining);
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You generate original NEET-style questions. Output must be valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) continue;
    const parsed = safeParseJson(content);
    const items = Array.isArray(parsed?.questions)
      ? parsed.questions
      : Array.isArray(parsed)
      ? parsed
      : [];

    for (const item of items) {
      if (collected.length >= totalNeeded) break;
      const normalized = normalizeGeneratedQuestion(item);
      if (!normalized) continue;
      const key = normalizeQuestionKey(normalized.question);
      if (seen.has(key)) continue;
      if (counts[normalized.difficulty] >= targets[normalized.difficulty]) continue;
      seen.add(key);
      collected.push(normalized);
      counts[normalized.difficulty] += 1;
    }

    if (attempt < MAX_ATTEMPTS - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  return collected;
};

const buildQuestionTags = (chapter: ChapterInfo, difficulty: DifficultyLabel) => {
  const tags = [
    { tag: chapter.subject.toLowerCase(), category: "subject" },
    { tag: `class-${chapter.classNumber}`, category: "class" },
    { tag: `chapter-${chapter.chapterNumber}`, category: "chapter" },
    { tag: `topic-${slugify(chapter.chapterTitle)}`, category: "topic" },
    { tag: `difficulty-${difficulty}`, category: "difficulty" },
    { tag: "ai-generated", category: "source" },
  ];
  if (chapter.subject === "Biology") {
    tags.push({
      tag: categorizeBiologyChapter(chapter).toLowerCase(),
      category: "subject",
    });
  }
  return tags;
};

const ensureSeries = async (title: string, description: string) => {
  const existing = await db
    .select({ id: mockTestSeries.id })
    .from(mockTestSeries)
    .where(eq(mockTestSeries.title, title))
    .limit(1);
  if (existing.length > 0) return existing[0].id;

  const [created] = await db
    .insert(mockTestSeries)
    .values({
      title,
      description,
      isPublished: true,
    })
    .returning({ id: mockTestSeries.id });
  return created.id;
};

const ensurePaper = async (
  seriesId: number,
  title: string,
  description: string,
  durationMinutes: number,
  totalMarks: number
) => {
  const existing = await db
    .select({ id: mockExamPapers.id })
    .from(mockExamPapers)
    .where(eq(mockExamPapers.title, title))
    .limit(1);
  if (existing.length > 0) return existing[0].id;

  const [created] = await db
    .insert(mockExamPapers)
    .values({
      seriesId,
      title,
      description,
      durationMinutes,
      totalMarks,
      instructions:
        "Attempt all questions. Each correct answer gives 4 marks; each incorrect answer subtracts 1 mark.",
      shuffleQuestions: true,
      shuffleOptions: true,
      attemptsAllowed: 1,
      status: "published",
    })
    .returning({ id: mockExamPapers.id });
  return created.id;
};

const ensureSection = async (
  paperId: number,
  questionCount: number,
  durationMinutes: number
) => {
  const existing = await db
    .select({ id: mockExamSections.id })
    .from(mockExamSections)
    .where(eq(mockExamSections.paperId, paperId))
    .limit(1);
  if (existing.length > 0) return existing[0].id;

  const [created] = await db
    .insert(mockExamSections)
    .values({
      paperId,
      name: "Section A",
      displayOrder: 1,
      questionCount,
      marksCorrect: 4,
      marksIncorrect: -1,
      marksUnanswered: 0,
      durationMinutes,
    })
    .returning({ id: mockExamSections.id });
  return created.id;
};

const main = async () => {
  if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
    console.error("Missing AI_INTEGRATIONS_OPENAI_API_KEY");
    process.exit(1);
  }

  const args = parseArgs();
  const model = args.model || DEFAULT_MODEL;
  let chapters = await fetchChapters();

  if (args.subject) {
    const requested = args.subject
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    chapters = chapters.filter((chapter) => requested.includes(chapter.subject));
  }
  if (args.classLevel) {
    const requested = normalizeClassNumber(args.classLevel);
    chapters = chapters.filter((chapter) => chapter.classNumber === requested);
  }
  if (args.chapter) {
    const chapterNum = parseInt(args.chapter, 10);
    chapters = chapters.filter((chapter) => chapter.chapterNumber === chapterNum);
  }
  if (args.limit) {
    const limit = parseInt(args.limit, 10);
    if (!Number.isNaN(limit) && limit > 0) {
      chapters = chapters.slice(0, limit);
    }
  }

  console.log(`Seeding AI questions for ${chapters.length} chapters (model: ${model})...`);

  for (const chapter of chapters) {
    console.log(
      `\n[${chapter.subject}] Class ${chapter.classNumber} Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`
    );
    const topic = await resolveTopic(chapter);
    const { seen, aiCount } = await getExistingQuestionState(topic.id);
    if (aiCount >= QUESTIONS_PER_CHAPTER) {
      console.log("  Skipping: AI questions already seeded.");
      continue;
    }

    const remaining = QUESTIONS_PER_CHAPTER - aiCount;
    const generated = await generateQuestions(chapter, remaining, seen, model);
    if (generated.length === 0) {
      console.warn("  No valid questions generated; skipping.");
      continue;
    }

    const questionRows = generated.map((item) => ({
      topicId: topic.id,
      questionText: item.question,
      options: item.options.map((text, index) => ({
        id: ["A", "B", "C", "D"][index],
        text,
      })),
      correctAnswer: item.correct,
      solutionDetail: item.explanation,
      solutionSteps: item.explanation
        .split(".")
        .map((step) => step.trim())
        .filter(Boolean)
        .slice(0, 4),
      difficultyLevel: item.difficulty === "easy" ? 1 : item.difficulty === "medium" ? 2 : 3,
      sourceType: "AI Generated",
      relatedTopics: [
        `${chapter.subject} Class ${chapter.classNumber} Chapter ${chapter.chapterNumber}`,
        chapter.chapterTitle,
      ],
    }));

    const insertedQuestions = await db
      .insert(questions)
      .values(questionRows)
      .returning({ id: questions.id, questionText: questions.questionText });

    const questionIdByText = new Map(
      insertedQuestions.map((row) => [normalizeQuestionKey(row.questionText), row.id])
    );

    const tagEntries = [];
    for (const item of generated) {
      const key = normalizeQuestionKey(item.question);
      const questionId = questionIdByText.get(key);
      if (!questionId) continue;
      for (const tag of buildQuestionTags(chapter, item.difficulty)) {
        tagEntries.push({
          questionId,
          tag: tag.tag,
          category: tag.category,
        });
      }
    }
    if (tagEntries.length > 0) {
      await db.insert(questionTags).values(tagEntries).onConflictDoNothing();
    }

    const mockQuestionRows = generated.map((item) => ({
      subject: chapter.subject,
      topic: chapter.chapterTitle,
      difficulty: item.difficulty,
      stem: item.question,
      explanation: item.explanation,
      tags: buildQuestionTags(chapter, item.difficulty).map((tag) => tag.tag),
    }));

    const insertedMockQuestions = await db
      .insert(mockExamQuestions)
      .values(mockQuestionRows)
      .returning({ id: mockExamQuestions.id, stem: mockExamQuestions.stem });

    const mockIdByStem = new Map(
      insertedMockQuestions.map((row) => [normalizeQuestionKey(row.stem), row.id])
    );

    const mockOptions = [];
    for (const item of generated) {
      const questionId = mockIdByStem.get(normalizeQuestionKey(item.question));
      if (!questionId) continue;
      for (let i = 0; i < item.options.length; i += 1) {
        mockOptions.push({
          questionId,
          label: ["A", "B", "C", "D"][i],
          text: item.options[i],
          isCorrect: item.correct === ["A", "B", "C", "D"][i],
        });
      }
    }
    if (mockOptions.length > 0) {
      await db.insert(mockExamOptions).values(mockOptions).onConflictDoNothing();
    }

    const seriesTitle = `AI Chapter Tests - ${chapter.subject} Class ${chapter.classNumber}`;
    const seriesId = await ensureSeries(
      seriesTitle,
      `AI-generated chapter-wise mock tests for ${chapter.subject} Class ${chapter.classNumber}.`
    );

    const paperTitle = `Class ${chapter.classNumber} ${chapter.subject} Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`;
    const paperDescription = `Chapter-wise mock test with ${QUESTIONS_PER_CHAPTER} questions.`;
    const durationMinutes = QUESTIONS_PER_CHAPTER * 2;
    const totalMarks = QUESTIONS_PER_CHAPTER * 4;
    const paperId = await ensurePaper(
      seriesId,
      paperTitle,
      paperDescription,
      durationMinutes,
      totalMarks
    );
    const sectionId = await ensureSection(paperId, QUESTIONS_PER_CHAPTER, durationMinutes);

    const existingPaperQuestions = await db
      .select({ position: mockExamPaperQuestions.position })
      .from(mockExamPaperQuestions)
      .where(eq(mockExamPaperQuestions.paperId, paperId));
    const existingCount = existingPaperQuestions.length;
    const maxPosition = existingPaperQuestions.reduce(
      (max, row) => Math.max(max, row.position),
      0
    );
    const availableSlots = Math.max(QUESTIONS_PER_CHAPTER - existingCount, 0);

    const paperQuestionIds = insertedMockQuestions
      .map((row) => row.id)
      .slice(0, availableSlots);

    if (paperQuestionIds.length > 0) {
      const paperEntries = paperQuestionIds.map((questionId, index) => ({
        paperId,
        sectionId,
        questionId,
        position: maxPosition + index + 1,
      }));
      await db.insert(mockExamPaperQuestions).values(paperEntries).onConflictDoNothing();
    }

    console.log(
      `  Inserted ${insertedQuestions.length} practice questions and ${insertedMockQuestions.length} mock questions.`
    );
  }

  console.log("\nAI chapter question seeding complete.");
};

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
