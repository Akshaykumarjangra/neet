import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeWebSocketServer } from "./ws/index";
import { pool } from "./db";

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
  crossOriginEmbedderPolicy: false,
}));

// Compression middleware
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes only
app.use("/api/", limiter);

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

// Session configuration with PostgreSQL store
const PgSession = ConnectPgSimple(session);

const sessionStore = new PgSession({
  pool,
  tableName: "user_sessions",
  createTableIfMissing: true,
  errorLog: (err) => {
    console.error('Session store error (non-fatal):', err.message);
  },
});

// Handle session store errors gracefully
sessionStore.on('error', (err) => {
  console.error('Session store connection error (non-fatal):', err.message);
});

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
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

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
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
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
})();