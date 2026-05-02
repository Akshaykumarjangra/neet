const pg = require('pg');

const DATABASE_URL = "postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres";
const EMAIL = "akg45272@gmail.com";

async function test() {
  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000,
  });

  console.log("Connecting to DB...");
  try {
    const res = await pool.query("SELECT email, password_hash, role, is_owner, is_admin FROM users WHERE email = $1", [EMAIL]);
    if (res.rows.length > 0) {
      console.log("User details in DB:");
      const user = res.rows[0];
      console.log(`Email: ${user.email}`);
      console.log(`Hash: ${user.password_hash ? user.password_hash.substring(0, 10) + '...' : 'NULL'}`);
      console.log(`Role: ${user.role}`);
      console.log(`Is Owner: ${user.is_owner}`);
      console.log(`Is Admin: ${user.is_admin}`);
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
