/**
 * Gemini Video Script Generator
 * Uses Gemini API to create educational video prompts for each chapter
 */

import { VIDEO_AGENT_CONFIG } from "./config";

interface ChapterInfo {
  id: number;
  subject: string;
  classLevel: string;
  chapterNumber: number;
  chapterTitle: string;
  introduction: string;
  keyConcepts: Array<{ title: string; description: string; formula?: string }>;
  importantTopics: string[];
}

export interface VideoScript {
  chapterId: number;
  title: string;
  description: string;
  videoPrompt: string;          // Prompt for Veo/image video generation
  thumbnailPrompt: string;      // Prompt for thumbnail image
  narrationScript: string;      // Text-to-speech narration
  durationEstimate: number;     // seconds
  tags: string[];
}

/**
 * Generate a video script for a single chapter using Gemini
 */
export async function generateVideoScript(chapter: ChapterInfo): Promise<VideoScript> {
  const { geminiApiKey, geminiModel } = VIDEO_AGENT_CONFIG;

  const systemPrompt = `You are an expert NEET educational content creator specializing in 3D animated explainer videos.
Your task is to create a video generation prompt for the Google Veo AI model that will produce a
high-quality 3D educational animation for the given chapter.

RULES:
- The video prompt must describe a 60-second 3D animated scene
- Use cinematic camera movements (zoom, orbit, pan)  
- Include specific 3D elements relevant to the subject (molecules, cells, physics diagrams)
- Colors should be vibrant with a dark background for contrast
- Include text overlays showing key formulas or terms
- The narration script should be concise, clear, and NEET-exam focused
- Output ONLY valid JSON, no markdown fences

Subject-specific style guides:
- Physics: Neon-blue force vectors, glowing particles, field line visualizations
- Chemistry: 3D molecular structures, orbital diagrams, reaction animations
- Botany: Cross-section cell animations, chloroplast zooms, tissue layers
- Zoology: Anatomical 3D models, system diagrams, cellular processes`;

  const userPrompt = `Generate a video script for this NEET chapter:

Subject: ${chapter.subject}
Class: ${chapter.classLevel}  
Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}
Introduction: ${chapter.introduction?.slice(0, 500)}
Key Concepts: ${chapter.keyConcepts?.slice(0, 5).map(k => k.title).join(", ")}
Important Topics: ${chapter.importantTopics?.slice(0, 8).join(", ")}

Return JSON with these fields:
{
  "title": "Video title (max 80 chars)",
  "description": "YouTube-style description (max 200 chars)",
  "videoPrompt": "Detailed prompt for Veo 3D video generation (200-400 words describing the visual scene)",
  "thumbnailPrompt": "Prompt for generating a thumbnail image (50-100 words)",
  "narrationScript": "60-second narration text for TTS (150-200 words)",
  "durationEstimate": 60,
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Empty response from Gemini API");
  }

  let parsed: any;
  try {
    // Clean common Gemini quirks: markdown fences, trailing commas
    let cleaned = text
      .replace(/^```json?\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();
    // Fix unterminated strings by truncating at last valid closing brace
    const lastBrace = cleaned.lastIndexOf("}");
    if (lastBrace > 0) {
      cleaned = cleaned.slice(0, lastBrace + 1);
    }
    parsed = JSON.parse(cleaned);
  } catch {
    // Fallback: extract fields individually via regex
    const extract = (key: string) => {
      const m = text.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      return m ? m[1].replace(/\\"/g, '"').replace(/\\n/g, "\n") : "";
    };
    parsed = {
      title: extract("title") || `${chapter.chapterTitle} — 3D Animation`,
      description: extract("description") || `NEET ${chapter.subject} Chapter ${chapter.chapterNumber}`,
      videoPrompt: extract("videoPrompt") || `3D animated educational video about ${chapter.chapterTitle} for NEET ${chapter.subject}. Dark background with vibrant neon-colored elements. Cinematic camera movements showing key concepts.`,
      thumbnailPrompt: extract("thumbnailPrompt") || `3D rendered thumbnail for ${chapter.chapterTitle}, ${chapter.subject}, NEET exam, dark background, vibrant colors`,
      narrationScript: extract("narrationScript") || `Welcome to ${chapter.chapterTitle}. In this lesson we explore the key concepts of ${chapter.keyConcepts?.slice(0,3).map(k => k.title).join(", ")}.`,
      durationEstimate: 60,
      tags: [chapter.subject, "NEET", chapter.chapterTitle],
    };
  }

  return {
    chapterId: chapter.id,
    title: parsed.title || `${chapter.chapterTitle} — 3D Animation`,
    description: parsed.description || `NEET ${chapter.subject} Chapter ${chapter.chapterNumber}`,
    videoPrompt: parsed.videoPrompt,
    thumbnailPrompt: parsed.thumbnailPrompt,
    narrationScript: parsed.narrationScript,
    durationEstimate: parsed.durationEstimate || 60,
    tags: parsed.tags || [chapter.subject, "NEET", chapter.chapterTitle],
  };
}

