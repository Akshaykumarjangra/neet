import { Router } from "express";
import { db } from "./db";
import { mockTests, testSessions, xpTransactions, questions, users } from "@shared/schema";
import { eq, sql, inArray } from "drizzle-orm";
import { requireAuth, getCurrentUser } from "./auth";

const FREE_MONTHLY_TEST_LIMIT = 1;

const router = Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const tests = await db.select().from(mockTests);
    res.json(tests);
  } catch (error) {
    console.error('Error fetching mock tests:', error);
    res.status(500).json({ error: 'Failed to fetch mock tests' });
  }
});

router.get('/attempts-this-month', requireAuth, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(testSessions)
      .where(sql`${testSessions.userId} = ${userId} AND ${testSessions.startedAt} >= ${startOfMonth}`);
    
    res.json({ count: result[0]?.count ?? 0 });
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    res.status(500).json({ error: 'Failed to fetch test attempts' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const testId = parseInt(req.params.id);
    if (!Number.isInteger(testId) || testId <= 0) {
      return res.status(400).json({ error: 'Invalid test ID' });
    }

    const test = await db.select().from(mockTests).where(eq(mockTests.id, testId)).limit(1);
    
    if (test.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const questionIds = test[0].questionsList as number[];
    if (!questionIds || questionIds.length === 0) {
      return res.status(500).json({ error: 'Test has no questions' });
    }

    const testQuestions = await db
      .select()
      .from(questions)
      .where(inArray(questions.id, questionIds));

    if (testQuestions.length !== questionIds.length) {
      console.warn(`Test ${testId}: Expected ${questionIds.length} questions, found ${testQuestions.length}`);
    }

    const orderedQuestions = questionIds
      .map(id => testQuestions.find(q => q.id === id))
      .filter((q): q is typeof testQuestions[0] => q !== undefined);

    res.json({
      test: test[0],
      questions: orderedQuestions,
    });
  } catch (error) {
    console.error('Error fetching mock test:', error);
    res.status(500).json({ error: 'Failed to fetch mock test' });
  }
});

router.post('/:id/start', requireAuth, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const testId = parseInt(req.params.id);
    if (!Number.isInteger(testId) || testId <= 0) {
      return res.status(400).json({ error: 'Invalid test ID' });
    }

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.isPaidUser && user.role !== 'admin') {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const [result] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(testSessions)
        .where(sql`${testSessions.userId} = ${userId} AND ${testSessions.startedAt} >= ${startOfMonth}`);
      
      const attemptsThisMonth = result?.count ?? 0;
      
      if (attemptsThisMonth >= FREE_MONTHLY_TEST_LIMIT) {
        return res.status(403).json({ 
          error: 'PREMIUM_REQUIRED',
          message: 'You have used your free mock test for this month. Upgrade to Premium for unlimited access.',
          freeLimit: FREE_MONTHLY_TEST_LIMIT,
          attemptsUsed: attemptsThisMonth
        });
      }
    }

    const test = await db.select().from(mockTests).where(eq(mockTests.id, testId)).limit(1);
    
    if (test.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const endsAt = new Date();
    endsAt.setMinutes(endsAt.getMinutes() + test[0].durationMinutes);

    const session = await db.insert(testSessions).values({
      userId,
      testType: test[0].testType,
      questionsList: test[0].questionsList,
      startedAt: new Date(),
      endsAt,
    }).returning();

    res.json(session[0]);
  } catch (error) {
    console.error('Error starting test:', error);
    res.status(500).json({ error: 'Failed to start test' });
  }
});

router.post('/:sessionId/submit', requireAuth, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { sessionId } = req.params;
    const session = await db.select().from(testSessions)
      .where(eq(testSessions.id, sessionId))
      .limit(1);

    if (session.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const score = req.body.score || 0;
    await db.update(testSessions)
      .set({
        status: 'completed',
        score,
      })
      .where(eq(testSessions.id, sessionId));

    const xpReward = Math.floor(score / 10);
    if (xpReward > 0) {
      await db.insert(xpTransactions).values({
        userId,
        amount: xpReward,
        source: 'mock_test',
        sourceId: sessionId,
        description: `Completed mock test with score ${score}`,
      });

      await db.execute(sql`
        UPDATE users
        SET total_points = total_points + ${xpReward},
            current_level = FLOOR((total_points + ${xpReward}) / 1000) + 1
        WHERE id = ${userId}
      `);
    }

    res.json({ success: true, score, xpReward });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ error: 'Failed to submit test' });
  }
});

export default router;
