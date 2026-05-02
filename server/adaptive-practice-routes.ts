/**
 * Adaptive Practice Engine — IRT/Elo-based + BKT
 * Phase 1.2 — Adaptive question difficulty with Bayesian Knowledge Tracing
 */
import { Router } from 'express';
import { requireAuth } from './auth';
import { db } from './db';
import { questions, userPerformance, contentTopics, users } from '@shared/schema';
import { eq, and, sql, desc } from 'drizzle-orm';
import { logger } from './lib/logger';

const apLog = logger.child({ module: 'adaptive-practice' });
const router = Router();

// IRT: 2PL model for question difficulty estimation
function irtProbability(ability: number, difficulty: number, discrimination: number = 1.0): number {
  return 1 / (1 + Math.exp(-discrimination * (ability - difficulty)));
}

// Elo rating update
function eloUpdate(current: number, expected: number, actual: number, k: number = 32): number {
  return current + k * (actual - expected);
}

// BKT: Bayesian Knowledge Tracing per concept
interface BKTParams {
  pKnown: number;    // P(L_n) — probability student knows the concept
  pLearn: number;    // P(T) — probability of learning per opportunity (default 0.1)
  pGuess: number;    // P(G) — probability of guessing correctly (default 0.25 for MCQ)
  pSlip: number;     // P(S) — probability of slipping (default 0.1)
}

function bktUpdate(params: BKTParams, isCorrect: boolean): BKTParams {
  const { pKnown, pLearn, pGuess, pSlip } = params;
  
  // P(correct | known) = 1 - pSlip
  // P(correct | not known) = pGuess
  const pCorrectGivenKnown = 1 - pSlip;
  const pCorrectGivenNotKnown = pGuess;
  
  let pKnownGivenObs: number;
  
  if (isCorrect) {
    const pCorrect = pKnown * pCorrectGivenKnown + (1 - pKnown) * pCorrectGivenNotKnown;
    pKnownGivenObs = (pKnown * pCorrectGivenKnown) / pCorrect;
  } else {
    const pIncorrect = pKnown * pSlip + (1 - pKnown) * (1 - pGuess);
    pKnownGivenObs = (pKnown * pSlip) / pIncorrect;
  }
  
  // Update with learning probability
  const newPKnown = pKnownGivenObs + (1 - pKnownGivenObs) * pLearn;
  
  return { ...params, pKnown: Math.min(0.999, Math.max(0.001, newPKnown)) };
}

// Get adaptive question set for a user
router.get('/adaptive-set', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const subject = req.query.subject as string;
    const count = Math.min(parseInt(req.query.count as string) || 10, 50);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Get user's performance history
    const history = await db.select({
      questionId: userPerformance.questionId,
      isCorrect: userPerformance.isCorrect,
      timeTaken: userPerformance.timeTakenSec,
    }).from(userPerformance)
      .where(eq(userPerformance.userId, userId))
      .orderBy(desc(userPerformance.attemptDate))
      .limit(500);

    // Calculate user ability (Elo-based)
    let userAbility = 1000; // Default ability
    for (const h of history.reverse()) {
      const expectedScore = irtProbability(userAbility / 400, 2.5);
      userAbility = eloUpdate(userAbility, expectedScore, h.isCorrect ? 1 : 0, 16);
    }

    // Map ability to difficulty range (1-5)
    const targetDifficulty = Math.max(1, Math.min(5, Math.round(userAbility / 400)));
    
    // Get questions with spread around target difficulty
    const conditions: any[] = [];
    if (subject) {
      const topics = await db.select({ id: contentTopics.id })
        .from(contentTopics).where(eq(contentTopics.subject, subject));
      const topicIds = topics.map(t => t.id);
      if (topicIds.length > 0) {
        conditions.push(sql`${questions.topicId} = ANY(ARRAY[${sql.raw(topicIds.join(','))}]::int[])`);
      }
    }

    // Exclude recently attempted questions
    const recentIds = history.slice(-100).map(h => h.questionId);
    
    const availableQuestions = await db.select()
      .from(questions)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .limit(count * 5);

    // Score questions by proximity to target difficulty + novelty
    const scored = availableQuestions
      .filter(q => !recentIds.includes(q.id))
      .map(q => {
        const diff = q.difficultyLevel || 3;
        const proximityScore = 1 / (1 + Math.abs(diff - targetDifficulty));
        const noveltyBonus = recentIds.includes(q.id) ? 0 : 0.3;
        return { question: q, score: proximityScore + noveltyBonus + Math.random() * 0.2 };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, count);

    res.json({
      questions: scored.map(s => s.question),
      userAbility: Math.round(userAbility),
      targetDifficulty,
      totalAvailable: availableQuestions.length,
    });
  } catch (error: any) {
    apLog.error('Adaptive set error', { error: error.message });
    res.status(500).json({ error: 'Failed to generate adaptive set' });
  }
});

