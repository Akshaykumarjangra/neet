
import { Router, type Request, type Response } from "express";
import { db } from "./db";
import { requireAdmin, requireAdminOrMentor } from "./auth";
import {
  users,
  questions,
  contentTopics,
  mentors,
  mockTests,
  mockTestSeries,
  mockExamPapers,
  flashcardDecks,
  flashcards,
  insertQuestionSchema,
  insertContentTopicSchema,
  insertMockTestSchema,
  insertMockTestSeriesSchema,
  insertMockExamPaperSchema,
  insertFlashcardDeckSchema,
  insertFlashcardSchema,
  chapterContentVersions,
  chapterContent,
} from "@shared/schema";
import { eq, desc, sql, and, getTableColumns } from "drizzle-orm";
import { recordAuditLog } from "./lib/audit";
import { z } from "zod";

const router = Router();



// ============ QUESTIONS ROUTES ============

router.get("/questions", requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50, subject, topicId } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = db
      .select({
        question: questions,
        topic: contentTopics,
      })
      .from(questions)
      .leftJoin(contentTopics, eq(questions.topicId, contentTopics.id))
      .orderBy(desc(questions.id))
      .limit(Number(limit))
      .offset(offset);

    const allQuestions = await query;

    const countResult = await db.select({ count: sql<number>`count(*)` }).from(questions);
    const total = Number(countResult[0].count);

    res.json({
      questions: allQuestions.map(q => ({
        ...q.question,
        topicName: q.topic?.topicName,
        subject: q.topic?.subject,
      })),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

router.post("/questions", requireAdmin, async (req, res) => {
  try {
    const validatedData = insertQuestionSchema.parse(req.body);
    const [newQuestion] = await db.insert(questions).values(validatedData).returning();
    
    await recordAuditLog(req, {
      action: "create_question",
      entityType: "question",
      entityId: newQuestion.id,
      newValue: newQuestion,
    });

    res.status(201).json(newQuestion);
  } catch (error: any) {
    console.error("Error creating question:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create question" });
  }
});

router.put("/questions/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await db
      .update(questions)
      .set(updateData)
      .where(eq(questions.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Question not found" });
    }

    await recordAuditLog(req, {
      action: "update_question",
      entityType: "question",
      entityId: updated.id,
      newValue: updated,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Failed to update question" });
  }
});

router.delete("/questions/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [deleted] = await db
      .delete(questions)
      .where(eq(questions.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Question not found" });
    }

    await recordAuditLog(req, {
      action: "delete_question",
      entityType: "question",
      entityId: deleted.id,
      oldValue: deleted,
    });

    res.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Failed to delete question" });
  }
});

router.post("/questions/bulk", requireAdmin, async (req, res) => {
  try {
    const { questions: questionsData } = req.body;

    if (!Array.isArray(questionsData) || questionsData.length === 0) {
      return res.status(400).json({ error: "Questions array required" });
    }

    const imported = [];
    const errors = [];

    for (let i = 0; i < questionsData.length; i++) {
      try {
        const validatedData = insertQuestionSchema.parse(questionsData[i]);
        const [newQuestion] = await db.insert(questions).values(validatedData).returning();
        imported.push(newQuestion);
      } catch (error: any) {
        errors.push({ index: i, error: error.message });
      }
    }

    await recordAuditLog(req, {
      action: "bulk_import_questions",
      entityType: "question",
      newValue: {
        importedCount: imported.length,
        errorCount: errors.length,
      },
    });

    res.json({
      success: true,
      imported: imported.length,
      errors: errors.length,
      failedItems: errors,
    });
  } catch (error) {
    console.error("Error bulk importing questions:", error);
    res.status(500).json({ error: "Failed to bulk import questions" });
  }
});

// ============ TOPICS ROUTES ============

router.get("/topics", requireAdminOrMentor, async (req, res) => {
  try {
    const topicsWithCounts = await db
      // ⚡ Bolt Performance Optimization:
      // Replaced O(N) database queries inside Promise.all with a single O(1) query
      // using LEFT JOIN and GROUP BY to fetch topic data and question counts.
      .select({
        ...getTableColumns(contentTopics),
        questionCount: sql<number>`cast(count(${questions.id}) as integer)`,
      })
      .from(contentTopics)
      .leftJoin(questions, eq(contentTopics.id, questions.topicId))
      .groupBy(contentTopics.id)
      .orderBy(contentTopics.subject, contentTopics.topicName);

    res.json(topicsWithCounts);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

router.post("/topics", requireAdmin, async (req, res) => {
  try {
    const validatedData = insertContentTopicSchema.parse(req.body);
    const [newTopic] = await db.insert(contentTopics).values(validatedData).returning();
    
    await recordAuditLog(req, {
      action: "create_topic",
      entityType: "topic",
      entityId: newTopic.id,
      newValue: newTopic,
    });

    res.status(201).json(newTopic);
  } catch (error: any) {
    console.error("Error creating topic:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create topic" });
  }
});

router.put("/topics/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await db
      .update(contentTopics)
      .set(updateData)
      .where(eq(contentTopics.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Topic not found" });
    }

    await recordAuditLog(req, {
      action: "update_topic",
      entityType: "topic",
      entityId: updated.id,
      newValue: updated,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating topic:", error);
    res.status(500).json({ error: "Failed to update topic" });
  }
});

router.delete("/topics/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const questionCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(questions)
      .where(eq(questions.topicId, parseInt(id)));

    if (Number(questionCount[0].count) > 0) {
      return res.status(400).json({
        error: "Cannot delete topic with associated questions. Delete questions first."
      });
    }

    const [deleted] = await db
      .delete(contentTopics)
      .where(eq(contentTopics.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Topic not found" });
    }

    await recordAuditLog(req, {
      action: "delete_topic",
      entityType: "topic",
      entityId: deleted.id,
      oldValue: deleted,
    });

    res.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({ error: "Failed to delete topic" });
  }
});

// ============ MOCK TESTS ROUTES ============

router.get("/mock-tests", requireAdmin, async (req, res) => {
  try {
    const allTests = await db.select().from(mockTests).orderBy(desc(mockTests.createdAt));

    const testsWithCounts = allTests.map(test => ({
      ...test,
      questionsCount: test.questionsList?.length || 0,
    }));

    res.json(testsWithCounts);
  } catch (error) {
    console.error("Error fetching mock tests:", error);
    res.status(500).json({ error: "Failed to fetch mock tests" });
  }
});

router.post("/mock-tests", requireAdmin, async (req, res) => {
  try {
    const validatedData = insertMockTestSchema.parse(req.body);
    const [newTest] = await db.insert(mockTests).values(validatedData).returning();
    
    await recordAuditLog(req, {
      action: "create_mock_test",
      entityType: "mock_test",
      entityId: newTest.id,
      newValue: newTest,
    });

    res.status(201).json(newTest);
  } catch (error: any) {
    console.error("Error creating mock test:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create mock test" });
  }
});

router.put("/mock-tests/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await db
      .update(mockTests)
      .set(updateData)
      .where(eq(mockTests.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Mock test not found" });
    }

    await recordAuditLog(req, {
      action: "update_mock_test",
      entityType: "mock_test",
      entityId: updated.id,
      newValue: updated,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating mock test:", error);
    res.status(500).json({ error: "Failed to update mock test" });
  }
});

router.delete("/mock-tests/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const [deleted] = await db
      .delete(mockTests)
      .where(eq(mockTests.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Mock test not found" });
    }

    await recordAuditLog(req, {
      action: "delete_mock_test",
      entityType: "mock_test",
      entityId: deleted.id,
      oldValue: deleted,
    });

    res.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting mock test:", error);
    res.status(500).json({ error: "Failed to delete mock test" });
  }
});

router.put("/mock-tests/:id/publish", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    const [updated] = await db
      .update(mockTests)
      .set({ isPublished: !!isPublished })
      .where(eq(mockTests.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Mock test not found" });
    }

    await recordAuditLog(req, {
      action: "publish_mock_test",
      entityType: "mock_test",
      entityId: updated.id,
      newValue: { isPublished: updated.isPublished },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error toggling mock test publish status:", error);
    res.status(500).json({ error: "Failed to toggle publish status" });
  }
});

// ============ FLASHCARD DECKS ROUTES ============

router.get("/flashcard-decks", requireAdmin, async (req, res) => {
  try {
    // ⚡ Bolt Performance Optimization:
    // Replaced N+1 queries for flashcard counts with a single LEFT JOIN.
    const decksWithCountsResult = await db
      .select({
        deck: flashcardDecks,
        topicName: contentTopics.topicName,
        cardCount: sql<number>`cast(count(${flashcards.id}) as integer)`,
      })
      .from(flashcardDecks)
      .leftJoin(contentTopics, eq(flashcardDecks.topicId, contentTopics.id))
      .leftJoin(flashcards, eq(flashcardDecks.topicId, flashcards.topicId))
      .groupBy(flashcardDecks.id, contentTopics.topicName)
      .orderBy(desc(flashcardDecks.createdAt));

    const decksWithCounts = decksWithCountsResult.map((row) => ({
      ...row.deck,
      topicName: row.topicName,
      cardCount: row.cardCount,
    }));

    res.json(decksWithCounts);
  } catch (error) {
    console.error("Error fetching flashcard decks:", error);
    res.status(500).json({ error: "Failed to fetch flashcard decks" });
  }
});

router.post("/flashcard-decks", requireAdmin, async (req, res) => {
  try {
    const validatedData = insertFlashcardDeckSchema.parse(req.body);
    const [newDeck] = await db.insert(flashcardDecks).values(validatedData).returning();
    
    await recordAuditLog(req, {
      action: "create_flashcard_deck",
      entityType: "flashcard_deck",
      entityId: newDeck.id,
      newValue: newDeck,
    });

    res.status(201).json(newDeck);
  } catch (error: any) {
    console.error("Error creating flashcard deck:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create flashcard deck" });
  }
});

router.put("/flashcard-decks/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const [updated] = await db
      .update(flashcardDecks)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(flashcardDecks.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Flashcard deck not found" });
    }

    await recordAuditLog(req, {
      action: "update_flashcard_deck",
      entityType: "flashcard_deck",
      entityId: updated.id,
      newValue: updated,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating flashcard deck:", error);
    res.status(500).json({ error: "Failed to update flashcard deck" });
  }
});

router.delete("/flashcard-decks/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deckId = parseInt(id);
    const [deck] = await db
      .select({ id: flashcardDecks.id, topicId: flashcardDecks.topicId })
      .from(flashcardDecks)
      .where(eq(flashcardDecks.id, deckId))
      .limit(1);

    if (!deck) {
      return res.status(404).json({ error: "Flashcard deck not found" });
    }

    if (deck.topicId) {
      await db.delete(flashcards).where(eq(flashcards.topicId, deck.topicId));
    }

    const [deleted] = await db
      .delete(flashcardDecks)
      .where(eq(flashcardDecks.id, deckId))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Flashcard deck not found" });
    }

    await recordAuditLog(req, {
      action: "delete_flashcard_deck",
      entityType: "flashcard_deck",
      entityId: deleted.id,
      oldValue: deleted,
    });

    res.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting flashcard deck:", error);
    res.status(500).json({ error: "Failed to delete flashcard deck" });
  }
});

