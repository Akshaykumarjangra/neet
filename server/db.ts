import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Optimized connection pool configuration
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,

  // Connection pool sizing (optimized for production)
  max: parseInt(process.env.DB_POOL_MAX || '20'), // Max connections
  min: parseInt(process.env.DB_POOL_MIN || '2'),  // Min connections

  // Timeout configurations
  idleTimeoutMillis: 30000,        // Close idle connections after 30s
  connectionTimeoutMillis: 10000,  // Connection timeout 10s
  query_timeout: 30000,            // Query timeout 30s
  statement_timeout: 30000,        // Statement timeout 30s

  // Keep-alive for long-running connections
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,

  // Allow pool to exit when idle (useful for serverless)
  allowExitOnIdle: process.env.NODE_ENV !== 'production',
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
      console.error('⚠️  Database connection failed after all retries. Server will continue but database operations may fail.');
    }
  }
};

testConnection();
