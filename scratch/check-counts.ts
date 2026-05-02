import { db } from "../server/db";
import { chapterContent, contentTopics } from "../shared/schema";
import { sql } from "drizzle-orm";

async function check() {
  const [chapters] = await db.select({ count: sql<number>`count(*)` }).from(chapterContent);
  const [topics] = await db.select({ count: sql<number>`count(*)` }).from(contentTopics);
  console.log(`Chapters: ${chapters.count}`);
  console.log(`Topics: ${topics.count}`);
  process.exit(0);
}
check();
