import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function fix() {
  try {
    console.log("Adding is_free column to chapter_content...");
    await pool.query("ALTER TABLE chapter_content ADD COLUMN IF NOT EXISTS is_free boolean NOT NULL DEFAULT false");
    console.log("Column added successfully.");
  } catch (err) {
    console.error("Failed to add column:", err);
  } finally {
    await pool.end();
  }
}

fix();
