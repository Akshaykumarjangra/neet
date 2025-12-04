import { Router } from "express";
import { db } from "./db";
import { 
  users, 
  questions, 
  contentTopics, 
  mockTests, 
  flashcardDecks, 
  flashcards,
  insertQuestionSchema,
  insertContentTopicSchema,
  insertMockTestSchema,
  insertFlashcardDeckSchema,
  insertFlashcardSchema,
} from "@shared/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { z } from "zod";

const router = Router();

const requireAdmin = async (req: any, res: any, next: any) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

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

router.get("/topics", requireAdmin, async (req, res) => {
  try {
    const allTopics = await db.select().from(contentTopics).orderBy(contentTopics.subject, contentTopics.topicName);
    
    const topicsWithCounts = await Promise.all(
      allTopics.map(async (topic) => {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(questions)
          .where(eq(questions.topicId, topic.id));
        return {
          ...topic,
          questionCount: Number(countResult[0].count),
        };
      })
    );

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

    res.json(updated);
  } catch (error) {
    console.error("Error toggling mock test publish status:", error);
    res.status(500).json({ error: "Failed to toggle publish status" });
  }
});

// ============ FLASHCARD DECKS ROUTES ============

router.get("/flashcard-decks", requireAdmin, async (req, res) => {
  try {
    const allDecks = await db
      .select({
        deck: flashcardDecks,
        topic: contentTopics,
      })
      .from(flashcardDecks)
      .leftJoin(contentTopics, eq(flashcardDecks.topicId, contentTopics.id))
      .orderBy(desc(flashcardDecks.createdAt));
    
    const decksWithCounts = await Promise.all(
      allDecks.map(async (item) => {
        const countResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(flashcards)
          .where(eq(flashcards.deckId, item.deck.id));
        return {
          ...item.deck,
          topicName: item.topic?.topicName,
          cardCount: Number(countResult[0].count),
        };
      })
    );

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

    res.json(updated);
  } catch (error) {
    console.error("Error updating flashcard deck:", error);
    res.status(500).json({ error: "Failed to update flashcard deck" });
  }
});

router.delete("/flashcard-decks/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.delete(flashcards).where(eq(flashcards.deckId, parseInt(id)));
    
    const [deleted] = await db
      .delete(flashcardDecks)
      .where(eq(flashcardDecks.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Flashcard deck not found" });
    }

    res.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting flashcard deck:", error);
    res.status(500).json({ error: "Failed to delete flashcard deck" });
  }
});

router.get("/flashcard-decks/:id/cards", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const cards = await db
      .select()
      .from(flashcards)
      .where(eq(flashcards.deckId, parseInt(id)))
      .orderBy(flashcards.order);

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

    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(flashcards)
      .where(eq(flashcards.deckId, parseInt(id)));
    let currentOrder = Number(countResult[0].count);

    const imported = [];
    const errors = [];

    for (let i = 0; i < cards.length; i++) {
      try {
        const cardData = {
          deckId: parseInt(id),
          front: cards[i].front,
          back: cards[i].back,
          order: currentOrder + i,
        };
        const validatedData = insertFlashcardSchema.parse(cardData);
        const [newCard] = await db.insert(flashcards).values(validatedData).returning();
        imported.push(newCard);
      } catch (error: any) {
        errors.push({ index: i, error: error.message });
      }
    }

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
    
    const [deleted] = await db
      .delete(flashcards)
      .where(and(
        eq(flashcards.id, parseInt(cardId)),
        eq(flashcards.deckId, parseInt(deckId))
      ))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: "Flashcard not found" });
    }

    res.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    res.status(500).json({ error: "Failed to delete flashcard" });
  }
});

export default router;
