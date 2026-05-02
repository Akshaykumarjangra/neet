const pg = require('pg');

const DATABASE_URL = "postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres";

async function test() {
  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000,
  });

  console.log("Connecting to DB...");
  try {
    const start = Date.now();
    const res = await pool.query('SELECT count(*) FROM questions');
    const end = Date.now();
    console.log(`Success! Count: ${res.rows[0].count} (Took ${end - start}ms)`);
  } catch (err) {
    console.error("Failed to connect or query:", err.message);
  } finally {
    await pool.end();
  }
}

test();
