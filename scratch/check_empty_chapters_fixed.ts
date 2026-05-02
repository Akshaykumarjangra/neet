import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function checkEmptyChapters() {
  try {
    const result = await pool.query(`
      SELECT c.id, c.subject, c.class_level, 
             (SELECT count(*) FROM content_assets WHERE chapter_content_id = c.id) as asset_count,
             (SELECT count(*) FROM user_chapter_sessions WHERE chapter_content_id = c.id) as session_count
      FROM chapter_content c
      WHERE c.chapter_title = '';
    `);
    console.log("Empty chapters data:", result.rows);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
checkEmptyChapters();
