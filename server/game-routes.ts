import { Router } from "express";
import { db } from "./db";
import { 
  dailyChallenges, 
  userDailyChallenges,
  userProfiles,
  userCombos,
  users,
  userPerformance,
  xpTransactions,
  achievements,
  userAchievements,
} from "@shared/schema";
import { eq, desc, sql, and, gte } from "drizzle-orm";
import { requireAuth, getCurrentUser } from "./auth";

const router = Router();

// Get daily challenges
router.get("/challenges/daily", requireAuth, async (req, res) => {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get today's challenges
    const challenges = await db
      .select()
      .from(dailyChallenges)
      .where(gte(dailyChallenges.challengeDate, today))
      .orderBy(dailyChallenges.challengeDate);

    // Get user's progress on these challenges
    const challengeIds = challenges.map(c => c.id);
    if (challengeIds.length === 0) {
      return res.json([]);
    }

    const progress = await db
      .select()
      .from(userDailyChallenges)
      .where(eq(userDailyChallenges.userId, user));

    // Merge challenges with progress
    const challengesWithProgress = challenges.map(challenge => {
      const userProgress = progress.find(p => p.challengeId === challenge.id);
      return {
        id: challenge.id,
        title: challenge.title,
        description: challenge.description,
        progress: userProgress?.progress || 0,
        target: challenge.targetValue,
        xpReward: challenge.xpReward,
        completed: userProgress?.completed || false,
      };
    });

    res.json(challengesWithProgress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update challenge progress
router.post("/challenges/:challengeId/progress", requireAuth, async (req, res) => {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { challengeId } = req.params;
    const { progress } = req.body;

    // Validate inputs
    const parsedChallengeId = parseInt(challengeId);
    if (!Number.isInteger(parsedChallengeId) || parsedChallengeId <= 0) {
      return res.status(400).json({ error: "Invalid challenge ID" });
    }

    // Get challenge details
    const challenge = await db
      .select()
      .from(dailyChallenges)
      .where(eq(dailyChallenges.id, parsedChallengeId))
      .limit(1);

    if (!challenge.length) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const targetValue = challenge[0].targetValue;
    const clampedProgress = Math.min(progress, targetValue);
    const isCompleted = clampedProgress >= targetValue;

    // Check existing progress
    const existingProgress = await db
      .select()
      .from(userDailyChallenges)
      .where(
        and(
          eq(userDailyChallenges.userId, user),
          eq(userDailyChallenges.challengeId, parsedChallengeId)
        )
      )
      .limit(1);

    const wasAlreadyCompleted = existingProgress[0]?.completed || false;

    // Upsert progress
    if (existingProgress.length) {
      await db
        .update(userDailyChallenges)
        .set({ 
          progress: clampedProgress, 
          completed: isCompleted,
          completedAt: isCompleted && !wasAlreadyCompleted ? new Date() : existingProgress[0].completedAt,
        })
        .where(eq(userDailyChallenges.id, existingProgress[0].id));
    } else {
      await db.insert(userDailyChallenges).values({
        userId: user,
        challengeId: parsedChallengeId,
        progress: clampedProgress,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null,
      });
    }

    // Award XP if completed for the first time
    if (isCompleted && !wasAlreadyCompleted) {
      // Insert XP transaction
      await db.insert(xpTransactions).values({
        userId: user,
        amount: challenge[0].xpReward,
        source: 'daily_challenge',
        sourceId: parsedChallengeId.toString(),
        description: `Completed daily challenge: ${challenge[0].title}`,
      });

      // Update user points and level
      await db.execute(sql`
        UPDATE users
        SET total_points = total_points + ${challenge[0].xpReward},
            current_level = FLOOR((total_points + ${challenge[0].xpReward}) / 1000) + 1
        WHERE id = ${user}
      `);
    }

    res.json({ 
      success: true, 
      isCompleted,
      xpAwarded: (isCompleted && !wasAlreadyCompleted) ? challenge[0].xpReward : 0,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get("/leaderboard", requireAuth, async (req, res) => {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { scope = "india", limit = 100 } = req.query;

    // Get current user's profile for scope filtering
    const userProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, user))
      .limit(1);

    // Get top users by points with optional scope filtering
    let query = db
      .select({
        userId: users.id,
        username: users.username,
        points: users.totalPoints,
        level: users.currentLevel,
        studyStreak: users.studyStreak,
      })
      .from(users);

    // Apply scope filtering based on user's profile
    if (scope !== "india") {
      // Check if user has profile with required location data
      if (userProfile.length === 0) {
        return res.status(400).json({ 
          error: "Profile not found. Please complete your profile to view scoped leaderboards.",
          requiresProfile: true 
        });
      }

      const profile = userProfile[0];
      
      // Validate user has the required field for the selected scope
      if (scope === "school" && !profile.school) {
        return res.status(400).json({ 
          error: "School information missing. Please update your profile to view school leaderboard.",
          requiresProfile: true,
          missingField: "school"
        });
      }
      if (scope === "city" && !profile.city) {
        return res.status(400).json({ 
          error: "City information missing. Please update your profile to view city leaderboard.",
          requiresProfile: true,
          missingField: "city"
        });
      }
      if (scope === "state" && !profile.state) {
        return res.status(400).json({ 
          error: "State information missing. Please update your profile to view state leaderboard.",
          requiresProfile: true,
          missingField: "state"
        });
      }
      
      // Apply scope-specific filtering
      const filterCondition = scope === "school"
        ? eq(userProfiles.school, profile.school!)
        : scope === "city"
        ? eq(userProfiles.city, profile.city!)
        : eq(userProfiles.state, profile.state!);

      // Join with userProfiles for filtering
      const leaderboard = await db
        .select({
          userId: users.id,
          username: users.username,
          points: users.totalPoints,
          level: users.currentLevel,
          studyStreak: users.studyStreak,
        })
        .from(users)
        .leftJoin(userProfiles, eq(users.id, userProfiles.userId))
        .where(filterCondition)
        .orderBy(desc(users.totalPoints))
        .limit(parseInt(limit as string) || 100);

      // Add rank
      const rankedLeaderboard = leaderboard.map((entry, index) => ({
        rank: index + 1,
        id: entry.userId,
        username: entry.username,
        points: entry.points,
        score: entry.points,
        level: entry.level,
        streak: entry.studyStreak,
        trend: "same" as const,
      }));

      return res.json(rankedLeaderboard);
    }

    // For "india" scope or users without profile, return all users
    const leaderboard = await db
      .select({
        userId: users.id,
        username: users.username,
        points: users.totalPoints,
        level: users.currentLevel,
        studyStreak: users.studyStreak,
      })
      .from(users)
      .orderBy(desc(users.totalPoints))
      .limit(parseInt(limit as string) || 100);

    // Add rank
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      id: entry.userId,
      username: entry.username,
      points: entry.points,
      score: entry.points,
      level: entry.level,
      streak: entry.studyStreak,
      trend: "same" as const,
    }));

    res.json(rankedLeaderboard);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's leaderboard rank
router.get("/leaderboard/rank/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's points
    const user = await db
      .select({ points: users.totalPoints })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    // Count users with more points
    const result = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(sql`${users.totalPoints} > ${user[0].points}`);

    const rank = (result[0]?.count || 0) + 1;

    res.json({ rank, points: user[0].points });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get/Update user combo
router.get("/combo/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { subject } = req.query;

    const combo = await db
      .select()
      .from(userCombos)
      .where(
        and(
          eq(userCombos.userId, userId),
          subject ? eq(userCombos.subject, subject as string) : sql`true`
        )
      )
      .limit(1);

    res.json(combo[0] || { currentCombo: 0, maxCombo: 0 });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/combo/:userId/update", requireAuth, async (req, res) => {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { userId } = req.params;
    const { subject, isCorrect } = req.body;

    if (user !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Get current combo
    const existingCombo = await db
      .select()
      .from(userCombos)
      .where(
        and(
          eq(userCombos.userId, userId),
          eq(userCombos.subject, subject)
        )
      )
      .limit(1);

    let newCurrentCombo = 0;
    let newMaxCombo = 0;

    if (isCorrect) {
      newCurrentCombo = (existingCombo[0]?.currentCombo || 0) + 1;
      newMaxCombo = Math.max(newCurrentCombo, existingCombo[0]?.maxCombo || 0);
    } else {
      newCurrentCombo = 0;
      newMaxCombo = existingCombo[0]?.maxCombo || 0;
    }

    // Upsert combo
    if (existingCombo.length) {
      await db
        .update(userCombos)
        .set({ 
          currentCombo: newCurrentCombo, 
          maxCombo: newMaxCombo,
          lastAnswerAt: new Date(),
        })
        .where(eq(userCombos.id, existingCombo[0].id));
    } else {
      await db.insert(userCombos).values({
        userId,
        subject,
        currentCombo: newCurrentCombo,
        maxCombo: newMaxCombo,
        lastAnswerAt: new Date(),
      });
    }

    res.json({ currentCombo: newCurrentCombo, maxCombo: newMaxCombo });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile (cosmetics, etc.)
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1);

    if (!profile.length) {
      // Create default profile
      const newProfile = await db
        .insert(userProfiles)
        .values({
          userId,
          equippedFrame: null,
          equippedBadge: null,
          equippedTitle: null,
          showProfile: true,
        })
        .returning();

      return res.json(newProfile[0]);
    }

    res.json(profile[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get live stats for ticker
router.get("/stats/live", async (req, res) => {
  try {
    // Count total users
    const totalUsers = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users);

    // Get today's question attempts
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayAttempts = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(userPerformance)
      .where(gte(userPerformance.attemptDate, today));

    // Count active streaks
    const activeStreaks = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(sql`${users.studyStreak} > 0`);

    res.json({
      usersOnline: Math.floor((totalUsers[0]?.count || 0) * 0.1), // Simulate 10% online
      questionsToday: todayAttempts[0]?.count || 0,
      activeStreaks: activeStreaks[0]?.count || 0,
      dailyConquerors: Math.floor((activeStreaks[0]?.count || 0) * 0.3), // Simulate
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all achievements with user unlock status
router.get("/achievements", requireAuth, async (req, res) => {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const allAchievements = await db
      .select()
      .from(achievements)
      .orderBy(achievements.category, achievements.xpReward);

    const userUnlocked = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, user));

    const achievementsWithStatus = allAchievements.map(achievement => {
      const userAchievement = userUnlocked.find(ua => ua.achievementId === achievement.id);
      return {
        ...achievement,
        unlocked: !!userAchievement,
        unlockedAt: userAchievement?.unlockedAt || null,
      };
    });

    res.json(achievementsWithStatus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Check and unlock achievements for a user
router.post("/achievements/check", requireAuth, async (req, res) => {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userData = await db
      .select()
      .from(users)
      .where(eq(users.id, user))
      .limit(1);

    if (!userData.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const userStats = userData[0];

    const userAttempts = await db
      .select()
      .from(userPerformance)
      .where(eq(userPerformance.userId, user));

    const allAchievements = await db
      .select()
      .from(achievements);

    const unlockedAchievements = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, user));

    const unlockedIds = new Set(unlockedAchievements.map(ua => ua.achievementId));
    const newlyUnlocked: any[] = [];

    const correctAttempts = userAttempts.filter(a => a.isCorrect);
    const totalCorrect = correctAttempts.length;
    
    const comboData = await db
      .select()
      .from(userCombos)
      .where(eq(userCombos.userId, user))
      .limit(1);
    
    const maxCombo = comboData[0]?.maxCombo || 0;

    const subjectCounts: Record<string, number> = {};
    correctAttempts.forEach(attempt => {
      const subject = attempt.subject || 'Unknown';
      subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
    });

    // Get daily challenge completions
    const completedChallenges = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(userDailyChallenges)
      .where(and(
        eq(userDailyChallenges.userId, user),
        eq(userDailyChallenges.completed, true)
      ));

    const dailyChallengeCount = completedChallenges[0]?.count || 0;

    // Get today's question count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayAttempts = userAttempts.filter(a => {
      const attemptDate = new Date(a.attemptDate);
      return attemptDate >= today;
    });
    const todayCorrect = todayAttempts.filter(a => a.isCorrect).length;

    // Get unique subjects answered today
    const todaySubjects = new Set(todayAttempts.map(a => a.subject));

    for (const achievement of allAchievements) {
      if (unlockedIds.has(achievement.id)) continue;

      const condition = achievement.unlockCondition;
      let unlocked = false;

      switch (condition.type) {
        case 'questions_answered':
          unlocked = totalCorrect >= (condition.target || 0);
          break;
        case 'study_streak':
          unlocked = userStats.studyStreak >= (condition.target || 0);
          break;
        case 'combo_streak':
          unlocked = maxCombo >= (condition.target || 0);
          break;
        case 'level_reached':
          unlocked = userStats.currentLevel >= (condition.target || 0);
          break;
        case 'subject_mastery':
          const subjectCount = subjectCounts[condition.subject || ''] || 0;
          unlocked = subjectCount >= (condition.target || 0);
          break;
        case 'daily_challenges_completed':
          unlocked = dailyChallengeCount >= (condition.target || 0);
          break;
        case 'daily_questions':
          unlocked = todayCorrect >= (condition.target || 0);
          break;
        case 'subject_variety':
          unlocked = todaySubjects.size >= (condition.target || 0);
          break;
        case 'all_subjects_mastery':
          const allSubjectsMet = ['Physics', 'Chemistry', 'Botany', 'Zoology'].every(
            subject => (subjectCounts[subject] || 0) >= (condition.target || 0)
          );
          unlocked = allSubjectsMet;
          break;
        default:
          break;
      }

      if (unlocked) {
        await db.insert(userAchievements).values({
          userId: user,
          achievementId: achievement.id,
          unlockedAt: new Date(),
        });

        await db.insert(xpTransactions).values({
          userId: user,
          amount: achievement.xpReward,
          source: 'achievement',
          sourceId: achievement.id.toString(),
          description: `Unlocked achievement: ${achievement.name}`,
        });

        // Fix: Only update points once using the transaction
        await db.execute(sql`
          UPDATE users
          SET total_points = (
            SELECT COALESCE(SUM(amount), 0)
            FROM xp_transactions
            WHERE user_id = ${user}
          ),
          current_level = FLOOR((
            SELECT COALESCE(SUM(amount), 0)
            FROM xp_transactions
            WHERE user_id = ${user}
          ) / 1000) + 1
          WHERE id = ${user}
        `);

        newlyUnlocked.push({
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          xpReward: achievement.xpReward,
          icon: achievement.icon,
          rarity: achievement.rarity,
        });
      }
    }

    res.json({
      newlyUnlocked,
      totalUnlocked: unlockedIds.size + newlyUnlocked.length,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
