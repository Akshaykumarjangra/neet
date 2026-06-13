import { Router, Request, Response, NextFunction } from "express";
import { db } from "./db";
import {
  chapterContent,
  insertChapterContentSchema,
  users,
  chapterContentVersions,
  mentors,
  contentAssets
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { requireAdmin, requireAdminOrMentor } from "./auth";
import { recordAuditLog } from "./lib/audit";

type ChapterContentInsert = typeof chapterContent.$inferInsert;
type ChapterContentUpdate = typeof chapterContent.$inferSelect;

const router = Router();

const normalizeSubject = (value?: string) => {
  if (!value) return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const normalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  if (normalized === "Botany" || normalized === "Zoology") {
    return "Biology";
  }
  return normalized;
};


router.get("/", async (req: Request, res: Response) => {
  try {
    const { subject, classLevel, status } = req.query;

    const userId = req.session?.userId;
    let isPremium = false;

    let isPrivileged = false;
    if (userId) {
      const [user] = await db
        .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner, isAdmin: users.isAdmin })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
      isPremium = !!(user?.isPaidUser || user?.role === "admin" || user?.isOwner || user?.role === "mentor");
      isPrivileged = !!(user?.isAdmin || user?.isOwner || user?.role === "mentor");
    }

    let query = db.select().from(chapterContent);

    const conditions = [];
    if (subject) {
      const mappedSubject = normalizeSubject(subject as string);
      if (mappedSubject) {
        conditions.push(eq(chapterContent.subject, mappedSubject));
      }
    }
    if (classLevel) {
      conditions.push(eq(chapterContent.classLevel, classLevel as string));
    }
    if (status && isPrivileged) {
      conditions.push(eq(chapterContent.status, status as any));
    } else if (!isPrivileged) {
      conditions.push(eq(chapterContent.status, "published"));
    }

    // Filter premium chapters if user is not premium
    if (!isPremium) {
      conditions.push(eq(chapterContent.isFree, true));
    }

    const chapters = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    res.json(chapters);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
});

router.get("/by-chapter/:subject/:classLevel/:chapterNumber", async (req: Request, res: Response) => {
  try {
    const { subject, classLevel, chapterNumber } = req.params;

    const normalizedSubject = normalizeSubject(subject) ?? subject;
    const sessionUserId = req.session?.userId;
    const [currentUser] = sessionUserId
      ? await db
        .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner, isAdmin: users.isAdmin })
        .from(users)
        .where(eq(users.id, sessionUserId))
        .limit(1)
      : [];
    const isPrivileged = !!(currentUser?.isAdmin || currentUser?.isOwner || currentUser?.role === "mentor");

    const [chapter] = await db
      .select()
      .from(chapterContent)
      .where(
        and(
          eq(chapterContent.subject, normalizedSubject),
          eq(chapterContent.classLevel, classLevel),
          eq(chapterContent.chapterNumber, parseInt(chapterNumber))
        )
      )
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    if (!isPrivileged && chapter.status !== "published") {
      return res.status(403).json({ error: "Chapter not accessible" });
    }

    // Check if user is premium for locked chapters
    if (!chapter.isFree) {
      const isPremium = currentUser?.isPaidUser || currentUser?.role === "admin" || currentUser?.isOwner;
      if (!isPremium) {
        // Implement progressive disclosure: return preview content
        chapter.detailedNotes = "Preview mode: This is a premium chapter. " + (chapter.introduction || "").substring(0, 300) + "...";
        chapter.keyConcepts = chapter.keyConcepts ? (chapter.keyConcepts as any[]).slice(0, 1) : [];
        chapter.formulas = chapter.formulas ? (chapter.formulas as any[]).slice(0, 1) : [];
        (chapter as any).isPremiumLocked = true;
      }
    }

    res.json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ error: "Failed to fetch chapter" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sessionUserId = req.session?.userId;
    const [currentUser] = sessionUserId
      ? await db
        .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner, isAdmin: users.isAdmin })
        .from(users)
        .where(eq(users.id, sessionUserId))
        .limit(1)
      : [];
    const isPrivileged = !!(currentUser?.isAdmin || currentUser?.isOwner);

    const [chapter] = await db
      .select()
      .from(chapterContent)
      .where(eq(chapterContent.id, parseInt(id)))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    if (!isPrivileged && chapter.status !== "published") {
      return res.status(403).json({ error: "Chapter not accessible" });
    }

    // Check if user is premium for locked chapters
    if (!chapter.isFree) {
      const isPremium = currentUser?.isPaidUser || currentUser?.role === "admin" || currentUser?.isOwner;
      if (!isPremium) {
        // Implement progressive disclosure: return preview content
        chapter.detailedNotes = "Preview mode: This is a premium chapter. " + (chapter.introduction || "").substring(0, 300) + "...";
        chapter.keyConcepts = chapter.keyConcepts ? (chapter.keyConcepts as any[]).slice(0, 1) : [];
        chapter.formulas = chapter.formulas ? (chapter.formulas as any[]).slice(0, 1) : [];
        (chapter as any).isPremiumLocked = true;
      }
    }

    res.json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ error: "Failed to fetch chapter" });
  }
});

router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const validatedData = insertChapterContentSchema.parse(req.body) as ChapterContentInsert;

    const [newChapter] = await db
      .insert(chapterContent)
      .values(validatedData as ChapterContentInsert)
      .returning();

    await recordAuditLog(req, {
      action: "create_chapter_content",
      entityType: "chapter_content",
      entityId: newChapter.id,
      newValue: newChapter,
    });

    res.status(201).json(newChapter);
  } catch (error: any) {
    console.error("Error creating chapter:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Invalid chapter data", details: error.errors });
    }
    if (error.code === '23505') {
      return res.status(409).json({ error: "Chapter already exists for this subject/class/number combination" });
    }
    res.status(500).json({ error: "Failed to create chapter" });
  }
});

