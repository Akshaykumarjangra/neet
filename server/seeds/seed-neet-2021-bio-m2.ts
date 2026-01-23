import { readFileSync } from "fs";
import {
  contentTopics,
  mockExamOptions,
  mockExamPaperQuestions,
  mockExamPapers,
  mockExamQuestions,
  mockExamSections,
  mockTestSeries,
  questionTags,
  questions,
} from "../../shared/schema";
import { db } from "../db";
import { and, eq } from "drizzle-orm";

type ParsedQuestion = {
  number: number;
  text: string;
  options: string[];
  answer: number;
  section: "Botany" | "Zoology";
};

type ChapterMapping = {
  topicName: string;
  classLevel: "11" | "12";
  chapterNumber: number;
};

const questionChapterMap: Record<number, ChapterMapping> = {
  101: { topicName: "Organisms and Populations", classLevel: "12", chapterNumber: 13 },
  102: { topicName: "Anatomy of Flowering Plants", classLevel: "11", chapterNumber: 6 },
  103: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  104: { topicName: "Transport in Plants", classLevel: "11", chapterNumber: 11 },
  105: { topicName: "Sexual Reproduction in Flowering Plants", classLevel: "12", chapterNumber: 2 },
  106: { topicName: "Cell Cycle and Cell Division", classLevel: "11", chapterNumber: 10 },
  107: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  108: { topicName: "Plant Kingdom", classLevel: "11", chapterNumber: 3 },
  109: { topicName: "Principles of Inheritance and Variation", classLevel: "12", chapterNumber: 5 },
  110: { topicName: "Evolution", classLevel: "12", chapterNumber: 7 },
  111: { topicName: "Plant Kingdom", classLevel: "11", chapterNumber: 3 },
  112: { topicName: "Plant Growth and Development", classLevel: "11", chapterNumber: 15 },
  113: { topicName: "Biomolecules", classLevel: "11", chapterNumber: 9 },
  114: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  115: { topicName: "Cell Cycle and Cell Division", classLevel: "11", chapterNumber: 10 },
  116: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  117: { topicName: "Plant Growth and Development", classLevel: "11", chapterNumber: 15 },
  118: { topicName: "Biotechnology and Its Applications", classLevel: "12", chapterNumber: 12 },
  119: { topicName: "Plant Kingdom", classLevel: "11", chapterNumber: 3 },
  120: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  121: { topicName: "Cell - The Unit of Life", classLevel: "11", chapterNumber: 8 },
  122: { topicName: "Morphology of Flowering Plants", classLevel: "11", chapterNumber: 5 },
  123: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  124: { topicName: "Organisms and Populations", classLevel: "12", chapterNumber: 13 },
  125: { topicName: "Anatomy of Flowering Plants", classLevel: "11", chapterNumber: 6 },
  126: { topicName: "Sexual Reproduction in Flowering Plants", classLevel: "12", chapterNumber: 2 },
  127: { topicName: "Plant Kingdom", classLevel: "11", chapterNumber: 3 },
  128: { topicName: "Plant Growth and Development", classLevel: "11", chapterNumber: 15 },
  129: { topicName: "Ecosystem", classLevel: "12", chapterNumber: 14 },
  130: { topicName: "Strategies for Enhancement in Food Production", classLevel: "12", chapterNumber: 9 },
  131: { topicName: "Ecosystem", classLevel: "12", chapterNumber: 14 },
  132: { topicName: "Ecosystem", classLevel: "12", chapterNumber: 14 },
  133: { topicName: "Plant Kingdom", classLevel: "11", chapterNumber: 3 },
  134: { topicName: "Photosynthesis in Higher Plants", classLevel: "11", chapterNumber: 13 },
  135: { topicName: "Anatomy of Flowering Plants", classLevel: "11", chapterNumber: 6 },
  136: { topicName: "Respiration in Plants", classLevel: "11", chapterNumber: 14 },
  137: { topicName: "Morphology of Flowering Plants", classLevel: "11", chapterNumber: 5 },
  138: { topicName: "Cell Cycle and Cell Division", classLevel: "11", chapterNumber: 10 },
  139: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  140: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  141: { topicName: "Biotechnology and Its Applications", classLevel: "12", chapterNumber: 12 },
  142: { topicName: "Organisms and Populations", classLevel: "12", chapterNumber: 13 },
  143: { topicName: "Anatomy of Flowering Plants", classLevel: "11", chapterNumber: 6 },
  144: { topicName: "Sexual Reproduction in Flowering Plants", classLevel: "12", chapterNumber: 2 },
  145: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  146: { topicName: "Photosynthesis in Higher Plants", classLevel: "11", chapterNumber: 13 },
  147: { topicName: "Reproduction in Organisms", classLevel: "12", chapterNumber: 1 },
  148: { topicName: "Biomolecules", classLevel: "11", chapterNumber: 9 },
  149: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  150: { topicName: "Microbes in Human Welfare", classLevel: "12", chapterNumber: 10 },
  151: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  152: { topicName: "Cell Cycle and Cell Division", classLevel: "11", chapterNumber: 10 },
  153: { topicName: "Animal Kingdom", classLevel: "11", chapterNumber: 4 },
  154: { topicName: "Digestion and Absorption", classLevel: "11", chapterNumber: 16 },
  155: { topicName: "Biotechnology and Its Applications", classLevel: "12", chapterNumber: 12 },
  156: { topicName: "Body Fluids and Circulation", classLevel: "11", chapterNumber: 18 },
  157: { topicName: "Principles of Inheritance and Variation", classLevel: "12", chapterNumber: 5 },
  158: { topicName: "Body Fluids and Circulation", classLevel: "11", chapterNumber: 18 },
  159: { topicName: "Breathing and Exchange of Gases", classLevel: "11", chapterNumber: 17 },
  160: { topicName: "Human Health and Disease", classLevel: "12", chapterNumber: 8 },
  161: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  162: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  163: { topicName: "Reproductive Health", classLevel: "12", chapterNumber: 4 },
  164: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  165: { topicName: "Microbes in Human Welfare", classLevel: "12", chapterNumber: 10 },
  166: { topicName: "Animal Kingdom", classLevel: "11", chapterNumber: 4 },
  167: { topicName: "Human Reproduction", classLevel: "12", chapterNumber: 3 },
  168: { topicName: "Animal Kingdom", classLevel: "11", chapterNumber: 4 },
  169: { topicName: "Excretory Products and their Elimination", classLevel: "11", chapterNumber: 19 },
  170: { topicName: "Reproductive Health", classLevel: "12", chapterNumber: 4 },
  171: { topicName: "Structural Organisation in Animals", classLevel: "11", chapterNumber: 7 },
  172: { topicName: "Animal Kingdom", classLevel: "11", chapterNumber: 4 },
  173: { topicName: "Animal Kingdom", classLevel: "11", chapterNumber: 4 },
  174: { topicName: "Cell Cycle and Cell Division", classLevel: "11", chapterNumber: 10 },
  175: { topicName: "Biotechnology: Principles and Processes", classLevel: "12", chapterNumber: 11 },
  176: { topicName: "Strategies for Enhancement in Food Production", classLevel: "12", chapterNumber: 9 },
  177: { topicName: "Environmental Issues", classLevel: "12", chapterNumber: 16 },
  178: { topicName: "Digestion and Absorption", classLevel: "11", chapterNumber: 16 },
  179: { topicName: "Breathing and Exchange of Gases", classLevel: "11", chapterNumber: 17 },
  180: { topicName: "Biomolecules", classLevel: "11", chapterNumber: 9 },
  181: { topicName: "Locomotion and Movement", classLevel: "11", chapterNumber: 20 },
  182: { topicName: "Biotechnology and Its Applications", classLevel: "12", chapterNumber: 12 },
  183: { topicName: "Reproductive Health", classLevel: "12", chapterNumber: 4 },
  184: { topicName: "Cell - The Unit of Life", classLevel: "11", chapterNumber: 8 },
  185: { topicName: "Cell Cycle and Cell Division", classLevel: "11", chapterNumber: 10 },
  186: { topicName: "Human Reproduction", classLevel: "12", chapterNumber: 3 },
  187: { topicName: "Strategies for Enhancement in Food Production", classLevel: "12", chapterNumber: 9 },
  188: { topicName: "Organisms and Populations", classLevel: "12", chapterNumber: 13 },
  189: { topicName: "Breathing and Exchange of Gases", classLevel: "11", chapterNumber: 17 },
  190: { topicName: "Biomolecules", classLevel: "11", chapterNumber: 9 },
  191: { topicName: "Locomotion and Movement", classLevel: "11", chapterNumber: 20 },
  192: { topicName: "Cell - The Unit of Life", classLevel: "11", chapterNumber: 8 },
  193: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  194: { topicName: "Human Reproduction", classLevel: "12", chapterNumber: 3 },
  195: { topicName: "Structural Organisation in Animals", classLevel: "11", chapterNumber: 7 },
  196: { topicName: "Molecular Basis of Inheritance", classLevel: "12", chapterNumber: 6 },
  197: { topicName: "Locomotion and Movement", classLevel: "11", chapterNumber: 20 },
  198: { topicName: "Human Health and Disease", classLevel: "12", chapterNumber: 8 },
  199: { topicName: "Evolution", classLevel: "12", chapterNumber: 7 },
  200: { topicName: "Human Health and Disease", classLevel: "12", chapterNumber: 8 },
};

