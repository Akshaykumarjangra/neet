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

    // 2. Deduplicate safe chapters (no related data)
    const delDupes = await pool.query(`
      DELETE FROM chapter_content
      WHERE id IN (
          SELECT id FROM chapter_content
          EXCEPT
          SELECT MAX(id) FROM chapter_content GROUP BY subject, class_level, chapter_title
      )
      AND id NOT IN (SELECT chapter_content_id FROM user_chapter_sessions)
      AND id NOT IN (SELECT chapter_content_id FROM content_assets)
      AND id NOT IN (SELECT chapter_content_id FROM content_versions)
    `);
    console.log(`Deleted ${delDupes.rowCount} safe duplicate chapters`);

    // 3. Find remaining duplicates
    const remaining = await pool.query(`
      SELECT subject, class_level, chapter_title, count(*)
      FROM chapter_content
      GROUP BY subject, class_level, chapter_title
      HAVING count(*) > 1
    `);
    if (remaining.rowCount > 0) {
      console.log("Remaining duplicates with data (manual cleanup required):", remaining.rows);
    }

  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
cleanup();
