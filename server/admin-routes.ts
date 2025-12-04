import { Router } from "express";
import { db } from "./db";
import { users, questions, contentTopics } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

const router = Router();

// Middleware to check if user is admin
const requireAdmin = async (req: any, res: any, next: any) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users (admin only)
router.get("/users", requireAdmin, async (req, res) => {
  try {
    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isAdmin: users.isAdmin,
      isPaidUser: users.isPaidUser,
      currentLevel: users.currentLevel,
      totalPoints: users.totalPoints,
      createdAt: users.createdAt,
    }).from(users);

    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Grant free access to a user
router.post("/grant-access/:userId", requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    await db.update(users)
      .set({ isPaidUser: true })
      .where(eq(users.id, userId));

    res.json({ success: true });
  } catch (error) {
    console.error("Error granting access:", error);
    res.status(500).json({ error: "Failed to grant access" });
  }
});

// Revoke access from a user
router.post("/revoke-access/:userId", requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    await db.update(users)
      .set({ isPaidUser: false })
      .where(eq(users.id, userId));

    res.json({ success: true });
  } catch (error) {
    console.error("Error revoking access:", error);
    res.status(500).json({ error: "Failed to revoke access" });
  }
});

// Add a single user with free access
router.post("/add-user", requireAdmin, async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name || !email.trim() || !name.trim()) {
      return res.status(400).json({ error: "Valid email and name required" });
    }

    // Generate random password
    const randomPassword = Math.random().toString(36).slice(-12);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const [newUser] = await db.insert(users).values({
      email: email.trim(),
      name: name.trim(),
      passwordHash: hashedPassword,
      isPaidUser: true,
    }).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      isPaidUser: users.isPaidUser,
      createdAt: users.createdAt,
    });

    res.json({
      success: true,
      user: newUser,
      temporaryPassword: randomPassword
    });
  } catch (error: any) {
    console.error("Error adding user:", error);
    if (error.code === '23505') {
      res.status(400).json({ error: "User already exists" });
    } else {
      res.status(500).json({ error: "Failed to add user" });
    }
  }
});

// Bulk import users
router.post("/bulk-import", requireAdmin, async (req, res) => {
  try {
    const { emails } = req.body;

    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: "Emails array required" });
    }

    const importedUsers = [];
    const errors = [];

    for (const email of emails) {
      const trimmedEmail = email.trim();

      if (!trimmedEmail) {
        errors.push({ email, error: "Empty email" });
        continue;
      }

      try {
        // Generate name from email
        const name = trimmedEmail.split('@')[0] + '_' + Math.random().toString(36).slice(-4);

        // Generate random password
        const randomPassword = Math.random().toString(36).slice(-12);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const [newUser] = await db.insert(users).values({
          email: trimmedEmail,
          name,
          passwordHash: hashedPassword,
          isPaidUser: true,
        }).returning({
          id: users.id,
          name: users.name,
          email: users.email,
          isPaidUser: users.isPaidUser,
          createdAt: users.createdAt,
        });

        importedUsers.push({
          ...newUser,
          temporaryPassword: randomPassword
        });
      } catch (error: any) {
        if (error.code === '23505') {
          errors.push({ email: trimmedEmail, error: "Already exists" });
        } else {
          errors.push({ email: trimmedEmail, error: "Failed to create" });
        }
      }
    }

    res.json({
      imported: importedUsers.length,
      errors: errors.length,
      users: importedUsers,
      failedEmails: errors
    });
  } catch (error) {
    console.error("Error bulk importing:", error);
    res.status(500).json({ error: "Failed to bulk import" });
  }
});

export default router;

// Get placeholder questions statistics
router.get("/placeholder-stats", requireAdmin, async (req, res) => {
  try {
    // Get all questions
    const allQuestions = await db.select().from(questions);

    // Get all topics
    const topics = await db.select().from(contentTopics);
    const topicMap = new Map(topics.map(t => [t.id, t]));

    // Find placeholders
    const placeholders = allQuestions.filter(q =>
      q.questionText.includes('[Real question content to be added]') ||
      q.questionText.includes('A comprehensive NEET-level question') ||
      JSON.stringify(q.options).includes('First possible answer') ||
      JSON.stringify(q.options).includes('Second possible answer')
    );

    // Group by topic
    const byTopic: Record<string, {
      subject: string;
      topicName: string;
      placeholderCount: number;
    }> = {};

    for (const q of placeholders) {
      const topic = topicMap.get(q.topicId);
      if (topic) {
        const key = `${topic.id}`;
        if (!byTopic[key]) {
          byTopic[key] = {
            subject: topic.subject || 'Unknown',
            topicName: topic.topicName || 'Unknown',
            placeholderCount: 0,
          };
        }
        byTopic[key].placeholderCount++;
      }
    }

    res.json({
      totalQuestions: allQuestions.length,
      placeholderCount: placeholders.length,
      realCount: allQuestions.length - placeholders.length,
      byTopic,
    });
  } catch (error) {
    console.error("Error fetching placeholder stats:", error);
    res.status(500).json({ error: "Failed to fetch placeholder statistics" });
  }
});
