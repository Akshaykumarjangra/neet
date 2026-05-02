import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function check() {
  const chapters = await db.execute(sql`SELECT count(*) FROM chapter_content WHERE status = 'published'`);
  console.log("Published Chapters:", chapters.rows[0]);
  process.exit(0);
}
check();
