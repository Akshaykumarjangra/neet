import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

async function finalCleanup() {
  try {
    const titles = ['Ecosystem', 'Coordination Compounds', 'Transport in Plants'];
    for (const title of titles) {
      const res = await pool.query(`
        SELECT id, 
               (SELECT count(*) FROM user_chapter_sessions WHERE chapter_content_id = c.id) as sessions,
               (SELECT count(*) FROM content_assets WHERE chapter_content_id = c.id) as assets
        FROM chapter_content c
        WHERE chapter_title = $1
      `, [title]);
      
      if (res.rows.length > 1) {
        console.log(`Duplicates for ${title}:`, res.rows);
        // Keep the one with more sessions/assets
        const sorted = res.rows.sort((a, b) => (Number(b.sessions) + Number(b.assets)) - (Number(a.sessions) + Number(a.assets)));
        const keepId = sorted[0].id;
        const deleteIds = sorted.slice(1).map(r => r.id);
        
        console.log(`Keeping ID ${keepId}, deleting IDs ${deleteIds}`);
        // We can't delete if they have data, so we re-link data
        for (const delId of deleteIds) {
          await pool.query("UPDATE user_chapter_sessions SET chapter_content_id = $1 WHERE chapter_content_id = $2", [keepId, delId]);
          await pool.query("UPDATE content_assets SET chapter_content_id = $1 WHERE chapter_content_id = $2", [keepId, delId]);
          await pool.query("DELETE FROM chapter_content WHERE id = $1", [delId]);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
finalCleanup();
