import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import createMemoryStore from "memorystore";
import helmet from "helmet";
// @ts-ignore
import compression from "compression";
import { rateLimit } from "express-rate-limit";
// @ts-ignore
import cors, { type CorsOptions } from "cors";
import path from "path";
import fs from "fs";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeWebSocketServer } from "./ws/index";
import { attachBattleWS } from "./ws/battle";
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

    if (!existingUser) {
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

    // Ensure session table exists — separate try/catch blocks to handle all cases
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "session" (
          "sid" varchar NOT NULL COLLATE "default",
          "sess" json NOT NULL,
          "expire" timestamp(6) NOT NULL
        )
      `);
    } catch (e: any) {
      // Table already exists, ignore
    }
    try {
      await pool.query(`ALTER TABLE "session" ADD PRIMARY KEY ("sid")`);
    } catch (e: any) {
      // PK already exists, ignore
    }
    try {
      await pool.query(`CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire")`);
    } catch (e: any) {
      // Index already exists, ignore
    }

    // Ensure mock_exam_attempts has all required columns (from 20260504_mock_exam_attempts_missing_columns.sql)
    try {
      log("[Database] Checking for missing columns in mock_exam_attempts...");
      await pool.query(`
        ALTER TABLE "mock_exam_attempts"
          ADD COLUMN IF NOT EXISTS "ends_at" timestamp,
          ADD COLUMN IF NOT EXISTS "focus_loss_count" integer NOT NULL DEFAULT 0,
          ADD COLUMN IF NOT EXISTS "last_focus_loss_at" timestamp,
          ADD COLUMN IF NOT EXISTS "last_active_at" timestamp,
          ADD COLUMN IF NOT EXISTS "ip_address" varchar(45),
          ADD COLUMN IF NOT EXISTS "user_agent" text,
          ADD COLUMN IF NOT EXISTS "device_fingerprint" varchar(200);
      `);
      log("[Database] mock_exam_attempts table is up to date.");
    } catch (e: any) {
      console.error("[Database] Error updating mock_exam_attempts table:", e.message);
      // Don't exit here, the columns might actually exist or there might be other issues
    }

    const sessionStore = new (ConnectPgSimple(session))({
      pool,
      createTableIfMissing: false,
    });

    // Security & performance middleware
    app.use(helmet({
      contentSecurityPolicy: false, // disable CSP for now since app uses inline styles/scripts
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    }));
    app.use(compression());

    // CORS configuration
    const allowedOrigins = [
      "https://neet.zeroai.org.in",
      process.env.NODE_ENV !== "production" && "http://localhost:5173",
      process.env.NODE_ENV !== "production" && "http://localhost:5001",
    ].filter(Boolean) as string[];

    app.use(cors({
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.some(o => origin === o || origin.startsWith("http://localhost:"))) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    }));

    // Trust the reverse proxy (Coolify/Traefik) so secure cookies work
    if (process.env.NODE_ENV === "production") {
      app.set("trust proxy", 1);
    }

    const sessionMiddleware = session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || (() => {
        console.warn("WARNING: SESSION_SECRET not set, using insecure default");
        return "insecure-default-change-in-production-" + Date.now();
      })(),
      resave: false,
      saveUninitialized: false,
      proxy: process.env.NODE_ENV === "production",
      cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(sessionMiddleware);

    // CSRF token endpoint
    app.get("/api/csrf-token", csrfTokenHandler);

    // Telemetry endpoint (fire-and-forget, just acknowledge)
    app.post("/api/telemetry/vitals", (_req, res) => {
      res.status(204).end();
    });

    const server = await registerRoutes(app);
    initializeWebSocketServer(server, sessionMiddleware);
    attachBattleWS(server, sessionMiddleware);

    // Serve uploaded assets (videos, handwritten notes, etc.)
    app.use("/uploads", express.static(path.resolve(import.meta.dirname, "..", "uploads"), {
      maxAge: '7d',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.mp4')) res.setHeader('Content-Type', 'video/mp4');
        else if (filePath.endsWith('.webm')) res.setHeader('Content-Type', 'video/webm');
        else if (filePath.endsWith('.ogg')) res.setHeader('Content-Type', 'video/ogg');
      }
    }));

    // Serve static files in production, Vite dev server in development
    // Prioritize built assets if they exist, otherwise use Vite dev server
    const distPath = path.resolve(import.meta.dirname, "..", "dist", "public");
    const assetsExist = fs.existsSync(distPath) && fs.existsSync(path.resolve(distPath, "assets"));
    
    if (assetsExist) {
      // Built assets exist, serve them (production mode)
      serveStatic(app);
      log("Using built static assets from dist/public");
    } else if (process.env.NODE_ENV === "development") {
      // Explicitly in development mode with no built assets, use Vite dev server
      await setupVite(app, server);
      log("Using Vite dev server");
    } else {
      // No built assets and not explicitly development - serve static anyway (will 404 missing files)
      serveStatic(app);
      log("Serving static files (assets not found - ensure build completed)");
    }

    // Global error handler (must be after all route registration)
    app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error("Unhandled error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Internal server error" });
      }
    });

    const port = parseInt(process.env.PORT || '5001', 10);
    server.listen(port, "0.0.0.0", () => {
      console.log(`[Server] Listening on port ${port} (${process.env.NODE_ENV || "development"})`);
    });

  } catch (error) {
    console.error("[Fatal] Startup error:", error);
    process.exit(1);
  }
})();