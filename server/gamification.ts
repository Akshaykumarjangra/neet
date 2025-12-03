import { db } from "../server/db";
import { 
  users, 
  xpTransactions, 
  achievements, 
  userAchievements,
  dailyChallenges,
  userDailyChallenges,
  leaderboardEntries,
  userChapterProgress,
  userChapterBookmarks,
  userChapterNotes,
  userChapterSessions
} from "../shared/schema";
import { eq, and, desc, sql, count, countDistinct } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js";
import type { ExtractTablesWithRelations } from "drizzle-orm";

export interface XpSource {
  type: 'question' | 'chapter' | 'test' | 'streak' | 'achievement' | 'challenge' | 'chapter_view' | 'study_time' | 'note';
  sourceId?: string;
  description?: string;
}

export class GamificationService {
  // XP amounts for different actions
  private static readonly XP_VALUES = {
    QUESTION_CORRECT: 10,
    QUESTION_FIRST_TRY: 15,
    CHAPTER_NOTES_COMPLETE: 30,
    CHAPTER_VIZ_VIEW: 20,
    CHAPTER_PRACTICE_COMPLETE: 50,
    CHAPTER_QUIZ_PERFECT: 100,
    TEST_COMPLETE: 50,
    TEST_PERFECT_SCORE: 200,
    DAILY_STREAK: 25,
    WEEKLY_STREAK: 100,
    CHALLENGE_COMPLETE: 50,
  };

  // Calculate XP needed for a level
  static getXpForLevel(level: number): number {
    return level * 100; // Exponential: 100, 200, 300, 400...
  }

  // Calculate total XP needed to reach a level
  static getTotalXpForLevel(level: number): number {
    let total = 0;
    for (let i = 1; i <= level; i++) {
      total += this.getXpForLevel(i);
    }
    return total;
  }

  // Award XP to user (with anti-cheat transaction logging)
  static async awardXp(
    userId: string,
    amount: number,
    source: XpSource
  ): Promise<{ leveledUp: boolean; newLevel: number; newXp: number }> {
    // Get current user data
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (!user) {
      throw new Error('User not found');
    }

    const oldLevel = user.currentLevel;
    const oldXp = user.totalPoints;
    const newXp = oldXp + amount;

    // Calculate new level
    let newLevel = oldLevel;
    while (newXp >= this.getTotalXpForLevel(newLevel + 1)) {
      newLevel++;
    }

    const leveledUp = newLevel > oldLevel;

    // Update user in transaction
    await db.transaction(async (tx: any) => {
      // Update user points and level
      await tx
        .update(users)
        .set({
          totalPoints: newXp,
          currentLevel: newLevel,
        })
        .where(eq(users.id, userId));

      // Log XP transaction for anti-cheat
      await tx.insert(xpTransactions).values({
        userId,
        amount,
        source: source.type,
        sourceId: source.sourceId,
        description: source.description || `${amount} XP from ${source.type}`,
      });
    });

    // Emit level-up event if applicable
    if (leveledUp) {
      // This would be handled by WebSocket in production
      console.log(`🎊 User ${userId} leveled up to ${newLevel}!`);
    }

    return { leveledUp, newLevel, newXp };
  }

