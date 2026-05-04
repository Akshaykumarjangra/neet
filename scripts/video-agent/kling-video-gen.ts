/**
 * Kling AI Video Generator
 * Integrates with the Kling AI API for high-quality AI video generation.
 *
 * Auth: JWT (HS256) signed with Access Key + Secret Key
 * Flow: Create task → Poll status → Download video
 *
 * API Reference: https://docs.klingai.com
 */

import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { VIDEO_AGENT_CONFIG } from "./config";

// ── Constants ──────────────────────────────────────────────────
const KLING_API_BASE = "https://api-singapore.klingai.com";

// ── Types ──────────────────────────────────────────────────────
export interface KlingTaskRequest {
  model_name: string;
  prompt: string;
  negative_prompt?: string;
  duration: "5" | "10";
  mode: "std" | "pro";
  aspect_ratio: "16:9" | "9:16" | "1:1";
  cfg_scale?: number;
  camera_control?: {
    type: string;
    config: Record<string, number>;
  };
  callback_url?: string;
  external_task_id?: string;
}

export interface KlingTaskResponse {
  code: number;
  message: string;
  request_id: string;
  data: {
    task_id: string;
    task_status: "submitted" | "processing" | "succeed" | "failed";
    task_status_msg?: string;
    created_at: number;
    updated_at: number;
  };
}

export interface KlingTaskResult {
  code: number;
  message: string;
  request_id: string;
  data: {
    task_id: string;
    task_status: "submitted" | "processing" | "succeed" | "failed";
    task_status_msg?: string;
    created_at: number;
    updated_at: number;
    task_result?: {
      videos: Array<{
        id: string;
        url: string;
        duration: string;  // e.g. "5.000"
      }>;
    };
  };
}

// ── JWT Token Generation ───────────────────────────────────────
/**
 * Generate a short-lived JWT for Kling API authentication.
 * Uses HS256 with the Secret Key. The `iss` claim is the Access Key.
 */
function generateKlingJWT(): string {
  const { klingAccessKey, klingSecretKey } = VIDEO_AGENT_CONFIG;

  if (!klingAccessKey || !klingSecretKey) {
    throw new Error(
      "KLING_ACCESS_KEY and KLING_SECRET_KEY must be set in environment variables"
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: klingAccessKey,
    exp: now + 1800,  // 30-minute expiration
    nbf: now - 5,     // Valid from 5 seconds ago (clock skew tolerance)
  };

  return jwt.sign(payload, klingSecretKey, {
    algorithm: "HS256",
    header: {
      alg: "HS256",
      typ: "JWT",
    },
  });
}

// ── API Helpers ────────────────────────────────────────────────
async function klingFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = generateKlingJWT();
  const url = `${KLING_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Kling API error (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<T>;
}

// ── Core Functions ─────────────────────────────────────────────

/**
 * Create a text-to-video generation task on Kling AI.
 * Returns the task_id for polling.
 */
export async function createKlingVideoTask(
  prompt: string,
  options?: Partial<KlingTaskRequest>
): Promise<string> {
  const { klingModel, klingMode, klingDuration, aspectRatio } =
    VIDEO_AGENT_CONFIG;

  const body: KlingTaskRequest = {
    model_name: options?.model_name || klingModel,
    prompt,
    negative_prompt:
      options?.negative_prompt ||
      "blurry, low quality, distorted text, watermark, logo",
    duration: (options?.duration || klingDuration) as "5" | "10",
    mode: (options?.mode || klingMode) as "std" | "pro",
    aspect_ratio: (options?.aspect_ratio || aspectRatio) as "16:9",
    cfg_scale: options?.cfg_scale || 0.5,
    ...(options?.callback_url ? { callback_url: options.callback_url } : {}),
    ...(options?.external_task_id
      ? { external_task_id: options.external_task_id }
      : {}),
  };

  const result = await klingFetch<KlingTaskResponse>(
    "/v1/videos/text2video",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  if (result.code !== 0) {
    throw new Error(
      `Kling task creation failed (code ${result.code}): ${result.message}`
    );
  }

  return result.data.task_id;
}

/**
 * Poll a Kling video task until it succeeds or fails.
 * Returns the video URL and duration on success.
 */
export async function pollKlingTask(
  taskId: string,
  maxWaitMs: number = 600_000, // 10 minutes max for Kling
  pollIntervalMs: number = 15_000
): Promise<{ videoUrl: string; durationSeconds: number }> {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    const result = await klingFetch<KlingTaskResult>(
      `/v1/videos/text2video/${taskId}`,
      { method: "GET" }
    );

    if (result.code !== 0) {
      throw new Error(
        `Kling poll error (code ${result.code}): ${result.message}`
      );
    }

    const { task_status, task_status_msg, task_result } = result.data;

    switch (task_status) {
      case "succeed": {
        const video = task_result?.videos?.[0];
        if (!video?.url) {
          throw new Error("Kling task succeeded but no video URL returned");
        }
        return {
          videoUrl: video.url,
          durationSeconds: parseFloat(video.duration) || 5,
        };
      }

      case "failed":
        throw new Error(
          `Kling video generation failed: ${task_status_msg || "unknown error"}`
        );

      case "submitted":
      case "processing":
        // Still working — wait and poll again
        await new Promise((r) => setTimeout(r, pollIntervalMs));
        break;

      default:
        throw new Error(`Unknown Kling task status: ${task_status}`);
    }
  }

  throw new Error(
    `Kling video generation timed out after ${maxWaitMs / 1000}s`
  );
}

/**
 * Download a video from a URL and save it to disk.
 */
async function downloadVideo(
  url: string,
  outputPath: string
): Promise<void> {
  const dir = path.dirname(outputPath);
  fs.mkdirSync(dir, { recursive: true });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(arrayBuffer));
}

/**
 * Full Kling video generation pipeline:
 * 1. Create task with prompt
 * 2. Poll until complete
 * 3. Download video to outputPath
 *
 * Returns the local file path and duration.
 */
export async function generateKlingVideo(
  prompt: string,
  outputPath: string,
  options?: Partial<KlingTaskRequest>
): Promise<{ url: string; durationSeconds: number }> {
  // Step 1: Create the task
  const taskId = await createKlingVideoTask(prompt, options);
  console.log(`  🎬 Kling task created: ${taskId}`);

  // Step 2: Poll for completion
  const { videoUrl, durationSeconds } = await pollKlingTask(taskId);
  console.log(`  📥 Kling video ready (${durationSeconds}s), downloading...`);

  // Step 3: Download to local disk
  await downloadVideo(videoUrl, outputPath);

  return { url: outputPath, durationSeconds };
}

/**
 * Adapt a Veo-style prompt into a Kling-optimized prompt.
 * Kling handles cinematic/3D prompts well but benefits from specific keywords.
 */
export function adaptPromptForKling(veoPrompt: string): string {
  // Kling handles long, descriptive prompts well.
  // Prepend cinematic quality cues that Kling responds to best.
  const klingPrefix =
    "High quality cinematic 3D animated educational video. ";
  const klingSuffix =
    " Smooth camera movements, professional lighting, vibrant colors on dark background.";

  // Truncate if the combined prompt would be too long (Kling handles ~2000 chars)
  const maxLen = 1800;
  let adapted = klingPrefix + veoPrompt + klingSuffix;
  if (adapted.length > maxLen) {
    adapted = adapted.slice(0, maxLen);
  }

  return adapted;
}