const HEADER_PHRASES = [
  "FINAL NEET(UG)-2021 EXAMINATION (Held On Sunday 12 th SEPTEMBER, 2021) BOTANY TEST PAPER WITH ANSWER",
  "FINAL NEET(UG)-2021 EXAMINATION (Held On Sunday 12 th SEPTEMBER, 2021) ZOOLOGY TEST PAPER WITH ANSWER",
  "Final NEET(UG)-2021 Exam/12-09-2021",
  "FINAL NEET(UG)-2021 Exam/12-09-2021",
  "BOTANY TEST PAPER WITH ANSWER",
  "ZOOLOGY TEST PAPER WITH ANSWER",
  "CODE - M2",
  "Section-A (Biology : Botany)",
  "Section-B (Biology : Botany)",
  "Section - A (Biology : Zoology)",
  "Section - B (Biology : Zoology)",
  "Section - B (Biology : Zoology)",
];

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, " ").replace(/\s+([,.;:?])/g, "$1").trim();

const stripHeaders = (value: string) => {
  let cleaned = value;
  for (const phrase of HEADER_PHRASES) {
    cleaned = cleaned.split(phrase).join(" ");
  }
  return normalizeWhitespace(cleaned);
};

const extractOptions = (block: string) => {
  const markers = Array.from(block.matchAll(/\((1|2|3|4)\)/g)).map((match) => ({
    num: Number(match[1]),
    index: match.index ?? 0,
    len: match[0].length,
  }));
  if (markers.length < 4) {
    return null;
  }

  for (let i = markers.length - 1; i >= 0; i -= 1) {
    if (markers[i].num !== 1) continue;
    let idx2 = -1;
    let idx3 = -1;
    let idx4 = -1;
    for (let j = i + 1; j < markers.length; j += 1) {
      if (markers[j].num === 2) {
        idx2 = j;
        break;
      }
    }
    for (let j = idx2 + 1; j < markers.length && idx2 !== -1; j += 1) {
      if (markers[j].num === 3) {
        idx3 = j;
        break;
      }
    }
    for (let j = idx3 + 1; j < markers.length && idx3 !== -1; j += 1) {
      if (markers[j].num === 4) {
        idx4 = j;
        break;
      }
    }
    if (idx2 !== -1 && idx3 !== -1 && idx4 !== -1) {
      return { markers, indices: [i, idx2, idx3, idx4] as const };
    }
  }
  return null;
};

