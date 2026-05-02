import "dotenv/config";
console.log("[DEBUG] Starting index.ts");

// Force production mode if we're not running locally
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  if (process.env.PORT === "5001" && !process.env.USERDOMAIN) {
    process.env.NODE_ENV = "production";
    console.log("[Setup] Detected production-like environment; forcing NODE_ENV=production");
  }
}

console.log("[DEBUG] Importing dependencies");
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import createMemoryStore from "memorystore";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import cors, { type CorsOptions } from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeWebSocketServer } from "./ws/index";
import { pool, db } from "./db";
import { mentorAvailability, mentors, users } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { recomputePerformanceSummaryJob } from "./analytics-routes";
import { initScheduler } from "./services/scheduler";
import { csrfProtection, csrfTokenHandler } from "./middleware/csrf";
import { enforceImpersonationTimeLimit } from "./admin-impersonation-routes";
import { nanoid } from "nanoid";

console.log("[DEBUG] Dependencies imported");

async function ensureOwnerAccount() {
  console.log("[DEBUG] Checking owner account");
  const ownerEmail = process.env.OWNER_EMAIL;
  const ownerPassword = process.env.OWNER_PASSWORD;

  if (!ownerEmail || !ownerPassword) {
    console.log("[DEBUG] Owner credentials not set, skipping");
    return;
  }

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, ownerEmail))
      .limit(1);

    if (existingUser) {
      console.log(`[Owner Account] Verified owner status for ${ownerEmail}`);
    } else {
      const passwordHash = await bcrypt.hash(ownerPassword, 10);
      await db.insert(users).values({
        email: ownerEmail,
        name: "Super Admin",
        passwordHash,
        role: "admin",
        isAdmin: true,
        isOwner: true,
        isPaidUser: true,
      } as any);
      log(`[Owner Account] Created new owner account: ${ownerEmail}`);
    }
  } catch (err) {
    console.error("[Owner Account] Error during setup:", err);
  }
}

(async () => {
  console.log("[DEBUG] Running async startup");
  try {
    const app = express();
    console.log("[DEBUG] Express app created");

    // Skip owner setup for now to avoid DB issues during boot
    // await ensureOwnerAccount();

    const sessionStore = new (ConnectPgSimple(session))({
      pool,
      createTableIfMissing: true,
    });

    const sessionMiddleware = session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || "akg45272@gmail.com",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(sessionMiddleware);
    console.log("[DEBUG] Middleware initialized");

    const server = await registerRoutes(app);
    console.log("[DEBUG] Routes registered");

    const port = parseInt(process.env.PORT || '5001', 10);
    server.listen(port, "0.0.0.0", () => {
      console.log(`[DEBUG] Full app listening on port ${port}`);
    });

  } catch (error) {
    console.error("[DEBUG] FATAL STARTUP ERROR:", error);
    process.exit(1);
  }
})();
