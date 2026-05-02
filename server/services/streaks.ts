/**
 * Streaks 2.0 — uses canonical users.study_streak / streak_freezes / last_active_date.
 */
import { db } from "../db";
import { sql } from "drizzle-orm";

const ONE_DAY = 24 * 60 * 60 * 1000;

export interface StreakState {
  streak: number;
  freezes: number;
  brokenAt?: string;
  recoverable: boolean;
}

export async function tickStreak(userId: string, isPlus = false): Promise<StreakState> {
  const r = await db.execute(sql`
    SELECT study_streak AS streak, streak_freezes AS freezes, last_active_date
    FROM users WHERE id = ${userId}
  `);
  const row = (r as any).rows?.[0]; if (!row) throw new Error("user not found");

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const last = row.last_active_date ? new Date(row.last_active_date) : null;
  if (last) last.setHours(0, 0, 0, 0);
  const dayDiff = last ? Math.round((+today - +last) / ONE_DAY) : 0;

  let { streak, freezes } = row;
  let brokenAt: string | undefined;
  let recoverable = false;

  if (!last || dayDiff === 0) {
    // already counted today
  } else if (dayDiff === 1) {
    streak += 1;
    if (streak % 7 === 0 && freezes < 3) freezes += 1;
  } else if (dayDiff === 2 && isPlus && last.getDay() === 5) {
    streak += 1;
  } else if (dayDiff === 2 && freezes > 0) {
    freezes -= 1; streak += 1;
  } else {
    brokenAt = new Date().toISOString();
    recoverable = dayDiff <= 4;
    streak = 1;
  }

  await db.execute(sql`
    UPDATE users
    SET study_streak = ${streak}, streak_freezes = ${freezes}, last_active_date = ${today.toISOString()}
    WHERE id = ${userId}
  `);
  return { streak, freezes, brokenAt, recoverable };
}

export async function recoverStreak(userId: string, prevStreak: number) {
  await db.execute(sql`UPDATE users SET study_streak = ${prevStreak} WHERE id = ${userId}`);
}
