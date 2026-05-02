import { db } from "../server/db.ts";
import { sql } from "drizzle-orm";

async function findDuplicates() {
  try {
    const result = await db.execute(sql`
      SELECT subject, class_level, chapter_title, count(*)
      FROM chapter_content
      GROUP BY subject, class_level, chapter_title
      HAVING count(*) > 1
    `);
    console.log("Duplicates by title:", result.rows);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
findDuplicates();
