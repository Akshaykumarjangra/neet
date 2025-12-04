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
  type Keypoint,
  type InsertKeypoint,
  type Formula,
  type InsertFormula,
  type UserTopicProgress,
  type InsertUserTopicProgress,
  type UserKeypointBookmark,
  type UserFormulaBookmark,
  type UserFlashcardProgress,
  users,
  contentTopics,
  questions,
  userPerformance,
  mockTests,
  keypoints,
  formulas,
  userTopicProgress,
  userKeypointBookmarks,
  userFormulaBookmarks,
  userFlashcardProgress,
  flashcards,
} from "@shared/schema";
import { eq, and, sql, desc, lt, lte, asc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByName(name: string): Promise<User | undefined>;
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

  // Keypoint methods
  getKeypoints(filters: { chapterId?: number; topicId?: number; subject?: string; isHighYield?: boolean; category?: string }): Promise<Keypoint[]>;
  getKeypointById(id: number): Promise<Keypoint | undefined>;
  createKeypoint(data: InsertKeypoint): Promise<Keypoint>;
  updateKeypoint(id: number, data: Partial<InsertKeypoint>): Promise<Keypoint | undefined>;
  deleteKeypoint(id: number): Promise<boolean>;

  // Formula methods
  getFormulas(filters: { chapterId?: number; topicId?: number; subject?: string; isHighYield?: boolean }): Promise<Formula[]>;
  getFormulaById(id: number): Promise<Formula | undefined>;
  createFormula(data: InsertFormula): Promise<Formula>;
  updateFormula(id: number, data: Partial<InsertFormula>): Promise<Formula | undefined>;
  deleteFormula(id: number): Promise<boolean>;

  // User Topic Progress methods
  getUserTopicProgress(userId: string, topicId?: number): Promise<UserTopicProgress[]>;
  upsertUserTopicProgress(data: InsertUserTopicProgress): Promise<UserTopicProgress>;
  getWeakAreas(userId: string, limit?: number): Promise<UserTopicProgress[]>;

  // User Keypoint Bookmark methods
  getUserKeypointBookmarks(userId: string): Promise<(UserKeypointBookmark & { keypoint: Keypoint })[]>;
  toggleKeypointBookmark(userId: string, keypointId: number, note?: string): Promise<boolean>;

  // User Formula Bookmark methods
  getUserFormulaBookmarks(userId: string): Promise<(UserFormulaBookmark & { formula: Formula })[]>;
  toggleFormulaBookmark(userId: string, formulaId: number, note?: string): Promise<boolean>;

  // User Flashcard Progress methods (Spaced Repetition)
  getUserFlashcardProgress(userId: string, deckId?: number): Promise<UserFlashcardProgress[]>;
  getDueFlashcards(userId: string, limit?: number): Promise<UserFlashcardProgress[]>;
  updateFlashcardProgress(userId: string, flashcardId: number, quality: 0 | 1 | 2 | 3 | 4 | 5): Promise<UserFlashcardProgress>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByName(name: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.name, name)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
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
    const result = await db.insert(contentTopics).values(topic).returning();
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
    const conditions: ReturnType<typeof eq>[] = [];
    
    if (filters.topicId) {
      conditions.push(eq(questions.topicId, filters.topicId));
    }
    
    if (filters.difficulty) {
      conditions.push(eq(questions.difficultyLevel, filters.difficulty));
    }
    
    if (filters.subject) {
      let query = db.select({ questions })
        .from(questions)
        .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
        .where(and(
          eq(contentTopics.subject, filters.subject),
          ...(conditions.length > 0 ? conditions : [])
        ));
      
      if (filters.limit) {
        query = query.limit(filters.limit) as typeof query;
      }
      
      const results = await query;
      return results.map(r => r.questions);
    }
    
    let query = db.select().from(questions);
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }
    
    if (filters.limit) {
      query = query.limit(filters.limit) as typeof query;
    }
    
    return await query;
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const result = await db.insert(questions).values(question).returning();
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
    const result = await db.insert(mockTests).values(test).returning();
    return result[0];
  }

  // ============ KEYPOINTS METHODS ============

  async getKeypoints(filters: { 
    chapterId?: number; 
    topicId?: number; 
    subject?: string; 
    isHighYield?: boolean; 
    category?: string 
  }): Promise<Keypoint[]> {
    const conditions: ReturnType<typeof eq>[] = [];

    if (filters.chapterId !== undefined) {
      conditions.push(eq(keypoints.chapterId, filters.chapterId));
    }
    if (filters.topicId !== undefined) {
      conditions.push(eq(keypoints.topicId, filters.topicId));
    }
    if (filters.subject !== undefined) {
      conditions.push(eq(keypoints.subject, filters.subject));
    }
    if (filters.isHighYield !== undefined) {
      conditions.push(eq(keypoints.isHighYield, filters.isHighYield));
    }
    if (filters.category !== undefined) {
      conditions.push(eq(keypoints.category, filters.category as "concept" | "definition" | "law" | "principle" | "theorem" | "rule" | "exception" | "application"));
    }

    if (conditions.length === 0) {
      return await db.select().from(keypoints).orderBy(asc(keypoints.order));
    }

    return await db.select()
      .from(keypoints)
      .where(and(...conditions))
      .orderBy(asc(keypoints.order));
  }

  async getKeypointById(id: number): Promise<Keypoint | undefined> {
    const result = await db.select().from(keypoints).where(eq(keypoints.id, id)).limit(1);
    return result[0];
  }

  async createKeypoint(data: InsertKeypoint): Promise<Keypoint> {
    const result = await db.insert(keypoints).values(data).returning();
    return result[0];
  }

  async updateKeypoint(id: number, data: Partial<InsertKeypoint>): Promise<Keypoint | undefined> {
    const updateData = { ...data } as Record<string, unknown>;
    updateData.updatedAt = sql`now()`;
    
    const result = await db.update(keypoints)
      .set(updateData)
      .where(eq(keypoints.id, id))
      .returning();
    return result[0];
  }

  async deleteKeypoint(id: number): Promise<boolean> {
    const result = await db.delete(keypoints).where(eq(keypoints.id, id)).returning();
    return result.length > 0;
  }

  // ============ FORMULAS METHODS ============

  async getFormulas(filters: { 
    chapterId?: number; 
    topicId?: number; 
    subject?: string; 
    isHighYield?: boolean 
  }): Promise<Formula[]> {
    const conditions: ReturnType<typeof eq>[] = [];

    if (filters.chapterId !== undefined) {
      conditions.push(eq(formulas.chapterId, filters.chapterId));
    }
    if (filters.topicId !== undefined) {
      conditions.push(eq(formulas.topicId, filters.topicId));
    }
    if (filters.subject !== undefined) {
      conditions.push(eq(formulas.subject, filters.subject));
    }
    if (filters.isHighYield !== undefined) {
      conditions.push(eq(formulas.isHighYield, filters.isHighYield));
    }

    if (conditions.length === 0) {
      return await db.select().from(formulas).orderBy(asc(formulas.order));
    }

    return await db.select()
      .from(formulas)
      .where(and(...conditions))
      .orderBy(asc(formulas.order));
  }

  async getFormulaById(id: number): Promise<Formula | undefined> {
    const result = await db.select().from(formulas).where(eq(formulas.id, id)).limit(1);
    return result[0];
  }

  async createFormula(data: InsertFormula): Promise<Formula> {
    const result = await db.insert(formulas).values(data).returning();
    return result[0];
  }

  async updateFormula(id: number, data: Partial<InsertFormula>): Promise<Formula | undefined> {
    const updateData = { ...data } as Record<string, unknown>;
    updateData.updatedAt = sql`now()`;
    
    const result = await db.update(formulas)
      .set(updateData)
      .where(eq(formulas.id, id))
      .returning();
    return result[0];
  }

  async deleteFormula(id: number): Promise<boolean> {
    const result = await db.delete(formulas).where(eq(formulas.id, id)).returning();
    return result.length > 0;
  }

  // ============ USER TOPIC PROGRESS METHODS ============

  async getUserTopicProgress(userId: string, topicId?: number): Promise<UserTopicProgress[]> {
    if (topicId !== undefined) {
      return await db.select()
        .from(userTopicProgress)
        .where(and(
          eq(userTopicProgress.userId, userId),
          eq(userTopicProgress.topicId, topicId)
        ));
    }
    return await db.select()
      .from(userTopicProgress)
      .where(eq(userTopicProgress.userId, userId));
  }

  async upsertUserTopicProgress(data: InsertUserTopicProgress): Promise<UserTopicProgress> {
    const existing = await db.select()
      .from(userTopicProgress)
      .where(and(
        eq(userTopicProgress.userId, data.userId),
        eq(userTopicProgress.topicId, data.topicId)
      ))
      .limit(1);

    if (existing.length > 0) {
      const updateData = { ...data } as Record<string, unknown>;
      updateData.updatedAt = sql`now()`;
      updateData.lastAccessedAt = sql`now()`;
      
      const result = await db.update(userTopicProgress)
        .set(updateData)
        .where(eq(userTopicProgress.id, existing[0].id))
        .returning();
      return result[0];
    }

    const insertData = { ...data } as Record<string, unknown>;
    insertData.lastAccessedAt = sql`now()`;
    
    const result = await db.insert(userTopicProgress)
      .values(insertData as typeof data)
      .returning();
    return result[0];
  }

  async getWeakAreas(userId: string, limit?: number): Promise<UserTopicProgress[]> {
    let query = db.select()
      .from(userTopicProgress)
      .where(and(
        eq(userTopicProgress.userId, userId),
        lt(userTopicProgress.masteryScore, 50)
      ))
      .orderBy(asc(userTopicProgress.masteryScore));

    if (limit) {
      query = query.limit(limit) as typeof query;
    }

    return await query;
  }

  // ============ USER KEYPOINT BOOKMARK METHODS ============

  async getUserKeypointBookmarks(userId: string): Promise<(UserKeypointBookmark & { keypoint: Keypoint })[]> {
    const results = await db.select({
      bookmark: userKeypointBookmarks,
      keypoint: keypoints
    })
      .from(userKeypointBookmarks)
      .innerJoin(keypoints, eq(userKeypointBookmarks.keypointId, keypoints.id))
      .where(eq(userKeypointBookmarks.userId, userId))
      .orderBy(desc(userKeypointBookmarks.createdAt));

    return results.map(r => ({
      ...r.bookmark,
      keypoint: r.keypoint
    }));
  }

  async toggleKeypointBookmark(userId: string, keypointId: number, note?: string): Promise<boolean> {
    const existing = await db.select()
      .from(userKeypointBookmarks)
      .where(and(
        eq(userKeypointBookmarks.userId, userId),
        eq(userKeypointBookmarks.keypointId, keypointId)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db.delete(userKeypointBookmarks)
        .where(eq(userKeypointBookmarks.id, existing[0].id));
      return false;
    }

    const insertData: { userId: string; keypointId: number; note?: string } = { userId, keypointId };
    if (note !== undefined) {
      insertData.note = note;
    }
    
    await db.insert(userKeypointBookmarks).values(insertData);
    return true;
  }

  // ============ USER FORMULA BOOKMARK METHODS ============

  async getUserFormulaBookmarks(userId: string): Promise<(UserFormulaBookmark & { formula: Formula })[]> {
    const results = await db.select({
      bookmark: userFormulaBookmarks,
      formula: formulas
    })
      .from(userFormulaBookmarks)
      .innerJoin(formulas, eq(userFormulaBookmarks.formulaId, formulas.id))
      .where(eq(userFormulaBookmarks.userId, userId))
      .orderBy(desc(userFormulaBookmarks.createdAt));

    return results.map(r => ({
      ...r.bookmark,
      formula: r.formula
    }));
  }

  async toggleFormulaBookmark(userId: string, formulaId: number, note?: string): Promise<boolean> {
    const existing = await db.select()
      .from(userFormulaBookmarks)
      .where(and(
        eq(userFormulaBookmarks.userId, userId),
        eq(userFormulaBookmarks.formulaId, formulaId)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db.delete(userFormulaBookmarks)
        .where(eq(userFormulaBookmarks.id, existing[0].id));
      return false;
    }

    const insertData: { userId: string; formulaId: number; note?: string } = { userId, formulaId };
    if (note !== undefined) {
      insertData.note = note;
    }
    
    await db.insert(userFormulaBookmarks).values(insertData);
    return true;
  }

  // ============ USER FLASHCARD PROGRESS METHODS (Spaced Repetition) ============

  async getUserFlashcardProgress(userId: string, deckId?: number): Promise<UserFlashcardProgress[]> {
    if (deckId !== undefined) {
      const results = await db.select({
        progress: userFlashcardProgress
      })
        .from(userFlashcardProgress)
        .innerJoin(flashcards, eq(userFlashcardProgress.flashcardId, flashcards.id))
        .where(and(
          eq(userFlashcardProgress.userId, userId),
          eq(flashcards.deckId, deckId)
        ));
      return results.map(r => r.progress);
    }

    return await db.select()
      .from(userFlashcardProgress)
      .where(eq(userFlashcardProgress.userId, userId));
  }

  async getDueFlashcards(userId: string, limit?: number): Promise<UserFlashcardProgress[]> {
    const now = new Date();
    
    let query = db.select()
      .from(userFlashcardProgress)
      .where(and(
        eq(userFlashcardProgress.userId, userId),
        lte(userFlashcardProgress.nextReviewAt, now)
      ))
      .orderBy(asc(userFlashcardProgress.nextReviewAt));

    if (limit) {
      query = query.limit(limit) as typeof query;
    }

    return await query;
  }

  async updateFlashcardProgress(
    userId: string, 
    flashcardId: number, 
    quality: 0 | 1 | 2 | 3 | 4 | 5
  ): Promise<UserFlashcardProgress> {
    const existing = await db.select()
      .from(userFlashcardProgress)
      .where(and(
        eq(userFlashcardProgress.userId, userId),
        eq(userFlashcardProgress.flashcardId, flashcardId)
      ))
      .limit(1);

    let easeFactor = 2.5;
    let interval = 1;
    let repetitions = 0;

    if (existing.length > 0) {
      easeFactor = existing[0].easeFactor;
      interval = existing[0].interval;
      repetitions = existing[0].repetitions;
    }

    const sm2Result = this.calculateSM2(quality, easeFactor, interval, repetitions);
    const now = new Date();
    const nextReviewAt = new Date(now.getTime() + sm2Result.interval * 24 * 60 * 60 * 1000);

    if (existing.length > 0) {
      const result = await db.update(userFlashcardProgress)
        .set({
          easeFactor: sm2Result.easeFactor,
          interval: sm2Result.interval,
          repetitions: sm2Result.repetitions,
          nextReviewAt,
          lastReviewedAt: now,
          updatedAt: sql`now()`
        } as Record<string, unknown>)
        .where(eq(userFlashcardProgress.id, existing[0].id))
        .returning();
      return result[0];
    }

    const result = await db.insert(userFlashcardProgress)
      .values({
        userId,
        flashcardId,
        easeFactor: sm2Result.easeFactor,
        interval: sm2Result.interval,
        repetitions: sm2Result.repetitions,
        nextReviewAt,
        lastReviewedAt: now
      } as Record<string, unknown>)
      .returning();
    return result[0];
  }

  private calculateSM2(
    quality: number,
    easeFactor: number,
    interval: number,
    repetitions: number
  ): { easeFactor: number; interval: number; repetitions: number } {
    let newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    
    if (newEaseFactor < 1.3) {
      newEaseFactor = 1.3;
    }

    let newInterval: number;
    let newRepetitions: number;

    if (quality < 3) {
      newRepetitions = 0;
      newInterval = 1;
    } else {
      newRepetitions = repetitions + 1;

      if (newRepetitions === 1) {
        newInterval = 1;
      } else if (newRepetitions === 2) {
        newInterval = 6;
      } else {
        newInterval = Math.round(interval * newEaseFactor);
      }
    }

    return {
      easeFactor: newEaseFactor,
      interval: newInterval,
      repetitions: newRepetitions
    };
  }
}

export const storage = new DbStorage();