const parseQuestions = (raw: string): ParsedQuestion[] => {
  const text = raw.replace(/\r\n/g, "\n");
  const matches = Array.from(text.matchAll(/\b(\d{3})\.\s/g));
  const parsed: ParsedQuestion[] = [];

  for (let i = 0; i < matches.length; i += 1) {
    const number = Number(matches[i][1]);
    const start = matches[i].index ?? 0;
    const end = i + 1 < matches.length ? matches[i + 1].index ?? text.length : text.length;
    let block = text.slice(start, end).trim();

    const answerMatch = block.match(/Ans\.\s*\((\d)\)/i);
    if (!answerMatch) {
      console.warn(`Missing answer for question ${number}. Skipping.`);
      continue;
    }
    const answer = Number(answerMatch[1]);
    block = block.slice(0, answerMatch.index ?? block.length).trim();

    const optionData = extractOptions(block);
    if (!optionData) {
      console.warn(`Missing options for question ${number}. Skipping.`);
      continue;
    }

    const [idx1, idx2, idx3, idx4] = optionData.indices;
    const m1 = optionData.markers[idx1];
    const m2 = optionData.markers[idx2];
    const m3 = optionData.markers[idx3];
    const m4 = optionData.markers[idx4];

    const option1 = block.slice(m1.index + m1.len, m2.index).trim();
    const option2 = block.slice(m2.index + m2.len, m3.index).trim();
    const option3 = block.slice(m3.index + m3.len, m4.index).trim();
    const option4 = block.slice(m4.index + m4.len).trim();

    const numberPrefix = `${number}.`;
    const stemStart = block.indexOf(numberPrefix);
    const stemRaw =
      stemStart === -1 ? block.slice(0, m1.index) : block.slice(stemStart + numberPrefix.length, m1.index);
    const stem = stripHeaders(stemRaw);

    parsed.push({
      number,
      text: stem,
      options: [option1, option2, option3, option4].map(stripHeaders),
      answer,
      section: number <= 150 ? "Botany" : "Zoology",
    });
  }

  return parsed;
};

