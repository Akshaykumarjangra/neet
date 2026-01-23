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

import { nanoid } from "nanoid";

type UserInsert = typeof users.$inferInsert;


async function ensureOwnerAccount() {
  const ownerEmail = "akg45272@gmail.com";
  // User enforced password
  const ownerPassword = "akg45272@gmail.com";

  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, ownerEmail))
      .limit(1);

    const passwordHash = await bcrypt.hash(ownerPassword, 10);

    if (existingUser) {
      // Always ensure owner status and correct password
      const updatePayload = {
        isOwner: true,
        isAdmin: true,
        role: "admin",
        passwordHash: passwordHash // Enforce the requested password
      } as Partial<UserInsert>;

      await db
        .update(users)
        .set(updatePayload)
        .where(eq(users.email, ownerEmail));

      log(`[Owner Account] Updated owner account credentials for ${ownerEmail}`);
    } else {

      const newUser = {
        email: ownerEmail,
        name: "Super Admin",
        passwordHash,
        role: "admin",
        isAdmin: true,
        isOwner: true,
        isPaidUser: true,
        isDisabled: false,
        mustChangePassword: false,
      } as unknown as UserInsert;
      await db.insert(users).values(newUser);

      log(`[Owner Account] Created new owner account: ${ownerEmail}`);
    }
  } catch (error: any) {
    console.error("[Owner Account] Error ensuring owner account:", error);
    if (process.env.NODE_ENV === "production") {
      throw error;
    }
  }
}

async function ensureSampleMentorAvailability() {
  if (process.env.NODE_ENV === "production") return;

  try {
    const approvedMentors = await db
      .select({ id: mentors.id })
      .from(mentors)
      .where(eq(mentors.verificationStatus, "approved"));

    if (approvedMentors.length === 0) {
      log("[Sample Availability] No approved mentors found; skipping");
      return;
    }

    const sampleSlots = [
      { dayOfWeek: 1, startTime: "10:00", endTime: "13:00", isRecurring: true },
      { dayOfWeek: 1, startTime: "15:00", endTime: "18:00", isRecurring: true },
      { dayOfWeek: 3, startTime: "10:00", endTime: "13:00", isRecurring: true },
      { dayOfWeek: 3, startTime: "15:00", endTime: "18:00", isRecurring: true },
      { dayOfWeek: 5, startTime: "10:00", endTime: "13:00", isRecurring: true },
      { dayOfWeek: 5, startTime: "15:00", endTime: "18:00", isRecurring: true },
      { dayOfWeek: 6, startTime: "11:00", endTime: "14:00", isRecurring: true },
    ];

    for (const mentor of approvedMentors) {
      const existing = await db
        .select({ id: mentorAvailability.id })
        .from(mentorAvailability)
        .where(eq(mentorAvailability.mentorId, mentor.id))
        .limit(1);

      if (existing.length > 0) {
        continue;
      }

      await db.insert(mentorAvailability).values(
        sampleSlots.map((slot) => ({
          ...slot,
          mentorId: mentor.id,
        }))
      );

      log(`[Sample Availability] Seeded ${sampleSlots.length} slots for mentor ${mentor.id}`);
    }
  } catch (error) {
    console.error("[Sample Availability] Error seeding mentor availability:", error);
  }
}

function schedulePerformanceSummaryJob() {
  // run every 15 minutes in background to keep dashboards fast
  const intervalMs = 15 * 60 * 1000;
  setInterval(async () => {
    try {
      const updated = await recomputePerformanceSummaryJob();
      log(`[Analytics] Refreshed performance summary for ${updated} users`);
    } catch (err) {
      console.warn("[Analytics] Performance summary refresh failed", err);
    }
  }, intervalMs);
}

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Compression middleware
app.use(compression());

