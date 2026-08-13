import { db } from "./server/db.ts";
import { userPerformance, questions, contentTopics } from "./shared/schema.ts";
import { eq, sql } from "drizzle-orm";

async function run() {
  const tsStart = Date.now();

  const results = await db.select({
    subject: contentTopics.subject,
    correct: sql<number>`SUM(CASE WHEN ${userPerformance.isCorrect} THEN 1 ELSE 0 END)`,
    total: sql<number>`COUNT(*)`
  })
  .from(userPerformance)
  .innerJoin(questions, eq(userPerformance.questionId, questions.id))
  .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
  .where(eq(userPerformance.userId, "123"))
  .groupBy(contentTopics.subject);

  const end = Date.now();
  console.log(`Time took ${end - tsStart}ms`, results);
}
run();
