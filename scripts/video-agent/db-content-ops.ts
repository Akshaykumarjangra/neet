import pg from "pg";
import { VIDEO_AGENT_CONFIG } from "./config.js";
import fs from "fs";
import path from "path";

const { Pool } = pg;

let pool: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!pool) {
    pool = new Pool({ connectionString: VIDEO_AGENT_CONFIG.databaseUrl });
  }
  return pool;
}

export async function fetchChaptersWithoutScripts(): Promise<any[]> {
  const db = getPool();
  const { rows } = await db.query(`
    SELECT
      c.id, c.subject, c.class_level, c.chapter_number, c.chapter_title, c.introduction,
      c.key_concepts, c.important_topics
    FROM chapter_content c
    WHERE c.status = 'published'
      AND NOT EXISTS (
        SELECT 1 FROM content_assets ca
        WHERE ca.chapter_content_id = c.id
          AND ca.type = 'handwritten_note'
          AND ca.metadata->>'source' = 'content-agent'
      )
    ORDER BY c.subject, c.class_level, c.chapter_number
  `);
  return rows;
}

export async function saveScriptAsset(
  chapterContentId: number,
  title: string,
  content: string
): Promise<number> {
  const db = getPool();

  const scriptPath = path.join(
    process.cwd(),
    "uploads",
    "chapter-scripts",
    `chapter_${chapterContentId}_script.md`
  );
  fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
  fs.writeFileSync(scriptPath, content, "utf-8");

  const { rows } = await db.query(
    `INSERT INTO content_assets
       (chapter_content_id, type, title, description, url, is_public, metadata, created_at)
     VALUES ($1, 'handwritten_note', $2, 'Generated Script for NotebookLM/Vids', $3, false, $4::jsonb, NOW())
     RETURNING id`,
    [
      chapterContentId,
      title,
      `/uploads/chapter-scripts/chapter_${chapterContentId}_script.md`,
      JSON.stringify({ source: "content-agent", generatedAt: new Date().toISOString() }),
    ]
  );
  return rows[0].id;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
