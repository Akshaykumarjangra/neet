import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  try {
    const res = await pool.query(`DELETE FROM content_assets WHERE metadata->>'source' = 'video-agent'`);
    console.log(`Deleted ${res.rowCount} mock assets from content_assets.`);

    await pool.query(`
      UPDATE chapter_content
      SET video_links = (
        SELECT COALESCE(jsonb_agg(elem), '[]'::jsonb)
        FROM jsonb_array_elements(video_links) elem
        WHERE elem->>'source' != 'video-agent'
      )
      WHERE video_links @> '[{"source": "video-agent"}]';
    `);
    console.log(`Cleaned up video_links in chapter_content.`);

    await pool.query(`DROP TABLE IF EXISTS video_agent_runs`);
    console.log(`Dropped video_agent_runs table.`);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
