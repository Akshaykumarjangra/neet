const pg = require('pg');

const DATABASE_URL = "postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres";

async function test() {
  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000,
  });

  console.log("Connecting to DB...");
  try {
    const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'");
    console.log("Columns in 'users' table:");
    res.rows.forEach(row => console.log(` - ${row.column_name}`));
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

test();
