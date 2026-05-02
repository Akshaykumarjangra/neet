const pg = require('pg');

const DATABASE_URL = "postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres";

async function test() {
  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000,
  });

  console.log("Connecting to DB...");
  try {
    const res = await pool.query("SELECT email, role, is_owner FROM users WHERE email = 'akg45272@gmail.com'");
    if (res.rows.length > 0) {
      console.log("User found:");
      console.log(res.rows[0]);
    } else {
      console.log("User NOT found.");
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

test();
