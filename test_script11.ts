import { db } from "./server/db.ts";
import { users, userPerformance, questions, contentTopics } from "./shared/schema.ts";
import { eq, sql } from "drizzle-orm";
import { DbStorage } from "./server/storage.ts";

async function run() {

  // Create mock data
  const user = await db.insert(users).values({ username: "test_perf_" + Date.now(), name: "Test Perf", id: "user_test_perf_" + Date.now(), email: "testperf" + Date.now() + "@example.com", isGuest: false }).returning();

  const userId = user[0].id;

  const topic1 = await db.insert(contentTopics).values({ topicName: "Topic 1", subject: "Physics", chapterId: 1 }).returning();
  const topic2 = await db.insert(contentTopics).values({ topicName: "Topic 2", subject: "Chemistry", chapterId: 1 }).returning();

  const q1 = await db.insert(questions).values({ topicId: topic1[0].id, questionText: "q1", difficultyLevel: 1, options: ["a", "b", "c", "d"], correctOption: "a", explanation: "ex" }).returning();
  const q2 = await db.insert(questions).values({ topicId: topic2[0].id, questionText: "q2", difficultyLevel: 1, options: ["a", "b", "c", "d"], correctOption: "a", explanation: "ex" }).returning();

  for(let i=0; i<100; i++) {
    await db.insert(userPerformance).values({ userId, questionId: q1[0].id, isCorrect: i%2===0, attemptDate: new Date(), timeTakenSec: 10, xpEarned: 10 });
    await db.insert(userPerformance).values({ userId, questionId: q2[0].id, isCorrect: i%3===0, attemptDate: new Date(), timeTakenSec: 10, xpEarned: 10 });
  }

  const storage = new DbStorage();

  const tsStart = Date.now();
  await storage.getUserStats(userId);
  const end = Date.now();
  console.log(`Original Time took ${end - tsStart}ms`);

  const tsStart2 = Date.now();
  const dbAttempts = await db.select()
      .from(userPerformance)
      .where(eq(userPerformance.userId, userId));
  const totalAttempts = dbAttempts.length;
  const correctAnswers = dbAttempts.filter((a) => a.isCorrect).length;
  const accuracy = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;

  const subjectStatsRows = await db.select({
      subject: contentTopics.subject,
      correct: sql<number>`SUM(CASE WHEN ${userPerformance.isCorrect} THEN 1 ELSE 0 END)`,
      total: sql<number>`COUNT(*)`
    })
    .from(userPerformance)
    .innerJoin(questions, eq(userPerformance.questionId, questions.id))
    .innerJoin(contentTopics, eq(questions.topicId, contentTopics.id))
    .where(eq(userPerformance.userId, userId))
    .groupBy(contentTopics.subject);

  const subjectStats = subjectStatsRows.map(row => ({
      subject: row.subject,
      accuracy: (Number(row.correct) / Number(row.total)) * 100,
      correct: Number(row.correct),
      total: Number(row.total),
    }));

  const end2 = Date.now();
  console.log(`Optimized Time took ${end2 - tsStart2}ms`);

  console.log("Subject stats:", subjectStats);

}
run();
