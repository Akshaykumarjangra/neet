import { db } from "./server/db.ts";
import { userPerformance, questions, contentTopics } from "./shared/schema.ts";
import { eq, sql } from "drizzle-orm";
import { DbStorage } from "./server/storage.ts";

async function run() {
  const tsStart = Date.now();

  const storage = new DbStorage();
  await storage.getUserStats("123");

  const end = Date.now();
  console.log(`Time took ${end - tsStart}ms`);
}
run();
