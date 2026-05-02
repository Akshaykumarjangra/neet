import { Router, Request, Response, NextFunction } from "express";
import { db } from "./db";
import { users, auditLogs } from "@shared/schema";
import { eq } from "drizzle-orm";
import { requireOwner } from "./auth";
import { recordAuditLog } from "./lib/audit";

const router = Router();

const MAX_IMPERSONATION_MS = 60 * 60 * 1000; // 1 hour
// MAX_IMPERSONATION_MS is used to enforce a 1-hour cap on any impersonation session.

// Middleware: stop endpoint is only accessible while an impersonation
// session is currently active. Without this any unauthenticated client
// could POST to /impersonate/stop.
function requireActiveImpersonation(req: Request, res: Response, next: NextFunction) {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: "Authentication required" });
    }
    if (!req.session.originalAdminId) {
        return res.status(401).json({ error: "No active impersonation session" });
    }
    next();
}

// Middleware: enforce 1-hour cap on any impersonation session. Mounted
// globally so any request made under impersonation is rejected once the
// cap is exceeded; the client is then forced to call /impersonate/stop.
export function enforceImpersonationTimeLimit(req: Request, res: Response, next: NextFunction) {
    if (req.session?.originalAdminId && req.session.impersonationStartedAt) {
        const elapsed = Date.now() - req.session.impersonationStartedAt;
        if (elapsed > MAX_IMPERSONATION_MS) {
            return res.status(440).json({
                error: "Impersonation session expired (1 hour max). Please call /impersonate/stop.",
                code: "IMPERSONATION_EXPIRED",
            });
        }
    }
    next();
}

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
        req.session.impersonationStartedAt = Date.now();

        // Audit BEFORE saving session so we have a record even if the
        // session save subsequently fails.
        await recordAuditLog(req, {
            action: "impersonation_start",
            userId: adminId,
            entityType: "user_impersonation",
            entityId: targetUserId,
            newValue: {
                targetEmail: targetUser.email,
                startedAt: new Date(req.session.impersonationStartedAt).toISOString(),
            },
        });

        // Explicitly save the session
        req.session.save((err) => {
            if (err) {
                console.error("Session save error during impersonation:", err);
                return res.status(500).json({ error: "Failed to start impersonation session" });
            }

            console.log(`[Admin Impersonation] Admin ${adminId} started impersonating ${targetUserId} (${targetUser.email})`);
            res.json({
                message: `Impersonating ${targetUser.name}`,
                user: targetUser,
                expiresAt: new Date((req.session.impersonationStartedAt || Date.now()) + MAX_IMPERSONATION_MS).toISOString(),
            });
        });

    } catch (error: any) {
        console.error("Impersonation error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Stop impersonation - now protected by requireActiveImpersonation so a
// drive-by unauthenticated POST cannot hit this endpoint.
router.post("/impersonate/stop", requireActiveImpersonation, async (req, res) => {
    try {
        const originalAdminId = req.session.originalAdminId!;
        const impersonatedUserId = req.session.userId;

        const [adminUser] = await db
            .select()
            .from(users)
            .where(eq(users.id, originalAdminId))
            .limit(1);

        if (!adminUser) {
            await recordAuditLog(req, {
                action: "impersonation_stop_admin_missing",
                userId: originalAdminId,
                entityType: "user_impersonation",
                entityId: impersonatedUserId,
            });
            // Emergency failsafe: if admin account somehow gone, just logout
            return req.session.destroy(() => {
                res.status(400).json({ error: "Original admin account not found. Session terminated." });
            });
        }

        // Audit before mutating session
        await recordAuditLog(req, {
            action: "impersonation_stop",
            userId: originalAdminId,
            entityType: "user_impersonation",
            entityId: impersonatedUserId,
            newValue: {
                stoppedAt: new Date().toISOString(),
                durationMs: req.session.impersonationStartedAt
                    ? Date.now() - req.session.impersonationStartedAt
                    : null,
            },
        });

        // Restore admin session
        req.session.userId = originalAdminId;
        req.session.originalAdminId = undefined; // Clear the flag
        req.session.impersonationStartedAt = undefined;

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
