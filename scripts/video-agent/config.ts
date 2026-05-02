/**
 * Video Agent Configuration
 * Controls the overnight video generation pipeline
 */
import dotenv from 'dotenv';
dotenv.config();

export const VIDEO_AGENT_CONFIG = {
  // ── Gemini API ──
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.0-flash",

  // ── Video Generation ──
  // Google Veo 2 via Gemini API for video generation
  videoModel: "veo-2.0-generate-001",

  // ── Output Paths ──
  outputDir: "uploads/chapter-videos",
  thumbnailDir: "uploads/chapter-thumbnails",

  // ── Processing Limits ──
  concurrentJobs: 2,            // Max parallel video generations
  maxRetries: 3,                // Retry on failure
  retryDelayMs: 10_000,         // 10 seconds between retries
  batchSize: 5,                 // Process N chapters then pause
  batchPauseMs: 60_000,         // 60 second pause between batches
  maxVideosPerRun: 50,          // Safety cap per overnight run

  // ── Video Specs ──
  videoDurationSec: 60,         // Target video duration (seconds)
  videoResolution: "720p",      // Output resolution
  aspectRatio: "16:9",          // Standard widescreen

  // ── Database ──
  databaseUrl: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/neetprep",

  // ── Logging ──
  logFile: "scripts/video-agent/run.log",
  verbose: true,
};

export type VideoAgentConfig = typeof VIDEO_AGENT_CONFIG;
