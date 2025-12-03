
// Get all achievements with user unlock status
router.get("/achievements", requireAuth, async (req, res) => {
  try {
    const user = getCurrentUser(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get all achievements
    const allAchievements = await db
      .select()
      .from(achievements)
      .orderBy(achievements.category, achievements.xpReward);

    // Get user's unlocked achievements
    const userUnlocked = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, user));

    // Merge data
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

    // Get user data
    const userData = await db
      .select()
      .from(users)
      .where(eq(users.id, user))
      .limit(1);

    if (!userData.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const userStats = userData[0];

    // Get all user attempts for progress calculations
    const userAttempts = await db
      .select()
      .from(userPerformance)
      .where(eq(userPerformance.userId, user));

    // Get all achievements
    const allAchievements = await db
      .select()
      .from(achievements);

    // Get already unlocked achievements
    const unlockedAchievements = await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, user));

    const unlockedIds = new Set(unlockedAchievements.map(ua => ua.achievementId));
    const newlyUnlocked: any[] = [];

    // Calculate stats for checking
    const correctAttempts = userAttempts.filter(a => a.isCorrect);
    const totalCorrect = correctAttempts.length;
    
    // Calculate combo streak
    const comboData = await db
      .select()
      .from(userCombos)
      .where(eq(userCombos.userId, user))
      .limit(1);
    
    const maxCombo = comboData[0]?.maxCombo || 0;

    // Calculate subject mastery
    const subjectCounts: Record<string, number> = {};
    correctAttempts.forEach(attempt => {
      const subject = attempt.subject || 'Unknown';
      subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
    });

    // Check each achievement
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
        default:
          // Other achievement types can be checked here
          break;
      }

      if (unlocked) {
        // Unlock the achievement
        await db.insert(userAchievements).values({
          userId: user,
          achievementId: achievement.id,
          unlockedAt: new Date(),
        });

        // Award XP
        await db.insert(xpTransactions).values({
          userId: user,
          amount: achievement.xpReward,
          source: 'achievement',
          sourceId: achievement.id.toString(),
          description: `Unlocked achievement: ${achievement.name}`,
        });

        // Update user points
        await db.execute(sql`
          UPDATE users
          SET total_points = total_points + ${achievement.xpReward},
              current_level = FLOOR((total_points + ${achievement.xpReward}) / 1000) + 1
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
