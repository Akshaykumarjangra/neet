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
      SELECT c.id, c.subject, c.class_level, count(a.id) as asset_count, count(p.id) as progress_count
      FROM chapter_content c
      LEFT JOIN content_assets a ON a.chapter_content_id = c.id
      LEFT JOIN user_chapter_progress p ON p.chapter_id = c.id
      WHERE c.chapter_title = ''
      GROUP BY c.id, c.subject, c.class_level;
    `);
    console.log("Empty chapters data:", result.rows);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
checkEmptyChapters();
