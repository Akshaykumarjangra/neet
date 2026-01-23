import { Router } from "express";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import { requireOwner } from "./auth";

const router = Router();

// Start impersonation
router.post("/impersonate", requireOwner, async (req, res) => {
    try {
        const { targetUserId } = req.body;
        const adminId = req.session.userId!;

        if (!targetUserId) {
            return res.status(400).json({ error: "Target user ID is required" });
        }

        if (targetUserId === adminId) {
            return res.status(400).json({ error: "Cannot impersonate yourself" });
        }

        const [targetUser] = await db
            .select()
            .from(users)
            .where(eq(users.id, targetUserId))
            .limit(1);

        if (!targetUser) {
            return res.status(404).json({ error: "Target user not found" });
        }

        // Store original admin ID in session if not already stored
        if (!req.session.originalAdminId) {
            req.session.originalAdminId = adminId;
        }

        // Switch current user ID to target
        req.session.userId = targetUserId;

        // Explicitly save the session
        req.session.save((err) => {
            if (err) {
                console.error("Session save error during impersonation:", err);
                return res.status(500).json({ error: "Failed to start impersonation session" });
            }

            console.log(`[Admin Impersonation] Admin ${adminId} started impersonating ${targetUserId} (${targetUser.email})`);
            res.json({
                message: `Impersonating ${targetUser.name}`,
                user: targetUser
            });
        });

    } catch (error: any) {
        console.error("Impersonation error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Stop impersonation
router.post("/impersonate/stop", async (req, res) => {
    try {
        const originalAdminId = req.session.originalAdminId;

        if (!originalAdminId) {
            return res.status(400).json({ error: "No active impersonation session found" });
        }

        const [adminUser] = await db
            .select()
            .from(users)
            .where(eq(users.id, originalAdminId))
            .limit(1);

        if (!adminUser) {
            // Emergency failsafe: if admin account somehow gone, just logout
            return req.session.destroy(() => {
                res.status(400).json({ error: "Original admin account not found. Session terminated." });
            });
        }

        // Restore admin session
        req.session.userId = originalAdminId;
        req.session.originalAdminId = undefined; // Clear the flag

        req.session.save((err) => {
            if (err) {
                console.error("Session save error during stop impersonation:", err);
                return res.status(500).json({ error: "Failed to restore admin session" });
            }

            console.log(`[Admin Impersonation] Stopped impersonation. Restored admin ${originalAdminId}`);
            res.json({
                message: "Impersonation stopped",
                user: adminUser
            });
        });

    } catch (error: any) {
        console.error("Stop impersonation error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
