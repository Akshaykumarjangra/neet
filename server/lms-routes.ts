// @ts-nocheck
import { Router, type Request, type Response } from "express";
import { db } from "./db";
import {
  chapterContent,
  userChapterSessions,
  userChapterBookmarks,
  userChapterNotes,
  userChapterProgress,
  xpTransactions,
  insertUserChapterSessionSchema,
  insertUserChapterBookmarkSchema,
  insertUserChapterNoteSchema,
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { requireAuth, requireAuthWithPasswordCheck } from "./auth";
import { GamificationService } from "./gamification";

const router = Router();

const parseBool = (value: unknown, defaultValue = false) => {
  if (value === undefined || value === null) return defaultValue;
  if (typeof value === "string") {
    return ["true", "1", "yes", "on"].includes(value.toLowerCase());
  }
  return Boolean(value);
};

router.get("/library", async (req, res) => {
  const started = Date.now();
  let responseSent = false;
  
  const timeout = setTimeout(() => {
    if (!responseSent && !res.headersSent) {
      responseSent = true;
      console.warn(`[library] timeout exceeded 30s`);
      res.status(504).json({ error: "Request timeout" });
    }
  }, 30000); // 30 second timeout

  try {
    const userId = req.session.userId;
    const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 200, 1), 200);
    const offset = Math.max(parseInt(req.query.offset as string) || 0, 0);
    const includeProgress = parseBool(req.query.includeProgress, false);

    // Simple optimized query - no subqueries, fetch chapters only
    const chapters = await db
      .select({
        id: chapterContent.id,
        subject: chapterContent.subject,
        classLevel: chapterContent.classLevel,
        chapterNumber: chapterContent.chapterNumber,
        chapterTitle: chapterContent.chapterTitle,
        introduction: chapterContent.introduction,
        difficultyLevel: chapterContent.difficultyLevel,
        estimatedStudyMinutes: chapterContent.estimatedStudyMinutes,
        status: chapterContent.status,
        visualizationsData: chapterContent.visualizationsData,
        keyConcepts: chapterContent.keyConcepts,
      })
      .from(chapterContent)
      .where(eq(chapterContent.status, "published"))
      .orderBy(
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber
      )
      .limit(limit)
      .offset(offset);

    // If user logged in and wants progress, fetch it separately (faster)
    let enrichedChapters = chapters;
    if (userId && includeProgress) {
      const progressMap = new Map();
      const bookmarkedMap = new Map();
      const lastAccessedMap = new Map();

      // Fetch progress for all chapters in one go
      const progress = await db
        .select({
          chapterId: userChapterProgress.chapterId,
          completionPercentage: userChapterProgress.completionPercentage,
        })
        .from(userChapterProgress)
        .where(eq(userChapterProgress.userId, userId));

      progress.forEach((p) => progressMap.set(p.chapterId, p.completionPercentage));

      // Fetch bookmarks
      const bookmarks = await db
        .select({ chapterContentId: userChapterBookmarks.chapterContentId })
        .from(userChapterBookmarks)
        .where(eq(userChapterBookmarks.userId, userId));

      bookmarks.forEach((b) => bookmarkedMap.set(b.chapterContentId, true));

      // Fetch last accessed
      const sessions = await db
        .select({
          chapterContentId: userChapterSessions.chapterContentId,
          lastAccessed: sql<Date>`MAX(${userChapterSessions.startedAt})`,
        })
        .from(userChapterSessions)
        .where(eq(userChapterSessions.userId, userId))
        .groupBy(userChapterSessions.chapterContentId);

      sessions.forEach((s) => lastAccessedMap.set(s.chapterContentId, s.lastAccessed));

      enrichedChapters = chapters.map((ch) => ({
        ...ch,
        progress: progressMap.get(`${ch.subject}-${ch.classLevel}-${ch.chapterNumber}`) || 0,
        isBookmarked: bookmarkedMap.has(ch.id) || false,
        lastAccessed: lastAccessedMap.get(ch.id) || null,
      }));
    }

    clearTimeout(timeout);
    if (!responseSent) {
      responseSent = true;
      const duration = Date.now() - started;
      console.log(
        `[library] user=${userId || "anon"} rows=${chapters.length} limit=${limit} offset=${offset} progress=${includeProgress} duration=${duration}ms`
      );
      res.json(enrichedChapters);
    }
  } catch (error: any) {
    clearTimeout(timeout);
    if (!responseSent && !res.headersSent) {
      responseSent = true;
      console.error("[library] error", error?.message || error);
      res.status(500).json({ error: error.message || "Failed to fetch library" });
    }
  }
});

