// @ts-nocheck
import passport from "passport";

import bcrypt from "bcrypt";
import type { Request, Response, NextFunction } from "express";
import { db } from "./db";
import { users, userSubscriptions } from "../shared/schema";
import { eq, and, inArray, desc } from "drizzle-orm";

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
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (!user || !user.passwordHash) {
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
  } catch (error) {
    console.error("authenticateUser error:", error);
    return null;
  }
}

// Create new user
export async function createUser(
  name: string,
  email: string,
  password: string,
  options?: {
    role?: "student" | "mentor" | "admin";
    isPaidUser?: boolean;
    isAdmin?: boolean;
    isOwner?: boolean;
  }
): Promise<{ id: string; name: string; email: string }> {
  const hashedPassword = await hashPassword(password);
  const normalizedEmail = email.trim().toLowerCase();
  const role = options?.role ?? "student";
  const isAdmin = options?.isAdmin ?? role === "admin";

  const [newUser] = await db
    .insert(users)
    .values({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashedPassword,
      currentLevel: 1,
      totalPoints: 0,
      studyStreak: 0,
      streakFreezes: 0,
      role,
      isAdmin,
      isPaidUser: options?.isPaidUser ?? false,
      isOwner: options?.isOwner ?? false,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    });

  return newUser;
}

// Session type extension
declare module "express-session" {
  interface SessionData {
    userId: string;
    originalAdminId?: string;
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

export async function requireOwner(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const [user] = await db
      .select({ isAdmin: users.isAdmin, isOwner: users.isOwner })
      .from(users)
      .where(eq(users.id, req.session.userId))
      .limit(1);

    if (!user || (!user.isOwner && !user.isAdmin)) {
      return res.status(403).json({ error: "Admin access required" });
    }

    (req as any).isOwner = user.isOwner;
    next();
  } catch (error) {
    console.error("Owner check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export function requireActiveSubscription(options?: { allowTrial?: boolean }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const [user] = await db
        .select({
          isPaidUser: users.isPaidUser,
          role: users.role,
          isOwner: users.isOwner,
        })
        .from(users)
        .where(eq(users.id, req.session.userId))
        .limit(1);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Owners and Admins bypass all checks
      if (user.isOwner || user.role === "admin") {
        return next();
      }

      // Check for valid active subscription
      const [activeSubscription] = await db
        .select({
          id: userSubscriptions.id,
          status: userSubscriptions.status,
          currentPeriodEnd: userSubscriptions.currentPeriodEnd,
        })
        .from(userSubscriptions)
        .where(
          and(
            eq(userSubscriptions.userId, req.session.userId),
            inArray(userSubscriptions.status, ["active", "trial"])
          )
        )
        .orderBy(desc(userSubscriptions.currentPeriodEnd))
        .limit(1);

      const now = new Date();

      if (activeSubscription && activeSubscription.currentPeriodEnd) {
        if (activeSubscription.currentPeriodEnd > now) {
          return next();
        } else {
          console.log(`[Auth] Subscription ${activeSubscription.id} expired on ${activeSubscription.currentPeriodEnd}`);
        }
      }

      // Fallback: If no strict subscription found, check the legacy flag but warn
      // Ideally we remove this fallback once migration is 100% complete
      if (user.isPaidUser) {
        // Optionally: Trigger a background background check to unset isPaidUser if actually expired?
        // For now, let's allow it but log a warning if no matching subscription found
        // console.warn(`[Auth] User ${req.session.userId} has isPaidUser=true but no active subscription record!`);
        return next();
      }

      if (options?.allowTrial) {
        return next();
      }

      return res.status(402).json({
        error: "PAYMENT_REQUIRED",
        message: "Your subscription has expired or is invalid. Please upgrade to Premium.",
      });
    } catch (error) {
      console.error("Subscription check error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
