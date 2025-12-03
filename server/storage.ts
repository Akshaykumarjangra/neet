import { db } from "./db";
import { 
  type User, 
  type InsertUser,
  type ContentTopic,
  type InsertContentTopic,
  type Question,
  type InsertQuestion,
  type UserPerformance,
  type InsertUserPerformance,
  type MockTest,
  type InsertMockTest,
  users,
  contentTopics,
  questions,
  userPerformance,
  mockTests,
} from "@shared/schema";
import { eq, and, inArray, sql, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProgress(userId: string, points: number, level: number): Promise<void>;
  
  // Topic methods
  getAllTopics(): Promise<ContentTopic[]>;
  getTopicsBySubject(subject: string): Promise<ContentTopic[]>;
  createTopic(topic: InsertContentTopic): Promise<ContentTopic>;
  
  // Question methods
  getAllQuestions(): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  getQuestionsByTopic(topicId: number): Promise<Question[]>;
  getQuestionsBySubject(subject: string): Promise<Question[]>;
  getQuestionsByDifficulty(difficulty: number): Promise<Question[]>;
  getFilteredQuestions(filters: {
    subject?: string;
    topicId?: number;
    difficulty?: number;
    limit?: number;
  }): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Performance methods
  recordAttempt(attempt: InsertUserPerformance): Promise<UserPerformance>;
  getUserPerformance(userId: string): Promise<UserPerformance[]>;
  getUserStats(userId: string): Promise<{
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
    subjectStats: Array<{ subject: string; accuracy: number; correct: number; total: number }>;
  }>;
  
  // Mock test methods
  getAllMockTests(): Promise<MockTest[]>;
  getMockTestById(id: number): Promise<MockTest | undefined>;
  createMockTest(test: InsertMockTest): Promise<MockTest>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values([insertUser]).returning();
    return result[0];
  }

  async updateUserProgress(userId: string, points: number, level: number): Promise<void> {
    await db.update(users)
      .set({ totalPoints: points, currentLevel: level })
      .where(eq(users.id, userId));
  }

  // Topic methods
  async getAllTopics(): Promise<ContentTopic[]> {
    return await db.select().from(contentTopics);
  }

  async getTopicsBySubject(subject: string): Promise<ContentTopic[]> {
    return await db.select().from(contentTopics).where(eq(contentTopics.subject, subject));
  }

  async createTopic(topic: InsertContentTopic): Promise<ContentTopic> {
    const result = await db.insert(contentTopics).values([topic]).returning();
    return result[0];
  }

  async getTopicById(id: number): Promise<ContentTopic | undefined> {
    const result = await db.select().from(contentTopics).where(eq(contentTopics.id, id)).limit(1);
    return result[0];
  }

  // Question methods
  async getAllQuestions(): Promise<Question[]> {
    return await db.select().from(questions);
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    const result = await db.select().from(questions).where(eq(questions.id, id)).limit(1);
    return result[0];
  }

  async getQuestionsByTopic(topicId: number): Promise<Question[]> {
    return await db.select().from(questions).where(eq(questions.topicId, topicId));
  }

  async getQuestionsBySubject(subject: string): Promise<Question[]> {
    return await db.select()
      .from(questions)
      .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
      .where(eq(contentTopics.subject, subject))
      .then(results => results.map(r => r.questions));
  }

  async getQuestionsByDifficulty(difficulty: number): Promise<Question[]> {
    return await db.select().from(questions).where(eq(questions.difficultyLevel, difficulty));
  }

  async getFilteredQuestions(filters: {
    subject?: string;
    topicId?: number;
    difficulty?: number;
    limit?: number;
  }): Promise<Question[]> {
    const conditions: any[] = [];
    
    // Build WHERE conditions
    if (filters.topicId) {
      conditions.push(eq(questions.topicId, filters.topicId));
    }
    
    if (filters.difficulty) {
      conditions.push(eq(questions.difficultyLevel, filters.difficulty));
    }
    
    // If subject filter is provided, join with topics table
    if (filters.subject) {
      let query = db.select({ questions })
        .from(questions)
        .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
        .where(and(
          eq(contentTopics.subject, filters.subject),
          ...(conditions.length > 0 ? conditions : [])
        ));
      
      if (filters.limit) {
        query = query.limit(filters.limit) as any;
      }
      
      const results = await query;
      return results.map(r => r.questions);
    }
    
    // No subject filter - query questions directly
    let query = db.select().from(questions);
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    if (filters.limit) {
      query = query.limit(filters.limit) as any;
    }
    
    return await query;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const result = await db.insert(questions).values([question]).returning();
    return result[0];
  }

  // Performance methods
  async recordAttempt(attempt: InsertUserPerformance): Promise<UserPerformance> {
    const result = await db.insert(userPerformance).values(attempt).returning();
    return result[0];
  }

  async getUserPerformance(userId: string): Promise<UserPerformance[]> {
    return await db.select()
      .from(userPerformance)
      .where(eq(userPerformance.userId, userId))
      .orderBy(desc(userPerformance.attemptDate));
  }

  async getUserStats(userId: string): Promise<{
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
    subjectStats: Array<{ subject: string; accuracy: number; correct: number; total: number }>;
  }> {
    const attempts = await db.select()
      .from(userPerformance)
      .where(eq(userPerformance.userId, userId));

    const totalAttempts = attempts.length;
    const correctAnswers = attempts.filter((a: UserPerformance) => a.isCorrect).length;
    const accuracy = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;

    const subjectStatsMap = new Map<string, { correct: number; total: number }>();
    
    for (const attempt of attempts) {
      const question = await this.getQuestionById(attempt.questionId);
      if (question) {
        const topic = await db.select()
          .from(contentTopics)
          .where(eq(contentTopics.id, question.topicId))
          .limit(1);
        
        if (topic[0]) {
          const subject = topic[0].subject;
          const stats = subjectStatsMap.get(subject) || { correct: 0, total: 0 };
          stats.total++;
          if (attempt.isCorrect) stats.correct++;
          subjectStatsMap.set(subject, stats);
        }
      }
    }

    const subjectStats = Array.from(subjectStatsMap.entries()).map(([subject, stats]) => ({
      subject,
      accuracy: (stats.correct / stats.total) * 100,
      correct: stats.correct,
      total: stats.total,
    }));

    return { totalAttempts, correctAnswers, accuracy, subjectStats };
  }

  // Mock test methods
  async getAllMockTests(): Promise<MockTest[]> {
    return await db.select().from(mockTests);
  }

  async getMockTestById(id: number): Promise<MockTest | undefined> {
    const result = await db.select().from(mockTests).where(eq(mockTests.id, id)).limit(1);
    return result[0];
  }

  async createMockTest(test: InsertMockTest): Promise<MockTest> {
    const result = await db.insert(mockTests).values([test]).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