router.get("/flashcard-decks/:id/cards", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deckId = parseInt(id);
    const [deck] = await db
      .select({ topicId: flashcardDecks.topicId })
      .from(flashcardDecks)
      .where(eq(flashcardDecks.id, deckId))
      .limit(1);

    if (!deck) {
      return res.status(404).json({ error: "Flashcard deck not found" });
    }

    if (!deck.topicId) {
      return res.json([]);
    }

    const cards = await db
      .select({
        id: flashcards.id,
        deckId: sql<number>`${deckId}`,
        front: flashcards.frontContent,
        back: flashcards.backContent,
        order: flashcards.id,
      })
      .from(flashcards)
      .where(eq(flashcards.topicId, deck.topicId))
      .orderBy(flashcards.id);

    res.json(cards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
});

router.post("/flashcard-decks/:id/cards", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { cards } = req.body;

    if (!Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({ error: "Cards array required" });
    }

    const deckId = parseInt(id);
    const [deck] = await db
      .select({ topicId: flashcardDecks.topicId })
      .from(flashcardDecks)
      .where(eq(flashcardDecks.id, deckId))
      .limit(1);

    if (!deck) {
      return res.status(404).json({ error: "Flashcard deck not found" });
    }

    if (!deck.topicId) {
      return res.status(400).json({ error: "Flashcard deck must be linked to a topic" });
    }

    const imported = [];
    const errors = [];

    for (let i = 0; i < cards.length; i++) {
      try {
        const cardData = {
          topicId: deck.topicId,
          frontContent: cards[i].front,
          backContent: cards[i].back,
        };
        const validatedData = insertFlashcardSchema.parse(cardData);
        const [newCard] = await db.insert(flashcards).values(validatedData).returning();
        imported.push(newCard);
      } catch (error: any) {
        errors.push({ index: i, error: error.message });
      }
    }

    await recordAuditLog(req, {
      action: "bulk_import_flashcards",
      entityType: "flashcard",
      newValue: {
        deckId,
        importedCount: imported.length,
        errorCount: errors.length,
      },
    });

    res.json({
      success: true,
      imported: imported.length,
      errors: errors.length,
      cards: imported,
    });
  } catch (error) {
    console.error("Error adding flashcards:", error);
    res.status(500).json({ error: "Failed to add flashcards" });
  }
});