// POST /api/adaptive/submit — Submit answer and update BKT
router.post('/submit', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const { questionId, answer, timeTakenSec } = req.body;

    const [question] = await db.select().from(questions).where(eq(questions.id, questionId)).limit(1);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    const isCorrect = answer === question.correctAnswer;

    // Record attempt
    await db.insert(userPerformance).values({
      userId, questionId, userAnswer: answer, isCorrect, timeTakenSec,
    });

    // Update adaptive profile on user
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const profile = (user?.adaptiveProfile as any) || {};
    const masteryScores = profile.masteryScores || {};
    
    // Get topic for this question
    const [topic] = await db.select().from(contentTopics)
      .where(eq(contentTopics.id, question.topicId)).limit(1);
    
    if (topic) {
      const topicKey = `${topic.subject}_${topic.id}`;
      const currentBKT: BKTParams = masteryScores[topicKey] || {
        pKnown: 0.3, pLearn: 0.1, pGuess: 0.25, pSlip: 0.1,
      };
      
      const updated = bktUpdate(currentBKT, isCorrect);
      masteryScores[topicKey] = updated;

      // Update weak areas (pKnown < 0.5)
      const weakAreas = Object.entries(masteryScores)
        .filter(([_, v]: any) => v.pKnown < 0.5)
        .map(([k]) => k);

      await db.update(users).set({
        adaptiveProfile: { ...profile, masteryScores, weakAreas },
      }).where(eq(users.id, userId));
    }

    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      solutionSteps: question.solutionSteps,
    });
  } catch (error: any) {
    apLog.error('Submit error', { error: error.message });
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// GET /api/adaptive/daily-plan — Personalized daily study plan
router.get('/daily-plan', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    const profile = (user?.adaptiveProfile as any) || {};
    const masteryScores = profile.masteryScores || {};
    const weakAreas = profile.weakAreas || [];
    
    // Build daily plan
    const plan = {
      greeting: getTimeGreeting(),
      date: new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' }),
      tasks: [] as any[],
      estimatedMinutes: 0,
    };

    // 1. Weak area practice
    if (weakAreas.length > 0) {
      const weakestTopic = weakAreas[0];
      plan.tasks.push({
        type: 'practice',
        title: `Strengthen: ${weakestTopic.split('_')[0]}`,
        description: 'Focus on your weakest area with adaptive questions',
        questionCount: 12,
        estimatedMinutes: 15,
        priority: 'high',
      });
      plan.estimatedMinutes += 15;
    }

    // 2. Mock test section
    plan.tasks.push({
      type: 'mock_section',
      title: 'Quick Mock Section',
      description: '20 questions timed practice',
      questionCount: 20,
      estimatedMinutes: 25,
      priority: 'medium',
    });
    plan.estimatedMinutes += 25;

    // 3. Flashcard review
    plan.tasks.push({
      type: 'flashcards',
      title: 'Spaced Repetition Review',
      description: 'Review due flashcards',
      cardCount: 8,
      estimatedMinutes: 10,
      priority: 'medium',
    });
    plan.estimatedMinutes += 10;

    // 4. Chapter reading
    plan.tasks.push({
      type: 'read',
      title: 'Read & Revise',
      description: 'Continue your current chapter',
      estimatedMinutes: 20,
      priority: 'low',
    });
    plan.estimatedMinutes += 20;

    res.json(plan);
  } catch (error: any) {
    apLog.error('Daily plan error', { error: error.message });
    res.status(500).json({ error: 'Failed to generate daily plan' });
  }
});

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅 Good Morning!';
  if (hour < 17) return '☀️ Good Afternoon!';
  return '🌙 Good Evening!';
}

export default router;
