import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function migrate() {
  try {
    const sqlPath = path.resolve('migrations/0099_phases_1_to_7.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log(`Running migration: ${sqlPath}`);
    await pool.query(sql);
    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await pool.end();
  }
}

migrate();
