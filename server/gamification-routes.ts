import { Router } from "express";
import { GamificationService } from "./gamification";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

export const gamificationRoutes = Router();

// Middleware to ensure user is authenticated (Session based)
const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};

gamificationRoutes.use(requireAuth);

gamificationRoutes.post("/award-xp", async (req, res) => {
    try {
        const { userId, amount, source } = req.body;
        const currentUserId = req.session.userId;

        // Security check: ensure user is modifying their own data or is admin
        // We need to fetch the current user to check if admin
        const [currentUser] = await db.select().from(users).where(eq(users.id, currentUserId)).limit(1);

        if (currentUserId !== userId && !currentUser?.isAdmin) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const result = await GamificationService.awardXp(userId, amount, source);
        res.json(result);
    } catch (error: any) {
        console.error("Error awarding XP:", error);
        res.status(500).json({ message: error.message });
    }
});

gamificationRoutes.post("/update-streak", async (req, res) => {
    try {
        const { userId } = req.body;
        const currentUserId = req.session.userId;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Just check session ID match for simplicity, or fetch for strict admin check
        // Assuming user can only update their own streak for now
        if (currentUserId !== userId) {
            // Optional: Allow admins. But for now strict owner check is safer/faster
            // Fetching user just for admin check:
            const [currentUser] = await db.select().from(users).where(eq(users.id, currentUserId)).limit(1);
            if (!currentUser?.isAdmin) {
                return res.status(403).json({ message: "Forbidden" });
            }
        }

        const result = await GamificationService.updateStreak(userId);
        res.json(result);
    } catch (error: any) {
        console.error("Error updating streak:", error);
        res.status(500).json({ message: error.message });
    }
});

gamificationRoutes.get("/leaderboard", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const result = await GamificationService.getLeaderboard('all_time', limit);
        res.json(result);
    } catch (error: any) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: error.message });
    }
});

gamificationRoutes.get("/achievements/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Check for achievements first
        await GamificationService.checkAchievements(userId);

        // Then return list
        const result = await GamificationService.getUserAchievements(userId);
        res.json(result);
    } catch (error: any) {
        console.error("Error fetching achievements:", error);
        res.status(500).json({ message: error.message });
    }
});

gamificationRoutes.get("/daily-challenges", async (req, res) => {
    try {
        const userId = req.session.userId;
        const challenges = await GamificationService.getDailyChallenges(userId);
        res.json(challenges);
    } catch (error: any) {
        console.error("Error fetching daily challenges:", error);
        res.status(500).json({ message: error.message });
    }
});

gamificationRoutes.post("/daily-challenges/:challengeId/progress", async (req, res) => {
    try {
        const { challengeId } = req.params;
        const { progress } = req.body;
        const userId = req.session.userId;

        const result = await GamificationService.updateChallengeProgress(
            userId,
            parseInt(challengeId),
            progress
        );
        res.json({ success: result });
    } catch (error: any) {
        console.error("Error updating challenge progress:", error);
        res.status(500).json({ message: error.message });
    }
});
