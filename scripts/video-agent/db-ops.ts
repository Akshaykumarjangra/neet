/**
 * Database operations for the Video Agent
 * Reads chapters, writes video assets, updates videoLinks
 */

import pg from "pg";
import { VIDEO_AGENT_CONFIG } from "./config";

const { Pool } = pg;

let pool: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({ connectionString: VIDEO_AGENT_CONFIG.databaseUrl });
  }
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

/** Minimal chapter shape needed by the video agent */
export interface ChapterRow {
  id: number;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
  introduction: string;
  keyConcepts: Array<{ title: string; description: string; formula?: string }>;
  importantTopics: string[];
  videoLinks: Array<{ title: string; url: string; duration?: string; source: string }>;
}

/**
 * Fetch all published chapters that do NOT yet have an AI-generated video
 */
export async function fetchChaptersWithoutVideos(): Promise<ChapterRow[]> {
  const db = getPool();

  const { rows } = await db.query<ChapterRow>(`
    SELECT
      c.id,
      c.subject,
      c.class_level   AS "classLevel",
      c.chapter_number AS "chapterNumber",
      c.chapter_title  AS "chapterTitle",
      c.introduction,
      c.key_concepts   AS "keyConcepts",
      c.important_topics AS "importantTopics",
      c.video_links    AS "videoLinks"
    FROM chapter_content c
    WHERE c.status = 'published'
      -- Skip chapters that already have an AI-generated video asset
      AND NOT EXISTS (
        SELECT 1 FROM content_assets ca
        WHERE ca.chapter_content_id = c.id
          AND ca.type = 'video'
          AND ca.metadata->>'source' = 'video-agent'
      )
    ORDER BY c.subject, c.class_level, c.chapter_number
  `);

  return rows.map(row => ({
    ...row,
    keyConcepts: typeof row.keyConcepts === 'string' ? JSON.parse(row.keyConcepts) : row.keyConcepts,
    importantTopics: typeof row.importantTopics === 'string' ? JSON.parse(row.importantTopics) : row.importantTopics,
    videoLinks: typeof row.videoLinks === 'string' ? JSON.parse(row.videoLinks) : row.videoLinks,
  }));
}

/**
 * Insert a new video asset into content_assets
 */
export async function insertVideoAsset(params: {
  chapterContentId: number;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  durationSeconds: number;
  tags: string[];
}): Promise<number> {
  const db = getPool();

  const { rows } = await db.query<{ id: number }>(
    `INSERT INTO content_assets
       (chapter_content_id, type, title, description, url, thumbnail_url,
        duration_seconds, is_public, metadata, created_at)
     VALUES ($1, 'video', $2, $3, $4, $5, $6, true,
             $7::jsonb, NOW())
     RETURNING id`,
    [
      params.chapterContentId,
      params.title,
      params.description,
      params.url,
      params.thumbnailUrl || null,
      params.durationSeconds,
      JSON.stringify({
        source: "video-agent",
        tags: params.tags,
        generatedAt: new Date().toISOString(),
      }),
    ]
  );

  return rows[0].id;
}

/**
 * Append a video link to the chapter's videoLinks JSONB array
 */
export async function appendVideoLink(
  chapterId: number,
  link: { title: string; url: string; duration?: string; source: string }
): Promise<void> {
  const db = getPool();

  await db.query(
    `UPDATE chapter_content
     SET video_links = COALESCE(video_links, '[]'::jsonb) || $2::jsonb
     WHERE id = $1`,
    [chapterId, JSON.stringify([link])]
  );
}

/**
 * Log a video generation run to a tracking table (creates if not exists)
 */
export async function logVideoRun(params: {
  chapterId: number;
  status: "success" | "failed" | "skipped";
  assetId?: number;
  error?: string;
  durationMs: number;
}): Promise<void> {
  const db = getPool();

  // Ensure tracking table exists
  await db.query(`
    CREATE TABLE IF NOT EXISTS video_agent_runs (
      id SERIAL PRIMARY KEY,
      chapter_id INTEGER NOT NULL,
      status VARCHAR(20) NOT NULL,
      asset_id INTEGER,
      error TEXT,
      duration_ms INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.query(
    `INSERT INTO video_agent_runs (chapter_id, status, asset_id, error, duration_ms)
     VALUES ($1, $2, $3, $4, $5)`,
    [params.chapterId, params.status, params.assetId || null, params.error || null, params.durationMs]
  );
}

/**
 * Get count of videos generated today (for safety cap)
 */
export async function getVideosGeneratedToday(): Promise<number> {
  const db = getPool();

  // Ensure tracking table exists
  await db.query(`
    CREATE TABLE IF NOT EXISTS video_agent_runs (
      id SERIAL PRIMARY KEY,
      chapter_id INTEGER NOT NULL,
      status VARCHAR(20) NOT NULL,
      asset_id INTEGER,
      error TEXT,
      duration_ms INTEGER,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const { rows } = await db.query<{ count: string }>(
    `SELECT COUNT(*) AS count FROM video_agent_runs
     WHERE status = 'success' AND created_at >= CURRENT_DATE`
  );

  return parseInt(rows[0].count, 10);
}
