// @ts-nocheck
import { Router, Request, Response } from "express";
import { storage } from "./storage";
import { db } from "./db";
import { chapterContent, flashcards, flashcardDecks, contentTopics, userFlashcardProgress, users } from "@shared/schema";
import { eq, asc, and, sql, lte, desc } from "drizzle-orm";

const router = Router();

function isAuthenticated(req: Request): boolean {
  return !!((req.session as any)?.passport?.user || (req as any).user);
}

function getUserId(req: Request): string | null {
  if ((req as any).user?.id) return (req as any).user.id;
  if ((req.session as any)?.passport?.user) return (req.session as any).passport.user;
  if ((req.session as any)?.userId) return (req.session as any).userId;
  return null;
}

async function isPremiumUser(req: Request): Promise<boolean> {
  const userId = getUserId(req);
  if (!userId) return false;

  try {
    const [user] = await db
      .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner })
      .from(users)
      .where(eq(users.id, Number(userId)))
      .limit(1);

    return user?.isPaidUser || user?.role === "admin" || user?.isOwner;
  } catch (error) {
    console.error("Check premium error:", error);
    return false;
  }
}

// ============ KEYPOINTS ROUTES ============

router.get("/keypoints", async (req: Request, res: Response) => {
  try {
    const { chapterId, topicId, subject, isHighYield, category } = req.query;

    if (chapterId) {
      const cId = parseInt(chapterId as string);
      const [chapter] = await db
        .select({ chapterNumber: chapterContent.chapterNumber })
        .from(chapterContent)
        .where(eq(chapterContent.id, cId))
        .limit(1);

      if (chapter && chapter.chapterNumber > 3) {
        const isPremium = await isPremiumUser(req);
        if (!isPremium) {
          return res.status(402).json({
            error: "PAYMENT_REQUIRED",
            message: "Key points for Chapter 4 and beyond are a Premium feature."
          });
        }
      }
    }

    const keypoints = await storage.getKeypoints({
      chapterId: chapterId ? parseInt(chapterId as string) : undefined,
      topicId: topicId ? parseInt(topicId as string) : undefined,
      subject: subject as string | undefined,
      isHighYield: isHighYield === "true",
      category: category as string | undefined,
    });
    res.json(keypoints);
  } catch (error) {
    console.error("Error fetching keypoints:", error);
    res.status(500).json({ error: "Failed to fetch keypoints" });
  }
});

router.get("/keypoints/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const keypoint = await storage.getKeypointById(id);
    if (!keypoint) {
      return res.status(404).json({ error: "Keypoint not found" });
    }
    res.json(keypoint);
  } catch (error) {
    console.error("Error fetching keypoint:", error);
    res.status(500).json({ error: "Failed to fetch keypoint" });
  }
});

// ============ FORMULAS ROUTES ============

router.get("/formulas", async (req: Request, res: Response) => {
  try {
    const { chapterId, topicId, subject, isHighYield } = req.query;

    if (chapterId) {
      const cId = parseInt(chapterId as string);
      const [chapter] = await db
        .select({ chapterNumber: chapterContent.chapterNumber })
        .from(chapterContent)
        .where(eq(chapterContent.id, cId))
        .limit(1);

      if (chapter && chapter.chapterNumber > 3) {
        const isPremium = await isPremiumUser(req);
        if (!isPremium) {
          return res.status(402).json({
            error: "PAYMENT_REQUIRED",
            message: "Formulas for Chapter 4 and beyond are a Premium feature."
          });
        }
      }
    }

    const formulas = await storage.getFormulas({
      chapterId: chapterId ? parseInt(chapterId as string) : undefined,
      topicId: topicId ? parseInt(topicId as string) : undefined,
      subject: subject as string | undefined,
      isHighYield: isHighYield === "true",
    });
    res.json(formulas);
  } catch (error) {
    console.error("Error fetching formulas:", error);
    res.status(500).json({ error: "Failed to fetch formulas" });
  }
});

router.get("/formulas/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const formula = await storage.getFormulaById(id);
    if (!formula) {
      return res.status(404).json({ error: "Formula not found" });
    }
    res.json(formula);
  } catch (error) {
    console.error("Error fetching formula:", error);
    res.status(500).json({ error: "Failed to fetch formula" });
  }
});

// ============ USER PROGRESS ROUTES (Auth Required) ============