const optionLetters = ["A", "B", "C", "D"];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getSectionTag = (number: number) => {
  if (number <= 135) return "section-a";
  if (number <= 150) return "section-b";
  if (number <= 185) return "section-a";
  return "section-b";
};

const ensureSeries = async (title: string, description: string) => {
  const [existing] = await db
    .select({ id: mockTestSeries.id })
    .from(mockTestSeries)
    .where(eq(mockTestSeries.title, title))
    .limit(1);
  if (existing) return existing.id;

  const [created] = await db
    .insert(mockTestSeries)
    .values({ title, description, isPublished: true })
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
  const [existing] = await db
    .select({ id: mockExamPapers.id })
    .from(mockExamPapers)
    .where(eq(mockExamPapers.title, title))
    .limit(1);
  if (existing) return existing.id;

  const [created] = await db
    .insert(mockExamPapers)
    .values({
      seriesId,
      title,
      description,
      durationMinutes,
      totalMarks,
      instructions: "NEET format. +4 for correct, -1 for incorrect, 0 for unattempted.",
      shuffleQuestions: true,
      shuffleOptions: true,
      attemptsAllowed: 1,
      status: "published",
    })
    .returning({ id: mockExamPapers.id });
  return created.id;
};

const ensureSections = async (paperId: number, counts: { Botany: number; Zoology: number }) => {
  const existing = await db
    .select({ id: mockExamSections.id, name: mockExamSections.name })
    .from(mockExamSections)
    .where(eq(mockExamSections.paperId, paperId));

  const byName = new Map(existing.map((section) => [section.name, section.id]));
  if (!byName.has("Botany")) {
    const [created] = await db
      .insert(mockExamSections)
      .values({
        paperId,
        name: "Botany",
        displayOrder: 1,
        questionCount: counts.Botany,
        marksCorrect: 4,
        marksIncorrect: -1,
        marksUnanswered: 0,
        durationMinutes: Math.round((counts.Botany / (counts.Botany + counts.Zoology)) * 180),
      })
      .returning({ id: mockExamSections.id });
    byName.set("Botany", created.id);
  }
  if (!byName.has("Zoology")) {
    const [created] = await db
      .insert(mockExamSections)
      .values({
        paperId,
        name: "Zoology",
        displayOrder: 2,
        questionCount: counts.Zoology,
        marksCorrect: 4,
        marksIncorrect: -1,
        marksUnanswered: 0,
        durationMinutes: Math.round((counts.Zoology / (counts.Botany + counts.Zoology)) * 180),
      })
      .returning({ id: mockExamSections.id });
    byName.set("Zoology", created.id);
  }
  return byName;
};

