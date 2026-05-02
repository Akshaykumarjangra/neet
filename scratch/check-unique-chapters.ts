import { db } from "../server/db";
import { contentTopics } from "../shared/schema";
import { sql } from "drizzle-orm";

async function check() {
  const result = await db.select({
    subject: contentTopics.subject,
    classLevel: contentTopics.classLevel,
    ncertChapter: contentTopics.ncertChapter,
  })
  .from(contentTopics)
  .groupBy(contentTopics.subject, contentTopics.classLevel, contentTopics.ncertChapter);
  
  console.log(`Unique Chapters in contentTopics: ${result.length}`);
  console.log(JSON.stringify(result.slice(0, 10), null, 2));
  process.exit(0);
}
check();
