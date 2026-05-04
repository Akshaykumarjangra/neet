/**
 * Lifecycle Marketing — Email/WhatsApp Drip Campaigns
 * Phase 5d — Behavior triggers, win-back, NPS automation
 */
import { Router } from 'express';
import { requireAuth } from './auth';
import { db } from './db';
import { users, mockExamAttempts, userPerformance, auditLogs } from '@shared/schema';
import { eq, and, sql, lt, desc } from 'drizzle-orm';
import { logger } from './lib/logger';
import nodemailer from 'nodemailer';
import { requireAdmin } from './auth';
import { recordAuditLog } from './lib/audit';

const lcLog = logger.child({ module: 'lifecycle' });
const router = Router();

// Email transporter (configure via env)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface DripEmail {
  subject: string;
  html: string;
  trigger: string;
}

const DRIP_TEMPLATES: Record<string, DripEmail> = {
  welcome: {
    trigger: 'signup',
    subject: '🎉 Welcome to ZERO AI NEET Prep!',
    html: `<h1>Welcome aboard! 🚀</h1>
    <p>You've just joined India's most advanced NEET prep platform.</p>
    <h3>Here's your Day 1 checklist:</h3>
    <ul>
      <li>✅ Take your diagnostic test</li>
      <li>✅ Set your NEET target score</li>
      <li>✅ Start your first chapter</li>
    </ul>
    <a href="https://neet.zeroai.org.in/dashboard" style="background:#6366f1;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;margin-top:16px;">Start Learning →</a>`,
  },
  first_test_reminder: {
    trigger: 'signup_day_2',
    subject: '📝 Ready for your first mock test?',
    html: `<h2>Your personalized study plan is waiting!</h2>
    <p>Students who take a mock test in their first week score 23% higher.</p>
    <a href="https://neet.zeroai.org.in/mock-tests" style="background:#6366f1;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Take Mock Test →</a>`,
  },
  inactive_3_days: {
    trigger: 'inactive_3_days',
    subject: '😢 We miss you! Your streak is at risk',
    html: `<h2>Don't let your progress slip!</h2>
    <p>You haven't studied in 3 days. Just 10 minutes today can keep your streak alive.</p>
    <a href="https://neet.zeroai.org.in/practice" style="background:#ef4444;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Quick Practice →</a>`,
  },
  milestone_approaching: {
    trigger: 'milestone_near',
    subject: '🏆 You\'re SO close to a milestone!',
    html: `<h2>Just a few more questions!</h2>
    <p>You're only {{remaining}} questions away from unlocking a new achievement.</p>
    <a href="https://neet.zeroai.org.in/practice" style="background:#22c55e;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Keep Going →</a>`,
  },
  high_score_nps: {
    trigger: 'high_mock_score',
    subject: '🌟 Amazing score! Quick question...',
    html: `<h2>Congratulations on your fantastic mock test score! 🎉</h2>
    <p>We'd love to hear from you — how likely are you to recommend ZERO AI to a friend?</p>
    <p><a href="https://neet.zeroai.org.in/feedback?rating=10">😍 Definitely!</a> | <a href="https://neet.zeroai.org.in/feedback?rating=7">😊 Probably</a> | <a href="https://neet.zeroai.org.in/feedback?rating=4">😐 Maybe</a></p>`,
  },
  winback: {
    trigger: 'churned_subscriber',
    subject: '💰 Special offer: Come back to ZERO AI (50% off!)',
    html: `<h2>We want you back! 🫶</h2>
    <p>Use code <strong>COMEBACK50</strong> for 50% off your next month.</p>
    <a href="https://neet.zeroai.org.in/pricing?code=COMEBACK50" style="background:#8b5cf6;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">Claim Offer →</a>`,
  },
};

async function sendEmail(to: string, template: DripEmail, vars?: Record<string, string>) {
  let html = template.html;
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"ZERO AI NEET" <noreply@zeroai.org.in>',
      to,
      subject: template.subject,
      html,
    });
    lcLog.info('Email sent', { to, trigger: template.trigger });
    return true;
  } catch (error: any) {
    lcLog.error('Email failed', { to, error: error.message });
    return false;
  }
}

// POST /api/lifecycle/trigger — Manually trigger a drip email
router.post('/trigger', requireAdmin, async (req, res) => {
  const { templateKey, userId } = req.body;
  const template = DRIP_TEMPLATES[templateKey];
  if (!template) return res.status(400).json({ error: 'Unknown template' });

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const sent = await sendEmail(user.email, template);
  
  await recordAuditLog(req, {
    action: "manual_lifecycle_trigger",
    entityType: "lifecycle_email",
    entityId: userId,
    newValue: { templateKey, sent }
  });

  res.json({ sent });
});

// POST /api/lifecycle/run-triggers — Run automated behavior triggers
router.post('/run-triggers', requireAdmin, async (req, res) => {
  try {
    const results = { processed: 0, emailsSent: 0 };
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    // Find inactive users (3+ days)
    const inactiveUsers = await db.select()
      .from(users)
      .where(and(
        lt(users.lastActiveDate, threeDaysAgo),
        eq(users.isDisabled, false),
      ))
      .limit(50);

    for (const user of inactiveUsers) {
      results.processed++;
      const sent = await sendEmail(user.email, DRIP_TEMPLATES.inactive_3_days);
      if (sent) results.emailsSent++;
    }

    // Find users with high mock scores for NPS
    const recentHighScores = await db.select({ userId: mockExamAttempts.userId })
      .from(mockExamAttempts)
      .where(and(
        eq(mockExamAttempts.status, 'submitted'),
        sql`${mockExamAttempts.score} >= 540`, // 75%+
      ))
      .orderBy(desc(mockExamAttempts.submittedAt))
      .limit(20);

    for (const { userId } of recentHighScores) {
      const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (user) {
        results.processed++;
        const sent = await sendEmail(user.email, DRIP_TEMPLATES.high_score_nps);
        if (sent) results.emailsSent++;
      }
    }

    await recordAuditLog(req, {
      action: "run_lifecycle_triggers",
      entityType: "lifecycle_system",
      newValue: results
    });

    res.json(results);
  } catch (error: any) {
    lcLog.error('Trigger run error', { error: error.message });
    res.status(500).json({ error: 'Failed to run triggers' });
  }
});

// GET /api/lifecycle/templates — List available templates
router.get('/templates', requireAuth, (_req, res) => {
  const templates = Object.entries(DRIP_TEMPLATES).map(([key, t]) => ({
    key, trigger: t.trigger, subject: t.subject,
  }));
  res.json(templates);
});

export default router;
