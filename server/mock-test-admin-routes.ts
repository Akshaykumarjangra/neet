// @ts-nocheck
import { Router } from "express";
import { db } from "./db";
import {
  mockExamQuestions,
  mockExamOptions,
  auditLogs,
} from "@shared/schema";
import { and, eq, inArray } from "drizzle-orm";
import { requireAuthWithPasswordCheck, requireOwner, getCurrentUser } from "./auth";

const router = Router();

router.use(requireAuthWithPasswordCheck);
router.use(requireOwner);

async function recordAuditLog(req: any, details: {
  action: string;
  entityType: string;
  entityId?: string | number | null;
  oldValue?: any;
  newValue?: any;
}) {
  try {
    await db.insert(auditLogs).values({
      userId: req.session?.userId || null,
      action: details.action,
      entityType: details.entityType,
      entityId: details.entityId ? String(details.entityId) : null,
      oldValue: details.oldValue ?? null,
      newValue: details.newValue ?? null,
      ipAddress: (req.ip || "").slice(0, 45),
      userAgent: req.get?.("user-agent"),
    });
  } catch (error) {
    console.error("Failed to record audit log:", error);
  }
}

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

function normalizeHeader(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function parseDelimited(data: string, delimiter: string) {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < data.length; i += 1) {
    const char = data[i];
    const next = data[i + 1];

    if (char === "\"") {
      if (inQuotes && next === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      row.push(current);
      current = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(current);
      current = "";
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    current += char;
  }

  row.push(current);
  if (row.some((cell) => cell.trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

function splitTags(value: string | undefined) {
  if (!value) return [];
  return String(value)
    .split(/[|;,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function parseCsvRows(rows: string[][]) {
  if (!rows.length) return [];
  const headerRow = rows[0];
  const headerMap: Record<string, number> = {};
  headerRow.forEach((header, index) => {
    headerMap[normalizeHeader(header)] = index;
  });

  const getValue = (row: string[], keys: string[]) => {
    for (const key of keys) {
      const idx = headerMap[normalizeHeader(key)];
      if (idx != null && row[idx] != null) {
        return row[idx].trim();
      }
    }
    return "";
  };

  const items = rows.slice(1).map((row) => {
    const options = [];
    for (const label of OPTION_LABELS) {
      const optionText = getValue(row, [`option${label}`, `option_${label}`]);
      if (!optionText) continue;
      const mediaRef = getValue(row, [`option${label}media`, `option${label}_media`, `option_${label}_media`]);
      options.push({
        label,
        text: optionText,
        mediaRef: mediaRef || undefined,
      });
    }

    const correctLabelRaw = getValue(row, ["correctlabel", "correct", "correctoption", "correctanswer"]);
    const correctLabels = correctLabelRaw
      ? correctLabelRaw.split(/[|,;]/).map((l) => l.trim().toUpperCase()).filter(Boolean)
      : [];

    return {
      subject: getValue(row, ["subject"]),
      topic: getValue(row, ["topic"]),
      subtopic: getValue(row, ["subtopic"]),
      difficulty: getValue(row, ["difficulty", "level"]),
      stem: getValue(row, ["stem", "question", "questiontext", "question_text"]),
      explanation: getValue(row, ["explanation", "solution", "rationale"]),
      tags: splitTags(getValue(row, ["tags", "tag"])),
      mediaRef: getValue(row, ["mediaref", "questionmediaref", "stemmediaref"]),
      sourceYear: getValue(row, ["sourceyear", "year"]),
      options,
      correctLabels,
    };
  });

  return items;
}

function normalizeQuestionPayload(input: any, index: number) {
  const subject = String(input.subject || "").trim();
  const stem = String(input.stem || input.questionText || input.question || "").trim();
  const topic = input.topic ? String(input.topic).trim() : null;
  const subtopic = input.subtopic ? String(input.subtopic).trim() : null;
  const difficulty = input.difficulty ? String(input.difficulty).trim() : "medium";
  const explanation = input.explanation ? String(input.explanation).trim() : null;
  const tags = Array.isArray(input.tags) ? input.tags.map((t: any) => String(t).trim()).filter(Boolean) : splitTags(input.tags);
  const mediaRef = input.mediaRef ? String(input.mediaRef).trim() : null;
  const sourceYear = input.sourceYear ? Number(input.sourceYear) : null;

  const options = Array.isArray(input.options) ? input.options : [];
  if (!subject || !stem) {
    return { error: `Row ${index + 1}: subject and stem are required.` };
  }
  if (!Array.isArray(options) || options.length < 2) {
    return { error: `Row ${index + 1}: at least 2 options are required.` };
  }

  const normalizedOptions = options.map((opt: any) => ({
    label: String(opt.label || "").trim().toUpperCase(),
    text: String(opt.text || "").trim(),
    mediaRef: opt.mediaRef ? String(opt.mediaRef).trim() : null,
    isCorrect: !!opt.isCorrect,
  }));

  const labels = new Set(normalizedOptions.map((opt) => opt.label));
  if (labels.size !== normalizedOptions.length) {
    return { error: `Row ${index + 1}: option labels must be unique.` };
  }

  const hasCorrect = normalizedOptions.some((opt) => opt.isCorrect);
  if (!hasCorrect) {
    return { error: `Row ${index + 1}: at least one option must be marked correct.` };
  }

  return {
    question: {
      subject,
      topic: topic || null,
      subtopic: subtopic || null,
      difficulty,
      stem,
      mediaRef,
      explanation,
      tags,
      sourceYear: Number.isFinite(sourceYear as number) ? sourceYear : null,
    },
    options: normalizedOptions,
  };
}

router.get("/questions", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(req.query.pageSize as string) || 20, 1), 100);
    const offset = (page - 1) * pageSize;

    const filters: any[] = [];
    const { subject, difficulty, topic } = req.query;

    if (subject) {
      filters.push(eq(mockExamQuestions.subject, String(subject)));
    }
    if (difficulty) {
      filters.push(eq(mockExamQuestions.difficulty, String(difficulty)));
    }
    if (topic) {
      filters.push(eq(mockExamQuestions.topic, String(topic)));
    }

    const whereClause = filters.length ? and(...filters) : undefined;

    const questions = await db
      .select()
      .from(mockExamQuestions)
      .where(whereClause as any)
      .limit(pageSize)
      .offset(offset)
      .orderBy(mockExamQuestions.id);

    const questionIds = questions.map((q) => q.id);
    const options = questionIds.length
      ? await db.select().from(mockExamOptions).where(inArray(mockExamOptions.questionId, questionIds))
      : [];

    const optionsByQuestion: Record<number, any[]> = {};
    for (const option of options) {
      optionsByQuestion[option.questionId] = optionsByQuestion[option.questionId] || [];
      optionsByQuestion[option.questionId].push(option);
    }

    const data = questions.map((q) => ({
      ...q,
      options: optionsByQuestion[q.id] || [],
    }));

    res.json({ data, page, pageSize });
  } catch (error: any) {
    console.error("Failed to list mock exam questions:", error);
    res.status(500).json({ error: "Failed to list questions" });
  }
});

router.post("/questions/bulk", async (req, res) => {
  try {
    const format = String(req.body?.format || "json").toLowerCase();
    const dryRun = !!req.body?.dryRun;

    let rawItems: any[] = [];

    if (format === "json") {
      rawItems = Array.isArray(req.body?.items) ? req.body.items : [];
    } else if (format === "csv" || format === "tsv") {
      const data = req.body?.data || req.body?.content;
      if (!data || typeof data !== "string") {
        return res.status(400).json({ error: "CSV/TSV bulk import requires a data string." });
      }
      const rows = parseDelimited(data, format === "tsv" ? "\t" : ",");
      rawItems = parseCsvRows(rows).map((item) => {
        const labels = item.correctLabels || [];
        if (!labels.length) {
          return { ...item, options: item.options || [], _error: "Missing correctLabel" };
        }
        const labelSet = new Set(labels.map((l: string) => l.toUpperCase()));
        const options = (item.options || []).map((opt: any) => ({
          ...opt,
          label: String(opt.label || "").toUpperCase(),
          isCorrect: labelSet.has(String(opt.label || "").toUpperCase()),
        }));
        return { ...item, options };
      });
    } else {
      return res.status(400).json({ error: "Unsupported format. Use json, csv, or tsv." });
    }

    if (!rawItems.length) {
      return res.status(400).json({ error: "No items provided for bulk import." });
    }

    const errors: any[] = [];
    const duplicates: any[] = [];
    const normalized: Array<{ question: any; options: any[]; index: number }> = [];
    const seenKeys = new Set<string>();

    rawItems.forEach((item, index) => {
      if (item?._error) {
        errors.push({ index, error: item._error });
        return;
      }
      const normalizedResult: any = normalizeQuestionPayload(item, index);
      if (normalizedResult.error) {
        errors.push({ index, error: normalizedResult.error });
        return;
      }
      const key = `${normalizedResult.question.subject.toLowerCase()}::${normalizedResult.question.stem.toLowerCase()}`;
      if (seenKeys.has(key)) {
        duplicates.push({ index, reason: "duplicate_in_payload" });
        return;
      }
      seenKeys.add(key);
      normalized.push({ ...normalizedResult, index });
    });

    const stems = Array.from(new Set(normalized.map((item) => item.question.stem)));
    const existingRows = stems.length
      ? await db
          .select({ id: mockExamQuestions.id, stem: mockExamQuestions.stem, subject: mockExamQuestions.subject })
          .from(mockExamQuestions)
          .where(inArray(mockExamQuestions.stem, stems))
      : [];
    const existingKeys = new Set(
      existingRows.map((row) => `${row.subject.toLowerCase()}::${row.stem.toLowerCase()}`)
    );

    const toInsert = normalized.filter((item) => {
      const key = `${item.question.subject.toLowerCase()}::${item.question.stem.toLowerCase()}`;
      if (existingKeys.has(key)) {
        duplicates.push({ index: item.index, reason: "already_exists" });
        return false;
      }
      return true;
    });

    if (dryRun) {
      return res.json({
        received: rawItems.length,
        valid: normalized.length,
        toInsert: toInsert.length,
        duplicates,
        errors,
      });
    }

    const inserted: any[] = [];
    const userId = getCurrentUser(req);

    for (const item of toInsert) {
      const [question] = await db
        .insert(mockExamQuestions)
        .values({
          ...item.question,
          createdBy: userId || null,
        })
        .returning();

      const options = await db
        .insert(mockExamOptions)
        .values(
          item.options.map((opt: any) => ({
            questionId: question.id,
            label: opt.label,
            text: opt.text,
            mediaRef: opt.mediaRef || null,
            isCorrect: !!opt.isCorrect,
          }))
        )
        .returning();

      inserted.push({ question, options });
    }

    await recordAuditLog(req, {
      action: "mock_exam_question_bulk_import",
      entityType: "mock_exam_question",
      newValue: {
        inserted: inserted.length,
        duplicates: duplicates.length,
        errors: errors.length,
      },
    });

    res.json({
      received: rawItems.length,
      inserted: inserted.length,
      duplicates,
      errors,
    });
  } catch (error: any) {
    console.error("Failed to bulk import mock exam questions:", error);
    res.status(500).json({ error: "Failed to bulk import questions" });
  }
});

router.post("/questions", async (req, res) => {
  try {
    const { subject, topic, subtopic, difficulty, stem, explanation, tags, options, mediaRef } = req.body;

    if (!subject || !stem || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ error: "subject, stem, and options are required" });
    }

    if (!options.some((opt: any) => opt.isCorrect)) {
      return res.status(400).json({ error: "At least one option must be marked correct" });
    }

    const labels = new Set(options.map((opt: any) => opt.label));
    if (labels.size !== options.length) {
      return res.status(400).json({ error: "Option labels must be unique per question" });
    }

    const userId = getCurrentUser(req);

    const [question] = await db
      .insert(mockExamQuestions)
      .values({
        subject,
        topic,
        subtopic,
        difficulty: difficulty || "medium",
        stem,
        mediaRef,
        explanation,
        tags: Array.isArray(tags) ? tags : [],
        createdBy: userId || null,
      })
      .returning();

    const insertedOptions = await db
      .insert(mockExamOptions)
      .values(
        options.map((opt: any) => ({
          questionId: question.id,
          label: opt.label,
          text: opt.text,
          mediaRef: opt.mediaRef,
          isCorrect: !!opt.isCorrect,
        }))
      )
      .returning();

    await recordAuditLog(req, {
      action: "mock_exam_question_created",
      entityType: "mock_exam_question",
      entityId: question.id,
      newValue: { question, options: insertedOptions },
    });

    res.status(201).json({ question, options: insertedOptions });
  } catch (error: any) {
    console.error("Failed to create mock exam question:", error);
    res.status(500).json({ error: "Failed to create question" });
  }
});

router.put("/questions/:id", async (req, res) => {
  try {
    const questionId = Number(req.params.id);
    if (!Number.isInteger(questionId)) {
      return res.status(400).json({ error: "Invalid question id" });
    }

    const { subject, topic, subtopic, difficulty, stem, explanation, tags, options, mediaRef } = req.body;

    const [existingQuestion] = await db
      .select()
      .from(mockExamQuestions)
      .where(eq(mockExamQuestions.id, questionId))
      .limit(1);

    if (!existingQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    const existingOptions = await db
      .select()
      .from(mockExamOptions)
      .where(eq(mockExamOptions.questionId, questionId));

    await db.transaction(async (tx) => {
      await tx
        .update(mockExamQuestions)
        .set({
          subject: subject ?? undefined,
          topic: topic ?? undefined,
          subtopic: subtopic ?? undefined,
          difficulty: difficulty ?? undefined,
          stem: stem ?? undefined,
          mediaRef: mediaRef ?? undefined,
          explanation: explanation ?? undefined,
          tags: Array.isArray(tags) ? tags : undefined,
        })
        .where(eq(mockExamQuestions.id, questionId));

      if (Array.isArray(options)) {
        if (!options.some((opt: any) => opt.isCorrect)) {
          throw new Error("At least one option must be marked correct");
        }

        const labels = new Set(options.map((opt: any) => opt.label));
        if (labels.size !== options.length) {
          throw new Error("Option labels must be unique per question");
        }

        await tx.delete(mockExamOptions).where(eq(mockExamOptions.questionId, questionId));
        await tx
          .insert(mockExamOptions)
          .values(
            options.map((opt: any) => ({
              questionId,
              label: opt.label,
              text: opt.text,
              mediaRef: opt.mediaRef,
              isCorrect: !!opt.isCorrect,
            }))
          );
      }
    });

    const refreshedQuestion = await db
      .select()
      .from(mockExamQuestions)
      .where(eq(mockExamQuestions.id, questionId));

    const refreshedOptions = await db
      .select()
      .from(mockExamOptions)
      .where(eq(mockExamOptions.questionId, questionId));

    await recordAuditLog(req, {
      action: "mock_exam_question_updated",
      entityType: "mock_exam_question",
      entityId: questionId,
      oldValue: { question: existingQuestion, options: existingOptions },
      newValue: { question: refreshedQuestion[0], options: refreshedOptions },
    });

    res.json({ question: refreshedQuestion[0], options: refreshedOptions });
  } catch (error: any) {
    console.error("Failed to update mock exam question:", error);
    res.status(400).json({ error: error.message || "Failed to update question" });
  }
});

router.delete("/questions/:id", async (req, res) => {
  try {
    const questionId = Number(req.params.id);
    if (!Number.isInteger(questionId)) {
      return res.status(400).json({ error: "Invalid question id" });
    }

    const [existingQuestion] = await db
      .select()
      .from(mockExamQuestions)
      .where(eq(mockExamQuestions.id, questionId))
      .limit(1);

    const existingOptions = existingQuestion
      ? await db.select().from(mockExamOptions).where(eq(mockExamOptions.questionId, questionId))
      : [];

    await db.transaction(async (tx) => {
      await tx.delete(mockExamOptions).where(eq(mockExamOptions.questionId, questionId));
      await tx.delete(mockExamQuestions).where(eq(mockExamQuestions.id, questionId));
    });

    await recordAuditLog(req, {
      action: "mock_exam_question_deleted",
      entityType: "mock_exam_question",
      entityId: questionId,
      oldValue: existingQuestion ? { question: existingQuestion, options: existingOptions } : null,
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete mock exam question:", error);
    res.status(500).json({ error: "Failed to delete question" });
  }
});

export default router;