router.get("/progress", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;

    const progressData = await db
      .select({
        chapterId: userChapterProgress.chapterId,
        completionPercentage: userChapterProgress.completionPercentage,
        masteryLevel: userChapterProgress.masteryLevel,
        timeSpentMinutes: userChapterProgress.timeSpentMinutes,
        lastAccessedAt: userChapterProgress.lastAccessedAt,
        notesCompleted: userChapterProgress.notesCompleted,
        visualizationsViewed: userChapterProgress.visualizationsViewed,
        practiceQuestionsAttempted: userChapterProgress.practiceQuestionsAttempted,
        quizCompleted: userChapterProgress.quizCompleted,
      })
      .from(userChapterProgress)
      .where(eq(userChapterProgress.userId, userId))
      .orderBy(desc(userChapterProgress.lastAccessedAt));

    const totalSessions = await db
      .select({
        count: sql<number>`COUNT(*)`,
        totalMinutes: sql<number>`COALESCE(SUM(${userChapterSessions.durationMinutes}), 0)`,
      })
      .from(userChapterSessions)
      .where(eq(userChapterSessions.userId, userId));

    res.json({
      progress: progressData,
      sessions: totalSessions[0],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sessions", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const { chapterContentId, sectionsViewed, interactionCount } = req.body;

    const [session] = await db
      .insert(userChapterSessions)
      .values({
        userId,
        chapterContentId: parseInt(chapterContentId),
        sectionsViewed: sectionsViewed || [],
        interactionCount: interactionCount || 0,
      })
      .returning();

    // Award XP for first view (anti-farming: check xpTransactions)
    const [existingViewXp] = await db
      .select()
      .from(xpTransactions)
      .where(
        and(
          eq(xpTransactions.userId, userId),
          eq(xpTransactions.source, 'chapter_view'),
          eq(xpTransactions.sourceId, chapterContentId.toString())
        )
      )
      .limit(1);

    // Award XP only if never awarded before for this chapter
    if (!existingViewXp) {
      const [chapter] = await db
        .select({ title: chapterContent.chapterTitle })
        .from(chapterContent)
        .where(eq(chapterContent.id, parseInt(chapterContentId)))
        .limit(1);

      await GamificationService.awardXp(userId, 20, {
        type: 'chapter_view',
        sourceId: chapterContentId.toString(),
        description: `First view: ${chapter?.title || 'Chapter'}`,
      });
    }

    // Check for achievements (chapters_viewed, total_study_time)
    await GamificationService.checkAchievements(userId);

    res.status(201).json(session);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/sessions/:id", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const sessionId = parseInt(req.params.id);
    const { endedAt, durationMinutes, sectionsViewed, interactionCount } = req.body;

    const [updatedSession] = await db
      .update(userChapterSessions)
      .set({
        endedAt,
        durationMinutes,
        sectionsViewed,
        interactionCount,
      })
      .where(
        and(
          eq(userChapterSessions.id, sessionId),
          eq(userChapterSessions.userId, userId)
        )
      )
      .returning();

    if (!updatedSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Award XP for study time (5 XP per 10 minutes) - but only once per session
    if (durationMinutes && durationMinutes >= 10) {
      // Check if XP already awarded for this session
      const [existingXp] = await db
        .select()
        .from(xpTransactions)
        .where(
          and(
            eq(xpTransactions.userId, userId),
            eq(xpTransactions.source, 'study_time'),
            eq(xpTransactions.sourceId, sessionId.toString())
          )
        )
        .limit(1);

      // Only award if not already awarded
      if (!existingXp) {
        const studyXp = Math.floor(durationMinutes / 10) * 5;

        const [chapter] = await db
          .select({ title: chapterContent.chapterTitle })
          .from(chapterContent)
          .where(eq(chapterContent.id, updatedSession.chapterContentId))
          .limit(1);

        await GamificationService.awardXp(userId, studyXp, {
          type: 'study_time',
          sourceId: sessionId.toString(),
          description: `${durationMinutes} min studying ${chapter?.title || 'chapter'}`,
        });
      }
    }

    // Check for achievements (total_study_time)
    await GamificationService.checkAchievements(userId);

    res.json(updatedSession);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/bookmarks", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;

    const bookmarks = await db
      .select({
        id: userChapterBookmarks.id,
        chapterContentId: userChapterBookmarks.chapterContentId,
        sectionId: userChapterBookmarks.sectionId,
        notes: userChapterBookmarks.notes,
        createdAt: userChapterBookmarks.createdAt,
        chapter: {
          id: chapterContent.id,
          subject: chapterContent.subject,
          classLevel: chapterContent.classLevel,
          chapterNumber: chapterContent.chapterNumber,
          chapterTitle: chapterContent.chapterTitle,
        },
      })
      .from(userChapterBookmarks)
      .innerJoin(
        chapterContent,
        eq(userChapterBookmarks.chapterContentId, chapterContent.id)
      )
      .where(eq(userChapterBookmarks.userId, userId))
      .orderBy(desc(userChapterBookmarks.createdAt));

    res.json(bookmarks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/bookmarks", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const validatedData = insertUserChapterBookmarkSchema.parse({
      ...req.body,
      userId,
    });

    const [bookmark] = await db
      .insert(userChapterBookmarks)
      .values(validatedData)
      .returning();

    // Check for achievements (bookmarks_created)
    await GamificationService.checkAchievements(userId);

    res.status(201).json(bookmark);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/bookmarks/:id", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const bookmarkId = parseInt(req.params.id);

    const [deletedBookmark] = await db
      .delete(userChapterBookmarks)
      .where(
        and(
          eq(userChapterBookmarks.id, bookmarkId),
          eq(userChapterBookmarks.userId, userId)
        )
      )
      .returning();

    if (!deletedBookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.json({ message: "Bookmark deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/notes", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const { chapterContentId } = req.query;

    const whereConditions = chapterContentId
      ? and(
        eq(userChapterNotes.userId, userId),
        eq(userChapterNotes.chapterContentId, parseInt(chapterContentId as string))
      )
      : eq(userChapterNotes.userId, userId);

    const notes = await db
      .select()
      .from(userChapterNotes)
      .where(whereConditions)
      .orderBy(desc(userChapterNotes.createdAt));

    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/notes", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const validatedData = insertUserChapterNoteSchema.parse({
      ...req.body,
      userId,
    });

    const [note] = await db
      .insert(userChapterNotes)
      .values(validatedData)
      .returning();

    // Award XP for first note on this chapter (anti-farming: check xpTransactions)
    const [existingNoteXp] = await db
      .select()
      .from(xpTransactions)
      .where(
        and(
          eq(xpTransactions.userId, userId),
          eq(xpTransactions.source, 'note'),
          eq(xpTransactions.sourceId, validatedData.chapterContentId.toString())
        )
      )
      .limit(1);

    // Award XP only if never awarded before for this chapter
    if (!existingNoteXp) {
      const [chapter] = await db
        .select({ title: chapterContent.chapterTitle })
        .from(chapterContent)
        .where(eq(chapterContent.id, validatedData.chapterContentId))
        .limit(1);

      await GamificationService.awardXp(userId, 30, {
        type: 'note',
        sourceId: validatedData.chapterContentId.toString(),
        description: `First note on ${chapter?.title || 'chapter'}`,
      });
    }

    // Check for achievements (notes_created, chapters_with_notes)
    await GamificationService.checkAchievements(userId);

    res.status(201).json(note);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/notes/:id", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const noteId = parseInt(req.params.id);
    const { noteText, highlightText, color } = req.body;

    const [updatedNote] = await db
      .update(userChapterNotes)
      .set({
        noteText,
        highlightText,
        color,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userChapterNotes.id, noteId),
          eq(userChapterNotes.userId, userId)
        )
      )
      .returning();

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/notes/:id", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const noteId = parseInt(req.params.id);

    const [deletedNote] = await db
      .delete(userChapterNotes)
      .where(
        and(
          eq(userChapterNotes.id, noteId),
          eq(userChapterNotes.userId, userId)
        )
      )
      .returning();

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/learning-path/next", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;

    const allChaptersData = await db
      .select({
        id: chapterContent.id,
        subject: chapterContent.subject,
        classLevel: chapterContent.classLevel,
        chapterNumber: chapterContent.chapterNumber,
        chapterTitle: chapterContent.chapterTitle,
        introduction: chapterContent.introduction,
        estimatedStudyMinutes: chapterContent.estimatedStudyMinutes,
        difficultyLevel: chapterContent.difficultyLevel,
      })
      .from(chapterContent)
      .where(eq(chapterContent.status, "published"))
      .orderBy(
        chapterContent.subject,
        chapterContent.classLevel,
        chapterContent.chapterNumber
      );

    const progressData = await db
      .select()
      .from(userChapterProgress)
      .where(eq(userChapterProgress.userId, userId));

    const progressMap = new Map(
      progressData.map((p) => [p.chapterId, p])
    );

    const chapters = allChaptersData.map((chapter) => {
      const chapterId = `${chapter.subject}-${chapter.classLevel}-${chapter.chapterNumber}`;
      const progress = progressMap.get(chapterId);

      const progressCompletion = progress?.completionPercentage ?? 0;
      const isCompleted = progressCompletion >= 80;

      const prevChapterNumber = chapter.chapterNumber - 1;
      const prevChapterId = `${chapter.subject}-${chapter.classLevel}-${prevChapterNumber}`;
      const prevProgress = progressMap.get(prevChapterId);
      const prevCompletion = prevProgress?.completionPercentage ?? 0;

      const isLocked = chapter.chapterNumber > 1 && prevCompletion < 50;

      const intro = chapter.introduction ?? "";
      const description = intro.length > 150 ? intro.substring(0, 150) + "..." : intro;

      return {
        chapterId,
        title: chapter.chapterTitle,
        subject: chapter.subject,
        description,
        estimatedMinutes: chapter.estimatedStudyMinutes,
        xpReward: 50 + (chapter.difficultyLevel * 10),
        prerequisites: chapter.chapterNumber > 1 ? [prevChapterId] : [],
        isLocked,
        progress: progress ? {
          completionPercentage: progressCompletion,
          notesCompleted: progress.notesCompleted ?? false,
          visualizationsViewed: progress.visualizationsViewed ?? false,
          practiceQuestionsAttempted: progress.practiceQuestionsAttempted ?? 0,
          quizCompleted: progress.quizCompleted ?? false,
        } : undefined,
      };
    });

    const completedChapters = chapters.filter(
      (c) => c.progress && (c.progress.completionPercentage ?? 0) >= 80
    ).length;

    const nextChapter = chapters.find(
      (c) => !c.isLocked && (!c.progress || (c.progress.completionPercentage ?? 0) < 100)
    );

    res.json({
      nextChapter,
      allChapters: chapters,
      totalChapters: chapters.length,
      completedChapters,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/mastery/:chapterId", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const { chapterId } = req.params;

    const parts = chapterId.split('-');
    if (parts.length !== 3) {
      return res.status(400).json({ error: "Invalid chapter ID format" });
    }

    const [subject, classLevel, chapterNumberStr] = parts;
    const chapterNumber = parseInt(chapterNumberStr);

    const [progress] = await db
      .select()
      .from(userChapterProgress)
      .where(
        and(
          eq(userChapterProgress.userId, userId),
          eq(userChapterProgress.chapterId, chapterId)
        )
      )
      .limit(1);

    let unlocked = true;
    if (chapterNumber > 1) {
      const prevChapterId = `${subject}-${classLevel}-${chapterNumber - 1}`;
      const [prevProgress] = await db
        .select()
        .from(userChapterProgress)
        .where(
          and(
            eq(userChapterProgress.userId, userId),
            eq(userChapterProgress.chapterId, prevChapterId)
          )
        )
        .limit(1);

      unlocked = prevProgress ? (prevProgress.completionPercentage ?? 0) >= 50 : false;
    }

    if (!progress) {
      return res.json({
        masteryLevel: 0,
        completionPercentage: 0,
        timeSpent: 0,
        unlocked,
        breakdown: {
          notes: false,
          visualizations: false,
          practice: 0,
          quiz: false,
        }
      });
    }

    let masteryScore = 0;
    if (progress.notesCompleted) masteryScore += 20;
    if (progress.visualizationsViewed) masteryScore += 15;
    if (progress.practiceQuestionsAttempted >= 10) masteryScore += 30;
    if (progress.quizCompleted) masteryScore += 35;

    const masteryLevel = Math.min(100, masteryScore);

    res.json({
      masteryLevel,
      completionPercentage: progress.completionPercentage ?? 0,
      timeSpent: progress.timeSpentMinutes ?? 0,
      unlocked,
      breakdown: {
        notes: progress.notesCompleted ?? false,
        visualizations: progress.visualizationsViewed ?? false,
        practice: progress.practiceQuestionsAttempted ?? 0,
        quiz: progress.quizCompleted ?? false,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
