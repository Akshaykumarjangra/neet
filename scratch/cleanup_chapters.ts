import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function cleanup() {
  try {
    // 1. Delete empty title chapters
    const delEmpty = await pool.query("DELETE FROM chapter_content WHERE chapter_title = '' OR chapter_title IS NULL");
    console.log(`Deleted ${delEmpty.rowCount} empty chapters`);

    // 2. Deduplicate by title
    const delDupes = await pool.query(`
      DELETE FROM chapter_content
      WHERE id NOT IN (
          SELECT MAX(id)
          FROM chapter_content
          GROUP BY subject, class_level, chapter_title
      )
    `);
    console.log(`Deleted ${delDupes.rowCount} duplicate chapters`);

    // 3. Optional: Add unique constraint on title if not exists
    // (Subject, ClassLevel, ChapterTitle) should be unique
    try {
      await pool.query("ALTER TABLE chapter_content ADD CONSTRAINT unique_chapter_title UNIQUE (subject, class_level, chapter_title)");
      console.log("Added unique constraint on chapter title");
    } catch (e: any) {
      console.log("Constraint already exists or failed to add:", e.message);
    }
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
cleanup();
