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

(async () => {
  console.log("[DEBUG] Running async startup");
  try {
    const app = express();
    console.log("[DEBUG] Express app created");

    // Security middleware
    app.use(helmet({
      contentSecurityPolicy: false, // Loosen for debug
      crossOriginEmbedderPolicy: false,
    }));
    console.log("[DEBUG] Helmet initialized");

    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const allowedOrigins = (process.env.CORS_ORIGIN || "").split(",").map(o => o.trim()).filter(Boolean);
    app.use(cors({ origin: allowedOrigins, credentials: true }));
    console.log("[DEBUG] CORS initialized");

    const sessionMiddleware = session({
      secret: process.env.SESSION_SECRET || "debug_secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" }
    });
    app.use(sessionMiddleware);
    console.log("[DEBUG] Session initialized");

    const server = await registerRoutes(app);
    console.log("[DEBUG] Routes registered");

    const port = parseInt(process.env.PORT || '5001', 10);
    server.listen(port, "0.0.0.0", () => {
      console.log(`[DEBUG] Server listening on port ${port}`);
    });

  } catch (error) {
    console.error("[DEBUG] FATAL STARTUP ERROR:", error);
    process.exit(1);
  }
})();
