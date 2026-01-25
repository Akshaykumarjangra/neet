import type { Express } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import { storage } from "./storage";
import { db } from "./db";
import { questions, contentTopics, chapterContent, subscriptionPlans, users, questionPreviewLimits, questionTags, userPerformance, dailyChallenges, userDailyChallenges } from "@shared/schema";
import { GamificationService } from "./gamification";
import { nanoid } from "nanoid";
import { sql, eq, inArray, and } from "drizzle-orm";
import {
  insertQuestionSchema,
  insertContentTopicSchema,
  insertUserPerformanceSchema,
  insertMockTestSchema,
} from "@shared/schema";
import authRoutes from "./auth-routes";
import learningPathRoutes from "./learning-path-routes";
import mockTestRoutes from "./mock-test-routes";
import mockTestAdminRoutes from "./mock-test-admin-routes";
import mockExamRoutes from "./mock-exam-routes";
import mockExamAdminRoutes from "./mock-exam-admin-routes";
import gameRoutes from "./game-routes";
import adminRoutes from "./admin-routes";
import adminContentRoutes from "./admin-content-routes";
import chapterContentRoutes from "./chapter-content-routes";
import lmsRoutes from "./lms-routes";
import mentorRoutes from "./mentor-routes";
import discussionRoutes, { replyRoutes } from "./discussion-routes";
import lmsLearningRoutes from "./lms-learning-routes";
import searchRoutes from "./search-routes";
import billingRoutes from "./billing-routes";
import lmsAutomationRoutes from "./lms-automation-routes";
import announcementRoutes from "./announcement-routes";
import chatRoutes from "./chat-routes";
import { requireActiveSubscription, requireOwner, requireAuthWithPasswordCheck, getCurrentUser } from "./auth";
import taskRoutes from "./task-routes";
import questionTagRoutes from "./question-tag-routes";
import analyticsRoutes from "./analytics-routes";
import telemetryRoutes from "./telemetry-routes";
import profileRoutes from "./profile-routes";
import explainRoutes from "./explain-routes";
import chapterChatRoutes from "./chapter-chat-routes";
import adminImpersonationRoutes from "./admin-impersonation-routes";
import multer from "multer";
import { objectStorage } from "./services/object-storage";

type ContentTopicInsert = typeof contentTopics.$inferInsert;
type QuestionPreviewLimitInsert = typeof questionPreviewLimits.$inferInsert;
type QuestionInsert = typeof questions.$inferInsert;
type UserPerformanceInsert = typeof userPerformance.$inferInsert;

