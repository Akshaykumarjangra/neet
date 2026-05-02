import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function check() {
  const chapters = await db.execute(sql`SELECT count(*) FROM chapter_content`);
  const topics = await db.execute(sql`SELECT count(*) FROM content_topics`);
  console.log("Chapters:", chapters.rows[0]);
  console.log("Topics:", topics.rows[0]);
  process.exit(0);
}
check();
