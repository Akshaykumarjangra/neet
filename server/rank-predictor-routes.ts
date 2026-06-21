/**
 * NEET Rank Predictor + AI Mock Test Analyzer
 * Phase 1.5 + Phase 6.1 — ML-based rank prediction & post-test analysis
 */
import { Router } from 'express';
import { requireAuth } from './auth';
import { db } from './db';
import { mockExamAttempts, mockExamResponses, mockExamQuestions, users, userPerformance } from '@shared/schema';
import { eq, desc, sql, and } from 'drizzle-orm';
import { logger } from './lib/logger';

const predLog = logger.child({ module: 'rank-predictor' });
const router = Router();

// Historical NEET cutoff data (approximate)
const NEET_CUTOFFS: Record<number, { general: number; obc: number; sc: number; st: number; totalCandidates: number }> = {
  2024: { general: 720, obc: 550, sc: 450, st: 400, totalCandidates: 2400000 },
  2023: { general: 720, obc: 535, sc: 440, st: 390, totalCandidates: 2300000 },
  2022: { general: 715, obc: 530, sc: 435, st: 385, totalCandidates: 1800000 },
};

interface MockAnalysis {
  attemptId: number;
  score: number;
  maxScore: number;
  percentage: number;
  predictedRank: { low: number; mid: number; high: number };
  confidenceInterval: number;
  subjectBreakdown: Record<string, { correct: number; wrong: number; unanswered: number; score: number; accuracy: number; avgTimePerQ: number }>;
  timeAnalysis: { avgTimePerQuestion: number; fastestQuestion: number; slowestQuestion: number; timeDistribution: Record<string, number> };
  sillyMistakes: Array<{ questionId: number; subject: string; reason: string }>;
  strengthAreas: string[];
  weaknessAreas: string[];
  topperComparison: { yourScore: number; topperAvg: number; gap: number; percentile: number };
  recommendations: string[];
}

// Predict rank using score-to-rank mapping (simplified logistic model)
function predictRank(score: number, maxScore: number = 720): { low: number; mid: number; high: number; confidence: number } {
  const percentage = (score / maxScore) * 100;
  const totalCandidates = 2400000;
  
  // Logistic function mapping score to percentile
  const k = 0.08;
  const midpoint = 55;
  const percentile = 100 / (1 + Math.exp(-k * (percentage - midpoint)));
  
  const midRank = Math.max(1, Math.round(totalCandidates * (1 - percentile / 100)));
  const variance = Math.max(100, midRank * 0.15);
  
  return {
    low: Math.max(1, Math.round(midRank - variance)),
    mid: midRank,
    high: Math.round(midRank + variance),
    confidence: percentage > 80 ? 0.85 : percentage > 60 ? 0.75 : 0.60,
  };
}

// Detect silly mistakes
function detectSillyMistakes(responses: any[], questions: any[]): any[] {
  const mistakes: any[] = [];
  
  // ⚡ Bolt: Replace O(N) Array.find with O(1) Map lookup
  const questionMap = new Map(questions.map((q: any) => [q.id, q]));

  for (const resp of responses) {
    if (resp.isCorrect) continue;
    const q = questionMap.get(resp.questionId);
    if (!q) continue;
    
    // Fast wrong answer = likely silly mistake
    if (resp.timeSpentSeconds && resp.timeSpentSeconds < 30 && q.difficulty === 'easy') {
      mistakes.push({
        questionId: resp.questionId,
        subject: q.subject || 'Unknown',
        reason: 'Quick answer on easy question — likely misread or calculation error',
      });
    }
    
    // Changed answer (if tracked) = hesitation mistake
    if (resp.timeSpentSeconds && resp.timeSpentSeconds > 180) {
      mistakes.push({
        questionId: resp.questionId,
        subject: q.subject || 'Unknown',
        reason: 'Excessive time spent — overthinking or concept confusion',
      });
    }
  }
  
  return mistakes.slice(0, 10);
}

// GET /api/predict/rank — Current predicted rank from all mock attempts
router.get('/rank', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    
    const attempts = await db.select()
      .from(mockExamAttempts)
      .where(and(eq(mockExamAttempts.userId, userId), eq(mockExamAttempts.status, 'submitted')))
      .orderBy(desc(mockExamAttempts.submittedAt))
      .limit(10);

    if (attempts.length === 0) {
      return res.json({ message: 'No completed mock tests yet', predictedRank: null });
    }

    // Use average of recent scores
    const avgScore = attempts.reduce((sum, a) => sum + (a.score || 0), 0) / attempts.length;
    const prediction = predictRank(avgScore);
    
    // Trend analysis
    const scores = attempts.map(a => a.score || 0);
    const trend = scores.length >= 2 ? (scores[0] - scores[scores.length - 1]) / scores.length : 0;

    res.json({
      predictedRank: prediction,
      avgScore: Math.round(avgScore),
      recentScores: scores,
      trend: trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'stable',
      trendValue: Math.round(trend * 10) / 10,
      attemptsAnalyzed: attempts.length,
    });
  } catch (error: any) {
    predLog.error('Rank prediction error', { error: error.message });
    res.status(500).json({ error: 'Failed to predict rank' });
  }
});

