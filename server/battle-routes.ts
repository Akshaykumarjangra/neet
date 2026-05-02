/**
 * Battle Mode — 1v1 PvP Live MCQ Duels
 * Phase 3.2 — Real-time battles via WebSocket with Glicko ratings
 */
import { Router } from 'express';
import { requireAuth } from './auth';
import { db } from './db';
import { questions, contentTopics, users } from '@shared/schema';
import { eq, sql } from 'drizzle-orm';
import { logger } from './lib/logger';

const battleLog = logger.child({ module: 'battle-mode' });
const router = Router();

// In-memory matchmaking queue and active battles
const matchmakingQueue: Map<string, { userId: string; rating: number; subject?: string; joinedAt: number }> = new Map();
const activeBattles: Map<string, BattleState> = new Map();

interface BattleState {
  id: string;
  players: { userId: string; name: string; rating: number; score: number; answers: Record<number, { answer: string; time: number }> }[];
  questions: any[];
  currentQuestion: number;
  startedAt: number;
  status: 'waiting' | 'active' | 'finished';
  subject?: string;
  roundDurationMs: number;
}

// Glicko-2 simplified rating update
function glickoUpdate(winnerRating: number, loserRating: number): { winner: number; loser: number } {
  const K = 32;
  const expectedWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
  const expectedLoser = 1 - expectedWinner;
  return {
    winner: Math.round(winnerRating + K * (1 - expectedWinner)),
    loser: Math.round(loserRating + K * (0 - expectedLoser)),
  };
}

// POST /api/battle/join — Join matchmaking queue
router.post('/join', requireAuth, async (req, res) => {
  const userId = (req as any).user?.id;
  const { subject } = req.body;
  
  if (matchmakingQueue.has(userId)) {
    return res.json({ status: 'already_queued' });
  }

  // Check if already in a battle
  for (const [, battle] of activeBattles) {
    if (battle.players.some(p => p.userId === userId) && battle.status === 'active') {
      return res.json({ status: 'in_battle', battleId: battle.id });
    }
  }

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const rating = user?.totalPoints || 1000;

  matchmakingQueue.set(userId, { userId, rating, subject, joinedAt: Date.now() });

  // Try to match immediately
  const match = findMatch(userId, rating, subject);
  if (match) {
    const battle = await createBattle(
      { userId, name: user?.name || 'Player 1', rating },
      match,
      subject
    );
    matchmakingQueue.delete(userId);
    matchmakingQueue.delete(match.userId);
    return res.json({ status: 'matched', battleId: battle.id });
  }

  res.json({ status: 'queued', position: matchmakingQueue.size });
});

// POST /api/battle/leave — Leave matchmaking
router.post('/leave', requireAuth, (req, res) => {
  matchmakingQueue.delete((req as any).user?.id);
  res.json({ status: 'left' });
});

// GET /api/battle/:id — Get battle state
router.get('/:id', requireAuth, (req, res) => {
  const battle = activeBattles.get(req.params.id);
  if (!battle) return res.status(404).json({ error: 'Battle not found' });
  
  const userId = (req as any).user?.id;
  const isPlayer = battle.players.some(p => p.userId === userId);
  if (!isPlayer) return res.status(403).json({ error: 'Not in this battle' });

  // Hide correct answers for active battles
  const sanitizedQuestions = battle.status === 'active'
    ? battle.questions.map(q => ({ ...q, correctAnswer: undefined, explanation: undefined }))
    : battle.questions;

  res.json({ ...battle, questions: sanitizedQuestions });
});

// POST /api/battle/:id/answer — Submit answer
router.post('/:id/answer', requireAuth, async (req, res) => {
  const battle = activeBattles.get(req.params.id);
  if (!battle || battle.status !== 'active') return res.status(400).json({ error: 'Battle not active' });

  const userId = (req as any).user?.id;
  const player = battle.players.find(p => p.userId === userId);
  if (!player) return res.status(403).json({ error: 'Not in this battle' });

  const { questionIndex, answer, timeMs } = req.body;
  const question = battle.questions[questionIndex];
  if (!question) return res.status(400).json({ error: 'Invalid question' });

  // Record answer
  player.answers[questionIndex] = { answer, time: timeMs };
  
  const isCorrect = answer === question.correctAnswer;
  if (isCorrect) {
    const speedBonus = Math.max(0, Math.floor((battle.roundDurationMs - timeMs) / 1000));
    player.score += 100 + speedBonus;
  }

  // Check if both players answered
  const allAnswered = battle.players.every(p => p.answers[questionIndex]);
  
  if (allAnswered) {
    battle.currentQuestion++;
    if (battle.currentQuestion >= battle.questions.length) {
      await finishBattle(battle);
    }
  }

  res.json({
    isCorrect,
    correctAnswer: allAnswered ? question.correctAnswer : undefined,
    scores: battle.players.map(p => ({ userId: p.userId, score: p.score })),
    battleStatus: battle.status,
    nextQuestion: battle.currentQuestion,
  });
});

function findMatch(userId: string, rating: number, subject?: string) {
  for (const [queuedId, queued] of matchmakingQueue) {
    if (queuedId === userId) continue;
    if (subject && queued.subject && subject !== queued.subject) continue;
    if (Math.abs(rating - queued.rating) < 500) {
      return queued;
    }
  }
  return null;
}

async function createBattle(p1: any, p2: any, subject?: string): Promise<BattleState> {
  const battleQuestions = await db.select()
    .from(questions)
    .orderBy(sql`RANDOM()`)
    .limit(10);

  const battle: BattleState = {
    id: `battle_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    players: [
      { ...p1, score: 0, answers: {} },
      { userId: p2.userId, name: 'Opponent', rating: p2.rating, score: 0, answers: {} },
    ],
    questions: battleQuestions,
    currentQuestion: 0,
    startedAt: Date.now(),
    status: 'active',
    subject,
    roundDurationMs: 30000,
  };

  activeBattles.set(battle.id, battle);
  battleLog.info('Battle created', { battleId: battle.id, p1: p1.userId, p2: p2.userId });
  
  // Auto-cleanup after 15 minutes
  setTimeout(() => { activeBattles.delete(battle.id); }, 15 * 60 * 1000);
  
  return battle;
}

async function finishBattle(battle: BattleState) {
  battle.status = 'finished';
  const [p1, p2] = battle.players;
  
  if (p1.score !== p2.score) {
    const winner = p1.score > p2.score ? p1 : p2;
    const loser = p1.score > p2.score ? p2 : p1;
    const { winner: newWR, loser: newLR } = glickoUpdate(winner.rating, loser.rating);
    
    // Update ratings in DB
    try {
      await db.update(users).set({ totalPoints: sql`total_points + ${newWR - winner.rating}` })
        .where(eq(users.id, winner.userId));
      await db.update(users).set({ totalPoints: sql`total_points + ${newLR - loser.rating}` })
        .where(eq(users.id, loser.userId));
    } catch (e) {
      battleLog.error('Failed to update ratings', { error: e });
    }
  }
  
  battleLog.info('Battle finished', { battleId: battle.id, scores: battle.players.map(p => p.score) });
}

// GET /api/battle/queue/status
router.get('/queue/status', requireAuth, (req, res) => {
  const userId = (req as any).user?.id;
  const inQueue = matchmakingQueue.has(userId);
  let inBattle: string | null = null;
  
  for (const [, battle] of activeBattles) {
    if (battle.players.some(p => p.userId === userId) && battle.status === 'active') {
      inBattle = battle.id;
      break;
    }
  }
  
  res.json({ inQueue, inBattle, queueSize: matchmakingQueue.size });
});

export default router;
