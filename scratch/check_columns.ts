import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const client = new pg.Client(process.env.DATABASE_URL);

async function check() {
  try {
    await client.connect();
    const res = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'chapter_content'");
    console.log(res.rows.map(r => r.column_name).sort().join(', '));
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

check();
