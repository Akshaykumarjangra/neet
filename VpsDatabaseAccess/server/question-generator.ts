
import { db } from "./db";
import { contentTopics, questions, type Question } from "@shared/schema";
import { eq, and, inArray, sql } from "drizzle-orm";

interface QuestionFilter {
  subject?: string;
  topics?: number[];
  difficulty?: number[];
  sourceTypes?: string[];
  count: number;
  excludeIds?: number[];
}

interface QuestionnaireConfig {
  name: string;
  subjects: {
    subject: string;
    count: number;
    difficultyDistribution?: {
      easy: number;
      medium: number;
      hard: number;
    };
  }[];
  includeSourceTypes?: string[];
  timeLimit?: number;
}

export class QuestionGenerator {
  /**
   * Generate a balanced questionnaire based on NEET pattern
   */
  async generateNEETQuestionnaire(config: QuestionnaireConfig): Promise<{
    questions: Question[];
    metadata: {
      totalQuestions: number;
      bySubject: Record<string, number>;
      byDifficulty: Record<string, number>;
      timeLimit: number;
    };
  }> {
    const selectedQuestions: Question[] = [];
    const metadata = {
      totalQuestions: 0,
      bySubject: {} as Record<string, number>,
      byDifficulty: { easy: 0, medium: 0, hard: 0 },
      timeLimit: config.timeLimit || 180,
    };

    for (const subjectConfig of config.subjects) {
      const distribution = subjectConfig.difficultyDistribution || {
        easy: 0.3,
        medium: 0.5,
        hard: 0.2,
      };

      const easyCount = Math.round(subjectConfig.count * distribution.easy);
      const mediumCount = Math.round(subjectConfig.count * distribution.medium);
      const hardCount = subjectConfig.count - easyCount - mediumCount;

      // Get questions for each difficulty level
      const easyQuestions = await this.getQuestionsByFilter({
        subject: subjectConfig.subject,
        difficulty: [1],
        count: easyCount,
        sourceTypes: config.includeSourceTypes,
        excludeIds: selectedQuestions.map(q => q.id),
      });

      const mediumQuestions = await this.getQuestionsByFilter({
        subject: subjectConfig.subject,
        difficulty: [2],
        count: mediumCount,
        sourceTypes: config.includeSourceTypes,
        excludeIds: [...selectedQuestions.map(q => q.id), ...easyQuestions.map(q => q.id)],
      });

      const hardQuestions = await this.getQuestionsByFilter({
        subject: subjectConfig.subject,
        difficulty: [3],
        count: hardCount,
        sourceTypes: config.includeSourceTypes,
        excludeIds: [
          ...selectedQuestions.map(q => q.id),
          ...easyQuestions.map(q => q.id),
          ...mediumQuestions.map(q => q.id),
        ],
      });

      selectedQuestions.push(...easyQuestions, ...mediumQuestions, ...hardQuestions);

      metadata.bySubject[subjectConfig.subject] = easyQuestions.length + mediumQuestions.length + hardQuestions.length;
      metadata.byDifficulty.easy += easyQuestions.length;
      metadata.byDifficulty.medium += mediumQuestions.length;
      metadata.byDifficulty.hard += hardQuestions.length;
    }

    metadata.totalQuestions = selectedQuestions.length;

    // Shuffle questions to mix subjects
    this.shuffleArray(selectedQuestions);

    return { questions: selectedQuestions, metadata };
  }

