import "express-session";
import { User as DBUser } from "@shared/schema";

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
    interface User extends DBUser {}
    interface Request {
      isOwner?: boolean;
    }
  }
}

export {};
