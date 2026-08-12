import { db } from './server/db.js';
import { sql } from 'drizzle-orm';
import { questions } from './shared/schema.js';

async function run() {
  const result = await db.select({
      easy: sql<number>`SUM(CASE WHEN ${questions.difficultyLevel} = 1 THEN 1 ELSE 0 END)`.mapWith(Number),
      medium: sql<number>`SUM(CASE WHEN ${questions.difficultyLevel} = 2 THEN 1 ELSE 0 END)`.mapWith(Number),
      hard: sql<number>`SUM(CASE WHEN ${questions.difficultyLevel} = 3 THEN 1 ELSE 0 END)`.mapWith(Number),
  }).from(questions);
  console.log(result);
}

run().catch(console.error).finally(() => process.exit());
