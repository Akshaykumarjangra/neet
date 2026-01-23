import { Router } from "express";
import { db } from "./db";
import {
  chatThreads,
  chatMessages,
  users,
  mentors,
  insertChatThreadSchema,
  insertChatMessageSchema,
  type InsertChatThread,
} from "@shared/schema";
import { eq, and, desc, or, sql } from "drizzle-orm";
import { z } from "zod";
import { requireAuth } from "./auth";

type ChatMessageInsert = typeof chatMessages.$inferInsert;

const router = Router();

// Health check for frontend capability detection
router.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    modelStatus: "online",
    timestamp: new Date().toISOString(),
  });
});

// Create a new thread
router.post("/threads", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId!;

    // Validate input
    const validatedData: InsertChatThread = insertChatThreadSchema.parse({
      ...req.body,
      studentId: userId,
    });

    // Create thread
    const [thread] = await db
      .insert(chatThreads)
      .values(validatedData)
      .returning();

    res.status(201).json(thread);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Create thread error:", error);
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// List threads for the current user
router.get("/threads", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId!;

    // Fetch user role to determine access scope
    const [user] = await db
      .select({ role: users.role, isAdmin: users.isAdmin })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    const isMentor = user?.role === 'mentor';
    let conditions;

    if (isMentor) {
      // Mentors see threads assigned to them OR unassigned threads? 
      // For now, let's show threads where they are the mentor.
      // We first need to find the mentor profile id
      const [mentor] = await db.select({ id: mentors.id }).from(mentors).where(eq(mentors.userId, userId)).limit(1);
      if (mentor) {
        conditions = eq(chatThreads.mentorId, mentor.id);
      } else {
        // Fallback if mentor profile missing, show nothing or error?
        return res.json({ threads: [] });
      }
    } else {
      // Students see their own threads
      conditions = eq(chatThreads.studentId, userId);
    }

    const threads = await db
      .select({
        id: chatThreads.id,
        subject: chatThreads.subject,
        studentId: chatThreads.studentId,
        mentorId: chatThreads.mentorId,
        isResolved: chatThreads.isResolved,
        lastMessageAt: chatThreads.lastMessageAt,
        // We'll fetch latest message separately or via subquery optimization later
        // For simple UI, we assume empty latestMessage for now or fetch it
      })
      .from(chatThreads)
      .where(conditions)
      .orderBy(desc(chatThreads.lastMessageAt));

    // Enrich with latest message preview
    const threadsWithPreview = await Promise.all(threads.map(async (thread) => {
      const [latest] = await db
        .select()
        .from(chatMessages)
        .where(eq(chatMessages.threadId, thread.id))
        .orderBy(desc(chatMessages.createdAt))
        .limit(1);

      return {
        ...thread,
        latestMessage: latest ? {
          content: latest.content,
          createdAt: latest.createdAt.toISOString(),
          isFlagged: latest.isFlagged,
          senderId: latest.senderId
        } : null
      };
    }));

    res.json({ threads: threadsWithPreview });
  } catch (error) {
    console.error("List threads error:", error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// Get messages for a specific thread
router.get("/threads/:id/messages", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const threadId = parseInt(req.params.id);
    const limit = parseInt(req.query.limit as string) || 50;

    // Verify access
    const [thread] = await db
      .select()
      .from(chatThreads)
      .where(eq(chatThreads.id, threadId))
      .limit(1);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    // Access control: Student can see own, Mentor can see assigned (or potentially all if open pool)
    // Simplified: Student must match studentId.
    const [user] = await db.select({ role: users.role, isAdmin: users.isAdmin }).from(users).where(eq(users.id, userId)).limit(1);

    // Check if user is the student owner
    const isOwner = thread.studentId === userId;

    // Check if user is the assigned mentor
    let isAssignedMentor = false;
    if (user?.role === 'mentor' && thread.mentorId) {
      const [mentor] = await db.select({ id: mentors.id }).from(mentors).where(eq(mentors.userId, userId)).limit(1);
      if (mentor && mentor.id === thread.mentorId) {
        isAssignedMentor = true;
      }
    }

    // TODO: Allow any mentor to view unassigned threads to pick them up? 
    // For now strict check.
    if (!isOwner && !isAssignedMentor && !user?.isAdmin) { // Admins can view
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await db
      .select({
        message: chatMessages,
        senderName: users.name,
        senderAvatar: users.avatarUrl,
      })
      .from(chatMessages)
      .leftJoin(users, eq(chatMessages.senderId, users.id))
      .where(eq(chatMessages.threadId, threadId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);

    // Format for frontend
    const formattedMessages = messages.map(({ message, senderName, senderAvatar }) => ({
      message: {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        createdAt: message.createdAt,
        isFlagged: message.isFlagged,
      },
      sender: {
        id: message.senderId,
        name: senderName || "Unknown",
        avatarUrl: senderAvatar
      }
    }));

    res.json({ messages: formattedMessages });
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Post a new message to a thread
router.post("/threads/:id/messages", requireAuth, async (req, res) => {
  try {
    const userId = req.session.userId!;
    const threadId = parseInt(req.params.id);
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Message content required" });
    }

    // Verify thread existence
    const [thread] = await db
      .select()
      .from(chatThreads)
      .where(eq(chatThreads.id, threadId))
      .limit(1);

    if (!thread) return res.status(404).json({ error: "Thread not found" });

    // Simple Access Control
    // In a real app we'd verify participant status again

    // Insert message
    const [newMessage] = await db
      .insert(chatMessages)
      .values({
        threadId,
        senderId: userId,
        content: content.trim(),
        // Simple keyword flagging stub
        isFlagged: /(swear|abuse|spam)/i.test(content),
      } as ChatMessageInsert)
      .returning();

    // Update thread timestamp
    const threadUpdate = {
      lastMessageAt: new Date(),
      updatedAt: new Date(),
    };

    await db
      .update(chatThreads)
      .set(threadUpdate)
      .where(eq(chatThreads.id, threadId));

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