router.delete("/flashcard-decks/:deckId/cards/:cardId", requireAdmin, async (req, res) => {
  try {
    const { deckId, cardId } = req.params;

    const parsedDeckId = parseInt(deckId);
    const parsedCardId = parseInt(cardId);
    const [deck] = await db
      .select({ topicId: flashcardDecks.topicId })
      .from(flashcardDecks)
      .where(eq(flashcardDecks.id, parsedDeckId))
      .limit(1);

    if (!deck) {
      return res.status(404).json({ error: "Flashcard deck not found" });
    }

    const whereClause = deck.topicId
      ? and(eq(flashcards.id, parsedCardId), eq(flashcards.topicId, deck.topicId))
      : eq(flashcards.id, parsedCardId);

    const [deleted] = await db
      .delete(flashcards)
      .where(whereClause)
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Flashcard not found" });
    }

    await recordAuditLog(req, {
      action: "delete_flashcard",
      entityType: "flashcard",
      entityId: deleted.id,
      oldValue: deleted,
    });

    res.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Failed to delete flashcard" });
  }
});

// ============ TEST SERIES ROUTES ============

router.get("/mock-exam-series", requireAdmin, async (req, res) => {
  try {
    const series = await db.select().from(mockTestSeries).orderBy(desc(mockTestSeries.createdAt));
    res.json(series);
  } catch (error) {
    console.error("Error fetching test series:", error);
    res.status(500).json({ error: "Failed to fetch test series" });
  }
});