router.get("/progress", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userId = getUserId(req)!;
    const topicId = req.query.topicId ? parseInt(req.query.topicId as string) : undefined;
    const progress = await storage.getUserTopicProgress(userId, topicId);
    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

router.post("/progress", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userId = getUserId(req)!;
    const progress = await storage.upsertUserTopicProgress({
      ...req.body,
      userId,
    });
    res.json(progress);
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

router.get("/weak-areas", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const isPremium = await isPremiumUser(req);
  if (!isPremium) {
    return res.status(402).json({
      error: "PAYMENT_REQUIRED",
      message: "Weak area identification is a Premium feature."
    });
  }

  try {
    const userId = getUserId(req)!;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const weakAreas = await storage.getWeakAreas(userId, limit);
    res.json(weakAreas);
  } catch (error) {
    console.error("Error fetching weak areas:", error);
    res.status(500).json({ error: "Failed to fetch weak areas" });
  }
});

// ============ BOOKMARKS ROUTES (Auth Required) ============

router.get("/bookmarks/keypoints", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userId = getUserId(req)!;
    const bookmarks = await storage.getUserKeypointBookmarks(userId);
    res.json(bookmarks);
  } catch (error) {
    console.error("Error fetching keypoint bookmarks:", error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

router.post("/bookmarks/keypoints/:keypointId", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userId = getUserId(req)!;
    const keypointId = parseInt(req.params.keypointId);
    const { note } = req.body;
    const added = await storage.toggleKeypointBookmark(userId, keypointId, note);
    res.json({ bookmarked: added });
  } catch (error) {
    console.error("Error toggling keypoint bookmark:", error);
    res.status(500).json({ error: "Failed to toggle bookmark" });
  }
});

router.get("/bookmarks/formulas", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userId = getUserId(req)!;
    const bookmarks = await storage.getUserFormulaBookmarks(userId);
    res.json(bookmarks);
  } catch (error) {
    console.error("Error fetching formula bookmarks:", error);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

router.post("/bookmarks/formulas/:formulaId", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    const userId = getUserId(req)!;
    const formulaId = parseInt(req.params.formulaId);
    const { note } = req.body;
    const added = await storage.toggleFormulaBookmark(userId, formulaId, note);
    res.json({ bookmarked: added });
  } catch (error) {
    console.error("Error toggling formula bookmark:", error);
    res.status(500).json({ error: "Failed to toggle bookmark" });
  }
});

// ============ FLASHCARDS ROUTES (Public) ============

