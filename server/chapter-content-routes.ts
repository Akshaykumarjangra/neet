import { Router, Request, Response, NextFunction } from "express";
import { db } from "./db";
import { chapterContent, insertChapterContentSchema, users, type InsertChapterContent, type ChapterContent } from "@shared/schema";
import { eq, and } from "drizzle-orm";

const router = Router();

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
    
    let query = db.select().from(chapterContent);
    
    const conditions = [];
    if (subject) {
      conditions.push(eq(chapterContent.subject, subject as string));
    }
    if (classLevel) {
      conditions.push(eq(chapterContent.classLevel, classLevel as string));
    }
    if (status) {
      conditions.push(eq(chapterContent.status, status as any));
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
    
    const normalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();
    
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
    
    res.json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ error: "Failed to fetch chapter" });
  }
});

router.post("/", requireAdmin, async (req: Request, res: Response) => {
  try {
    const validatedData = insertChapterContentSchema.parse(req.body) as InsertChapterContent;
    
    const [newChapter] = await db
      .insert(chapterContent)
      .values(validatedData)
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
    const validatedData = insertChapterContentSchema.partial().parse(req.body) as Partial<InsertChapterContent>;
    
    const [updatedChapter] = await db
      .update(chapterContent)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
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

export default router;