const seed = async () => {
  const rawText = readFileSync(
    new URL("./data/neet-2021-bio-m2.txt", import.meta.url),
    "utf8"
  );
  const parsedQuestions = parseQuestions(rawText);

  if (parsedQuestions.length === 0) {
    throw new Error("No questions parsed. Check the raw data file.");
  }

  const topicRows = await db
    .select({ id: contentTopics.id, classLevel: contentTopics.classLevel, topicName: contentTopics.topicName })
    .from(contentTopics)
    .where(eq(contentTopics.subject, "Biology"));

  const topicMap = new Map(
    topicRows.map((row) => [`${row.classLevel}|${row.topicName}`, row.id])
  );

  const mockQuestionIds = new Map<number, number>();
  let practiceInserted = 0;

  for (const question of parsedQuestions) {
    const mapping = questionChapterMap[question.number];
    if (!mapping) {
      console.warn(`No chapter mapping for question ${question.number}. Skipping.`);
      continue;
    }

    const topicKey = `${mapping.classLevel}|${mapping.topicName}`;
    const topicId = topicMap.get(topicKey);
    if (!topicId) {
      console.warn(`Missing topic ID for ${topicKey}. Skipping question ${question.number}.`);
      continue;
    }

    const correctAnswer = optionLetters[question.answer - 1];
    const solutionDetail = `Answer key: option ${correctAnswer}.`;

    const optionPayload = question.options.map((text, index) => ({
      id: optionLetters[index],
      text,
    }));

    const existingPractice = await db
      .select({ id: questions.id, options: questions.options })
      .from(questions)
      .where(eq(questions.questionText, question.text));

    const matchingPractice = existingPractice.find(
      (row) => JSON.stringify(row.options) === JSON.stringify(optionPayload)
    );

    let practiceId = matchingPractice?.id;
    if (!practiceId) {
      const [created] = await db
        .insert(questions)
        .values({
          topicId,
          questionText: question.text,
          options: optionPayload,
          correctAnswer,
          solutionDetail,
          solutionSteps: [],
          difficultyLevel: 2,
          sourceType: "neet_pyq",
          relatedTopics: [mapping.topicName, `Chapter ${mapping.chapterNumber}`],
          pyqYear: 2021,
        })
        .returning({ id: questions.id });

      practiceId = created.id;
      practiceInserted += 1;
    }

    if (practiceId) {
      const tagRows = [
        { tag: "neet-2021", category: "year" },
        { tag: "pyq", category: "source" },
        { tag: "code-m2", category: "paper" },
        { tag: question.section.toLowerCase(), category: "subject" },
        { tag: getSectionTag(question.number), category: "section" },
        { tag: `class-${mapping.classLevel}`, category: "class" },
        { tag: `chapter-${mapping.chapterNumber}`, category: "chapter" },
        { tag: `topic-${slugify(mapping.topicName)}`, category: "topic" },
      ].map((tag) => ({ ...tag, questionId: practiceId as number }));

      await db.insert(questionTags).values(tagRows).onConflictDoNothing();
    }

    const existingMock = await db
      .select({ id: mockExamQuestions.id })
      .from(mockExamQuestions)
      .where(eq(mockExamQuestions.stem, question.text));

    const optionKey = JSON.stringify(
      optionPayload.map((opt) => ({
        label: opt.id,
        text: opt.text,
        isCorrect: opt.id === correctAnswer,
      }))
    );

    let mockId: number | undefined;
    for (const candidate of existingMock) {
      const existingOptions = await db
        .select({
          label: mockExamOptions.label,
          text: mockExamOptions.text,
          isCorrect: mockExamOptions.isCorrect,
        })
        .from(mockExamOptions)
        .where(eq(mockExamOptions.questionId, candidate.id));

      const normalized = JSON.stringify(
        existingOptions
          .slice()
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((opt) => ({ label: opt.label, text: opt.text, isCorrect: opt.isCorrect }))
      );

      if (normalized === optionKey) {
        mockId = candidate.id;
        break;
      }
    }
    if (!mockId) {
      const [created] = await db
        .insert(mockExamQuestions)
        .values({
          subject: "Biology",
          topic: mapping.topicName,
          subtopic: question.section,
          difficulty: "medium",
          stem: question.text,
          explanation: solutionDetail,
          tags: [
            "neet-2021",
            "pyq",
            "code-m2",
            question.section.toLowerCase(),
            getSectionTag(question.number),
            `chapter-${mapping.chapterNumber}`,
          ],
          sourceYear: 2021,
        })
        .returning({ id: mockExamQuestions.id });

      mockId = created.id;

      await db.insert(mockExamOptions).values(
        question.options.map((text, index) => ({
          questionId: mockId,
          label: optionLetters[index],
          text,
          isCorrect: optionLetters[index] === correctAnswer,
        }))
      );
    }

    if (mockId) {
      mockQuestionIds.set(question.number, mockId);
    }
  }

  const seriesId = await ensureSeries(
    "NEET 2021 Biology PYQ",
    "NEET 2021 Biology previous year questions, code M2 (Botany + Zoology)."
  );

  const botanyNumbers = parsedQuestions.filter((q) => q.section === "Botany").map((q) => q.number);
  const zoologyNumbers = parsedQuestions.filter((q) => q.section === "Zoology").map((q) => q.number);

  const weeklyNumbers = [...botanyNumbers.slice(0, 20), ...zoologyNumbers.slice(0, 20)];
  const monthlyNumbers = [...botanyNumbers, ...zoologyNumbers];

  const papers = [
    {
      title: "NEET 2021 Biology M2 - Full Mock",
      description: "Full-length Biology PYQ mock (Botany + Zoology).",
      numbers: monthlyNumbers,
      durationMinutes: 200,
      totalMarks: monthlyNumbers.length * 4,
    },
    {
      title: "NEET 2021 Biology Weekly Test 01",
      description: "Weekly Biology test (20 Botany + 20 Zoology).",
      numbers: weeklyNumbers,
      durationMinutes: 80,
      totalMarks: weeklyNumbers.length * 4,
    },
    {
      title: "NEET 2021 Biology Monthly Test 01",
      description: "Monthly Biology test (Botany + Zoology).",
      numbers: monthlyNumbers,
      durationMinutes: 200,
      totalMarks: monthlyNumbers.length * 4,
    },
  ];

  for (const paper of papers) {
    const paperId = await ensurePaper(
      seriesId,
      paper.title,
      paper.description,
      paper.durationMinutes,
      paper.totalMarks
    );

    const counts = {
      Botany: paper.numbers.filter((num) => num <= 150).length,
      Zoology: paper.numbers.filter((num) => num > 150).length,
    };

    const sections = await ensureSections(paperId, counts);
    const existingLinks = await db
      .select({
        questionId: mockExamPaperQuestions.questionId,
        position: mockExamPaperQuestions.position,
      })
      .from(mockExamPaperQuestions)
      .where(eq(mockExamPaperQuestions.paperId, paperId));
    const existingIds = new Set(existingLinks.map((row) => row.questionId));
    const maxPosition = existingLinks.reduce(
      (max, row) => (row.position > max ? row.position : max),
      0
    );

    let position = maxPosition + 1;
    for (const number of paper.numbers) {
      const mockId = mockQuestionIds.get(number);
      if (!mockId || existingIds.has(mockId)) continue;

      const sectionId = number <= 150 ? sections.get("Botany") : sections.get("Zoology");
      if (!sectionId) continue;

      await db.insert(mockExamPaperQuestions).values({
        paperId,
        sectionId,
        questionId: mockId,
        position,
      });
      existingIds.add(mockId);
      position += 1;
    }
  }

  console.log(
    `Seeded NEET 2021 M2 Biology questions. Practice inserts: ${practiceInserted}. Mock questions: ${mockQuestionIds.size}.`
  );
};

seed()
  .then(() => {
    console.log("NEET 2021 M2 Biology seed completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("NEET 2021 M2 Biology seed failed:", error);
    process.exit(1);
  });
