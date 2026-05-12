// @ts-nocheck
/**
 * Anti-Cheat System for Mock Tests
 * Phase 7.5 — Tab-switch detection, fullscreen lock, browser fingerprint
 */
import { Router } from 'express';
import { requireAuth, getCurrentUser } from './auth';
import { db } from './db';
import { mockExamAttempts } from '@shared/schema';
import { eq, and } from 'drizzle-orm';
import { logger } from './lib/logger';

const acLog = logger.child({ module: 'anti-cheat' });
const router = Router();

// POST /api/anticheat/focus-loss — Report tab switch / focus loss
router.post('/focus-loss', requireAuth, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    const { attemptId, eventType, timestamp } = req.body;

    const [attempt] = await db.select().from(mockExamAttempts)
      .where(and(eq(mockExamAttempts.id, attemptId), eq(mockExamAttempts.userId, userId)))
      .limit(1);

    if (!attempt || attempt.status !== 'in_progress') {
      return res.status(400).json({ error: 'No active attempt' });
    }

    await db.update(mockExamAttempts).set({
      focusLossCount: (attempt.focusLossCount || 0) + 1,
      lastFocusLossAt: new Date(),
    }).where(eq(mockExamAttempts.id, attemptId));

    acLog.warn('Focus loss detected', { userId, attemptId, eventType, count: (attempt.focusLossCount || 0) + 1 });

    // Auto-submit if too many violations
    const maxViolations = parseInt(process.env.MAX_FOCUS_VIOLATIONS || '5');
    if ((attempt.focusLossCount || 0) + 1 >= maxViolations) {
      await db.update(mockExamAttempts).set({
        status: 'auto_submitted',
        submittedAt: new Date(),
      }).where(eq(mockExamAttempts.id, attemptId));
      
      acLog.error('Auto-submitted due to violations', { userId, attemptId });
      return res.json({ warning: 'Test auto-submitted due to excessive tab switches', autoSubmitted: true });
    }

    res.json({ 
      warning: `Tab switch detected (${(attempt.focusLossCount || 0) + 1}/${maxViolations})`,
      remaining: maxViolations - (attempt.focusLossCount || 0) - 1,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to record event' });
  }
});

// POST /api/anticheat/fingerprint — Store browser fingerprint
router.post('/fingerprint', requireAuth, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    const { attemptId, fingerprint, userAgent } = req.body;

    await db.update(mockExamAttempts).set({
      deviceFingerprint: fingerprint,
      userAgent,
      ipAddress: req.ip,
    }).where(and(eq(mockExamAttempts.id, attemptId), eq(mockExamAttempts.userId, userId)));

    res.json({ recorded: true });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to record fingerprint' });
  }
});

// POST /api/anticheat/heartbeat — Keep-alive during exam
router.post('/heartbeat', requireAuth, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    const { attemptId } = req.body;

    await db.update(mockExamAttempts).set({
      lastActiveAt: new Date(),
    }).where(and(eq(mockExamAttempts.id, attemptId), eq(mockExamAttempts.userId, userId)));

    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Heartbeat failed' });
  }
});

export default router;
