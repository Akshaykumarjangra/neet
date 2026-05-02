#!/usr/bin/env npx tsx
import "dotenv/config";
/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║  ZERO AI — Overnight Video Generation Agent             ║
 * ║  Generates 3D educational videos for every NEET chapter ║
 * ║  using Gemini (script) + Veo 2 (video) + Imagen (thumb) ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * Usage:
 *   npx tsx scripts/video-agent/run.ts              # Full overnight run
 *   npx tsx scripts/video-agent/run.ts --dry-run    # Preview without generating
 *   npx tsx scripts/video-agent/run.ts --limit 5    # Generate max 5 videos
 *   npx tsx scripts/video-agent/run.ts --subject Physics  # Only one subject
 */

import path from "path";
import fs from "fs";
import { VIDEO_AGENT_CONFIG } from "./config";
import { generateVideoScript, generateThumbnail, generateVideo } from "./gemini-video-gen";
import {
  fetchChaptersWithoutVideos,
  insertVideoAsset,
  appendVideoLink,
  logVideoRun,
  getVideosGeneratedToday,
  closePool,
  type ChapterRow,
} from "./db-ops";

// ── CLI Args ──
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const LIMIT = parseInt(args[args.indexOf("--limit") + 1]) || VIDEO_AGENT_CONFIG.maxVideosPerRun;
const SUBJECT_FILTER = args.includes("--subject") ? args[args.indexOf("--subject") + 1] : null;

// ── Logger ──
const LOG_DIR = path.dirname(VIDEO_AGENT_CONFIG.logFile);
fs.mkdirSync(LOG_DIR, { recursive: true });
const logStream = fs.createWriteStream(
  path.resolve(VIDEO_AGENT_CONFIG.logFile),
  { flags: "a" }
);

function log(level: "INFO" | "WARN" | "ERROR" | "SUCCESS", message: string): void {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level}] ${message}`;
  console.log(line);
  logStream.write(line + "\n");
}

function banner(): void {
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║   🎬 ZERO AI — Video Generation Agent               ║
  ║   Mode: ${DRY_RUN ? "DRY RUN (no writes)" : "PRODUCTION"}                      ║
  ║   Limit: ${String(LIMIT).padEnd(4)} videos                          ║
  ║   Subject: ${(SUBJECT_FILTER || "ALL").padEnd(10)}                        ║
  ╚══════════════════════════════════════════════════════╝
  `);
}

// ── Stats ──
const stats = {
  total: 0,
  success: 0,
  failed: 0,
  skipped: 0,
  startTime: Date.now(),
};

/**
 * Process a single chapter: script → video → thumbnail → DB
 */
async function processChapter(chapter: ChapterRow, index: number, total: number): Promise<void> {
  const label = `[${index + 1}/${total}] ${chapter.subject} Ch${chapter.chapterNumber}: ${chapter.chapterTitle}`;
  const startMs = Date.now();

  log("INFO", `▶ Processing ${label}`);

  try {
    // Step 1: Generate video script via Gemini
    log("INFO", `  📝 Generating script...`);
    const script = await generateVideoScript({
      id: chapter.id,
      subject: chapter.subject,
      classLevel: chapter.classLevel,
      chapterNumber: chapter.chapterNumber,
      chapterTitle: chapter.chapterTitle,
      introduction: chapter.introduction,
      keyConcepts: chapter.keyConcepts || [],
      importantTopics: chapter.importantTopics || [],
    });

    if (DRY_RUN) {
      log("INFO", `  [DRY RUN] Script: "${script.title}"`);
      log("INFO", `  [DRY RUN] Video prompt: ${script.videoPrompt.slice(0, 100)}...`);
      stats.skipped++;
      return;
    }

    // Step 2: Generate thumbnail via Imagen
    log("INFO", `  🖼️  Generating thumbnail...`);
    const thumbPath = path.resolve(
      VIDEO_AGENT_CONFIG.thumbnailDir,
      `${chapter.subject.toLowerCase()}-ch${chapter.chapterNumber}-thumb.jpg`
    );
    let thumbnailUrl = "";
    try {
      thumbnailUrl = await generateThumbnail(script.thumbnailPrompt, thumbPath);
    } catch (thumbErr: any) {
      log("WARN", `  Thumbnail failed (non-critical): ${thumbErr.message}`);
    }

    // Step 3: Generate video via Veo 2
    log("INFO", `  🎥 Generating video (this may take 2-5 min)...`);
    const videoPath = path.resolve(
      VIDEO_AGENT_CONFIG.outputDir,
      `${chapter.subject.toLowerCase()}-ch${chapter.chapterNumber}-3d.mp4`
    );
    const videoResult = await generateVideo(script.videoPrompt, videoPath);

    // Step 4: Insert into database
    log("INFO", `  💾 Saving to database...`);
    const assetId = await insertVideoAsset({
      chapterContentId: chapter.id,
      title: script.title,
      description: script.description,
      url: `/uploads/chapter-videos/${path.basename(videoPath)}`,
      thumbnailUrl: thumbnailUrl
        ? `/uploads/chapter-thumbnails/${path.basename(thumbnailUrl)}`
        : "",
      durationSeconds: videoResult.durationSeconds,
      tags: script.tags,
    });

    // Step 5: Append to chapter's videoLinks
    await appendVideoLink(chapter.id, {
      title: script.title,
      url: `/uploads/chapter-videos/${path.basename(videoPath)}`,
      duration: `${Math.floor(videoResult.durationSeconds / 60)}:${String(videoResult.durationSeconds % 60).padStart(2, "0")}`,
      source: "AI Generated (Veo 2)",
    });

    const durationMs = Date.now() - startMs;
    await logVideoRun({
      chapterId: chapter.id,
      status: "success",
      assetId,
      durationMs,
    });

    stats.success++;
    log("SUCCESS", `  ✅ Done in ${(durationMs / 1000).toFixed(1)}s → Asset #${assetId}`);

  } catch (err: any) {
    const durationMs = Date.now() - startMs;
    stats.failed++;
    log("ERROR", `  ❌ Failed: ${err.message}`);

    if (!DRY_RUN) {
      await logVideoRun({
        chapterId: chapter.id,
        status: "failed",
        error: err.message,
        durationMs,
      }).catch(() => {});
    }
  }
}