async function updateDailyChallengeProgress(userId: string, isCorrect: boolean) {
  type ChallengeRow = {
    id: number;
    title: string;
    target_type: string;
    target_value: number | null;
    xp_reward: number | null;
  };

  const challenges = await db.execute(
    sql`SELECT id, title, target_type, target_value, xp_reward FROM daily_challenges WHERE challenge_date::date = CURRENT_DATE`
  );
  const rows = (challenges.rows ?? []) as ChallengeRow[];

  for (const ch of rows) {
    if (ch.target_type !== "questions_solved") continue;
    const targetValue = Number(ch.target_value ?? 0);
    const xpReward = Number(ch.xp_reward ?? 0);

    const [existing] = await db
      .select()
      .from(userDailyChallenges)
      .where(
        and(
          eq(userDailyChallenges.userId, userId),
          eq(userDailyChallenges.challengeId, ch.id)
        )
      )
      .limit(1);

    const prevProgress = existing?.progress ?? 0;
    const newProgress = Math.min(prevProgress + 1, targetValue);
    const wasCompleted = existing?.completed ?? false;
    const isCompleted = newProgress >= targetValue;

    if (existing) {
      await db
        .update(userDailyChallenges)
        .set({
          progress: newProgress,
          completed: isCompleted,
          completedAt: isCompleted && !wasCompleted ? new Date() : existing.completedAt,
        } as any)
        .where(eq(userDailyChallenges.id, existing.id));
    } else {
      await db.insert(userDailyChallenges).values({
        userId,
        challengeId: ch.id,
        progress: newProgress,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null,
      } as any);
    }

    if (isCompleted && !wasCompleted && xpReward) {
      await GamificationService.awardXp(userId, xpReward, {
        type: "challenge",
        sourceId: String(ch.id),
        description: ch.title ? `Daily challenge: ${ch.title}` : "Daily challenge complete",
      });
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", async (req, res) => {
    try {
      // Check database connection
      await db.execute(sql`SELECT 1`);
      res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
    } catch (error: any) {
      res.status(503).json({
        status: "unhealthy",
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Authentication routes
  app.use("/api/auth", authRoutes);

  // Learning Path routes
  app.use("/api/learning-path", learningPathRoutes);

  // Mock Test routes
  app.use("/api/mock-tests", mockTestRoutes);
  app.use("/api/mock-exams", mockExamRoutes);
  app.use("/api/admin/mock-exams", mockExamAdminRoutes);

  // Game/Gamification routes
  app.use("/api/game", gameRoutes);

  // Admin routes
  app.use("/api/admin", adminRoutes);
  app.use("/api/admin/mock-tests-v2", mockTestAdminRoutes);
  app.use("/api/admin", adminImpersonationRoutes);

  // Admin Content Management routes
  app.use("/api/admin", adminContentRoutes);

  // Chapter Content routes
  app.use("/api/chapters", chapterContentRoutes);

  // Chapter Chat routes (context-aware chatbot)
  app.use("/api/chapters", chapterChatRoutes);

  // Protect generic chapter routes check below
  // app.use("/api/chapters", chapterContentRoutes); - This is already defined above, ensuring it handles auth internally OR we wrap it here.
  // Ideally, chapterContentRoutes should export a router that we can wrap.

  // Checking usage line 158: app.use("/api/chapters", chapterContentRoutes);
  // We should apply middleware there if chapterContentRoutes doesn't have it.



  // LMS routes (Library, Progress, Bookmarks, Notes)
  app.use("/api/lms", lmsRoutes);

  // Mentor routes (Mentor profiles, Bookings, Availability, Reviews)
  app.use("/api", mentorRoutes);

  // Community Discussion routes
  app.use("/api/discussions", discussionRoutes);
  app.use("/api/replies", replyRoutes);

  // LMS Learning routes (Keypoints, Formulas, Progress, Bookmarks, Spaced Repetition)
  app.use("/api/learn", lmsLearningRoutes);

  // Search routes (Full-text search across topics, questions, formulas, keypoints)
  app.use("/api/search", searchRoutes);

  app.use("/api/billing", billingRoutes);

  app.use("/api/admin/tasks", taskRoutes);
  app.use("/api/announcements", announcementRoutes);
  app.use("/api/chat", requireActiveSubscription(), chatRoutes);
  app.use("/api/question-tags", questionTagRoutes);
  app.use("/api/analytics", requireActiveSubscription(), analyticsRoutes);
  app.use("/api/telemetry", telemetryRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/explain", requireActiveSubscription(), explainRoutes);

  // ============ PUBLIC SUBSCRIPTION PLANS ============

  // Get all active subscription plans (public)
  app.get("/api/subscription-plans", async (_req, res) => {
    try {
      const plans = await db.select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.isActive, true))
        .orderBy(subscriptionPlans.displayOrder);

      if (!plans || plans.length === 0) {
        const now = new Date();
        const fallbackPlans = [
          {
            id: -1,
            name: "Premium Monthly",
            slug: "premium-monthly",
            description: "Full NEET syllabus access with AI guidance billed monthly.",
            planType: "premium",
            priceMonthly: 99900,
            priceYearly: null,
            currency: "INR",
            billingInterval: "monthly",
            features: [
              "50,000+ questions",
              "Mock tests & analytics",
              "AI mentor guidance",
            ],
            limits: {
              mockTestsPerMonth: 8,
              mentorSessionsPerMonth: 2,
              downloadContent: true,
            },
            trialDays: 0,
            isActive: true,
            isPopular: true,
            displayOrder: 1,
            createdAt: now,
          },
          {
            id: -2,
            name: "Premium Yearly",
            slug: "premium-yearly",
            description: "Best value annual access (₹11,988) with bonus mentor credits.",
            planType: "premium",
            priceMonthly: 99900,
            priceYearly: 1198800,
            currency: "INR",
            billingInterval: "yearly",
            features: [
              "Everything in Premium Monthly",
              "Priority mentor booking",
              "Exclusive revision bootcamps",
            ],
            limits: {
              mockTestsPerMonth: 12,
              mentorSessionsPerMonth: 4,
              downloadContent: true,
            },
            trialDays: 0,
            isActive: true,
            isPopular: true,
            displayOrder: 2,
            createdAt: now,
          },
        ];
        return res.json(fallbackPlans);
      }

      res.json(plans);
    } catch (error: any) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ error: "Failed to fetch subscription plans" });
    }
  });

  // Topic routes
  app.get("/api/topics", async (req, res) => {
    try {
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/topics/subject/:subject", async (req, res) => {
    try {
      const { subject } = req.params;
      const topics = await storage.getTopicsBySubject(subject);
      res.json(topics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get topics with question counts
  app.get("/api/topics/with-counts", async (req, res) => {
    try {
      const topics = await storage.getAllTopics();
      const topicsWithCounts = await Promise.all(
        topics.map(async (topic) => {
          const questions = await storage.getQuestionsByTopic(topic.id);
          return {
            ...topic,
            questionCount: questions.length,
            totalQuestions: questions.length
          };
        })
      );
      res.json(topicsWithCounts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/topics", async (req, res) => {
    try {
      const validatedData = insertContentTopicSchema.parse(req.body) as ContentTopicInsert;
      const topic = await storage.createTopic(validatedData);
      res.status(201).json(topic);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Question stats endpoint for Question Bank page
  app.get("/api/questions/stats", async (req, res) => {
    try {
      // Get total count
      const totalResult = await db.select({ count: sql<number>`count(*)` }).from(questions);
      const total = Number(totalResult[0].count);

      // Get counts by subject (joining with contentTopics)
      const subjectCountsResult = await db.select({
        subject: contentTopics.subject,
        count: sql<number>`count(*)`
      })
        .from(questions)
        .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
        .groupBy(contentTopics.subject);

      const bySubject: Record<string, number> = {};
      for (const row of subjectCountsResult) {
        bySubject[row.subject] = Number(row.count);
      }

      // Get counts by difficulty
      const difficultyCountsResult = await db.select({
        difficulty: questions.difficultyLevel,
        count: sql<number>`count(*)`
      })
        .from(questions)
        .groupBy(questions.difficultyLevel);

      const byDifficulty: Record<string, number> = {};
      for (const row of difficultyCountsResult) {
        const label = row.difficulty === 1 ? 'easy' : row.difficulty === 2 ? 'medium' : 'hard';
        byDifficulty[label] = Number(row.count);
      }

      // Get PYQ count
      const pyqResult = await db.select({ count: sql<number>`count(*)` })
        .from(questions)
        .where(sql`${questions.pyqYear} IS NOT NULL`);
      const pyqCount = Number(pyqResult[0].count);

      // Get PYQ years distribution
      const pyqYearsResult = await db.select({
        year: questions.pyqYear,
        count: sql<number>`count(*)`
      })
        .from(questions)
        .where(sql`${questions.pyqYear} IS NOT NULL`)
        .groupBy(questions.pyqYear)
        .orderBy(sql`${questions.pyqYear} DESC`);

      const pyqByYear: Record<string, number> = {};
      for (const row of pyqYearsResult) {
        if (row.year) {
          pyqByYear[String(row.year)] = Number(row.count);
        }
      }

      res.json({
        total,
        bySubject,
        byDifficulty,
        pyqCount,
        pyqByYear
      });
    } catch (error: any) {
      console.error("Error fetching question stats:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Public preview endpoint - returns fixed 5 sample questions for marketing/preview
  app.get("/api/questions/preview", async (req, res) => {
    try {
      const previewQuestions = await db.select({
        question: questions,
        topic: contentTopics
      })
        .from(questions)
        .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
        .limit(5);

      const formattedQuestions = previewQuestions.map(r => ({
        ...r.question,
        topic: r.topic
      }));

      res.json({
        questions: formattedQuestions,
        total: 5,
        isPreview: true,
        requiresAuth: true,
        message: "Sign up to access our full 50,000+ question bank"
      });
    } catch (error: any) {
      console.error("Error fetching preview questions:", error);
      res.status(500).json({ message: "Failed to load preview questions" });
    }
  });

  // Question routes with pagination and search - REQUIRES AUTHENTICATION
  app.get("/api/questions", async (req, res) => {
    try {
      const startedAt = Date.now();
      // Authentication required for main questions endpoint
      if (!req.session?.userId) {
        return res.status(401).json({
          message: "Authentication required",
          requiresAuth: true
        });
      }

      const {
        subject: subjectParam,
        topicId,
        difficulty,
        limit,
        pyqOnly,
        pyqYear,
        search,
        page,
        chapterContentId,
      } = req.query;

      const rawSubject = subjectParam ? String(subjectParam).trim() : "";
      const subjectLower = rawSubject.toLowerCase();
      let effectiveSubject = rawSubject;
      let implicitTag: string | null = null;
      if (subjectLower === "botany" || subjectLower === "zoology") {
        effectiveSubject = "Biology";
        implicitTag = subjectLower;
      }

      const FREE_QUESTION_LIMIT = 10;
      const userId = req.session.userId;

      // Get user premium status
      const [currentUser] = await db
        .select({
          isPaidUser: users.isPaidUser,
          isAdmin: users.isAdmin,
          isOwner: users.isOwner,
        })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
      const isPremiumUser = !!(
        currentUser?.isPaidUser ||
        currentUser?.isAdmin ||
        currentUser?.isOwner
      );

      let previewedIds: Set<number> = new Set();

      // For free users, use DB-backed tracking
      if (!isPremiumUser) {
        const existing = await db.select().from(questionPreviewLimits).where(eq(questionPreviewLimits.userId, userId)).limit(1);
        const dbPreviewedIds = existing[0]?.previewedQuestionIds || [];
        previewedIds = new Set(dbPreviewedIds);

        // Check if quota exhausted for free users
        if (previewedIds.size >= FREE_QUESTION_LIMIT) {
          return res.json({
            questions: [],
            total: 0,
            page: 1,
            limit: FREE_QUESTION_LIMIT,
            totalPages: 0,
            isLimited: true,
            quotaExhausted: true,
            quotaRemaining: 0,
            requiresSignup: false
          });
        }
      }

      // Determine limits based on access tier
      const isLimited = !isPremiumUser;

      // Pagination params
      const pageNum = page ? parseInt(page as string) : 1;
      let limitNum = limit ? parseInt(limit as string) : 20;
      // Clamp limits to avoid accidentally huge payloads
      const MAX_LIMIT = 100;
      const MIN_LIMIT = 1;
      limitNum = Math.min(Math.max(limitNum, MIN_LIMIT), MAX_LIMIT);
      let offset = (pageNum - 1) * limitNum;

      // For non-premium users, we need to enforce limits
      // Premium users use the page/limit params as provided for proper pagination
      // CRITICAL SECURITY FIX: Never allow free users to fetch more than the free limit
      const fetchLimit = isPremiumUser ? limitNum : Math.min(limitNum, FREE_QUESTION_LIMIT);
      const fetchOffset = isPremiumUser ? offset : 0; // Free users always start at 0 to avoid pagination bypass

      const rawTagFilter = req.query.tags;
      const requestedTags = Array.isArray(rawTagFilter)
        ? rawTagFilter
        : rawTagFilter
          ? [rawTagFilter]
          : [];
      const normalizedTags = requestedTags
        .map((value) => String(value).trim())
        .filter(Boolean);
      if (implicitTag && !normalizedTags.includes(implicitTag)) {
        normalizedTags.push(implicitTag);
      }
      let includedQuestionIds: number[] | null = null;
      const responseLimit = isPremiumUser ? limitNum : FREE_QUESTION_LIMIT;

      let chapterTopicIds: number[] | null = null;
      if (chapterContentId) {
        const chapterId = parseInt(chapterContentId as string);
        if (Number.isNaN(chapterId)) {
          return res.status(400).json({
            error: "Invalid chapterContentId",
            questions: [],
            total: 0,
            page: 1,
            limit: responseLimit,
            totalPages: 0,
            isLimited,
            requiresSignup: false,
          });
        }

        const [chapter] = await db
          .select({
            subject: chapterContent.subject,
            classLevel: chapterContent.classLevel,
            chapterNumber: chapterContent.chapterNumber,
            chapterTitle: chapterContent.chapterTitle,
          })
          .from(chapterContent)
          .where(eq(chapterContent.id, chapterId))
          .limit(1);

        if (!chapter) {
          return res.status(404).json({
            error: "Chapter not found",
            questions: [],
            total: 0,
            page: 1,
            limit: responseLimit,
            totalPages: 0,
            isLimited,
            requiresSignup: false,
          });
        }

        const chapterLabel = `Chapter ${chapter.chapterNumber}`;
        const classLevelMatches = new Set<string>();
        if (chapter.classLevel) {
          classLevelMatches.add(chapter.classLevel);
          const numericClassLevel = String(chapter.classLevel).match(/\d+/)?.[0];
          if (numericClassLevel) {
            classLevelMatches.add(`Class ${numericClassLevel}`);
          }
        }

        const classLevelConditions = Array.from(classLevelMatches).map(
          (level) => sql`${contentTopics.classLevel} = ${level}`,
        );
        const classLevelClause = classLevelConditions.length === 0
          ? sql`true`
          : classLevelConditions.length === 1
            ? classLevelConditions[0]
            : sql`(${sql.join(classLevelConditions, sql` OR `)})`;

        const titleMatchRows = await db
          .select({ id: contentTopics.id })
          .from(contentTopics)
          .where(
            sql`${contentTopics.subject} = ${chapter.subject}
              AND ${classLevelClause}
              AND ${contentTopics.topicName} ILIKE ${chapter.chapterTitle}`
          );

        if (titleMatchRows.length > 0) {
          chapterTopicIds = titleMatchRows.map((row) => row.id);
        } else {
          const topicRows = await db
            .select({ id: contentTopics.id })
            .from(contentTopics)
            .where(
              sql`${contentTopics.subject} = ${chapter.subject}
                AND ${classLevelClause}
                AND ${contentTopics.ncertChapter} ILIKE ${chapterLabel}`
            );

          chapterTopicIds = topicRows.map((row) => row.id);
        }

        if (chapterTopicIds.length === 0) {
          return res.json({
            questions: [],
            total: 0,
            page: 1,
            limit: responseLimit,
            totalPages: 0,
            isLimited,
            requiresSignup: false,
            message: "No questions mapped to this chapter yet",
          });
        }
      }

      if (normalizedTags.length > 0) {
        try {
          const countExpression = sql<number>`count(*)`;
          const matchedQuestions = await db
            .select({
              questionId: questionTags.questionId,
              matchCount: countExpression,
            })
            .from(questionTags)
            .where(inArray(questionTags.tag, normalizedTags))
            .groupBy(questionTags.questionId)
            .having(sql`${countExpression} >= ${normalizedTags.length}`);

          includedQuestionIds = matchedQuestions.map((row) => row.questionId);

          if (includedQuestionIds.length === 0) {
            return res.json({
              questions: [],
              total: 0,
              page: 1,
              limit: responseLimit,
              totalPages: 0,
              isLimited: !isPremiumUser,
              requiresSignup: false,
              message: "No questions match the selected tags",
            });
          }
        } catch (error) {
          console.warn("Question tags unavailable; tag filters skipped.", error);
          return res.json({
            questions: [],
            total: 0,
            page: 1,
            limit: responseLimit,
            totalPages: 0,
            isLimited: !isPremiumUser,
            requiresSignup: false,
            message: "Tag filters are temporarily unavailable.",
          });
        }
      }

      // Build query conditions
      const conditions: any[] = [];

      if (chapterTopicIds) {
        conditions.push(inArray(questions.topicId, chapterTopicIds));
      }

      if (topicId) {
        conditions.push(eq(questions.topicId, parseInt(topicId as string)));
      }

      if (difficulty) {
        conditions.push(eq(questions.difficultyLevel, parseInt(difficulty as string)));
      }

      if (pyqOnly === 'true') {
        conditions.push(sql`${questions.pyqYear} IS NOT NULL`);
      }

      if (pyqYear) {
        conditions.push(eq(questions.pyqYear, parseInt(pyqYear as string)));
      }

      if (search) {
        conditions.push(sql`${questions.questionText} ILIKE ${'%' + search + '%'}`);
      }

      if (includedQuestionIds) {
        conditions.push(inArray(questions.id, includedQuestionIds));
      }

      let questionsList: any[];
      let totalCount: number;

      if (effectiveSubject) {
        // Query with subject filter (need to join with contentTopics)
        const subjectCondition = eq(contentTopics.subject, effectiveSubject);
        const allConditions = conditions.length > 0
          ? sql`${subjectCondition} AND ${sql.join(conditions, sql` AND `)}`
          : subjectCondition;

        // Get total count
        const countResult = await db.select({ count: sql<number>`count(*)` })
          .from(questions)
          .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
          .where(allConditions);
        totalCount = Number(countResult[0].count);

        // Get paginated results
        const results = await db.select({
          question: questions,
          topic: contentTopics
        })
          .from(questions)
          .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
          .where(allConditions)
          .limit(fetchLimit)
          .offset(fetchOffset);

        questionsList = results.map(r => ({
          ...r.question,
          topic: r.topic
        }));
      } else {
        // Query without subject filter
        const whereClause = conditions.length > 0 ? sql.join(conditions, sql` AND `) : undefined;

        // Get total count
        const countQuery = whereClause
          ? db.select({ count: sql<number>`count(*)` }).from(questions).where(whereClause)
          : db.select({ count: sql<number>`count(*)` }).from(questions);
        const countResult = await countQuery;
        totalCount = Number(countResult[0].count);

        // Get paginated results with topic info
        let resultsQuery = db.select({
          question: questions,
          topic: contentTopics
        })
          .from(questions)
          .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id));

        if (whereClause) {
          resultsQuery = resultsQuery.where(whereClause) as typeof resultsQuery;
        }

        const results = await resultsQuery.limit(fetchLimit).offset(fetchOffset);
        questionsList = results.map(r => ({
          ...r.question,
          topic: r.topic
        }));
      }

      // Attach tags for every question returned
      const questionIds = questionsList.map((q) => q.id);
      let rawTagRows: { questionId: number; tag: string; category: string }[] = [];
      if (questionIds.length) {
        try {
          rawTagRows = await db
            .select({
              questionId: questionTags.questionId,
              tag: questionTags.tag,
              category: questionTags.category,
            })
            .from(questionTags)
            .where(inArray(questionTags.questionId, questionIds));
        } catch (error) {
          console.warn("Question tags unavailable; returning questions without tags.", error);
          rawTagRows = [];
        }
      }

      const tagMap = new Map<number, { tag: string; category: string }[]>();
      rawTagRows.forEach((row) => {
        const existing = tagMap.get(row.questionId) ?? [];
        existing.push({ tag: row.tag, category: row.category });
        tagMap.set(row.questionId, existing);
      });

      const attachTags = (list: any[]) =>
        list.map((question) => ({
          ...question,
          tags: tagMap.get(question.id) ?? [],
        }));

      // Handle free users (non-premium) - DB-backed tracking for 10 questions
      if (isLimited) {
        // Double check quota before returning any data
        const currentPreviewCount = previewedIds.size;
        if (currentPreviewCount >= FREE_QUESTION_LIMIT) {
          return res.json({
            questions: [],
            total: 0,
            page: 1,
            limit: FREE_QUESTION_LIMIT,
            totalPages: 0,
            isLimited: true,
            quotaExhausted: true,
            quotaRemaining: 0,
            requiresSignup: false,
            message: "Free preview limit reached. Please upgrade to continue."
          });
        }

        const newQuestions = questionsList.filter(q => !previewedIds.has(q.id));
        const remainingQuota = FREE_QUESTION_LIMIT - previewedIds.size;
        const questionsToShow = newQuestions.slice(0, remainingQuota);

        // Track viewed questions in database with deduplication
        const newIds = questionsToShow.map(q => q.id);
        if (newIds.length > 0) {
          const uniqueIds = [...new Set([...Array.from(previewedIds), ...newIds])].slice(0, FREE_QUESTION_LIMIT);

          await db.insert(questionPreviewLimits)
            .values({
              userId,
              previewedQuestionIds: uniqueIds,
              lastAccessedAt: new Date()
            } as QuestionPreviewLimitInsert)
            .onConflictDoUpdate({
              target: questionPreviewLimits.userId,
              set: {
                previewedQuestionIds: uniqueIds,
                lastAccessedAt: new Date()
              } as Partial<QuestionPreviewLimitInsert>
            });
        }

        const totalUsed = previewedIds.size + newIds.length;

        return res.json({
          questions: attachTags(questionsToShow),
          total: totalCount,
          page: 1,
          limit: FREE_QUESTION_LIMIT,
          totalPages: 1,
          isLimited: true,
          requiresSignup: false,
          quotaExhausted: totalUsed >= FREE_QUESTION_LIMIT,
          quotaRemaining: FREE_QUESTION_LIMIT - totalUsed
        });
      }

      const effectiveTotalPages = Math.ceil(totalCount / limitNum);

      const etagBase = JSON.stringify({
        ids: questionsList.slice(0, 100).map((q) => q.id),
        total: totalCount,
        page: pageNum,
        limit: limitNum,
      });
      const etag = `"${crypto.createHash("md5").update(etagBase).digest("hex")}"`;
      res.setHeader("ETag", etag);
      res.setHeader("Last-Modified", new Date().toUTCString());

      // Add cache control headers for better performance
      res.setHeader("Cache-Control", `public, max-age=${isPremiumUser ? 300 : 60}, stale-while-revalidate=600`);

      if (req.headers["if-none-match"] === etag) {
        return res.status(304).end();
      }

      // Ensure questions array is always present
      const finalQuestions = attachTags(questionsList || []);

      res.json({
        questions: finalQuestions,
        total: totalCount || 0,
        page: pageNum,
        limit: limitNum,
        totalPages: effectiveTotalPages,
        isLimited: false,
        requiresSignup: false
      });

      const duration = Date.now() - startedAt;
      if (duration > 800) {
        console.warn(`[SLOW] /api/questions took ${duration}ms (user=${userId}, premium=${isPremiumUser}, limit=${limitNum}, page=${pageNum})`);
      }
    } catch (error: any) {
      console.error("Error fetching questions:", error);
      // Return consistent error format
      res.status(500).json({
        error: error.message || "Failed to fetch questions",
        questions: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
        isLimited: false,
        requiresSignup: false
      });
    }
  });

  app.get("/api/questions/adaptive", requireAuthWithPasswordCheck, async (req, res) => {
    try {
      const userId = getCurrentUser(req);
      if (!userId) {
        return res.status(401).json({ message: "Authentication required", requiresAuth: true });
      }

      const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      const isPremiumUser = user?.isPaidUser ?? false;

      const topicStats = await db
        .select({
          topicId: contentTopics.id,
          topicName: contentTopics.topicName,
          subject: contentTopics.subject,
          correct: sql<number>`SUM(CASE WHEN ${userPerformance.isCorrect} THEN 1 ELSE 0 END)`,
          total: sql<number>`COUNT(*)`,
        })
        .from(userPerformance)
        .innerJoin(questions, eq(userPerformance.questionId, questions.id))
        .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
        .where(eq(userPerformance.userId, userId))
        .groupBy(contentTopics.id, contentTopics.topicName, contentTopics.subject);

      const topicInsights = topicStats.map((topic) => {
        const total = Number(topic.total ?? 0);
        const correct = Number(topic.correct ?? 0);
        const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
        return {
          topicId: Number(topic.topicId),
          topicName: topic.topicName,
          subject: topic.subject,
          accuracy,
          totalAttempts: total,
        };
      });

      const weakTopics = [...topicInsights]
        .filter((topic) => topic.totalAttempts > 0)
        .sort((a, b) => a.accuracy - b.accuracy)
        .slice(0, 4);

      let candidateTopicIds = weakTopics.map((topic) => topic.topicId);
      if (candidateTopicIds.length === 0) {
        const fallbackRows = await db
          .select({ id: contentTopics.id })
          .from(contentTopics)
          .limit(4);
        candidateTopicIds = fallbackRows.map((row) => Number(row.id));
      }

      const questionQueryBase = db
        .select({
          question: questions,
          topic: contentTopics,
        })
        .from(questions)
        .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id));

      const questionQuery = candidateTopicIds.length > 0
        ? questionQueryBase.where(inArray(questions.topicId, candidateTopicIds))
        : questionQueryBase;

      const adaptiveQuestions = await questionQuery.orderBy(sql`RANDOM()`).limit(30);

      const questionIds = adaptiveQuestions.map((row) => row.question.id);
      let tagRows: { questionId: number; tag: string; category: string }[] = [];
      if (questionIds.length) {
        try {
          tagRows = await db
            .select({
              questionId: questionTags.questionId,
              tag: questionTags.tag,
              category: questionTags.category,
            })
            .from(questionTags)
            .where(inArray(questionTags.questionId, questionIds));
        } catch (error) {
          console.warn("Question tags unavailable for adaptive questions.", error);
          tagRows = [];
        }
      }

      const tagMap = new Map<number, { tag: string; category: string }[]>();
      tagRows.forEach((row) => {
        const existing = tagMap.get(row.questionId) ?? [];
        existing.push({ tag: row.tag, category: row.category });
        tagMap.set(row.questionId, existing);
      });

      const attachTags = (list: typeof adaptiveQuestions) =>
        list.map((row) => ({
          ...row.question,
          topic: row.topic,
          tags: tagMap.get(row.question.id) ?? [],
        }));

      res.json({
        requiresPremium: !isPremiumUser,
        weakTopics,
        questions: attachTags(adaptiveQuestions || []),
      });
    } catch (error: any) {
      console.error("Error generating adaptive questions:", error);
      res.status(500).json({
        error: "Failed to generate adaptive practice set",
        requiresPremium: false,
        weakTopics: [],
        questions: []
      });
    }
  });

  // Bookmarked questions endpoint - must be before /:id to avoid route conflict
  app.get("/api/questions/bookmarked", async (req, res) => {
    try {
      // Return empty array as question bookmarks are not yet implemented
      // This endpoint exists to prevent the /:id route from catching "bookmarked" as an ID
      res.json([]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Generation status endpoint - must be before /:id to avoid route conflict
  app.get("/api/questions/generation-status", async (req, res) => {
    try {
      const totalQuestions = await db.select({ count: sql<number>`count(*)` }).from(questions);
      const totalTopics = await db.select({ count: sql<number>`count(*)` }).from(contentTopics);

      const count = Number(totalQuestions[0].count);
      const topicCount = Number(totalTopics[0].count);

      res.json({
        totalQuestions: count,
        totalTopics: topicCount,
        estimatedSets: Math.floor(count / 20),
        progress: Math.min(100, (count / 50000) * 100).toFixed(2),
      });
    } catch (error) {
      console.error("Error fetching generation status:", error);
      res.status(500).json({ error: "Failed to fetch status" });
    }
  });

  // Progress/chapters endpoint for user chapter progress
  app.get("/api/progress/chapters/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      // Return empty object as this endpoint was missing
      res.json({});
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      // Require authentication to access individual questions
      if (!req.session?.userId) {
        return res.status(401).json({ message: "Authentication required", requiresAuth: true });
      }

      const userId = req.session.userId;
      const id = parseInt(req.params.id);

      // Check if user is premium
      const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      const isPremiumUser = user[0]?.isPaidUser || false;

      const question = await storage.getQuestionById(id);

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      // For non-premium users, enforce quota (only after verifying question exists)
      if (!isPremiumUser) {
        const FREE_QUESTION_LIMIT = 10;

        // Get existing preview record
        const existing = await db.select()
          .from(questionPreviewLimits)
          .where(eq(questionPreviewLimits.userId, userId))
          .limit(1);

        const previewedIds: Set<number> = new Set(existing[0]?.previewedQuestionIds || []);

        // Check if this question is already in their quota
        if (!previewedIds.has(id)) {
          // Check if quota is exhausted
          if (previewedIds.size >= FREE_QUESTION_LIMIT) {
            return res.status(403).json({
              message: "Question quota exhausted. Upgrade to Premium for unlimited access.",
              quotaExhausted: true
            });
          }

          // Add this question to their quota (only for valid questions)
          previewedIds.add(id);
          const updatedIds = [...previewedIds].slice(0, FREE_QUESTION_LIMIT);

          await db.insert(questionPreviewLimits)
            .values({ userId, previewedQuestionIds: updatedIds } as QuestionPreviewLimitInsert)
            .onConflictDoUpdate({
              target: questionPreviewLimits.userId,
              set: { previewedQuestionIds: updatedIds, lastAccessedAt: new Date() } as Partial<QuestionPreviewLimitInsert>
            });
        }
      }

      res.json(question);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/questions", async (req, res) => {
    try {
      // Require authentication to create questions
      if (!req.session?.userId) {
        return res.status(401).json({ message: "Authentication required", requiresAuth: true });
      }

      const validatedData = insertQuestionSchema.parse(req.body) as QuestionInsert;
      const question = await storage.createQuestion(validatedData);
      res.status(201).json(question);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // User performance routes
  app.post("/api/performance", async (req, res) => {
    try {
      const validatedData = insertUserPerformanceSchema.parse(req.body) as UserPerformanceInsert;
      const attempt = await storage.recordAttempt(validatedData);

      // Award XP for the attempt (more for correct answers) and check achievements
      let xpAwarded = 0;
      try {
        xpAwarded = validatedData.isCorrect ? 10 : 2;
        await GamificationService.awardXp(validatedData.userId, xpAwarded, {
          type: "question",
          sourceId: String(validatedData.questionId),
          description: validatedData.isCorrect
            ? "Correct practice question"
            : "Practice attempt",
        });
        // Refresh leaderboard entry for global/all-time
        await db.execute(sql`
          DELETE FROM leaderboard_entries 
          WHERE user_id = ${validatedData.userId}
            AND leaderboard_type = 'global'
            AND period = 'all_time'
        `);
        await db.execute(sql`
          INSERT INTO leaderboard_entries (user_id, leaderboard_type, score, rank, period, updated_at)
          SELECT id, 'global', total_points, NULL, 'all_time', NOW()
          FROM users WHERE id = ${validatedData.userId}
        `);
        await GamificationService.checkAchievements(validatedData.userId);
        await updateDailyChallengeProgress(validatedData.userId, validatedData.isCorrect);
      } catch (err) {
        console.warn("Gamification award failed", err);
      }

      res.status(201).json({ attempt, xpAwarded });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/performance/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const performance = await storage.getUserPerformance(userId);
      res.json(performance);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/stats/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });


  // Generate PYQ-focused test
  app.post("/api/questionnaires/pyq", async (req, res) => {
    try {
      const { questionGenerator } = await import("./question-generator");
      const { years, questionsPerYear } = req.body;

      const questions = await questionGenerator.generatePYQSet(
        years || [2024, 2023, 2022, 2021, 2020],
        questionsPerYear
      );

      const testData = {
        testType: "PYQ Practice",
        title: `Previous Year Questions (${years.join(", ")})`,
        questionsList: questions.map(q => q.id),
        durationMinutes: questions.length * 2, // 2 minutes per question
        subject: "All",
      };

      const mockTest = await storage.createMockTest(testData);
      res.json(mockTest);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Generate topic-wise practice
  app.post("/api/questionnaires/topic-practice", async (req, res) => {
    try {
      const { questionGenerator } = await import("./question-generator");
      const { topicIds, questionsPerTopic, progressiveDifficulty } = req.body;

      const questions = await questionGenerator.generateTopicPractice(
        topicIds,
        questionsPerTopic || 10,
        progressiveDifficulty !== false
      );

      const topics = await Promise.all(
        topicIds.map((id: number) => storage.getTopicById(id))
      );
      const topicNames = topics.filter(t => t).map(t => t!.topicName).join(", ");

      const testData = {
        testType: "Topic Practice",
        title: `Practice: ${topicNames}`,
        questionsList: questions.map(q => q.id),
        durationMinutes: questions.length * 2,
        subject: topics[0]?.subject || "Mixed",
      };

      const mockTest = await storage.createMockTest(testData);
      res.json(mockTest);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Generate adaptive practice based on performance
  app.post("/api/questionnaires/adaptive", async (req, res) => {
    try {
      const { questionGenerator } = await import("./question-generator");
      const { userId, totalQuestions } = req.body;

      // Get user performance to identify weak areas
      const stats = await storage.getUserStats(userId);

      // Identify weak and strong topics (simplified logic)
      const weakTopics = stats.subjectStats
        .filter(s => s.accuracy < 60)
        .map(s => s.subject);

      const strongTopics = stats.subjectStats
        .filter(s => s.accuracy >= 60)
        .map(s => s.subject);

      // Get topic IDs
      const allTopics = await storage.getAllTopics();
      const weakTopicIds = allTopics
        .filter(t => weakTopics.includes(t.subject))
        .map(t => t.id);

      const strongTopicIds = allTopics
        .filter(t => strongTopics.includes(t.subject))
        .map(t => t.id);

      const questions = await questionGenerator.generateAdaptiveSet(
        weakTopicIds.length > 0 ? weakTopicIds : allTopics.map(t => t.id),
        strongTopicIds,
        totalQuestions || 50
      );

      const testData = {
        testType: "Adaptive Practice",
        title: "Personalized Practice Set",
        questionsList: questions.map(q => q.id),
        durationMinutes: questions.length * 2,
        subject: "Mixed",
      };

      const mockTest = await storage.createMockTest(testData);
      res.json(mockTest);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Bulk question generation endpoints
  app.post("/api/questions/generate-bulk", requireOwner, async (req, res) => {
    res.status(503).json({
      error: "Background jobs are disabled on this environment.",
    });
  });

  // ========== GAMIFICATION ROUTES ==========
  const { GamificationService } = await import("./gamification");

  // Award XP
  app.post("/api/gamification/award-xp", async (req, res) => {
    try {
      const { userId, amount, source } = req.body;
      const result = await GamificationService.awardXp(userId, amount, source);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update streak
  app.post("/api/gamification/update-streak", async (req, res) => {
    try {
      const { userId } = req.body;
      const result = await GamificationService.updateStreak(userId);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Check achievements
  app.post("/api/gamification/check-achievements", async (req, res) => {
    try {
      const { userId } = req.body;
      const newAchievements = await GamificationService.checkAchievements(userId);
      res.json({ newAchievements });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get user achievements
  app.get("/api/gamification/achievements/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const achievements = await GamificationService.getUserAchievements(userId);
      res.json(achievements);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get daily challenges
  app.get("/api/gamification/daily-challenges/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const challenges = await GamificationService.getDailyChallenges(userId);
      res.json(challenges);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update challenge progress
  app.post("/api/gamification/challenge-progress", async (req, res) => {
    try {
      const { userId, challengeId, progress } = req.body;
      const completed = await GamificationService.updateChallengeProgress(userId, challengeId, progress);
      res.json({ completed });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get leaderboard
  app.get("/api/gamification/leaderboard", async (req, res) => {
    try {
      const { type = 'all_time', limit = 10 } = req.query;
      const leaderboard = await GamificationService.getLeaderboard(type as string, parseInt(limit as string));
      res.json(leaderboard);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update chapter progress
  app.post("/api/gamification/chapter-progress", async (req, res) => {
    try {
      const { userId, chapterId, updates } = req.body;
      await GamificationService.updateChapterProgress(userId, chapterId, updates);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==========================================
  // FILE UPLOAD ROUTES (S3/Object Storage)
  // ==========================================

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB limit
    },
  });

  app.post("/api/upload", requireAuthWithPasswordCheck, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const folder = req.body.folder || "uploads";
      const key = await objectStorage.uploadFile(req.file, folder);

      // Generate a signed URL for immediate display if needed, 
      // or just return the key if the frontend constructs the URL
      const url = await objectStorage.getSignedUrl(key);

      res.json({
        key,
        url,
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
