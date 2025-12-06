import { Router } from "express";
import { db } from "./db";
import { users, questions, contentTopics, subscriptionPlans, userSubscriptions, adminSettings, auditLogs } from "@shared/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import OpenAI from "openai";

// Initialize OpenAI with Replit AI Integrations
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

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

// Middleware to check if user is owner (blocks non-owners from access)
const requireOwner = async (req: any, res: any, next: any) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin, isOwner: users.isOwner })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    if (!user.isOwner) {
      return res.status(403).json({ error: "Owner access required. Only the platform owner can manage users." });
    }

    req.isOwner = true;
    next();
  } catch (error) {
    console.error("Owner check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users (admin only) with pagination and filters
router.get("/users", requireOwner, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const search = (req.query.search as string) || "";
    const roleFilter = req.query.role as string;
    const statusFilter = req.query.status as string;
    const premiumFilter = req.query.premium as string;

    let conditions: any[] = [];

    if (search) {
      conditions.push(
        sql`(LOWER(${users.name}) LIKE LOWER(${'%' + search + '%'}) OR LOWER(${users.email}) LIKE LOWER(${'%' + search + '%'}))`
      );
    }

    if (roleFilter && roleFilter !== "all") {
      conditions.push(eq(users.role, roleFilter as "student" | "mentor" | "admin"));
    }

    if (statusFilter === "enabled") {
      conditions.push(eq(users.isDisabled, false));
    } else if (statusFilter === "disabled") {
      conditions.push(eq(users.isDisabled, true));
    }

    if (premiumFilter === "true") {
      conditions.push(eq(users.isPaidUser, true));
    } else if (premiumFilter === "false") {
      conditions.push(eq(users.isPaidUser, false));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(whereClause);

    const total = countResult?.count || 0;
    const totalPages = Math.ceil(total / pageSize);
    const offset = (page - 1) * pageSize;

    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isAdmin: users.isAdmin,
      isPaidUser: users.isPaidUser,
      isOwner: users.isOwner,
      isDisabled: users.isDisabled,
      currentLevel: users.currentLevel,
      totalPoints: users.totalPoints,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(whereClause)
    .orderBy(desc(users.createdAt))
    .limit(pageSize)
    .offset(offset);

    res.json({
      users: allUsers,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      }
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Change user role
router.patch("/users/:id/role", requireOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const isCurrentUserOwner = req.isOwner;

    if (!role || !["student", "mentor", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Must be student, mentor, or admin" });
    }

    const [targetUser] = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (targetUser.isOwner) {
      return res.status(403).json({ error: "Cannot change owner's role" });
    }

    if (targetUser.role === "admin" && !isCurrentUserOwner) {
      return res.status(403).json({ error: "Only owner can demote admin users" });
    }

    if (role === "admin" && !isCurrentUserOwner) {
      return res.status(403).json({ error: "Only owner can promote users to admin" });
    }

    await db.update(users)
      .set({ role, isAdmin: role === "admin" })
      .where(eq(users.id, id));

    res.json({ success: true, message: `User role changed to ${role}` });
  } catch (error) {
    console.error("Error changing user role:", error);
    res.status(500).json({ error: "Failed to change user role" });
  }
});

// Toggle premium status
router.patch("/users/:id/premium", requireOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { isPaidUser } = req.body;
    const isCurrentUserOwner = req.isOwner;

    if (typeof isPaidUser !== "boolean") {
      return res.status(400).json({ error: "isPaidUser must be a boolean" });
    }

    const [targetUser] = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (targetUser.isAdmin && !isCurrentUserOwner) {
      return res.status(403).json({ error: "Only owner can change admin's premium status" });
    }

    await db.update(users)
      .set({ isPaidUser })
      .where(eq(users.id, id));

    res.json({ success: true, message: `Premium status ${isPaidUser ? "enabled" : "disabled"}` });
  } catch (error) {
    console.error("Error toggling premium:", error);
    res.status(500).json({ error: "Failed to toggle premium status" });
  }
});

// Enable/disable account
router.patch("/users/:id/status", requireOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { isDisabled } = req.body;
    const isCurrentUserOwner = req.isOwner;

    if (typeof isDisabled !== "boolean") {
      return res.status(400).json({ error: "isDisabled must be a boolean" });
    }

    const [targetUser] = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (targetUser.isOwner) {
      return res.status(403).json({ error: "Cannot disable owner account" });
    }

    if (targetUser.isAdmin && !isCurrentUserOwner) {
      return res.status(403).json({ error: "Only owner can disable admin accounts" });
    }

    await db.update(users)
      .set({ isDisabled })
      .where(eq(users.id, id));

    res.json({ success: true, message: `Account ${isDisabled ? "disabled" : "enabled"}` });
  } catch (error) {
    console.error("Error toggling account status:", error);
    res.status(500).json({ error: "Failed to toggle account status" });
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

// AI Question Generation - Generate NEET-level questions using GPT-5
router.post("/generate-questions", requireAdmin, async (req, res) => {
  try {
    const { subject, topic, count = 5, difficulty = "medium" } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({ error: "Subject and topic are required" });
    }

    const difficultyMap: Record<string, number> = {
      easy: 1,
      medium: 2,
      hard: 3
    };

    const prompt = `Generate ${count} multiple choice questions for NEET medical entrance exam preparation.

Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}

Requirements:
- Questions should be NEET exam level and appropriate for ${difficulty} difficulty
- Each question must have exactly 4 options (A, B, C, D)
- Include detailed explanations for the correct answer
- Focus on conceptual understanding and application

Return a JSON object with this exact structure:
{
  "questions": [
    {
      "questionText": "The question text here",
      "options": [
        {"id": "A", "text": "First option"},
        {"id": "B", "text": "Second option"},
        {"id": "C", "text": "Third option"},
        {"id": "D", "text": "Fourth option"}
      ],
      "correctAnswer": "A",
      "solutionDetail": "Detailed explanation of why the answer is correct and why other options are wrong"
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192,
    });

    const content = response.choices[0]?.message?.content || '{"questions":[]}';
    const parsed = JSON.parse(content);

    // Add metadata to each question
    const questionsWithMeta = (parsed.questions || []).map((q: any) => ({
      ...q,
      difficultyLevel: difficultyMap[difficulty] || 2,
      sourceType: "ai_generated",
      subject,
      topic
    }));

    res.json({ 
      success: true, 
      questions: questionsWithMeta,
      count: questionsWithMeta.length
    });
  } catch (error: any) {
    console.error("Error generating questions:", error);
    res.status(500).json({ 
      error: "Failed to generate questions", 
      details: error.message 
    });
  }
});

// AI Flashcard Generation - Generate flashcards for NEET preparation
router.post("/generate-flashcards", requireAdmin, async (req, res) => {
  try {
    const { subject, topic, count = 10 } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({ error: "Subject and topic are required" });
    }

    const prompt = `Generate ${count} flashcards for NEET medical entrance exam preparation.

Subject: ${subject}
Topic: ${topic}

Requirements:
- Each card should have a clear, concise question/term on the front
- The back should have a comprehensive but focused answer
- Include key facts, formulas, or concepts relevant to NEET
- Make cards suitable for quick revision

Return a JSON object with this exact structure:
{
  "flashcards": [
    {
      "front": "Question or term to remember",
      "back": "Answer or explanation"
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 8192,
    });

    const content = response.choices[0]?.message?.content || '{"flashcards":[]}';
    const parsed = JSON.parse(content);

    res.json({ 
      success: true, 
      flashcards: parsed.flashcards || [],
      count: (parsed.flashcards || []).length
    });
  } catch (error: any) {
    console.error("Error generating flashcards:", error);
    res.status(500).json({ 
      error: "Failed to generate flashcards", 
      details: error.message 
    });
  }
});

// Save generated questions to database
router.post("/save-generated-questions", requireAdmin, async (req, res) => {
  try {
    const { topicId, generatedQuestions } = req.body;

    if (!topicId || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      return res.status(400).json({ error: "Topic ID and questions array required" });
    }

    // Verify topic exists
    const [topic] = await db.select().from(contentTopics).where(eq(contentTopics.id, topicId)).limit(1);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    const savedQuestions = [];
    for (const q of generatedQuestions) {
      const [saved] = await db.insert(questions).values({
        topicId,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        solutionDetail: q.solutionDetail,
        solutionSteps: q.solutionSteps || null,
        difficultyLevel: q.difficultyLevel || 2,
        sourceType: "ai_generated",
        relatedTopics: q.relatedTopics || null,
      }).returning();
      savedQuestions.push(saved);
    }

    res.json({ 
      success: true, 
      saved: savedQuestions.length,
      message: `Successfully saved ${savedQuestions.length} questions to topic "${topic.topicName}"`
    });
  } catch (error: any) {
    console.error("Error saving questions:", error);
    res.status(500).json({ 
      error: "Failed to save questions", 
      details: error.message 
    });
  }
});

// Get all topics for dropdown
router.get("/topics", requireAdmin, async (req, res) => {
  try {
    const topics = await db.select().from(contentTopics);
    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

// ============ PAYMENT & SUBSCRIPTION CONFIGURATION ============

const isSensitiveKey = (key: string): boolean => {
  const sensitivePatterns = ['secret', 'key', 'password', 'token', 'credential', 'private'];
  const lowerKey = key.toLowerCase();
  return sensitivePatterns.some(pattern => lowerKey.includes(pattern));
};

const maskSensitiveValue = (value: any): string => {
  return value && String(value).length > 0 ? "••••••••configured" : "";
};

// Get all admin settings
router.get("/settings", requireAdmin, async (req, res) => {
  try {
    const settings = await db.select().from(adminSettings);
    const settingsMap: Record<string, any> = {};
    settings.forEach(s => {
      if (isSensitiveKey(s.key)) {
        settingsMap[s.key] = maskSensitiveValue(s.value);
        settingsMap[`${s.key}_configured`] = !!s.value && String(s.value).length > 0;
      } else {
        settingsMap[s.key] = s.value;
      }
    });
    res.json(settingsMap);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// Get a single admin setting
router.get("/settings/:key", requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const [setting] = await db.select().from(adminSettings).where(eq(adminSettings.key, key)).limit(1);
    if (!setting) {
      return res.status(404).json({ error: "Setting not found" });
    }
    if (isSensitiveKey(key)) {
      res.json({
        ...setting,
        value: maskSensitiveValue(setting.value),
        configured: !!setting.value && String(setting.value).length > 0
      });
    } else {
      res.json(setting);
    }
  } catch (error) {
    console.error("Error fetching setting:", error);
    res.status(500).json({ error: "Failed to fetch setting" });
  }
});

// Update or create an admin setting
router.put("/settings/:key", requireAdmin, async (req, res) => {
  try {
    const { key } = req.params;
    const { value, description } = req.body;
    const userId = req.session?.userId;

    // Check if setting exists
    const [existing] = await db.select().from(adminSettings).where(eq(adminSettings.key, key)).limit(1);

    if (existing) {
      // Update existing setting
      await db.update(adminSettings)
        .set({ 
          value, 
          description: description || existing.description,
          updatedBy: userId,
          updatedAt: new Date()
        })
        .where(eq(adminSettings.key, key));
    } else {
      // Create new setting
      await db.insert(adminSettings).values({
        key,
        value,
        description,
        updatedBy: userId,
      });
    }

    // Log the change
    await db.insert(auditLogs).values({
      userId,
      action: existing ? "update_setting" : "create_setting",
      entityType: "admin_setting",
      entityId: key,
      oldValue: existing?.value,
      newValue: value,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating setting:", error);
    res.status(500).json({ error: "Failed to update setting" });
  }
});

// Bulk update settings
router.post("/settings/bulk", requireAdmin, async (req, res) => {
  try {
    const { settings } = req.body;
    const userId = req.session?.userId;

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ error: "Settings object required" });
    }

    for (const [key, value] of Object.entries(settings)) {
      const [existing] = await db.select().from(adminSettings).where(eq(adminSettings.key, key)).limit(1);

      if (existing) {
        await db.update(adminSettings)
          .set({ value, updatedBy: userId, updatedAt: new Date() })
          .where(eq(adminSettings.key, key));
      } else {
        await db.insert(adminSettings).values({ key, value, updatedBy: userId });
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error bulk updating settings:", error);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// ============ SUBSCRIPTION PLANS MANAGEMENT ============

// Get all subscription plans
router.get("/subscription-plans", requireAdmin, async (req, res) => {
  try {
    const plans = await db.select().from(subscriptionPlans).orderBy(subscriptionPlans.displayOrder);
    res.json(plans);
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    res.status(500).json({ error: "Failed to fetch subscription plans" });
  }
});

// Get a single subscription plan
router.get("/subscription-plans/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, parseInt(id))).limit(1);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ error: "Failed to fetch plan" });
  }
});

// Create a new subscription plan
router.post("/subscription-plans", requireAdmin, async (req, res) => {
  try {
    const { name, slug, description, planType, priceMonthly, priceYearly, features, limits, trialDays, isActive, isPopular, displayOrder } = req.body;
    const userId = req.session?.userId;

    if (!name || !slug) {
      return res.status(400).json({ error: "Name and slug are required" });
    }

    const [plan] = await db.insert(subscriptionPlans).values({
      name,
      slug,
      description,
      planType: planType || 'premium',
      priceMonthly: priceMonthly || 0,
      priceYearly: priceYearly || null,
      features: features || [],
      limits: limits || null,
      trialDays: trialDays || 0,
      isActive: isActive !== false,
      isPopular: isPopular || false,
      displayOrder: displayOrder || 0,
    }).returning();

    // Log the creation
    await db.insert(auditLogs).values({
      userId,
      action: "create_subscription_plan",
      entityType: "subscription_plan",
      entityId: plan.id.toString(),
      newValue: plan,
    });

    res.json(plan);
  } catch (error: any) {
    console.error("Error creating plan:", error);
    if (error.code === '23505') {
      return res.status(400).json({ error: "A plan with this slug already exists" });
    }
    res.status(500).json({ error: "Failed to create plan" });
  }
});

// Update a subscription plan
router.put("/subscription-plans/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, priceMonthly, priceYearly, features, limits, trialDays, isActive, isPopular, displayOrder, stripeProductId, stripePriceIdMonthly, stripePriceIdYearly, razorpayPlanIdMonthly, razorpayPlanIdYearly } = req.body;
    const userId = req.session?.userId;

    // Get existing plan for audit log
    const [existing] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, parseInt(id))).limit(1);
    if (!existing) {
      return res.status(404).json({ error: "Plan not found" });
    }

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (priceMonthly !== undefined) updates.priceMonthly = priceMonthly;
    if (priceYearly !== undefined) updates.priceYearly = priceYearly;
    if (features !== undefined) updates.features = features;
    if (limits !== undefined) updates.limits = limits;
    if (trialDays !== undefined) updates.trialDays = trialDays;
    if (isActive !== undefined) updates.isActive = isActive;
    if (isPopular !== undefined) updates.isPopular = isPopular;
    if (displayOrder !== undefined) updates.displayOrder = displayOrder;
    if (stripeProductId !== undefined) updates.stripeProductId = stripeProductId;
    if (stripePriceIdMonthly !== undefined) updates.stripePriceIdMonthly = stripePriceIdMonthly;
    if (stripePriceIdYearly !== undefined) updates.stripePriceIdYearly = stripePriceIdYearly;
    if (razorpayPlanIdMonthly !== undefined) updates.razorpayPlanIdMonthly = razorpayPlanIdMonthly;
    if (razorpayPlanIdYearly !== undefined) updates.razorpayPlanIdYearly = razorpayPlanIdYearly;

    const [updated] = await db.update(subscriptionPlans)
      .set(updates)
      .where(eq(subscriptionPlans.id, parseInt(id)))
      .returning();

    // Log the update
    await db.insert(auditLogs).values({
      userId,
      action: "update_subscription_plan",
      entityType: "subscription_plan",
      entityId: id,
      oldValue: existing,
      newValue: updated,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ error: "Failed to update plan" });
  }
});

// Delete a subscription plan
router.delete("/subscription-plans/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session?.userId;

    // Get existing plan for audit log
    const [existing] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, parseInt(id))).limit(1);
    if (!existing) {
      return res.status(404).json({ error: "Plan not found" });
    }

    // Check if any active subscriptions use this plan
    const [activeSubscription] = await db.select()
      .from(userSubscriptions)
      .where(and(
        eq(userSubscriptions.planId, parseInt(id)),
        eq(userSubscriptions.status, 'active')
      ))
      .limit(1);

    if (activeSubscription) {
      return res.status(400).json({ error: "Cannot delete plan with active subscriptions. Deactivate it instead." });
    }

    await db.delete(subscriptionPlans).where(eq(subscriptionPlans.id, parseInt(id)));

    // Log the deletion
    await db.insert(auditLogs).values({
      userId,
      action: "delete_subscription_plan",
      entityType: "subscription_plan",
      entityId: id,
      oldValue: existing,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ error: "Failed to delete plan" });
  }
});

// ============ USER SUBSCRIPTIONS MANAGEMENT ============

// Get all user subscriptions with pagination
router.get("/subscriptions", requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const offset = (page - 1) * limit;

    let query = db.select({
      subscription: userSubscriptions,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
      plan: {
        id: subscriptionPlans.id,
        name: subscriptionPlans.name,
        slug: subscriptionPlans.slug,
      },
    })
    .from(userSubscriptions)
    .leftJoin(users, eq(userSubscriptions.userId, users.id))
    .leftJoin(subscriptionPlans, eq(userSubscriptions.planId, subscriptionPlans.id))
    .orderBy(desc(userSubscriptions.createdAt))
    .limit(limit)
    .offset(offset);

    const subscriptions = await query;
    res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ error: "Failed to fetch subscriptions" });
  }
});

// Get subscription statistics
router.get("/subscriptions/stats", requireAdmin, async (req, res) => {
  try {
    const stats = await db.execute(sql`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'active') as active_count,
        COUNT(*) FILTER (WHERE status = 'trial') as trial_count,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_count,
        COUNT(*) FILTER (WHERE status = 'expired') as expired_count,
        COUNT(*) as total_count
      FROM user_subscriptions
    `);

    res.json(stats.rows[0] || { active_count: 0, trial_count: 0, cancelled_count: 0, expired_count: 0, total_count: 0 });
  } catch (error) {
    console.error("Error fetching subscription stats:", error);
    res.status(500).json({ error: "Failed to fetch subscription stats" });
  }
});

// ============ AUDIT LOGS ============

// Get audit logs with pagination
router.get("/audit-logs", requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;

    const logs = await db.select({
      log: auditLogs,
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(auditLogs)
    .leftJoin(users, eq(auditLogs.userId, users.id))
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
    .offset(offset);

    res.json(logs);
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
});