router.post("/mock-exam-series", requireAdmin, async (req, res) => {
  try {
    const validatedData = insertMockTestSeriesSchema.parse(req.body);
    const [newSeries] = await db.insert(mockTestSeries).values(validatedData).returning();
    
    await recordAuditLog(req, {
      action: "create_mock_test_series",
      entityType: "mock_test_series",
      entityId: newSeries.id,
      newValue: newSeries,
    });

    res.status(201).json(newSeries);
  } catch (error: any) {
    console.error("Error creating test series:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create test series" });
  }
});

// ============ MOCK EXAM PAPERS (SCHEDULED) ROUTES ============

router.get("/mock-exam-papers", requireAdmin, async (req, res) => {
  try {
    // Join with series to get series title
    const papers = await db
      .select({
        paper: mockExamPapers,
        seriesTitle: mockTestSeries.title,
      })
      .from(mockExamPapers)
      .leftJoin(mockTestSeries, eq(mockExamPapers.seriesId, mockTestSeries.id))
      .orderBy(desc(mockExamPapers.startsAt));

    const formattedPapers = papers.map(({ paper, seriesTitle }) => ({
      ...paper,
      seriesTitle,
    }));

    res.json(formattedPapers);
  } catch (error) {
    console.error("Error fetching exam papers:", error);
    res.status(500).json({ error: "Failed to fetch exam papers" });
  }
});

router.post("/mock-exam-papers", requireAdmin, async (req, res) => {
  try {
    // Basic validation
    const body = { ...req.body };

    // Ensure dates are date objects if passed as strings
    if (body.startsAt) body.startsAt = new Date(body.startsAt);
    if (body.endsAt) body.endsAt = new Date(body.endsAt);

    const validatedData = insertMockExamPaperSchema.parse(body);
    const [newPaper] = await db.insert(mockExamPapers).values({
      ...validatedData,
      createdBy: req.session?.userId
    }).returning();

    await recordAuditLog(req, {
      action: "create_mock_exam_paper",
      entityType: "mock_exam_paper",
      entityId: newPaper.id,
      newValue: newPaper,
    });

    res.status(201).json(newPaper);
  } catch (error: any) {
    console.error("Error creating exam paper:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    res.status(500).json({ error: "Failed to create exam paper" });
  }
});

router.put("/mock-exam-papers/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle date conversion
    if (updateData.startsAt) updateData.startsAt = new Date(updateData.startsAt);
    if (updateData.endsAt) updateData.endsAt = new Date(updateData.endsAt);

    const [updated] = await db
      .update(mockExamPapers)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(mockExamPapers.id, parseInt(id)))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Exam paper not found" });
    }

    await recordAuditLog(req, {
      action: "update_mock_exam_paper",
      entityType: "mock_exam_paper",
      entityId: updated.id,
      newValue: updated,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating exam paper:", error);
    res.status(500).json({ error: "Failed to update exam paper" });
  }
});