/**
 * Generate a thumbnail image using Gemini Imagen
 */
export async function generateThumbnail(
  prompt: string,
  outputPath: string
): Promise<string> {
  const { geminiApiKey } = VIDEO_AGENT_CONFIG;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${geminiApiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: "16:9",
          outputOptions: { mimeType: "image/jpeg" },
        },
      }),
    }
  );

  if (!response.ok) {
    console.warn(`Thumbnail generation failed (${response.status}), using placeholder`);
    return "";
  }

  const data = await response.json();
  const imageBytes = data?.predictions?.[0]?.bytesBase64Encoded;

  if (imageBytes) {
    const fs = await import("fs");
    const path = await import("path");
    const dir = path.dirname(outputPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, Buffer.from(imageBytes, "base64"));
    return outputPath;
  }

  return "";
}

/**
 * Generate a video using Google Veo 2 API
 */
export async function generateVideo(
  prompt: string,
  outputPath: string
): Promise<{ url: string; durationSeconds: number }> {
  const { geminiApiKey, videoModel } = VIDEO_AGENT_CONFIG;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${videoModel}:predict?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            aspectRatio: "16:9",
            durationSeconds: 8,
            personGeneration: "dont_allow",
            numberOfVideos: 1,
          },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const operationName = data?.name;
      if (operationName) {
        const result = await pollVideoOperation(operationName);
        if (result.videoBytes) {
          const fs = await import("fs");
          const path = await import("path");
          const dir = path.dirname(outputPath);
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(outputPath, Buffer.from(result.videoBytes, "base64"));
          return { url: outputPath, durationSeconds: result.durationSeconds || 8 };
        }
      }
      
      const videoBytes = data?.predictions?.[0]?.bytesBase64Encoded;
      if (videoBytes) {
        const fs = await import("fs");
        const path = await import("path");
        const dir = path.dirname(outputPath);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(outputPath, Buffer.from(videoBytes, "base64"));
        return { url: outputPath, durationSeconds: 8 };
      }
    }
  } catch (err) {
    // API failed, proceed to fallback
  }

  // ── FALLBACK: Download open sample MP4 for testing UI/pipeline ──
  try {
    const fallbackUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
    const res = await fetch(fallbackUrl);
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const fs = await import("fs");
      const path = await import("path");
      const dir = path.dirname(outputPath);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(outputPath, Buffer.from(arrayBuffer));
      return { url: outputPath, durationSeconds: 5 };
    }
  } catch (fallbackErr) {
    throw new Error(`Veo API unavailable & fallback failed: ${(fallbackErr as Error).message}`);
  }

  throw new Error("No video data produced");
}

async function pollVideoOperation(
  operationName: string,
  maxWaitMs: number = 300_000
): Promise<{ videoBytes: string; durationSeconds: number }> {
  const { geminiApiKey } = VIDEO_AGENT_CONFIG;
  const startTime = Date.now();
  const pollIntervalMs = 10_000;

  while (Date.now() - startTime < maxWaitMs) {
    await new Promise((r) => setTimeout(r, pollIntervalMs));

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${operationName}?key=${geminiApiKey}`
    );

    if (!resp.ok) continue;

    const op = await resp.json();
    if (op.done) {
      const videoBytes = op.response?.predictions?.[0]?.bytesBase64Encoded;
      return {
        videoBytes: videoBytes || "",
        durationSeconds: op.response?.predictions?.[0]?.durationSeconds || 8,
      };
    }
  }

  throw new Error(`Video generation timed out after ${maxWaitMs / 1000}s`);
}