  /**
   * Get questions with advanced filtering
   */
  private async getQuestionsByFilter(filter: QuestionFilter): Promise<Question[]> {
    let query = db.select().from(questions);

    const conditions: any[] = [];

    // Filter by subject
    if (filter.subject) {
      const topicsInSubject = await db
        .select({ id: contentTopics.id })
        .from(contentTopics)
        .where(eq(contentTopics.subject, filter.subject));

      if (topicsInSubject.length > 0) {
        conditions.push(inArray(questions.topicId, topicsInSubject.map(t => t.id)));
      }
    }

    // Filter by specific topics
    if (filter.topics && filter.topics.length > 0) {
      conditions.push(inArray(questions.topicId, filter.topics));
    }

    // Filter by difficulty
    if (filter.difficulty && filter.difficulty.length > 0) {
      conditions.push(inArray(questions.difficultyLevel, filter.difficulty));
    }

    // Filter by source types (PYQ, NCERT, etc.)
    if (filter.sourceTypes && filter.sourceTypes.length > 0) {
      const sourceConditions = filter.sourceTypes.map(source =>
        sql`${questions.sourceType} LIKE ${`%${source}%`}`
      );
      conditions.push(sql`(${sql.join(sourceConditions, sql` OR `)})`);
    }

    // Exclude specific question IDs
    if (filter.excludeIds && filter.excludeIds.length > 0) {
      conditions.push(sql`${questions.id} NOT IN ${filter.excludeIds}`);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    // Get random selection
    const allQuestions = await query;
    this.shuffleArray(allQuestions);

    return allQuestions.slice(0, filter.count);
  }

  /**
   * Fisher-Yates shuffle algorithm
   */
  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Generate topic-wise practice set
   */
  async generateTopicPractice(
    topicIds: number[],
    questionsPerTopic: number,
    progressiveDifficulty: boolean = true
  ): Promise<Question[]> {
    const selectedQuestions: Question[] = [];

    for (const topicId of topicIds) {
      let topicQuestions: Question[];

      if (progressiveDifficulty) {
        // Start with easier questions
        const easy = await this.getQuestionsByFilter({
          topics: [topicId],
          difficulty: [1],
          count: Math.ceil(questionsPerTopic * 0.4),
          excludeIds: selectedQuestions.map(q => q.id),
        });

        const medium = await this.getQuestionsByFilter({
          topics: [topicId],
          difficulty: [2],
          count: Math.ceil(questionsPerTopic * 0.4),
          excludeIds: [...selectedQuestions.map(q => q.id), ...easy.map(q => q.id)],
        });

        const hard = await this.getQuestionsByFilter({
          topics: [topicId],
          difficulty: [3],
          count: questionsPerTopic - easy.length - medium.length,
          excludeIds: [...selectedQuestions.map(q => q.id), ...easy.map(q => q.id), ...medium.map(q => q.id)],
        });

        topicQuestions = [...easy, ...medium, ...hard];
      } else {
        topicQuestions = await this.getQuestionsByFilter({
          topics: [topicId],
          count: questionsPerTopic,
          excludeIds: selectedQuestions.map(q => q.id),
        });
      }

      selectedQuestions.push(...topicQuestions);
    }

    return selectedQuestions;
  }

  /**
   * Generate PYQ (Previous Year Questions) set
   */
  async generatePYQSet(years: number[], questionsPerYear?: number): Promise<Question[]> {
    const sourceTypes = years.map(year => `PYQ ${year}`);
    
    if (questionsPerYear) {
      const selectedQuestions: Question[] = [];
      
      for (const year of years) {
        const yearQuestions = await this.getQuestionsByFilter({
          sourceTypes: [`PYQ ${year}`],
          count: questionsPerYear,
          excludeIds: selectedQuestions.map(q => q.id),
        });
        selectedQuestions.push(...yearQuestions);
      }
      
      return selectedQuestions;
    } else {
      // Get all PYQ questions from specified years
      return await this.getQuestionsByFilter({
        sourceTypes,
        count: 1000, // Large number to get all
      });
    }
  }

  /**
   * Generate adaptive questionnaire based on weak areas
   */
  async generateAdaptiveSet(
    weakTopics: number[],
    strongTopics: number[],
    totalQuestions: number
  ): Promise<Question[]> {
    const weakRatio = 0.7;
    const strongRatio = 0.3;

    const weakCount = Math.round(totalQuestions * weakRatio);
    const strongCount = totalQuestions - weakCount;

    const weakQuestions = await this.generateTopicPractice(
      weakTopics,
      Math.ceil(weakCount / weakTopics.length),
      true
    );

    const strongQuestions = await this.generateTopicPractice(
      strongTopics,
      Math.ceil(strongCount / strongTopics.length),
      false
    );

    const combined = [...weakQuestions.slice(0, weakCount), ...strongQuestions.slice(0, strongCount)];
    this.shuffleArray(combined);

    return combined;
  }
}

export const questionGenerator = new QuestionGenerator();