// ============ CONTENT APPROVAL ROUTES ============

router.get("/content-approvals", requireAdmin, async (req, res) => {
  try {
    const pendingVersions = await db
      .select({
        id: chapterContentVersions.id,
        chapterTitle: chapterContent.chapterTitle,
        subject: chapterContent.subject,
        classLevel: chapterContent.classLevel,
        mentorName: users.name,
        createdAt: chapterContentVersions.createdAt,
        status: chapterContentVersions.status,
      })
      .from(chapterContentVersions)
      .leftJoin(chapterContent, eq(chapterContentVersions.chapterContentId, chapterContent.id))
      .leftJoin(mentors, eq(chapterContentVersions.mentorId, mentors.id))
      .leftJoin(users, eq(mentors.userId, users.id))
      .where(eq(chapterContentVersions.status, 'pending'))
      .orderBy(desc(chapterContentVersions.createdAt));

    res.json(pendingVersions);
  } catch (error) {
    console.error("Error fetching content approvals:", error);
    res.status(500).json({ error: "Failed to fetch approvals" });
  }
});

router.get("/content-approvals/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [version] = await db
      .select({
        id: chapterContentVersions.id,
        chapterContentId: chapterContentVersions.chapterContentId,
        detailedNotes: chapterContentVersions.detailedNotes,
        keyConcepts: chapterContentVersions.keyConcepts,
        formulas: chapterContentVersions.formulas,
        status: chapterContentVersions.status,
        mentorName: users.name,
        currentContent: {
          detailedNotes: chapterContent.detailedNotes,
          keyConcepts: chapterContent.keyConcepts,
          formulas: chapterContent.formulas,
        }
      })
      .from(chapterContentVersions)
      .leftJoin(chapterContent, eq(chapterContentVersions.chapterContentId, chapterContent.id))
      .leftJoin(mentors, eq(chapterContentVersions.mentorId, mentors.id))
      .leftJoin(users, eq(mentors.userId, users.id))
      .where(eq(chapterContentVersions.id, parseInt(id)))
      .limit(1);

    if (!version) {
      return res.status(404).json({ error: "Version request not found" });
    }

    res.json(version);
  } catch (error) {
    console.error("Error fetching version details:", error);
    res.status(500).json({ error: "Failed to fetch version details" });
  }
});

router.post("/content-approvals/:id/:action", requireAdmin, async (req, res) => {
  try {
    const { id, action } = req.params; // action: 'approve' | 'reject'
    const { reviewNotes } = req.body;
    const adminId = req.session.userId;

    const [version] = await db
      .select()
      .from(chapterContentVersions)
      .where(eq(chapterContentVersions.id, parseInt(id)))
      .limit(1);

    if (!version) {
      return res.status(404).json({ error: "Version request not found" });
    }

    if (version.status !== 'pending') {
      return res.status(400).json({ error: "Request is already processed" });
    }

    if (action === 'approve') {
      // 1. Update the actual chapter content
      await db
        .update(chapterContent)
        .set({
          detailedNotes: version.detailedNotes || undefined, // Only update if provided
          keyConcepts: version.keyConcepts || undefined,
          formulas: version.formulas || undefined,
          updatedAt: new Date(),
          approverId: adminId,
          version: sql`${chapterContent.version} + 1`
        })
        .where(eq(chapterContent.id, version.chapterContentId));

      // 2. Mark version as approved
      await db
        .update(chapterContentVersions)
        .set({
          status: 'approved',
          reviewedAt: new Date(),
          reviewNotes
        })
        .where(eq(chapterContentVersions.id, parseInt(id)));

    } else if (action === 'reject') {
      await db
        .update(chapterContentVersions)
        .set({
          status: 'rejected',
          reviewedAt: new Date(),
          reviewNotes
        })
        .where(eq(chapterContentVersions.id, parseInt(id)));
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await recordAuditLog(req, {
      action: action === 'approve' ? "approve_content" : "reject_content",
      entityType: "chapter_content_version",
      entityId: parseInt(id),
      newValue: { status: action === 'approve' ? 'approved' : 'rejected', reviewNotes },
    });

    res.json({ success: true, status: action === 'approve' ? 'approved' : 'rejected' });
  } catch (error) {
    console.error("Error processing approval:", error);
    res.status(500).json({ error: "Failed to process approval" });
  }
});

export default router;