// CORS configuration (reflects allowed origins to support credentials)
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_BASE_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const devAllowedOrigins = [
  "http://localhost:5002",
  "http://localhost:5003",
  "http://localhost:5173",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow same-origin/non-browser requests

    // In development, be permissive to avoid CORS blocks on port changes
    if (process.env.NODE_ENV !== "production") {
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin) || devAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Fallback: allow localhost on any port in dev
      if (origin.startsWith("http://localhost:")) return callback(null, true);
    }

    if (allowedOrigins.length === 0) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Rate limiting (disable or loosen in development)
if (process.env.NODE_ENV === "production") {
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api/", limiter);
} else {
  const limiter = rateLimit({
    windowMs: 60_000, // 1 minute
    max: 5000, // effectively off for local dev
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use("/api/", limiter);
}

// Trust proxy for secure cookies behind reverse proxies
app.set("trust proxy", 1);

// Validate SESSION_SECRET
if (!process.env.SESSION_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("SESSION_SECRET environment variable is required in production");
}

const sessionSecret = process.env.SESSION_SECRET || "dev-secret-change-in-production";
if (sessionSecret === "dev-secret-change-in-production" && process.env.NODE_ENV === "production") {
  throw new Error("Please set a strong SESSION_SECRET in production");
}

// Session store configuration
// Use MemoryStore for development to avoid database connection timeout issues
// Use PostgreSQL store in production for persistence across restarts
const MemoryStore = createMemoryStore(session);
const PgSession = ConnectPgSimple(session);

let sessionStore: session.Store;

if (process.env.NODE_ENV === 'production') {
  const pgStore = new PgSession({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
    errorLog: (err) => {
      console.error('Session store error (non-fatal):', err.message);
    },
  });

  pgStore.on('error', (err) => {
    console.error('Session store connection error (non-fatal):', err.message);
  });

  sessionStore = pgStore;
  log('Using PostgreSQL session store for production');
} else {
  sessionStore = new MemoryStore({
    checkPeriod: 86400000, // Prune expired entries every 24h
  });
  log('Using MemoryStore for development sessions');
}

export const sessionMiddleware = session({
  store: sessionStore,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: "lax",
  },
});

app.use(sessionMiddleware);

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
      if (duration > 800) {
        console.warn(`[SLOW] ${req.method} ${path} took ${duration}ms`);
      }
    }
  });

  next();
});

(async () => {
  try {
    await ensureOwnerAccount();
    await ensureSampleMentorAvailability();
    schedulePerformanceSummaryJob();
    // Demo accounts disabled

    const server = await registerRoutes(app);
    // Keep connections alive longer for reuse and better upstream proxy compatibility
    server.keepAliveTimeout = 65_000;
    server.headersTimeout = 66_000;

    // Initialize WebSocket server with session middleware
    const wsServer = initializeWebSocketServer(server, sessionMiddleware);
    log("📡 WebSocket server initialized at /ws");

    // Global error handler
    app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = process.env.NODE_ENV === "production"
        ? (status === 500 ? "Internal Server Error" : err.message)
        : err.message;

      // Log error details
      console.error(`[ERROR] ${req.method} ${req.path}:`, {
        status,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        timestamp: new Date().toISOString()
      });

      res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
      });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5001 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || '5001', 10);
    server.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal: string) => {
      log(`${signal} signal received: starting graceful shutdown`);

      // Stop accepting new connections
      server.close(async () => {
        log("HTTP server closed");

        try {
          // Close WebSocket connections
          wsServer.shutdown();
          log("WebSocket server closed");

          // Close database pool
          await pool.end();
          log("Database connections closed");

          log("Graceful shutdown completed");
          process.exit(0);
        } catch (error) {
          console.error("Error during shutdown:", error);
          process.exit(1);
        }
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 30000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught errors
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      gracefulShutdown('UNHANDLED_REJECTION');
    });

    // PM2 ready signal
    if (process.send) {
      process.send('ready');
    }
  } catch (error) {
    console.error("[Startup] Failed to start application:", error);
    process.exit(1);
  }
})();
