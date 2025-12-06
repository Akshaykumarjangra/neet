import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { authenticateUser, createUser, getCurrentUser, hashPassword, verifyPassword } from "./auth";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

function sendPasswordChangeEmail(userEmail: string, userName: string) {
  console.log(`[Email Notification] Password changed for ${userName} (${userEmail})`);
  console.log(`[Email Notification] Email would be sent to: ${userEmail}`);
  console.log(`[Email Notification] Subject: Your NEETPrep password has been changed`);
  console.log(`[Email Notification] TODO: Configure email provider (SendGrid/Resend) for production emails`);
}

const router = Router();

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
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
    const { name, email, password } = signupSchema.parse(req.body);

    // Check if email already exists
    const [existingEmail] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user
    const user = await createUser(name, email, password);

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
      })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    res.json({ user: fullUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
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
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
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
