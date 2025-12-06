import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

const SALT_ROUNDS = 10;

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// User authentication
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ id: string; name: string; email: string } | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

// Create new user
export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<{ id: string; name: string; email: string }> {
  const hashedPassword = await hashPassword(password);

  const [newUser] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash: hashedPassword,
      currentLevel: 1,
      totalPoints: 0,
      studyStreak: 0,
      streakFreezes: 0,
    })
    .returning();

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}

// Session type extension
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

// Auth middleware to protect routes
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

// Auth middleware that also enforces password rotation
export async function requireAuthWithPasswordCheck(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const [user] = await db
      .select({ mustChangePassword: users.mustChangePassword })
      .from(users)
      .where(eq(users.id, req.session.userId))
      .limit(1);

    if (user?.mustChangePassword) {
      return res.status(403).json({ 
        error: "Password change required",
        code: "PASSWORD_CHANGE_REQUIRED"
      });
    }

    next();
  } catch (error) {
    console.error("Password check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get current user from session
export function getCurrentUser(req: Request): string | null {
  return req.session.userId || null;
}
