// Centralized rate limiters for sensitive endpoints.
//
// Buckets:
//   - authLimiter           : 5  / 15 min  per IP   (login, signup, forgot-password)
//   - passwordResetLimiter  : 3  / 1 hour  per IP   (password reset confirm)
//   - paymentLimiter        : 10 / 1 hour  per user (billing checkout)
//   - adminBulkLimiter      : 20 / 1 hour  per user (bulk admin ops)
//   - apiLimiter            : 100/ 1 min   per IP   (global fallback)
//
// All limiters use RFC `RateLimit-*` headers (standardHeaders: true) and
// return a structured JSON error body so the client can show a useful UI.
//
// NOTE: `express-slow-down` is recommended for additional brute-force
// protection on /login. It is NOT yet a dependency of this project — add to
// package.json with:  npm i express-slow-down
// then enable the optional `loginSlowDown` export below.

import type { Request, Response } from "express";
import { rateLimit, ipKeyGenerator, type Options } from "express-rate-limit";

type SessionWithUser = { userId?: string } | undefined;

function getSessionUserId(req: Request): string | undefined {
  return (req as any).session?.userId as string | undefined;
}

/**
 * Key by authenticated user id when available, else fall back to IP.
 * `ipKeyGenerator` is required for IPv6-safe behavior with v7+.
 */
function userOrIpKey(req: Request, res: Response): string {
  const userId = getSessionUserId(req);
  if (userId) return `user:${userId}`;
  return `ip:${ipKeyGenerator(req, res)}`;
}

function jsonHandler(message: string) {
  return (req: Request, res: Response /* next, options */) => {
    res.status(429).json({
      error: "rate_limited",
      message,
      retryAfterSeconds: Number(res.getHeader("Retry-After")) || undefined,
    });
  };
}

const baseOpts: Partial<Options> = {
  standardHeaders: true,
  legacyHeaders: false,
};

// 5 requests / 15 min / IP — credential endpoints
export const authLimiter = rateLimit({
  ...baseOpts,
  windowMs: 15 * 60 * 1000,
  limit: 5,
  // Auth endpoints are pre-login, so always key by IP.
  keyGenerator: (req, res) => `ip:${ipKeyGenerator(req, res)}`,
  handler: jsonHandler(
    "Too many authentication attempts from this IP. Please wait 15 minutes and try again."
  ),
});

// 3 requests / hour / IP — password reset (very narrow)
export const passwordResetLimiter = rateLimit({
  ...baseOpts,
  windowMs: 60 * 60 * 1000,
  limit: 3,
  keyGenerator: (req, res) => `ip:${ipKeyGenerator(req, res)}`,
  handler: jsonHandler(
    "Too many password reset requests. Please wait an hour before trying again."
  ),
});

// 10 requests / hour / authenticated user — payment / checkout
export const paymentLimiter = rateLimit({
  ...baseOpts,
  windowMs: 60 * 60 * 1000,
  limit: 10,
  keyGenerator: userOrIpKey,
  handler: jsonHandler(
    "Too many payment attempts in the last hour. Please wait before trying again, or contact support if you need help."
  ),
});

// 20 requests / hour / authenticated user — heavy admin bulk ops
export const adminBulkLimiter = rateLimit({
  ...baseOpts,
  windowMs: 60 * 60 * 1000,
  limit: 20,
  keyGenerator: userOrIpKey,
  handler: jsonHandler(
    "Bulk admin operation rate limit exceeded (20/hour). Please wait before retrying."
  ),
});

// 100 requests / minute / IP — global fallback
export const apiLimiter = rateLimit({
  ...baseOpts,
  windowMs: 60 * 1000,
  limit: 100,
  keyGenerator: (req, res) => `ip:${ipKeyGenerator(req, res)}`,
  handler: jsonHandler(
    "Too many requests from this IP. Please slow down and try again shortly."
  ),
});

/**
 * Optional progressive slow-down for /login. Disabled by default because
 * `express-slow-down` is not yet installed. To enable:
 *   1. npm i express-slow-down
 *   2. Uncomment the block below and import in auth-routes.ts.
 */
// import slowDown from "express-slow-down";
// export const loginSlowDown = slowDown({
//   windowMs: 15 * 60 * 1000,
//   delayAfter: 2,           // first 2 requests are full speed
//   delayMs: (hits) => (hits - 2) * 500, // each subsequent +500ms
//   maxDelayMs: 10_000,
// });
