import "express-session";
import { users } from "@shared/schema";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    username?: string;
    previewedQuestionIds?: number[];
    hasReceivedAnonymousPreview?: boolean;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        isAdmin: boolean;
      };
    }
  }
}

export {};
