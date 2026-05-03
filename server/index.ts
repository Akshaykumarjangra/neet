import "dotenv/config";
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

async function ensureOwnerAccount() {
  const ownerEmail = process.env.OWNER_EMAIL;
  const ownerPassword = process.env.OWNER_PASSWORD;

  if (!ownerEmail || !ownerPassword) {
    return;
  }

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, ownerEmail))
      .limit(1);

    if (existingUser) {
      // console.log(`[Owner Account] Verified owner status for ${ownerEmail}`);
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
  try {
    const app = express();

    // Ensure session table exists — use DO block to avoid constraint-already-exists errors
    try {
      await pool.query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'session') THEN
            CREATE TABLE "session" (
              "sid" varchar NOT NULL COLLATE "default" PRIMARY KEY,
              "sess" json NOT NULL,
              "expire" timestamp(6) NOT NULL
            );
          END IF;
        END
        $$;
        CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
      `);
    } catch (err) {
      console.error("[Setup] Error ensuring session table:", err);
    }

    const sessionStore = new (ConnectPgSimple(session))({
      pool,
      createTableIfMissing: false,
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

    const server = await registerRoutes(app);

    const port = parseInt(process.env.PORT || '5001', 10);
    server.listen(port, "0.0.0.0", () => {
      console.log(`[Server] Listening on port ${port}`);
    });

  } catch (error) {
    console.error("[Fatal] Startup error:", error);
    process.exit(1);
  }
})();