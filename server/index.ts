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

    const sessionStore = new (ConnectPgSimple(session))({
      pool,
      createTableIfMissing: false,
    });

    // Security & performance middleware
    app.use(helmet({
      contentSecurityPolicy: false, // disable CSP for now since app uses inline styles/scripts
      crossOriginEmbedderPolicy: false,
    }));
    app.use(compression());

    // CORS configuration
    const allowedOrigins = [
      "https://neet.zeroai.org.in",
      process.env.NODE_ENV !== "production" && "http://localhost:5173",
      process.env.NODE_ENV !== "production" && "http://localhost:5001",
    ].filter(Boolean) as string[];

    app.use(cors({
      origin: (origin, callback) => {
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

    // Serve static files in production, Vite dev server in development
    if (process.env.NODE_ENV !== "production") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
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