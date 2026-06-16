import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

const databaseUrl = process.env.PROD_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL or PROD_DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Optimized connection pool configuration for Coolify/Docker
const isProduction = process.env.NODE_ENV === 'production';
const dbHost = new URL(databaseUrl).hostname;

const poolConfig = {
  connectionString: databaseUrl,
  ssl: process.env.DATABASE_SSL === 'true' || (isProduction && process.env.DATABASE_SSL !== 'false') ? { rejectUnauthorized: false } : false,

  // Connection pool sizing (optimized for high concurrency)
  max: parseInt(process.env.DB_POOL_MAX || (isProduction ? '30' : '10')), 
  min: parseInt(process.env.DB_POOL_MIN || '2'),

  // Timeout configurations (loosened for internal networking reliability)
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  query_timeout: 30000,
  statement_timeout: 30000,

  // Keep-alive for long-running connections (Prevents Docker from killing idle sockets)
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,

  allowExitOnIdle: !isProduction,
};
export const pool = new Pool(poolConfig);

// Handle pool errors gracefully
pool.on('error', (err, client) => {
  console.error('Unexpected database pool error:', err);
  // Don't crash on connection errors
});

pool.on('connect', () => {
  console.log('New database connection established');
});

pool.on('remove', () => {
  console.log('Database connection removed from pool');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const db = drizzle(pool, { schema });

// Helper for retrying queries
export async function queryWithRetry<T>(queryFn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await queryFn();
    } catch (err: any) {
      lastError = err;
      console.error(`Query failed (attempt ${i + 1}/${maxRetries}):`, err.message);
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  throw lastError;
}

// Test connection on startup with retry and backoff
let retries = 5;
const testConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    
    // Auto-migrate user_chats table
    console.log('🔄 Verifying user_chats table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_chats (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR REFERENCES users(id) NOT NULL,
        chapter_id INTEGER REFERENCES chapter_content(id) NOT NULL,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_chats_user_id ON user_chats(user_id);
    `);
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_chats_chapter_id ON user_chats(chapter_id);
    `);
    console.log('✓ user_chats table verified');

    // Auto-migrate chapter_content_versions, chat_threads, chat_messages
    console.log('🔄 Verifying chat and version tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS chapter_content_versions (
        id SERIAL PRIMARY KEY,
        chapter_content_id INTEGER REFERENCES chapter_content(id) ON DELETE CASCADE,
        mentor_id INTEGER REFERENCES mentors(id) ON DELETE CASCADE,
        detailed_notes TEXT,
        key_concepts JSONB,
        formulas JSONB,
        status VARCHAR(20) DEFAULT 'pending' NOT NULL,
        review_notes TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        reviewed_at TIMESTAMP
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_threads (
        id SERIAL PRIMARY KEY,
        subject VARCHAR(200) NOT NULL,
        student_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        mentor_id INTEGER REFERENCES mentors(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        is_resolved BOOLEAN DEFAULT FALSE NOT NULL,
        last_message_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        thread_id INTEGER REFERENCES chat_threads(id) ON DELETE CASCADE,
        sender_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        is_flagged BOOLEAN DEFAULT FALSE NOT NULL
      );
    `);
    console.log('✓ chat and version tables verified');

    // Auto-migrate additional tables used in raw SQL
    console.log('🔄 Verifying additional raw SQL tables...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS squads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(20) UNIQUE NOT NULL,
        weekly_goal_minutes INTEGER DEFAULT 600,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS squad_members (
        squad_id INTEGER REFERENCES squads(id) ON DELETE CASCADE,
        user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        joined_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY(squad_id, user_id)
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS scholarship_attempts (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR REFERENCES users(id) ON DELETE CASCADE,
        score INTEGER NOT NULL,
        percentile FLOAT NOT NULL,
        coupon_code VARCHAR(50),
        attempted_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_pct INTEGER NOT NULL,
        valid_until TIMESTAMP,
        user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
        source VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✓ additional tables verified');

    client.release();
    console.log('✓ Connected to Coolify PostgreSQL database');
  } catch (err: any) {
    console.error('✗ Failed to connect to database:', err.message);
    if (retries > 0) {
      retries--;
      const delay = (6 - retries) * 2000; // Exponential backoff
      console.log(`Retrying connection in ${delay}ms... (${retries} attempts remaining)`);
      setTimeout(testConnection, delay);
    } else {
      console.error('FATAL: Database connection failed after all retries.');
      process.exit(1);
    }
  }
};

testConnection();
