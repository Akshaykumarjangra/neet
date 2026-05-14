import { Request, Response, NextFunction } from "express";

export const MAX_IMPERSONATION_MS = 60 * 60 * 1000; // 1 hour

// Middleware: enforce 1-hour cap on any impersonation session. Mounted
// globally so any request made under impersonation is rejected once the
// cap is exceeded; the client is then forced to call /impersonate/stop.
export function enforceImpersonationTimeLimit(req: Request, res: Response, next: NextFunction) {
    if (req.session?.originalAdminId && req.session.impersonationStartedAt) {
        const elapsed = Date.now() - req.session.impersonationStartedAt;
        if (elapsed > MAX_IMPERSONATION_MS) {
            return res.status(440).json({
                error: "Impersonation session expired (1 hour max). Please call /impersonate/stop.",
                code: "IMPERSONATION_EXPIRED",
            });
        }
    }
    next();
}