router.put("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData: Partial<ChapterContentInsert> = insertChapterContentSchema.partial().parse(req.body);

    const [updatedChapter] = await db
      .update(chapterContent)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      } as Partial<ChapterContentUpdate>)
      .where(eq(chapterContent.id, parseInt(id)))
      .returning();

    if (!updatedChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    await recordAuditLog(req, {
      action: "update_chapter_content",
      entityType: "chapter_content",
      entityId: updatedChapter.id,
      newValue: updatedChapter,
    });

    res.json(updatedChapter);
  } catch (error: any) {
    console.error("Error updating chapter:", error);
    if (error.name === "ZodError") {
      return res.status(400).json({ error: "Invalid chapter data", details: error.errors });
    }
    res.status(500).json({ error: "Failed to update chapter" });
  }
});

router.delete("/:id", requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [deletedChapter] = await db
      .delete(chapterContent)
      .where(eq(chapterContent.id, parseInt(id)))
      .returning();

    if (!deletedChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    await recordAuditLog(req, {
      action: "delete_chapter_content",
      entityType: "chapter_content",
      entityId: deletedChapter.id,
      oldValue: deletedChapter,
    });

    res.json({ success: true, message: "Chapter deleted successfully" });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res.status(500).json({ error: "Failed to delete chapter" });
  }
});

router.get("/:id/assets", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chapterId = parseInt(id);

    // Verify chapter existence and check premium status
    const [chapter] = await db
      .select({
        chapterNumber: chapterContent.chapterNumber,
        isFree: chapterContent.isFree
      })
      .from(chapterContent)
      .where(eq(chapterContent.id, chapterId))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Enforce subscription check for assets of premium chapters
    if (!chapter.isFree) {
      const userId = req.session?.userId;
      let isPremium = false;
      if (userId) {
        const [user] = await db
          .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);
        isPremium = !!(user?.isPaidUser || user?.role === "admin" || user?.isOwner);
      }

      if (!isPremium) {
        return res.status(402).json({
          error: "PAYMENT_REQUIRED",
          message: "Assets for this chapter are available exclusively for Premium members."
        });
      }
    }

    // Optional: filter by type e.g. ?type=video
    const { type } = req.query;

    const conditions: any[] = [
      eq(chapterContent.id, chapterId),
      // Only show public assets or verified mentor content
      eq(contentAssets.isPublic, true)
    ];

    if (type) {
      conditions.push(eq(contentAssets.type, type as any));
    }

    // Join with mentors and users to get author names
    const assets = await db
      .select({
        id: contentAssets.id,
        title: contentAssets.title,
        description: contentAssets.description,
        type: contentAssets.type,
        url: contentAssets.url,
        thumbnailUrl: contentAssets.thumbnailUrl,
        durationSeconds: contentAssets.durationSeconds,
        pageCount: contentAssets.pageCount,
        mentorName: users.name,
        mentorAvatar: users.avatarUrl,
        createdAt: contentAssets.createdAt
      })
      .from(contentAssets)
      .leftJoin(chapterContent, eq(contentAssets.chapterContentId, chapterContent.id))
      .leftJoin(mentors, eq(contentAssets.mentorId, mentors.id))
      .leftJoin(users, eq(mentors.userId, users.id))
      .where(and(...conditions))
      .orderBy(desc(contentAssets.createdAt));

    res.json(assets);
  } catch (error) {
    console.error("Error fetching chapter assets:", error);
    res.status(500).json({ error: "Failed to fetch chapter assets" });
  }
});

export default router;

// Submit a new version of chapter content (Mentor/Admin)
router.post("/:chapterId/versions", requireAdminOrMentor, async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { chapterId } = req.params;
  const contentId = parseInt(chapterId);

  if (isNaN(contentId)) {
    return res.status(400).json({ error: "Invalid chapter ID" });
  }

  try {
    // Verify chapter exists
    const [chapter] = await db
      .select()
      .from(chapterContent)
      .where(eq(chapterContent.id, contentId))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    const submission = req.body;
    let mentorId = submission.mentorId;

    if (user.role === 'mentor') {
      const [mentor] = await db
        .select()
        .from(mentors)
        .where(eq(mentors.userId, user.id))
        .limit(1);

      if (!mentor) {
        return res.status(403).json({ error: "Mentor profile not found" });
      }
      mentorId = mentor.id;
    } else if (!mentorId) {
      // If admin, try to find their mentor profile or require ID
      const [m] = await db.select().from(mentors).where(eq(mentors.userId, user.id)).limit(1);
      mentorId = m ? m.id : null;
    }

    if (!mentorId) {
      return res.status(400).json({ error: "Mentor ID required" });
    }

    const versionPayload: any = {
      chapterContentId: contentId,
      mentorId: mentorId,
      detailedNotes: submission.detailedNotes ?? null,
      keyConcepts: submission.keyConcepts ?? null,
      formulas: submission.formulas ?? null,
      status: "pending",
    };

    const [newVersion] = await db
      .insert(chapterContentVersions)
      .values(versionPayload as any)
      .returning();

    await recordAuditLog(req, {
      action: "submit_chapter_version",
      entityType: "chapter_content_version",
      entityId: newVersion.id,
      newValue: newVersion,
    });

    res.status(201).json(newVersion);
  } catch (error) {
    console.error("Submit version error:", error);
    res.status(500).json({ error: "Failed to submit version" });
  }
});
