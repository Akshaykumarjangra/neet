// Authentication routes — login, signup, logout, password management
import { Router, type Request, type Response } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";
import { authenticateUser, createUser, getCurrentUser, hashPassword, verifyPassword } from "./auth";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq, sql } from "drizzle-orm";
import { authLimiter, passwordResetLimiter } from "./middleware/rate-limits";
import { recordAuditLog } from "./lib/audit";

// Strong password policy:
// - Min 10 chars
// - At least 1 uppercase, 1 lowercase, 1 number
// - At least 1 special char OR length >= 14 (long passphrase exemption)
const PASSWORD_REQUIREMENTS_MESSAGE =
  "Password must be at least 10 characters and include uppercase, lowercase, and a number, plus a special character (or be 14+ characters).";

const strongPassword = z
  .string()
  .min(10, PASSWORD_REQUIREMENTS_MESSAGE)
  .max(200)
  .refine((val) => /[A-Z]/.test(val), PASSWORD_REQUIREMENTS_MESSAGE)
  .refine((val) => /[a-z]/.test(val), PASSWORD_REQUIREMENTS_MESSAGE)
  .refine((val) => /[0-9]/.test(val), PASSWORD_REQUIREMENTS_MESSAGE)
  .refine(
    (val) => val.length >= 14 || /[^A-Za-z0-9]/.test(val),
    PASSWORD_REQUIREMENTS_MESSAGE,
  );

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes

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

// Apply auth rate limiting to all sensitive endpoints
router.use("/login", authLimiter);
router.use("/signup", authLimiter);
router.use("/change-password", authLimiter);

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: strongPassword,
  role: z.enum(["student", "mentor"]).default("student"),
  inviteToken: z.string().min(8).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: strongPassword,
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

    // Create session (regenerate to prevent fixation)
    req.session.regenerate(async (err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).json({ error: "Failed to create session" });
      }

      req.session.userId = user.id;
      // Clear CSRF token to force rotation
      delete req.session.csrfToken;

      await recordAuditLog(req, {
        action: "signup",
        entityType: "user",
        entityId: user.id,
        userId: user.id
      });

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
    });
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
    const normalizedEmail = email.trim().toLowerCase();

    // Pre-auth: check if account is currently locked
    const [preAuthUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (preAuthUser?.lockedUntil && preAuthUser.lockedUntil > new Date()) {
      return res.status(429).json({
        error: `Account locked due to too many failed login attempts. Try again at ${preAuthUser.lockedUntil.toISOString()}.`,
        lockedUntil: preAuthUser.lockedUntil,
      });
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      // Increment failed attempts on the matched account (if any)
      if (preAuthUser) {
        const newAttempts = (preAuthUser.failedLoginAttempts ?? 0) + 1;
        const shouldLock = newAttempts >= MAX_FAILED_ATTEMPTS;
        await db
          .update(users)
          .set({
            failedLoginAttempts: newAttempts,
            lockedUntil: shouldLock
              ? new Date(Date.now() + LOCKOUT_DURATION_MS)
              : preAuthUser.lockedUntil ?? null,
          })
          .where(eq(users.id, preAuthUser.id));

        await recordAuditLog(req, {
          action: shouldLock ? "account_lockout" : "login_failed",
          entityType: "user",
          entityId: preAuthUser.id,
          userId: preAuthUser.id,
          newValue: { attempts: newAttempts }
        });

        if (shouldLock) {
          return res.status(429).json({
            error: `Account locked due to too many failed login attempts. Try again in 30 minutes.`,
          });
        }
      }
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if user is disabled
    const [userDetails] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (userDetails?.isDisabled) {
      await recordAuditLog(req, {
        action: "login_disabled_account",
        entityType: "user",
        entityId: user.id,
        userId: user.id
      });
      return res.status(403).json({ error: "Your account has been disabled. Please contact support." });
    }

    // Successful login: reset lockout counters
    await db
      .update(users)
      .set({ failedLoginAttempts: 0, lockedUntil: null })
      .where(eq(users.id, user.id));

    // Create session (regenerate to prevent fixation)
    req.session.regenerate(async (err) => {
      if (err) {
        console.error("Session regeneration error:", err);
        return res.status(500).json({ error: "Failed to create session" });
      }

      req.session.userId = user.id;
      // Clear CSRF token to force rotation
      delete req.session.csrfToken;

      await recordAuditLog(req, {
        action: "login",
        entityType: "user",
        entityId: user.id,
        userId: user.id
      });

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
    });
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
    return res.json(null);
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



export default router;
