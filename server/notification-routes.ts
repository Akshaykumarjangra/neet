import { Router } from "express";
import { db } from "./db";
import { userDevices } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { recordAuditLog } from "./lib/audit";

const router = Router();

router.post("/register-device", async (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(401);

  const { fcmToken, deviceType } = req.body;
  if (!fcmToken) return res.status(400).send("FCM Token is required");

  try {
    // Check if this token already exists for this user
    const existing = await db.select()
      .from(userDevices)
      .where(
        and(
          eq(userDevices.userId, req.user!.id),
          eq(userDevices.fcmToken, fcmToken)
        )
      );

    if (existing.length === 0) {
      await db.insert(userDevices).values({
        userId: req.user!.id,
        fcmToken,
        deviceType: deviceType || "web",
      });

      await recordAuditLog(req, {
        action: "REGISTER_DEVICE",
        entityType: "user_devices",
        newValue: { deviceType, tokenPreview: fcmToken.substring(0, 10) + "..." },
      });
    } else {
        // Update last seen
        await db.update(userDevices)
            .set({ fcmToken: existing[0].fcmToken })
            .where(eq(userDevices.id, existing[0].id));
    }

    res.json({ success: true });
  } catch (error) {
    console.error("[Notifications] Registration failed:", error);
    res.status(500).send("Failed to register device");
  }
});

export default router;
