import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function findDuplicates() {
  try {
    const result = await pool.query(`
      SELECT subject, class_level, chapter_title, count(*)
      FROM chapter_content
      GROUP BY subject, class_level, chapter_title
      HAVING count(*) > 1
    `);
    console.log("Duplicates:", result.rows);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
findDuplicates();