router.get("/flashcards", async (req: Request, res: Response) => {
  try {
    const { subject, deckId, limit } = req.query;

    // Check if user is premium for anything other than the first deck
    const isPremium = await isPremiumUser(req);
    if (!isPremium) {
      const dId = deckId ? parseInt(deckId as string) : null;
      if (dId) {
        // Find the first deck
        const [firstDeck] = await db.select({ id: flashcardDecks.id }).from(flashcardDecks).orderBy(flashcardDecks.id).limit(1);
        if (firstDeck && dId !== firstDeck.id) {
          return res.status(402).json({
            error: "PAYMENT_REQUIRED",
            message: "Accessing this flashcard deck requires a Premium subscription."
          });
        }
      }
    }

    let query = db
      .select({
        id: flashcards.id,
        front: flashcards.frontContent,
        back: flashcards.backContent,
        order: flashcards.id,
        deckId: flashcardDecks.id,
        createdAt: sql<string | null>`NULL`,
        deckName: flashcardDecks.name,
        deckSubject: flashcardDecks.subject,
        topicId: flashcards.topicId,
      })
      .from(flashcards)
      .leftJoin(flashcardDecks, eq(flashcards.topicId, flashcardDecks.topicId));

    const conditions: any[] = [];

    if (subject) {
      conditions.push(eq(flashcardDecks.subject, subject as string));
    }

    if (deckId) {
      conditions.push(eq(flashcardDecks.id, parseInt(deckId as string)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    query = query.orderBy(flashcards.id);

    if (limit) {
      query = query.limit(parseInt(limit as string)) as typeof query;
    }

    const results = await query;
    res.json(results);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    res.status(500).json({ error: "Failed to fetch flashcards" });
  }
});

router.get("/flashcards/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const [card] = await db
      .select({
        id: flashcards.id,
        front: flashcards.frontContent,
        back: flashcards.backContent,
        order: flashcards.id,
        deckId: flashcardDecks.id,
        createdAt: sql<string | null>`NULL`,
        deckName: flashcardDecks.name,
        deckSubject: flashcardDecks.subject,
        topicId: flashcards.topicId,
      })
      .from(flashcards)
      .leftJoin(flashcardDecks, eq(flashcards.topicId, flashcardDecks.topicId))
      .where(eq(flashcards.id, id))
      .limit(1);

    if (!card) {
      return res.status(404).json({ error: "Flashcard not found" });
    }
    res.json(card);
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    res.status(500).json({ error: "Failed to fetch flashcard" });
  }
});

router.get("/flashcard-decks", async (req: Request, res: Response) => {
  try {
    const { subject } = req.query;

    let query = db
      .select({
        id: flashcardDecks.id,
        name: flashcardDecks.name,
        subject: flashcardDecks.subject,
        topicId: flashcardDecks.topicId,
        description: flashcardDecks.description,
        createdAt: flashcardDecks.createdAt,
        cardCount: sql<number>`count(${flashcards.id})`,
      })
      .from(flashcardDecks)
      .leftJoin(flashcards, eq(flashcards.topicId, flashcardDecks.topicId))
      .groupBy(flashcardDecks.id);

    if (subject) {
      query = query.where(eq(flashcardDecks.subject, subject as string)) as typeof query;
    }

    const results = await query.orderBy(flashcardDecks.name);

    // Limit to 1 deck for free users
    const isPremium = await isPremiumUser(req);
    if (!isPremium && results.length > 1) {
      return res.json(results.slice(0, 1));
    }

    res.json(results);
  } catch (error) {
    console.error("Error fetching flashcard decks:", error);
    res.status(500).json({ error: "Failed to fetch flashcard decks" });
  }
});

// ============ SPACED REPETITION / FLASHCARD PROGRESS (Auth Required) ============

router.get("/flashcard-progress", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const isPremium = await isPremiumUser(req);
  if (!isPremium) {
    return res.status(402).json({
      error: "PAYMENT_REQUIRED",
      message: "Spaced repetition tracking is a Premium feature."
    });
  }

  try {
    const userId = getUserId(req)!;
    const deckId = req.query.deckId ? parseInt(req.query.deckId as string) : undefined;
    const progress = await storage.getUserFlashcardProgress(userId, deckId);
    res.json(progress);
  } catch (error) {
    console.error("Error fetching flashcard progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

router.get("/flashcard-progress/due", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const isPremium = await isPremiumUser(req);
  if (!isPremium) {
    return res.status(402).json({
      error: "PAYMENT_REQUIRED",
      message: "Spaced repetition (Due for Review) is a Premium feature."
    });
  }

  try {
    const userId = getUserId(req)!;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const { subject } = req.query;

    const now = new Date();
    let query = db
      .select({
        id: flashcards.id,
        front: flashcards.frontContent,
        back: flashcards.backContent,
        order: flashcards.id,
        deckId: flashcardDecks.id,
        createdAt: sql<string | null>`NULL`,
        deckName: flashcardDecks.name,
        deckSubject: flashcardDecks.subject,
        topicId: flashcards.topicId,
        progressId: userFlashcardProgress.id,
        easeFactor: userFlashcardProgress.easeFactor,
        interval: userFlashcardProgress.interval,
        repetitions: userFlashcardProgress.repetitions,
        nextReviewAt: userFlashcardProgress.nextReview,
        lastReviewedAt: userFlashcardProgress.lastReviewed,
      })
      .from(userFlashcardProgress)
      .innerJoin(flashcards, eq(userFlashcardProgress.flashcardId, flashcards.id))
      .leftJoin(flashcardDecks, eq(flashcards.topicId, flashcardDecks.topicId))
      .where(
        and(
          eq(userFlashcardProgress.userId, userId),
          lte(userFlashcardProgress.nextReview, now),
          ...(subject ? [eq(flashcardDecks.subject, subject as string)] : [])
        )
      )
      .orderBy(asc(userFlashcardProgress.nextReview))
      .limit(limit);

    const results = await query;
    res.json(results);
  } catch (error) {
    console.error("Error fetching due flashcards:", error);
    res.status(500).json({ error: "Failed to fetch due flashcards" });
  }
});

router.get("/flashcard-progress/stats", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const isPremium = await isPremiumUser(req);
  if (!isPremium) {
    return res.json({
      dueToday: 0,
      learned: 0,
      reviewedToday: 0,
      total: 0,
      isPremiumLocked: true
    });
  }

  try {
    const userId = getUserId(req)!;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [dueResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(userFlashcardProgress)
      .where(and(
        eq(userFlashcardProgress.userId, userId),
        lte(userFlashcardProgress.nextReview, now)
      ));

    const [learnedResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(userFlashcardProgress)
      .where(and(
        eq(userFlashcardProgress.userId, userId),
        sql`${userFlashcardProgress.interval} > 21`
      ));

    const [reviewedTodayResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(userFlashcardProgress)
      .where(and(
        eq(userFlashcardProgress.userId, userId),
        sql`${userFlashcardProgress.lastReviewed} >= ${startOfToday}`
      ));

    const [totalResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(userFlashcardProgress)
      .where(eq(userFlashcardProgress.userId, userId));

    res.json({
      dueToday: Number(dueResult.count),
      learned: Number(learnedResult.count),
      reviewedToday: Number(reviewedTodayResult.count),
      total: Number(totalResult.count),
    });
  } catch (error) {
    console.error("Error fetching flashcard stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.post("/flashcard-progress/:flashcardId/review", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const isPremium = await isPremiumUser(req);
  if (!isPremium) {
    return res.status(402).json({
      error: "PAYMENT_REQUIRED",
      message: "Saving flashcard progress requires a Premium subscription."
    });
  }

  try {
    const userId = getUserId(req)!;
    const flashcardId = parseInt(req.params.flashcardId);
    const { quality } = req.body;

    if (quality < 0 || quality > 5) {
      return res.status(400).json({ error: "Quality must be between 0 and 5" });
    }

    const progress = await storage.updateFlashcardProgress(userId, flashcardId, quality);
    res.json(progress);
  } catch (error) {
    console.error("Error updating flashcard progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

// ============ CHAPTER & TOPIC NAVIGATION ============

router.get("/chapters", async (req: Request, res: Response) => {
  try {
    const { subject, classLevel } = req.query;
    let query = db.select().from(chapterContent);

    if (subject) {
      query = query.where(eq(chapterContent.subject, subject as string)) as any;
    }

    const chapters = await query.orderBy(
      asc(chapterContent.subject),
      asc(chapterContent.classLevel),
      asc(chapterContent.chapterNumber)
    );

    // Filter by classLevel if provided
    let result = chapters;
    if (classLevel) {
      result = chapters.filter(c => c.classLevel === classLevel);
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
});

router.get("/chapters/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const [chapter] = await db
      .select()
      .from(chapterContent)
      .where(eq(chapterContent.id, id))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ error: "Failed to fetch chapter" });
  }
});

router.get("/chapters/:id/content", async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.id);

    const [keypoints, formulas] = await Promise.all([
      storage.getKeypoints({ chapterId }),
      storage.getFormulas({ chapterId }),
    ]);

    res.json({
      keypoints,
      formulas,
    });
  } catch (error) {
    console.error("Error fetching chapter content:", error);
    res.status(500).json({ error: "Failed to fetch chapter content" });
  }
});

router.get("/topics", async (req: Request, res: Response) => {
  try {
    const { subject, classLevel } = req.query;
    const topics = await storage.getAllTopics();

    // Filter if params provided
    let filtered = topics;
    if (subject) {
      filtered = filtered.filter(t => t.subject === subject);
    }
    if (classLevel) {
      filtered = filtered.filter(t => t.classLevel === classLevel);
    }

    res.json(filtered);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

// ============ CONTINUE LEARNING (Auth Required) ============

router.get("/continue-learning", async (req: Request, res: Response) => {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const isPremium = await isPremiumUser(req);
  if (!isPremium) {
    return res.status(402).json({
      error: "PAYMENT_REQUIRED",
      message: "The 'Continue Learning' dashboard feature is exclusive to Premium members."
    });
  }

  try {
    const userId = getUserId(req)!;

    // Get the most recently accessed topic that's not complete
    const progress = await storage.getUserTopicProgress(userId);
    const inProgress = progress
      .filter(p => !p.isCompleted && p.lastAccessedAt)
      .sort((a, b) => {
        const dateA = a.lastAccessedAt ? new Date(a.lastAccessedAt).getTime() : 0;
        const dateB = b.lastAccessedAt ? new Date(b.lastAccessedAt).getTime() : 0;
        return dateB - dateA;
      });

    if (inProgress.length === 0) {
      return res.json({ continueLearning: null, weakAreas: [], dueFlashcards: 0 });
    }

    // Get weak areas and due flashcards count
    const [weakAreas, dueFlashcards] = await Promise.all([
      storage.getWeakAreas(userId, 5),
      storage.getDueFlashcards(userId, 100),
    ]);

    res.json({
      continueLearning: inProgress[0],
      weakAreas,
      dueFlashcards: dueFlashcards.length,
    });
  } catch (error) {
    console.error("Error fetching continue learning:", error);
    res.status(500).json({ error: "Failed to fetch continue learning data" });
  }
});

// ============ SYLLABUS OVERVIEW ============

router.get("/syllabus", async (req: Request, res: Response) => {
  try {
    const { subject: subjectFilter } = req.query;

    // Get all chapters
    let query = db.select().from(chapterContent);
    if (subjectFilter) {
      query = query.where(eq(chapterContent.subject, subjectFilter as string)) as any;
    }

    const chapters = await query.orderBy(
      asc(chapterContent.subject),
      asc(chapterContent.classLevel),
      asc(chapterContent.chapterNumber)
    );

    // Group by subject
    const syllabus: Record<string, any[]> = {};
    for (const chapter of chapters) {
      if (!syllabus[chapter.subject]) {
        syllabus[chapter.subject] = [];
      }
      syllabus[chapter.subject].push({
        id: chapter.id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.chapterTitle,
        classLevel: chapter.classLevel,
        difficultyLevel: chapter.difficultyLevel,
        estimatedStudyMinutes: chapter.estimatedStudyMinutes,
      });
    }

    res.json(syllabus);
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    res.status(500).json({ error: "Failed to fetch syllabus" });
  }
});

export default router;
