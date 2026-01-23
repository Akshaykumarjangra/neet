// @ts-nocheck
import { Router, Request } from "express";
import { db } from "./db";
import {
  adminSettings,
  auditLogs,
  contentAssets,
  contentVersions,
  mentorBookings,
  mentorPayouts,
  mentors,
  userChapterProgress,
  userChapterSessions,
  users,
  xpTransactions,
} from "@shared/schema";
import { eq, sql, inArray, desc } from "drizzle-orm";
import { requireOwner, requireAuthWithPasswordCheck, getCurrentUser } from "./auth";
const router = Router();

function ensureOwner(req: Request, res: any, next: any) {
  return requireOwner(req, res, next);
}

router.get("/content-versions/:chapterId", ensureOwner, async (req, res) => {
  try {
    const chapterId = Number(req.params.chapterId);
    if (!Number.isInteger(chapterId)) {
      return res.status(400).json({ error: "Invalid chapter id" });
    }

    const versions = await db
      .select()
      .from(contentVersions)
      .where(eq(contentVersions.chapterContentId, chapterId))
      .orderBy(desc(contentVersions.version))
      .limit(10);

    res.json({ versions });
  } catch (error) {
    console.error("Error fetching versions:", error);
    res.status(500).json({ error: "Failed to load versions" });
  }
});

router.post("/content-assets", ensureOwner, async (req, res) => {
  try {
    const { title, url, type = "pdf", description, metadata } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: "Title and URL are required" });
    }

    const [asset] = await db
      .insert(contentAssets)
      .values({
        chapterContentId: req.body.chapterContentId ?? null,
        mentorId: req.body.mentorId ?? null,
        type,
        title,
        description: description ?? "",
        url,
        thumbnailUrl: req.body.thumbnailUrl ?? null,
        durationSeconds: req.body.durationSeconds ?? null,
        pageCount: req.body.pageCount ?? null,
        metadata: metadata ?? null,
        isPublic: true,
        fileSizeBytes: req.body.fileSizeBytes ?? null,
      })
      .returning();

    res.status(201).json({ asset });
  } catch (error) {
    console.error("Error creating asset:", error);
    res.status(500).json({ error: "Failed to create asset" });
  }
});

router.get("/progress/summary", ensureOwner, async (_req, res) => {
  try {
    const [xpRow] = await db
      .select({
        totalXp: sql<number>`COALESCE(SUM(${xpTransactions.amount}), 0)`,
      })
      .from(xpTransactions);

    const [chaptersCompleted] = await db
      .select({
        completed: sql<number>`COUNT(*)::int`,
      })
      .from(userChapterProgress)
      .where(eq(userChapterProgress.completionPercentage, 100));

    const [bookmarks] = await db
      .select({
        count: sql<number>`COUNT(*)::int`,
      })
      .from(userChapterSessions);

    const topSubjects = await db
      .select({
        subject: userChapterProgress.chapterId,
        averageCompletion: sql<number>`AVG(${userChapterProgress.completionPercentage})`,
      })
      .from(userChapterProgress)
      .groupBy(userChapterProgress.chapterId)
      .orderBy(sql`${sql<number>`AVG(${userChapterProgress.completionPercentage})`} DESC`)
      .limit(5);

    res.json({
      totalXp: Number(xpRow.totalXp || 0),
      chaptersCompleted: Number(chaptersCompleted.completed || 0),
      sessionsLogged: Number(bookmarks.count || 0),
      topSubjects: topSubjects.map((entry) => ({
        subject: entry.subject,
        completion: Number(entry.averageCompletion || 0),
      })),
    });
  } catch (error) {
    console.error("Error summarizing progress:", error);
    res.status(500).json({ error: "Failed to aggregate progress" });
  }
});

