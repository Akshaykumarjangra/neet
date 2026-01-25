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
import { eq, and, desc } from "drizzle-orm";

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

const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin, id: users.id })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

router.get("/", async (req: Request, res: Response) => {
  try {
    const { subject, classLevel, status } = req.query;

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
    if (status) {
      conditions.push(eq(chapterContent.status, status as any));
    }

    // Filter premium chapters if user is not premium
    if (!isPremium) {
      conditions.push(sql`${chapterContent.chapterNumber} <= 3`);
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

    // Check if user is premium for chapters > 3
    if (chapter.chapterNumber > 3) {
      const userId = req.session?.userId;
      if (userId) {
        const [user] = await db
          .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);

        const isPremium = user?.isPaidUser || user?.role === "admin" || user?.isOwner;

        if (!isPremium) {
          return res.status(402).json({
            error: "PAYMENT_REQUIRED",
            message: "Chapter 4 and beyond are available exclusively for Premium members."
          });
        }
      } else {
        return res.status(402).json({
          error: "PAYMENT_REQUIRED",
          message: "Please log in and upgrade to Premium to access this chapter."
        });
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

    const [chapter] = await db
      .select()
      .from(chapterContent)
      .where(eq(chapterContent.id, parseInt(id)))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Check if user is premium for chapters > 3
    if (chapter.chapterNumber > 3) {
      const userId = req.session?.userId;
      if (userId) {
        const [user] = await db
          .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);

        const isPremium = user?.isPaidUser || user?.role === "admin" || user?.isOwner;

        if (!isPremium) {
          return res.status(402).json({
            error: "PAYMENT_REQUIRED",
            message: "Chapter 4 and beyond are available exclusively for Premium members."
          });
        }
      } else {
        return res.status(402).json({
          error: "PAYMENT_REQUIRED",
          message: "Please log in and upgrade to Premium to access this chapter."
        });
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
      .select({ chapterNumber: chapterContent.chapterNumber })
      .from(chapterContent)
      .where(eq(chapterContent.id, chapterId))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Enforce subscription check for assets of premium chapters
    if (chapter.chapterNumber > 3) {
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
router.post("/:chapterId/versions", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = req.user as any;
  // Allow if admin or mentor
  // Note: 'role' check is basic, ideally check db if not in session
  if (!user.isAdmin && user.role !== "mentor") {
    return res.status(403).json({ error: "Only mentors and admins can submit content updates" });
  }

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

    res.status(201).json(newVersion);
  } catch (error) {
    console.error("Submit version error:", error);
    res.status(500).json({ error: "Failed to submit version" });
  }
});
