import { db } from "../db";
import { contentTopics, questions, questionTags } from "../../shared/schema";
import { eq } from "drizzle-orm";

type TagEntry = {
  questionId: number;
  tag: string;
  category: string;
};

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

const normalizeClassLevel = (value?: string | null) => {
  if (!value) return null;
  const match = String(value).match(/\d+/);
  return match ? match[0] : null;
};

const extractChapterNumber = (value?: string | null) => {
  if (!value) return null;
  const match = String(value).match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : null;
};

const classifyBiologySection = (title: string, chapterNumber?: number | null) => {
  const normalized = title.toLowerCase();
  if (botanyKeywords.some((keyword) => normalized.includes(keyword))) {
    return "botany";
  }
  if (zoologyKeywords.some((keyword) => normalized.includes(keyword))) {
    return "zoology";
  }
  if (chapterNumber) {
    return chapterNumber % 2 === 0 ? "zoology" : "botany";
  }
  return null;
};

const toTagEntries = (row: {
  id: number;
  difficultyLevel: number;
  sourceType: string;
  pyqYear: number | null;
  subject: string;
  classLevel: string;
  topicName: string;
  ncertChapter: string | null;
}) => {
  const entries: TagEntry[] = [];
  const seen = new Set<string>();

  const addTag = (tag: string, category: string) => {
    if (!tag) return;
    const key = `${tag}::${category}`;
    if (seen.has(key)) return;
    seen.add(key);
    entries.push({ questionId: row.id, tag, category });
  };

  const subject = (row.subject || "").trim();
  if (subject) {
    addTag(`subject:${subject}`, "subject");
  }

  const classLevel = normalizeClassLevel(row.classLevel);
  if (classLevel) {
    addTag(`class:${classLevel}`, "class");
  }

  const chapterNumber = extractChapterNumber(row.ncertChapter);
  if (chapterNumber) {
    addTag(`chapter:${chapterNumber}`, "chapter");
  }

  if (row.difficultyLevel) {
    addTag(`difficulty:${row.difficultyLevel}`, "difficulty");
  }

  const sourceType = (row.sourceType || "").toLowerCase();
  if (sourceType) {
    addTag(`source:${sourceType}`, "source");
  }

  if (sourceType === "pyq" || row.pyqYear) {
    addTag("pyq", "source");
    if (row.pyqYear) {
      addTag(`pyq:${row.pyqYear}`, "source");
    }
  }

  if (subject.toLowerCase() === "biology") {
    const section = classifyBiologySection(row.topicName, chapterNumber);
    if (section) {
      addTag(section, "section");
    }
  }

  return entries;
};

async function seedQuestionTagsBaseline() {
  console.log("Seeding baseline question tags...");

  const rows = await db
    .select({
      id: questions.id,
      difficultyLevel: questions.difficultyLevel,
      sourceType: questions.sourceType,
      pyqYear: questions.pyqYear,
      subject: contentTopics.subject,
      classLevel: contentTopics.classLevel,
      topicName: contentTopics.topicName,
      ncertChapter: contentTopics.ncertChapter,
    })
    .from(questions)
    .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id));

  const entries = rows.flatMap((row) => toTagEntries(row));

  if (entries.length === 0) {
    console.log("No tags to insert.");
    return;
  }

  const chunkSize = 500;
  for (let i = 0; i < entries.length; i += chunkSize) {
    const chunk = entries.slice(i, i + chunkSize);
    await db.insert(questionTags).values(chunk).onConflictDoNothing();
    console.log(`  Inserted ${Math.min(i + chunkSize, entries.length)} / ${entries.length} tags`);
  }

  console.log("Baseline question tags seeding completed!");
}

seedQuestionTagsBaseline().catch((error) => {
  console.error("Failed to seed question tags:", error);
});
