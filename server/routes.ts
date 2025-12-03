import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { questions, contentTopics } from "@shared/schema";
import { sql } from "drizzle-orm";
import {
  insertQuestionSchema,
  insertContentTopicSchema,
  insertUserPerformanceSchema,
  insertMockTestSchema,
} from "@shared/schema";
import authRoutes from "./auth-routes";
import learningPathRoutes from "./learning-path-routes";
import mockTestRoutes from "./mock-test-routes";
import gameRoutes from "./game-routes";
import adminRoutes from "./admin-routes";
import chapterContentRoutes from "./chapter-content-routes";
import lmsRoutes from "./lms-routes";
import mentorRoutes from "./mentor-routes";
import { bulkQuestionGenerator } from "./bulk-question-generator";

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

  // Game/Gamification routes
  app.use("/api/game", gameRoutes);

  // Admin routes
  app.use("/api/admin", adminRoutes);

  // Chapter Content routes
  app.use("/api/chapters", chapterContentRoutes);

  // LMS routes (Library, Progress, Bookmarks, Notes)
  app.use("/api/lms", lmsRoutes);

  // Mentor routes (Mentor profiles, Bookings, Availability, Reviews)
  app.use("/api", mentorRoutes);

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
      const validatedData = insertContentTopicSchema.parse(req.body);
      const topic = await storage.createTopic(validatedData);
      res.status(201).json(topic);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Question routes
  app.get("/api/questions", async (req, res) => {
    try {
      const { subject, topicId, difficulty, limit } = req.query;

      const filters: any = {};
      if (subject) filters.subject = subject as string;
      if (topicId) filters.topicId = parseInt(topicId as string);
      if (difficulty) filters.difficulty = parseInt(difficulty as string);
      if (limit) filters.limit = parseInt(limit as string);

      const questions = await storage.getFilteredQuestions(filters);
      res.json(questions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const question = await storage.getQuestionById(id);

      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      res.json(question);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/questions", async (req, res) => {
    try {
      const validatedData = insertQuestionSchema.parse(req.body);
      const question = await storage.createQuestion(validatedData);
      res.status(201).json(question);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // User performance routes
  app.post("/api/performance", async (req, res) => {
    try {
      const validatedData = insertUserPerformanceSchema.parse(req.body);
      const attempt = await storage.recordAttempt(validatedData);
      res.status(201).json(attempt);
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

  app.post("/api/questions/generate-bulk", async (req, res) => {
    try {
      // Start generation in background
      bulkQuestionGenerator.generateAllQuestions().catch(console.error);

      res.json({
        success: true,
        message: "Bulk generation started. Check /api/questions/generation-status for progress."
      });
    } catch (error) {
      console.error("Error starting bulk generation:", error);
      res.status(500).json({ error: "Failed to start generation" });
    }
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

  const httpServer = createServer(app);
  return httpServer;
}