// GET /api/predict/analyze/:attemptId — Full mock test analysis
router.get('/analyze/:attemptId', requireAuth, async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    const attemptId = parseInt(req.params.attemptId);

    const [attempt] = await db.select().from(mockExamAttempts)
      .where(and(eq(mockExamAttempts.id, attemptId), eq(mockExamAttempts.userId, userId)))
      .limit(1);

    if (!attempt) return res.status(404).json({ error: 'Attempt not found' });

    const responses = await db.select().from(mockExamResponses)
      .where(eq(mockExamResponses.attemptId, attemptId));

    const questionIds = responses.map(r => r.questionId);
    const questionData = questionIds.length > 0
      ? await db.select().from(mockExamQuestions)
          .where(sql`${mockExamQuestions.id} = ANY(ARRAY[${sql.raw(questionIds.join(','))}]::int[])`)
      : [];

    // Subject breakdown
    const subjectBreakdown: Record<string, any> = {};
    // ⚡ Bolt: Replace O(N) Array.find with O(1) Map lookup
    const questionMap = new Map(questionData.map(q => [q.id, q]));

    for (const resp of responses) {
      const q = questionMap.get(resp.questionId);
      const subject = q?.subject || 'Unknown';
      if (!subjectBreakdown[subject]) {
        subjectBreakdown[subject] = { correct: 0, wrong: 0, unanswered: 0, score: 0, totalTime: 0, count: 0 };
      }
      const sb = subjectBreakdown[subject];
      sb.count++;
      sb.totalTime += resp.timeSpentSeconds || 0;
      if (resp.selectedOptionId === null) sb.unanswered++;
      else if (resp.isCorrect) { sb.correct++; sb.score += 4; }
      else { sb.wrong++; sb.score -= 1; }
    }

    for (const [, sb] of Object.entries(subjectBreakdown)) {
      (sb as any).accuracy = (sb as any).count > 0 ? Math.round(((sb as any).correct / (sb as any).count) * 100) : 0;
      (sb as any).avgTimePerQ = (sb as any).count > 0 ? Math.round((sb as any).totalTime / (sb as any).count) : 0;
    }

    // Time analysis
    const times = responses.filter(r => r.timeSpentSeconds).map(r => r.timeSpentSeconds!);
    const avgTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;

    const score = attempt.score || 0;
    const prediction = predictRank(score);
    const sillyMistakes = detectSillyMistakes(responses, questionData);

    // Identify strengths and weaknesses
    const subjects = Object.entries(subjectBreakdown);
    const strengths = subjects.filter(([, s]: any) => s.accuracy >= 70).map(([name]) => name);
    const weaknesses = subjects.filter(([, s]: any) => s.accuracy < 50).map(([name]) => name);

    // Recommendations
    const recommendations: string[] = [];
    if (weaknesses.length > 0) recommendations.push(`Focus on ${weaknesses.join(', ')} — your weakest subjects`);
    if (sillyMistakes.length > 3) recommendations.push('Practice reading questions carefully — too many silly mistakes');
    if (avgTime > 120) recommendations.push('Work on speed — average time per question is too high');
    if (score < 360) recommendations.push('Aim for 50%+ accuracy before attempting full mock tests');

    const analysis: MockAnalysis = {
      attemptId, score, maxScore: 720,
      percentage: Math.round((score / 720) * 100),
      predictedRank: prediction,
      confidenceInterval: prediction.confidence,
      subjectBreakdown,
      timeAnalysis: {
        avgTimePerQuestion: Math.round(avgTime),
        fastestQuestion: Math.min(...times, 0),
        slowestQuestion: Math.max(...times, 0),
        timeDistribution: { '<30s': times.filter(t => t < 30).length, '30-60s': times.filter(t => t >= 30 && t < 60).length, '60-120s': times.filter(t => t >= 60 && t < 120).length, '>120s': times.filter(t => t >= 120).length },
      },
      sillyMistakes,
      strengthAreas: strengths,
      weaknessAreas: weaknesses,
      topperComparison: { yourScore: score, topperAvg: 650, gap: 650 - score, percentile: Math.round((score / 720) * 100) },
      recommendations,
    };

    res.json(analysis);
  } catch (error: any) {
    predLog.error('Analysis error', { error: error.message });
    res.status(500).json({ error: 'Failed to analyze attempt' });
  }
});

export default router;