  // Update daily streak
  static async updateStreak(userId: string): Promise<{ 
    streak: number; 
    bonusAwarded: boolean;
    freezeUsed: boolean;
  }> {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    
    let newStreak = user.studyStreak;
    let bonusAwarded = false;
    let freezeUsed = false;

    if (!lastActive) {
      // First time - start streak
      newStreak = 1;
    } else {
      const daysSinceActive = Math.floor(
        (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceActive === 0) {
        // Same day - no change
        return { streak: newStreak, bonusAwarded: false, freezeUsed: false };
      } else if (daysSinceActive === 1) {
        // Next day - increment streak
        newStreak++;
        
        // Award streak bonus XP
        if (newStreak % 7 === 0) {
          await this.awardXp(userId, this.XP_VALUES.WEEKLY_STREAK, {
            type: 'streak',
            description: `${newStreak}-day streak bonus!`
          });
          bonusAwarded = true;
        } else {
          await this.awardXp(userId, this.XP_VALUES.DAILY_STREAK, {
            type: 'streak',
            description: 'Daily streak bonus'
          });
          bonusAwarded = true;
        }
      } else {
        // Missed days - check for streak freeze
        if (user.streakFreezes && user.streakFreezes > 0) {
          // Use a streak freeze
          await db
            .update(users)
            .set({ streakFreezes: user.streakFreezes - 1 })
            .where(eq(users.id, userId));
          freezeUsed = true;
        } else {
          // Streak broken - reset to 1
          newStreak = 1;
        }
      }
    }

    // Update user
    await db
      .update(users)
      .set({
        studyStreak: newStreak,
        lastActiveDate: now,
      })
      .where(eq(users.id, userId));

    return { streak: newStreak, bonusAwarded, freezeUsed };
  }

  // Check and award achievements
  static async checkAchievements(userId: string): Promise<string[]> {
    const newAchievements: string[] = [];

    // Get user data
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) return newAchievements;

    // Get already unlocked achievements
    const unlocked = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId));
    
    const unlockedIds = new Set(unlocked.map((a: any) => a.achievementId));

    // Get all achievements
    const allAchievements = await db.select().from(achievements);

    // Check each achievement's unlock condition
    for (const achievement of allAchievements) {
      if (unlockedIds.has(achievement.id)) continue;

      const condition = achievement.unlockCondition as { type: string; target?: number; subject?: string };
      let shouldUnlock = false;

      switch (condition.type) {
        case 'level':
          shouldUnlock = user.currentLevel >= (condition.target || 0);
          break;
        case 'xp':
          shouldUnlock = user.totalPoints >= (condition.target || 0);
          break;
        case 'streak':
        case 'study_streak':
          shouldUnlock = user.studyStreak >= (condition.target || 0);
          break;
        case 'first_login':
          shouldUnlock = true; // Always unlock for first time
          break;
        
        // Study/LMS achievements
        case 'bookmarks_created': {
          const [result] = await db
            .select({ count: count() })
            .from(userChapterBookmarks)
            .where(eq(userChapterBookmarks.userId, userId));
          shouldUnlock = (result?.count || 0) >= (condition.target || 0);
          break;
        }
        
        case 'notes_created': {
          const [result] = await db
            .select({ count: count() })
            .from(userChapterNotes)
            .where(eq(userChapterNotes.userId, userId));
          shouldUnlock = (result?.count || 0) >= (condition.target || 0);
          break;
        }
        
        case 'chapters_with_notes': {
          const [result] = await db
            .select({ count: countDistinct(userChapterNotes.chapterContentId) })
            .from(userChapterNotes)
            .where(eq(userChapterNotes.userId, userId));
          shouldUnlock = (result?.count || 0) >= (condition.target || 0);
          break;
        }
        
        case 'chapters_viewed': {
          const [result] = await db
            .select({ count: countDistinct(userChapterSessions.chapterContentId) })
            .from(userChapterSessions)
            .where(eq(userChapterSessions.userId, userId));
          shouldUnlock = (result?.count || 0) >= (condition.target || 0);
          break;
        }
        
        case 'total_study_time': {
          const [result] = await db
            .select({ 
              totalMinutes: sql<number>`
                COALESCE(
                  SUM(
                    CASE 
                      WHEN ${userChapterSessions.durationMinutes} IS NOT NULL 
                        THEN ${userChapterSessions.durationMinutes}
                      ELSE LEAST(
                        EXTRACT(EPOCH FROM (COALESCE(${userChapterSessions.endedAt}, NOW()) - ${userChapterSessions.startedAt})) / 60,
                        1440
                      )
                    END
                  ),
                  0
                )
              ` 
            })
            .from(userChapterSessions)
            .where(eq(userChapterSessions.userId, userId));
          const totalMinutes = result?.totalMinutes || 0;
          shouldUnlock = totalMinutes >= (condition.target || 0);
          break;
        }
      }

      if (shouldUnlock) {
        // Unlock achievement
        await db.insert(userAchievements).values({
          userId,
          achievementId: achievement.id,
        });

        // Award XP
        if (achievement.xpReward > 0) {
          await this.awardXp(userId, achievement.xpReward, {
            type: 'achievement',
            sourceId: achievement.id.toString(),
            description: `Achievement unlocked: ${achievement.name}`
          });
        }

        newAchievements.push(achievement.name);
      }
    }

    return newAchievements;
  }

  // Get user's achievements
  static async getUserAchievements(userId: string) {
    const result = await db
      .select({
        id: achievements.id,
        name: achievements.name,
        description: achievements.description,
        icon: achievements.icon,
        rarity: achievements.rarity,
        xpReward: achievements.xpReward,
        unlockedAt: userAchievements.unlockedAt,
      })
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.unlockedAt));

    return result;
  }

  // Get today's daily challenges for user
  static async getDailyChallenges(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const challenges = await db
      .select({
        id: dailyChallenges.id,
        title: dailyChallenges.title,
        description: dailyChallenges.description,
        targetType: dailyChallenges.targetType,
        targetValue: dailyChallenges.targetValue,
        xpReward: dailyChallenges.xpReward,
        subject: dailyChallenges.subject,
        progress: userDailyChallenges.progress,
        completed: userDailyChallenges.completed,
      })
      .from(dailyChallenges)
      .leftJoin(
        userDailyChallenges,
        and(
          eq(userDailyChallenges.challengeId, dailyChallenges.id),
          eq(userDailyChallenges.userId, userId)
        )
      )
      .where(eq(dailyChallenges.challengeDate, today));

    return challenges;
  }

  // Update challenge progress
  static async updateChallengeProgress(
    userId: string,
    challengeId: number,
    progress: number
  ): Promise<boolean> {
    // Get challenge
    const [challenge] = await db
      .select()
      .from(dailyChallenges)
      .where(eq(dailyChallenges.id, challengeId))
      .limit(1);

    if (!challenge) return false;

    const completed = progress >= challenge.targetValue;

    // Check if user challenge record exists
    const [existing] = await db
      .select()
      .from(userDailyChallenges)
      .where(
        and(
          eq(userDailyChallenges.userId, userId),
          eq(userDailyChallenges.challengeId, challengeId)
        )
      )
      .limit(1);

    if (existing) {
      // Update existing
      await db
        .update(userDailyChallenges)
        .set({
          progress,
          completed,
          completedAt: completed ? new Date() : null,
        })
        .where(eq(userDailyChallenges.id, existing.id));
    } else {
      // Create new
      await db.insert(userDailyChallenges).values({
        userId,
        challengeId,
        progress,
        completed,
        completedAt: completed ? new Date() : null,
      });
    }

    // Award XP if completed
    if (completed && !existing?.completed) {
      await this.awardXp(userId, challenge.xpReward, {
        type: 'challenge',
        sourceId: challengeId.toString(),
        description: `Challenge completed: ${challenge.title}`
      });
      return true;
    }

    return false;
  }

  // Get leaderboard
  static async getLeaderboard(type: string = 'all_time', limit: number = 10) {
    const leaderboard = await db
      .select({
        userId: users.id,
        username: users.username,
        level: users.currentLevel,
        points: users.totalPoints,
        streak: users.studyStreak,
        rank: sql<number>`ROW_NUMBER() OVER (ORDER BY ${users.totalPoints} DESC)`,
      })
      .from(users)
      .orderBy(desc(users.totalPoints))
      .limit(limit);

    return leaderboard;
  }

  // Track chapter progress
  static async updateChapterProgress(
    userId: string,
    chapterId: string,
    updates: {
      notesCompleted?: boolean;
      visualizationsViewed?: boolean;
      practiceQuestionsAttempted?: number;
      quizCompleted?: boolean;
      timeSpentMinutes?: number;
    }
  ) {
    // Get existing progress
    const [existing] = await db
      .select()
      .from(userChapterProgress)
      .where(
        and(
          eq(userChapterProgress.userId, userId),
          eq(userChapterProgress.chapterId, chapterId)
        )
      )
      .limit(1);

    const now = new Date();

    if (existing) {
      // Update existing
      const newData: any = { lastAccessedAt: now };
      
      if (updates.notesCompleted !== undefined) newData.notesCompleted = updates.notesCompleted;
      if (updates.visualizationsViewed !== undefined) newData.visualizationsViewed = updates.visualizationsViewed;
      if (updates.quizCompleted !== undefined) newData.quizCompleted = updates.quizCompleted;
      
      if (updates.practiceQuestionsAttempted !== undefined) {
        newData.practiceQuestionsAttempted = existing.practiceQuestionsAttempted + updates.practiceQuestionsAttempted;
      }
      
      if (updates.timeSpentMinutes !== undefined) {
        newData.timeSpentMinutes = existing.timeSpentMinutes + updates.timeSpentMinutes;
      }

      // Calculate completion percentage
      const total = 4; // notes, viz, practice, quiz
      let completed = 0;
      if (newData.notesCompleted || existing.notesCompleted) completed++;
      if (newData.visualizationsViewed || existing.visualizationsViewed) completed++;
      if ((newData.practiceQuestionsAttempted || existing.practiceQuestionsAttempted) >= 10) completed++;
      if (newData.quizCompleted || existing.quizCompleted) completed++;

      newData.completionPercentage = Math.floor((completed / total) * 100);

      // Update mastery level
      if (newData.completionPercentage >= 90) newData.masteryLevel = 'platinum';
      else if (newData.completionPercentage >= 70) newData.masteryLevel = 'gold';
      else if (newData.completionPercentage >= 50) newData.masteryLevel = 'silver';
      else newData.masteryLevel = 'bronze';

      await db
        .update(userChapterProgress)
        .set(newData)
        .where(eq(userChapterProgress.id, existing.id));

      // Award XP for chapter completion
      if (newData.completionPercentage === 100 && existing.completionPercentage < 100) {
        await this.awardXp(userId, this.XP_VALUES.CHAPTER_PRACTICE_COMPLETE, {
          type: 'chapter',
          sourceId: chapterId,
          description: 'Chapter completed!'
        });
      }
    } else {
      // Create new
      await db.insert(userChapterProgress).values({
        userId,
        chapterId,
        lastAccessedAt: now,
        ...updates,
        completionPercentage: 0,
        masteryLevel: 'bronze',
        timeSpentMinutes: updates.timeSpentMinutes || 0,
        practiceQuestionsAttempted: updates.practiceQuestionsAttempted || 0,
      });
    }
  }
}