/**
 * Main entry point — overnight batch runner
 */
async function main(): Promise<void> {
  banner();

  // Validate API key
  if (!VIDEO_AGENT_CONFIG.geminiApiKey) {
    log("ERROR", "GEMINI_API_KEY is not set. Aborting.");
    process.exit(1);
  }

  // Check daily cap
  if (!DRY_RUN) {
    const todayCount = await getVideosGeneratedToday();
    if (todayCount >= VIDEO_AGENT_CONFIG.maxVideosPerRun) {
      log("WARN", `Daily cap reached (${todayCount}/${VIDEO_AGENT_CONFIG.maxVideosPerRun}). Exiting.`);
      process.exit(0);
    }
    log("INFO", `Videos generated today: ${todayCount}/${VIDEO_AGENT_CONFIG.maxVideosPerRun}`);
  }

  // Fetch chapters
  log("INFO", "Fetching chapters without videos...");
  let chapters: ChapterRow[] = [];

  try {
    chapters = await fetchChaptersWithoutVideos();
  } catch (dbErr: any) {
    if (DRY_RUN) {
      log("WARN", `DB unavailable (${dbErr.code || dbErr.message}). Using mock data for dry run.`);
      // Generate mock chapters for dry-run preview
      const subjects = ["Physics", "Chemistry", "Botany", "Zoology"];
      chapters = subjects.flatMap((subj, si) =>
        Array.from({ length: 3 }, (_, i) => ({
          id: si * 100 + i + 1,
          subject: subj,
          classLevel: "11",
          chapterNumber: i + 1,
          chapterTitle: `${subj} Chapter ${i + 1}`,
          introduction: `Introduction to ${subj} concepts for NEET preparation.`,
          keyConcepts: [{ title: "Core Concept", description: "Fundamental principle" }],
          importantTopics: [`${subj} Topic ${i + 1}`],
          videoLinks: [],
        }))
      );
    } else {
      log("ERROR", `Database connection failed: ${dbErr.message}`);
      await closePool();
      process.exit(1);
    }
  }

  if (SUBJECT_FILTER) {
    chapters = chapters.filter(
      (c) => c.subject.toLowerCase() === SUBJECT_FILTER.toLowerCase()
    );
  }

  // Apply limit
  chapters = chapters.slice(0, LIMIT);
  stats.total = chapters.length;

  if (chapters.length === 0) {
    log("INFO", "🎉 All chapters already have videos! Nothing to do.");
    await closePool();
    return;
  }

  log("INFO", `Found ${chapters.length} chapters to process`);
  log("INFO", `Subjects: ${[...new Set(chapters.map((c) => c.subject))].join(", ")}`);
  log("INFO", "─".repeat(60));

  // Process in batches
  const { batchSize, batchPauseMs } = VIDEO_AGENT_CONFIG;

  for (let i = 0; i < chapters.length; i++) {
    await processChapter(chapters[i], i, chapters.length);

    // Batch pause (rate limiting)
    if ((i + 1) % batchSize === 0 && i + 1 < chapters.length) {
      log("INFO", `⏸  Batch pause (${batchPauseMs / 1000}s)...`);
      await new Promise((r) => setTimeout(r, batchPauseMs));
    }
  }

  // Final report
  const elapsed = ((Date.now() - stats.startTime) / 1000 / 60).toFixed(1);
  log("INFO", "═".repeat(60));
  log("INFO", `📊 Run Complete in ${elapsed} minutes`);
  log("INFO", `   Total:   ${stats.total}`);
  log("SUCCESS", `   Success: ${stats.success}`);
  if (stats.failed > 0) log("ERROR", `   Failed:  ${stats.failed}`);
  if (stats.skipped > 0) log("INFO", `   Skipped: ${stats.skipped}`);
  log("INFO", "═".repeat(60));

  logStream.end();
  await closePool();
}

// ── Run ──
main().catch((err) => {
  log("ERROR", `Fatal error: ${err.message}`);
  console.error(err);
  closePool().finally(() => process.exit(1));
});
