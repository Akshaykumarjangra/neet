const pg = require('pg');
const bcrypt = require('bcrypt');

const DATABASE_URL = "postgresql://postgres:iAoFPHbWmD0NRYph0SV25TcNYJz3IVPMrF7CHMiXgmOZ2E3DBrrfa3GpY1P4c6dc@82.25.104.62:8001/postgres";
const EMAIL = "akg45272@gmail.com";
const NEW_PASSWORD = "akg45272@gmail.com";

async function test() {
  const pool = new pg.Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000,
  });

  console.log("Connecting to DB...");
  try {
    const passwordHash = await bcrypt.hash(NEW_PASSWORD, 10);
    console.log(`Generated hash for ${EMAIL}`);
    
    const res = await pool.query(
      "UPDATE users SET password_hash = $1, role = 'admin', is_admin = true, is_owner = true WHERE email = $2",
      [passwordHash, EMAIL]
    );
    
    if (res.rowCount > 0) {
      console.log(`Successfully updated password and admin status for ${EMAIL}`);
    } else {
      console.log(`User ${EMAIL} not found. Creating it...`);
      await pool.query(
        "INSERT INTO users (email, password_hash, name, role, is_admin, is_owner, is_paid_user, is_disabled, must_change_password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [EMAIL, passwordHash, "Super Admin", "admin", true, true, true, false, false]
      );
      console.log(`Successfully created user ${EMAIL}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await pool.end();
  }
}

test();
