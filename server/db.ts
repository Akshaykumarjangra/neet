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
      console.error('FATAL: Database connection failed after all retries. Continuing anyway for debug.');
      // process.exit(1);
    }
  }
};

testConnection();
