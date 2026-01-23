// @ts-nocheck
import { Router, type Request, type Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import { authenticateUser, createUser, getCurrentUser, hashPassword, verifyPassword } from "./auth";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function sendPasswordChangeEmail(userEmail: string, userName: string) {
  // Check for required environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[Email Mock] Password changed for ${userName} (${userEmail})`);
    console.log(`[Email Mock] To enable real emails, configure: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM`);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"NEET Prep" <noreply@neetprep.com>',
      to: userEmail,
      subject: "Security Alert: Password Changed",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Hello ${userName},</h2>
          <p>Your password for NEET Prep was successfully changed.</p>
          <p>If you did not make this change, please contact support immediately.</p>
          <br/>
          <p>Best regards,</p>
          <p>The NEET Prep Team</p>
        </div>
      `,
    });
    console.log(`[Email Sent] Password change notification sent to ${userEmail}`);
  } catch (error) {
    console.error("[Email Error] Failed to send password change email:", error);
  }
}

const router = Router();

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["student", "mentor"]).default("student"),
  inviteToken: z.string().min(8).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

// Sign up new user
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = signupSchema.parse(req.body);
    const normalizedEmail = email.trim().toLowerCase();

    const [existingEmail] = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await createUser(name, normalizedEmail, password, {
      role: role,
      isPaidUser: false,
    });

    // Create session
    req.session.userId = user.id;

    // Fetch full user details
    const [fullUser] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        currentLevel: users.currentLevel,
        totalPoints: users.totalPoints,
        studyStreak: users.studyStreak,
        isAdmin: users.isAdmin,
        isPaidUser: users.isPaidUser,
        isOwner: users.isOwner,
        avatarUrl: users.avatarUrl,
        headline: users.headline,
      })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    res.json({ user: fullUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if user is disabled
    const [userDetails] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (userDetails?.isDisabled) {
      return res.status(403).json({ error: "Your account has been disabled. Please contact support." });
    }

    // Create session
    req.session.userId = user.id;

    // Fetch full user details including mustChangePassword
    const [fullUser] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        currentLevel: users.currentLevel,
        totalPoints: users.totalPoints,
        studyStreak: users.studyStreak,
        isAdmin: users.isAdmin,
        isPaidUser: users.isPaidUser,
        isOwner: users.isOwner,
        mustChangePassword: users.mustChangePassword,
        avatarUrl: users.avatarUrl,
        headline: users.headline,
      })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    res.json({ user: fullUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Login error:", errorMsg, error);
    res.status(500).json({ error: errorMsg || "Internal server error" });
  }
});

// Logout user
router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

// Get current user
router.get("/me", async (req: Request, res: Response) => {
  const userId = getCurrentUser(req);

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        currentLevel: users.currentLevel,
        totalPoints: users.totalPoints,
        studyStreak: users.studyStreak,
        isAdmin: users.isAdmin,
        isPaidUser: users.isPaidUser,
        isOwner: users.isOwner,
        mustChangePassword: users.mustChangePassword,
        avatarUrl: users.avatarUrl,
        headline: users.headline,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user,
      isImpersonating: !!req.session.originalAdminId
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Change password
router.post("/change-password", async (req: Request, res: Response) => {
  const userId = getCurrentUser(req);

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ error: "New password must be different from current password" });
    }

    const newPasswordHash = await hashPassword(newPassword);

    await db
      .update(users)
      .set({
        passwordHash: newPasswordHash,
        mustChangePassword: false,
      })
      .where(eq(users.id, userId));

    sendPasswordChangeEmail(user.email, user.name);

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0]?.message || "Validation error" });
    }
    console.error("Change password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin Impersonation
router.post("/admin/impersonate", async (req: Request, res: Response) => {
  const adminId = getCurrentUser(req);

  if (!adminId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    // 1. Verify the requester is an admin
    const [admin] = await db
      .select({ isAdmin: users.isAdmin })
      .from(users)
      .where(eq(users.id, adminId))
      .limit(1);

    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    // 2. Validate target user exists
    const { targetUserId } = z.object({ targetUserId: z.string() }).parse(req.body);

    const [targetUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, targetUserId))
      .limit(1);

    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found" });
    }

    // 3. Create session for target user
    req.session.userId = targetUser.id;

    // 4. Return user details similar to login
    const [fullUser] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        currentLevel: users.currentLevel,
        totalPoints: users.totalPoints,
        studyStreak: users.studyStreak,
        isAdmin: users.isAdmin,
        isPaidUser: users.isPaidUser,
        isOwner: users.isOwner,
        mustChangePassword: users.mustChangePassword,
        avatarUrl: users.avatarUrl,
        headline: users.headline,
      })
      .from(users)
      .where(eq(users.id, targetUser.id))
      .limit(1);

    res.json({
      user: fullUser,
      message: `Successfully impersonating ${targetUser.name}`
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Impersonation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
