import { Router } from "express";
import { db } from "./db";
import { userChapterProgress, chapterPrerequisites, xpTransactions } from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { requireAuth, requireAuthWithPasswordCheck, getCurrentUser } from "./auth";

const router = Router();

interface ChapterInfo {
  chapterId: string;
  title: string;
  subject: string;
  description: string;
  estimatedMinutes: number;
  xpReward: number;
  prerequisites: string[];
  isLocked: boolean;
  progress?: {
    completionPercentage: number;
    notesCompleted: boolean;
    visualizationsViewed: boolean;
    practiceQuestionsAttempted: number;
    quizCompleted: boolean;
  };
}

const CHAPTERS: Record<string, Omit<ChapterInfo, 'isLocked' | 'progress'>> = {
  'physics-ch1': {
    chapterId: 'physics-ch1',
    title: 'Chapter 1: Physical World and Measurement',
    subject: 'Physics',
    description: 'Understand the physical world, units, measurements, and significant figures',
    estimatedMinutes: 120,
    xpReward: 100,
    prerequisites: [],
  },
  'physics-ch2': {
    chapterId: 'physics-ch2',
    title: 'Chapter 2: Kinematics',
    subject: 'Physics',
    description: 'Motion in a straight line, velocity, acceleration, and equations of motion',
    estimatedMinutes: 150,
    xpReward: 120,
    prerequisites: ['physics-ch1'],
  },
  'physics-ch3': {
    chapterId: 'physics-ch3',
    title: 'Chapter 3: Laws of Motion',
    subject: 'Physics',
    description: "Newton's laws, friction, circular motion, and momentum",
    estimatedMinutes: 180,
    xpReward: 150,
    prerequisites: ['physics-ch2'],
  },
  'chemistry-ch1': {
    chapterId: 'chemistry-ch1',
    title: 'Chapter 1: Some Basic Concepts of Chemistry',
    subject: 'Chemistry',
    description: 'Matter, atoms, molecules, moles, and stoichiometry',
    estimatedMinutes: 120,
    xpReward: 100,
    prerequisites: [],
  },
  'biology-ch1': {
    chapterId: 'biology-ch1',
    title: 'Chapter 1: The Living World',
    subject: 'Biology',
    description: 'What is living, biodiversity, classification, and taxonomical aids',
    estimatedMinutes: 90,
    xpReward: 80,
    prerequisites: [],
  },
};

router.get('/next', requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const userProgress = await db
      .select()
      .from(userChapterProgress)
      .where(eq(userChapterProgress.userId, userId));

    const progressMap = new Map(
      userProgress.map(p => [p.chapterId, p])
    );

    const allChapters: ChapterInfo[] = Object.values(CHAPTERS).map(chapter => {
      const progress = progressMap.get(chapter.chapterId);
      const isLocked = chapter.prerequisites.some(prereqId => {
        const prereqProgress = progressMap.get(prereqId);
        return !prereqProgress || prereqProgress.completionPercentage < 70;
      });

      return {
        ...chapter,
        isLocked,
        progress: progress ? {
          completionPercentage: progress.completionPercentage,
          notesCompleted: progress.notesCompleted,
          visualizationsViewed: progress.visualizationsViewed,
          practiceQuestionsAttempted: progress.practiceQuestionsAttempted,
          quizCompleted: progress.quizCompleted,
        } : undefined,
      };
    });

    const nextChapter = allChapters.find(ch => 
      !ch.isLocked && (!ch.progress || ch.progress.completionPercentage < 100)
    );

    res.json({
      nextChapter,
      allChapters,
      totalChapters: allChapters.length,
      completedChapters: allChapters.filter(ch => ch.progress?.completionPercentage === 100).length,
    });
  } catch (error) {
    console.error('Error fetching next chapter:', error);
    res.status(500).json({ error: 'Failed to fetch learning path' });
  }
});

router.patch('/:chapterId/progress', requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { chapterId } = req.params;
    const {
      notesCompleted,
      visualizationsViewed,
      practiceQuestionsAttempted,
      quizCompleted,
    } = req.body;

    if (!CHAPTERS[chapterId]) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    const existing = await db
      .select()
      .from(userChapterProgress)
      .where(and(
        eq(userChapterProgress.userId, userId),
        eq(userChapterProgress.chapterId, chapterId)
      ))
      .limit(1);

    const completionTasks = [
      notesCompleted ?? false,
      visualizationsViewed ?? false,
      (practiceQuestionsAttempted ?? 0) >= 10,
      quizCompleted ?? false,
    ];
    const completionPercentage = Math.round(
      (completionTasks.filter(Boolean).length / completionTasks.length) * 100
    );

    let result;
    if (existing.length === 0) {
      result = await db.insert(userChapterProgress).values({
        userId,
        chapterId,
        completionPercentage,
        notesCompleted: notesCompleted ?? false,
        visualizationsViewed: visualizationsViewed ?? false,
        practiceQuestionsAttempted: practiceQuestionsAttempted ?? 0,
        quizCompleted: quizCompleted ?? false,
        lastAccessedAt: new Date(),
        masteryLevel: completionPercentage >= 90 ? 'gold' : completionPercentage >= 70 ? 'silver' : 'bronze',
      }).returning();
    } else {
      result = await db.update(userChapterProgress)
        .set({
          completionPercentage,
          notesCompleted: notesCompleted ?? existing[0].notesCompleted,
          visualizationsViewed: visualizationsViewed ?? existing[0].visualizationsViewed,
          practiceQuestionsAttempted: practiceQuestionsAttempted ?? existing[0].practiceQuestionsAttempted,
          quizCompleted: quizCompleted ?? existing[0].quizCompleted,
          lastAccessedAt: new Date(),
          masteryLevel: completionPercentage >= 90 ? 'gold' : completionPercentage >= 70 ? 'silver' : 'bronze',
        })
        .where(and(
          eq(userChapterProgress.userId, userId),
          eq(userChapterProgress.chapterId, chapterId)
        ))
        .returning();
    }

    if (completionPercentage === 100 && existing.length > 0 && existing[0].completionPercentage < 100) {
      const chapter = CHAPTERS[chapterId];
      await db.insert(xpTransactions).values({
        userId,
        amount: chapter.xpReward,
        source: 'chapter_completion',
        sourceId: chapterId,
        description: `Completed ${chapter.title}`,
      });

      await db.execute(sql`
        UPDATE users
        SET total_points = total_points + ${chapter.xpReward},
            current_level = FLOOR((total_points + ${chapter.xpReward}) / 1000) + 1
        WHERE id = ${userId}
      `);
    }

    res.json({
      success: true,
      progress: result[0],
      xpAwarded: completionPercentage === 100 && existing.length > 0 && existing[0].completionPercentage < 100 ? CHAPTERS[chapterId].xpReward : 0,
    });
  } catch (error) {
    console.error('Error updating chapter progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;
