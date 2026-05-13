import jwt from "jsonwebtoken";

export const PARENT_LINK_TYPE = "parent-link" as const;
export const PARENT_LINK_EXPIRY = "90d";

export function getParentLinkSecret(): string {
  const secret = process.env.PARENT_LINK_SECRET || process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("PARENT_LINK_SECRET or SESSION_SECRET must be set");
  }
  return secret;
}

export interface ParentLinkPayload {
  studentId: string;
  type: typeof PARENT_LINK_TYPE;
}

export function generateParentLinkToken(studentId: string): string {
  const payload: ParentLinkPayload = {
    studentId,
    type: PARENT_LINK_TYPE,
  };
  return jwt.sign(payload, getParentLinkSecret(), {
    expiresIn: PARENT_LINK_EXPIRY,
  });
}
