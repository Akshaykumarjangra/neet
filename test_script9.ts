import { db } from "./server/db.ts";
import { userPerformance, questions, contentTopics } from "./shared/schema.ts";
import { eq, sql } from "drizzle-orm";
import { DbStorage } from "./server/storage.ts";

async function run() {

  // Create mock data
  const user = await db.insert(require("./shared/schema.ts").users).values({ username: "test_perf", name: "Test Perf", id: "user_test_perf", email: "testperf@example.com", isGuest: false }).returning();

  const userId = user[0].id;

  const topic1 = await db.insert(contentTopics).values({ topicName: "Topic 1", subject: "Physics", chapterId: 1 }).returning();
  const topic2 = await db.insert(contentTopics).values({ topicName: "Topic 2", subject: "Chemistry", chapterId: 1 }).returning();

  const q1 = await db.insert(questions).values({ topicId: topic1[0].id, questionText: "q1", difficultyLevel: 1, options: ["a", "b", "c", "d"], correctOption: "a", explanation: "ex" }).returning();
  const q2 = await db.insert(questions).values({ topicId: topic2[0].id, questionText: "q2", difficultyLevel: 1, options: ["a", "b", "c", "d"], correctOption: "a", explanation: "ex" }).returning();

  for(let i=0; i<100; i++) {
    await db.insert(userPerformance).values({ userId, questionId: q1[0].id, isCorrect: i%2===0, attemptDate: new Date(), timeTakenSec: 10, xpEarned: 10 });
    await db.insert(userPerformance).values({ userId, questionId: q2[0].id, isCorrect: i%3===0, attemptDate: new Date(), timeTakenSec: 10, xpEarned: 10 });
  }

  const tsStart = Date.now();

  const storage = new DbStorage();
  await storage.getUserStats(userId);

  const end = Date.now();
  console.log(`Time took ${end - tsStart}ms`);
}
run();
