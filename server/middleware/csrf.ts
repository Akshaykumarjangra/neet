import type { Request, Response, NextFunction, RequestHandler } from "express";
import crypto from "crypto";

/**
 * Synchronizer-token CSRF protection.
 *
 * - On each request, ensures `req.session.csrfToken` is set (generated lazily).
 * - For state-changing methods (POST/PUT/PATCH/DELETE), requires the request
 *   to send the same token via the `x-csrf-token` header (or `_csrf` body field).
 * - GET/HEAD/OPTIONS are not validated.
 * - Specific path prefixes (e.g. webhooks) can be exempted via `ignorePaths`.
 *
 * The token is bound to the user's session, so leaking the token to another
 * user is not useful — sessions are httpOnly cookies and same-site=lax.
 */

declare module "express-session" {
  interface SessionData {
    csrfToken?: string;
  }
}

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function timingSafeEqualStr(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export interface CsrfOptions {
  /** Path prefixes (e.g. "/api/billing/webhook") that bypass CSRF entirely. */
  ignorePaths?: string[];
}

export function csrfProtection(options: CsrfOptions = {}): RequestHandler {
  const ignorePaths = options.ignorePaths ?? [];

  return function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
    // Skip exempted paths (e.g. signature-verified webhooks).
    for (const prefix of ignorePaths) {
      if (req.path.startsWith(prefix)) return next();
    }

    if (!req.session) {
      // No session => nothing to protect. Should not happen given mounting order.
      return next();
    }

    // Ensure a token exists for this session.
    if (!req.session.csrfToken) {
      req.session.csrfToken = generateToken();
    }

    // Safe methods don't require validation.
    if (SAFE_METHODS.has(req.method)) {
      return next();
    }

    const sentToken =
      (req.headers["x-csrf-token"] as string | undefined) ||
      (req.body && typeof req.body === "object" ? (req.body as any)._csrf : undefined);

    if (!sentToken || typeof sentToken !== "string") {
      return res.status(403).json({ error: "CSRF token missing" });
    }

    if (!timingSafeEqualStr(sentToken, req.session.csrfToken)) {
      return res.status(403).json({ error: "CSRF token invalid" });
    }

    return next();
  };
}

/**
 * Endpoint handler returning the current session's CSRF token.
 * Mount as `app.get("/api/csrf-token", csrfTokenHandler)`.
 */
export function csrfTokenHandler(req: Request, res: Response) {
  if (!req.session) {
    return res.status(500).json({ error: "Session not initialized" });
  }
  if (!req.session.csrfToken) {
    req.session.csrfToken = generateToken();
  }
  res.json({ csrfToken: req.session.csrfToken });
}