router.get("/mentor/onboarding", ensureOwner, async (_req, res) => {
  try {
    const steps = [
      {
        id: "profile",
        title: "Profile setup",
        status: "completed",
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: "availability",
        title: "Availability & pricing",
        status: "in_review",
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      {
        id: "documents",
        title: "Document verification",
        status: "pending",
        updatedAt: new Date().toISOString(),
      },
    ];
    res.json({ steps });
  } catch (error) {
    console.error("Error fetching onboarding steps:", error);
    res.status(500).json({ error: "Failed to furnish onboarding state" });
  }
});

router.post("/mentor/onboarding", ensureOwner, async (req, res) => {
  try {
    const { email, availability, pricing } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    await db.insert(auditLogs).values({
      userId: req.session?.userId || null,
      action: "submit_mentor_onboarding",
      entityType: "mentor_onboarding",
      entityId: email,
      newValue: { availability, pricing },
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Error recording onboarding:", error);
    res.status(500).json({ error: "Failed to record onboarding" });
  }
});

router.get("/mentor/payouts", ensureOwner, async (_req, res) => {
  try {
    const payouts = await db
      .select({
        id: mentorPayouts.id,
        mentorId: mentorPayouts.mentorId,
        amountCents: mentorPayouts.amountCents,
        status: mentorPayouts.status,
        periodStart: mentorPayouts.periodStart,
        periodEnd: mentorPayouts.periodEnd,
        paidAt: mentorPayouts.paidAt,
        mentorName: mentors.name,
        mentorEmail: users.email,
      })
      .from(mentorPayouts)
      .leftJoin(mentors, eq(mentorPayouts.mentorId, mentors.id))
      .leftJoin(users, eq(mentors.userId, users.id))
      .orderBy(desc(mentorPayouts.createdAt))
      .limit(20);

    res.json({ payouts });
  } catch (error) {
    console.error("Error fetching payouts:", error);
    res.status(500).json({ error: "Failed to fetch payouts" });
  }
});

router.get("/mentor/scheduler", ensureOwner, async (_req, res) => {
  try {
    const bookings = await db
      .select({
        id: mentorBookings.id,
        mentorId: mentorBookings.mentorId,
        studentId: mentorBookings.studentId,
        startAt: mentorBookings.startAt,
        endAt: mentorBookings.endAt,
        status: mentorBookings.status,
        priceCents: mentorBookings.priceCents,
        createdAt: mentorBookings.createdAt,
        mentorName: mentors.name,
        studentEmail: users.email,
      })
      .from(mentorBookings)
      .leftJoin(mentors, eq(mentorBookings.mentorId, mentors.id))
      .leftJoin(users, eq(mentorBookings.studentId, users.id))
      .orderBy(desc(mentorBookings.createdAt))
      .limit(20);

    res.json({ bookings });
  } catch (error) {
    console.error("Scheduling error:", error);
    res.status(500).json({ error: "Failed to load scheduler" });
  }
});

router.post("/mentor/scheduler/:id/decision", ensureOwner, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body as { status: string };
    if (!Number.isInteger(id) || !["confirmed", "cancelled", "requested"].includes(status)) {
      return res.status(400).json({ error: "Invalid request" });
    }
    await db
      .update(mentorBookings)
      .set({ status, updatedAt: sql`now()` })
      .where(eq(mentorBookings.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error("Scheduling decision error:", error);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

router.get("/learning-path/personalized", requireAuthWithPasswordCheck, async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    const stats = await db
      .select({
        subject: xpTransactions.source,
        score: sql<number>`AVG(${xpTransactions.amount})`,
      })
      .from(xpTransactions)
      .where(eq(xpTransactions.userId, userId))
      .groupBy(xpTransactions.source)
      .orderBy(desc(sql`AVG(${xpTransactions.amount})`))
      .limit(5);

    const plan = stats.map((row, index) => ({
      moduleId: `module-${index + 1}`,
      title: `Focus: ${row.subject || "Core"} Concepts`,
      duration: 45 + (index * 15),
      xpTarget: 100 + index * 20,
      emphasis: row.score ? Math.round(row.score) : 100,
    }));

    res.json({
      plan,
      summary: {
        createdAt: new Date().toISOString(),
        focus: stats.map((entry) => entry.subject),
      },
    });
  } catch (error) {
    console.error("Learning path error:", error);
    res.status(500).json({ error: "Failed to create learning path" });
  }
});

router.get("/gamification/config", ensureOwner, async (_req, res) => {
  try {
    const keys = ["gamification_streak_threshold", "gamification_badge_xp"];
    const settings = await db.select().from(adminSettings).where(inArray(adminSettings.key, keys as any));
    const payload: Record<string, any> = {};
    settings.forEach((setting) => {
      payload[setting.key] = setting.value;
    });
    res.json(payload);
  } catch (error) {
    console.error("Error fetching gamification config:", error);
    res.status(500).json({ error: "Failed to load config" });
  }
});

router.post("/gamification/config", ensureOwner, async (req, res) => {
  try {
    const {
      gamification_streak_threshold,
      gamification_badge_xp,
    } = req.body;

    const entries = [
      ["gamification_streak_threshold", gamification_streak_threshold],
      ["gamification_badge_xp", gamification_badge_xp],
    ].filter(([, value]) => value !== undefined);

    for (const [key, value] of entries) {
      const [existing] = await db.select().from(adminSettings).where(eq(adminSettings.key, key)).limit(1);
      if (existing) {
        await db
          .update(adminSettings)
          .set({ value, updatedBy: req.session?.userId, updatedAt: new Date() })
          .where(eq(adminSettings.key, key));
      } else {
        await db
          .insert(adminSettings)
          .values({ key, value, updatedBy: req.session?.userId });
      }
    }

    await db.insert(auditLogs).values({
      userId: req.session?.userId || null,
      action: "update_gamification_config",
      entityType: "admin_setting",
      newValue: entries.map(([key, value]) => ({ key, value })),
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating gamification config:", error);
    res.status(500).json({ error: "Failed to update config" });
  }
});

export default router;
