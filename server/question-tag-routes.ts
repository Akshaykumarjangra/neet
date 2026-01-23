import { Router } from "express";
import { db } from "./db";
import { questionTags, questions, contentTopics } from "@shared/schema";
import { requireAuthWithPasswordCheck, requireOwner } from "./auth";
import { eq, sql, desc, inArray } from "drizzle-orm";

const router = Router();

router.get("/", requireAuthWithPasswordCheck, async (_req, res) => {
  try {
    const tagSummary = await db
      .select({
        tag: questionTags.tag,
        category: questionTags.category,
        count: sql<number>`count(*)`,
      })
      .from(questionTags)
      .groupBy(questionTags.tag, questionTags.category)
      .orderBy(desc(sql<number>`count(*)`));

    res.json(tagSummary);
  } catch (error: any) {
    console.error("Failed to load question tags:", error);
    res.status(500).json({ error: "Unable to load question tags" });
  }
});

router.get("/question/:id", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const questionId = parseInt(req.params.id, 10);
    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid question id" });
    }

    const tags = await db
      .select({
        tag: questionTags.tag,
        category: questionTags.category,
      })
      .from(questionTags)
      .where(eq(questionTags.questionId, questionId));

    res.json(tags);
  } catch (error: any) {
    console.error("Failed to load tags for question:", error);
    res.status(500).json({ error: "Unable to load tags for question" });
  }
});

router.post("/assign", requireOwner, async (req, res) => {
  try {
    const { questionIds, tags } = req.body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({ error: "questionIds must be a non-empty array" });
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ error: "tags must be a non-empty array" });
    }

    const normalizedTags = tags
      .map((tag: any) => {
        if (!tag?.tag) return null;
        return {
          tag: String(tag.tag).trim(),
          category: String(tag.category ?? "custom").trim(),
        };
      })
      .filter(Boolean);

    if (normalizedTags.length === 0) {
      return res.status(400).json({ error: "No valid tags provided" });
    }

    const entries = [];
    for (const questionId of questionIds) {
      entries.push(
        ...normalizedTags.map((tag) => ({
          questionId,
          tag: tag.tag,
          category: tag.category,
        }))
      );
    }

    await db.insert(questionTags).values(entries).onConflictDoNothing();

    res.json({ success: true, added: entries.length });
  } catch (error: any) {
    console.error("Failed to assign question tags:", error);
    res.status(500).json({ error: "Unable to assign tags" });
  }
});

router.put("/question/:id", requireOwner, async (req, res) => {
  try {
    const questionId = parseInt(req.params.id, 10);
    const { tags } = req.body;

    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({ error: "Invalid question id" });
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: "tags must be an array" });
    }

    const normalizedTags = tags
      .map((tag: any) => {
        if (!tag?.tag) return null;
        return {
          tag: String(tag.tag).trim(),
          category: String(tag.category ?? "custom").trim(),
        };
      })
      .filter(Boolean);

    await db.delete(questionTags).where(eq(questionTags.questionId, questionId));

    if (normalizedTags.length > 0) {
      const entries = normalizedTags.map((tag) => ({
        questionId,
        tag: tag.tag,
        category: tag.category,
      }));
      await db.insert(questionTags).values(entries).onConflictDoNothing();
    }

    res.json({ success: true, tags: normalizedTags });
  } catch (error: any) {
    console.error("Failed to update tags for question:", error);
    res.status(500).json({ error: "Unable to update tags" });
  }
});

export default router;
