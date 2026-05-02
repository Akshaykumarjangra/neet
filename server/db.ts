import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Optimized connection pool configuration for Coolify/Docker
const isProduction = process.env.NODE_ENV === 'production';
const dbHost = new URL(process.env.DATABASE_URL).hostname;

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,

  // Connection pool sizing (optimized for high concurrency)
  max: parseInt(process.env.DB_POOL_MAX || (isProduction ? '30' : '10')), 
  min: parseInt(process.env.DB_POOL_MIN || '2'),

  // Timeout configurations (loosened for internal networking reliability)
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000, // 15s wait for internal network hops
  query_timeout: 90000,           // 90s for complex analytical reads
  statement_timeout: 90000,

  // Keep-alive for long-running connections (Prevents Docker from killing idle sockets)
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,

  allowExitOnIdle: !isProduction,
};

console.log(`[Database] Initializing pool for host: ${dbHost}`);

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

export const db = drizzle(pool, { schema });

// Test connection on startup with retry and backoff
let retries = 5;
const testConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
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
      console.error('FATAL: Database connection failed after all retries. Shutting down.');
      process.exit(1);
    }
  }
};

testConnection();
