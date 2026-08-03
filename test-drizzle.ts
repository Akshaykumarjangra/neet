import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
const { Pool } = pkg;
import { userFlashcardProgress } from './shared/schema.js';
import { eq, sql } from 'drizzle-orm';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool);
  const userId = '1';
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [statsResult] = await db
    .select({
      dueToday: sql<number>`SUM(CASE WHEN ${userFlashcardProgress.nextReview} <= ${now} THEN 1 ELSE 0 END)`.mapWith(Number),
      learned: sql<number>`SUM(CASE WHEN ${userFlashcardProgress.interval} > 21 THEN 1 ELSE 0 END)`.mapWith(Number),
      reviewedToday: sql<number>`SUM(CASE WHEN ${userFlashcardProgress.lastReviewed} >= ${startOfToday} THEN 1 ELSE 0 END)`.mapWith(Number),
      total: sql<number>`count(*)`.mapWith(Number)
    })
    .from(userFlashcardProgress)
    .where(eq(userFlashcardProgress.userId, userId));

  console.log(statsResult);
  await pool.end();
}

test().catch(console.error);
