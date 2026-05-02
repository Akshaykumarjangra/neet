import { db } from "./server/db";
import { chapterContent, contentTopics } from "./shared/schema";
import { sql } from "drizzle-orm";

async function count() {
  try {
    const chapters = await db.select({ count: sql`count(*)` }).from(chapterContent);
    const topics = await db.select({ count: sql`count(*)` }).from(contentTopics);
    console.log(`Chapters: ${chapters[0].count}`);
    console.log(`Topics: ${topics[0].count}`);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}

count();
