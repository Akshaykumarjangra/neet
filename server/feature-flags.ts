// @ts-nocheck
import { db } from "./db";
import { adminSettings } from "@shared/schema";
import { eq } from "drizzle-orm";

const CACHE_TTL_MS = 60 * 1000;
let cachedFlags: Record<string, boolean> | null = null;
let cachedAt = 0;

function getEnvFlag(key: string) {
  const envKey = `FEATURE_${key.toUpperCase()}`;
  const value = process.env[envKey];
  if (value == null) return null;
  return value === "true" || value === "1" || value === "yes";
}

export async function isFeatureEnabled(key: string) {
  const envValue = getEnvFlag(key);
  if (envValue !== null) {
    return envValue;
  }

  const now = Date.now();
  if (cachedFlags && now - cachedAt < CACHE_TTL_MS) {
    return !!cachedFlags[key];
  }

  const [setting] = await db
    .select()
    .from(adminSettings)
    .where(eq(adminSettings.key, "feature_flags"))
    .limit(1);

  cachedFlags = (setting?.value as Record<string, boolean>) || {};
  cachedAt = now;
  return !!cachedFlags[key];
}
