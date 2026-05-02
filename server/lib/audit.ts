import { db } from "../db";
import { auditLogs } from "@shared/schema";
import type { Request } from "express";

interface AuditLogEntry {
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValue: any;
  newValue: any;
  ipAddress: string | null;
  userAgent: string | null;
}

const auditQueue: AuditLogEntry[] = [];
let isProcessing = false;

async function processQueue() {
  if (isProcessing || auditQueue.length === 0) return;
  isProcessing = true;

  while (auditQueue.length > 0) {
    const entry = auditQueue.shift();
    if (!entry) continue;

    try {
      await db.insert(auditLogs).values(entry);
    } catch (error) {
      console.error("Failed to record audit log from queue:", error);
      // Optional: re-queue or push to a failure log
    }
  }

  isProcessing = false;
}

/**
 * Records an audit log entry.
 * This is non-blocking and processes in the background to avoid DB latency.
 */
export function recordAuditLog(req: Request | null, details: {
  action: string;
  entityType: string;
  entityId?: string | number | null;
  oldValue?: any;
  newValue?: any;
  userId?: string;
}) {
  const entry: AuditLogEntry = {
    userId: details.userId || (req as any)?.session?.userId || null,
    action: details.action,
    entityType: details.entityType,
    entityId: details.entityId ? String(details.entityId) : null,
    oldValue: details.oldValue,
    newValue: details.newValue,
    ipAddress: (req?.ip || "").slice(0, 45),
    userAgent: req?.get?.("user-agent") || null,
  };

  auditQueue.push(entry);
  
  // Trigger background processing
  processQueue().catch(err => console.error("Critical: processQueue failed", err));
}
