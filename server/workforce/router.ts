/**
 * Workforce router — picks the cheapest capable model for each task.
 *
 * Tiers:
 *   local   → Ollama (qwen2.5-coder:1.5b, phi3.5)        free, unlimited, small
 *   bulk    → Gemini gemini-1.5-flash                     free tier, fast, 1M ctx
 *   premium → Gemini gemini-1.5-pro                       free tier (low RPM), best quality
 *   fallback→ OpenAI gpt-4o-mini                          paid, when others fail
 *
 *
 * Use `complete({ task, ... })` and let the router choose, or pin a tier.
 */
import { callOllama } from "./ollama";
import { callGemini } from "./gemini";
import { callOpenAI } from "./openai";

const OLLAMA_CODEMOD_MODEL = process.env.OLLAMA_CODEMOD_MODEL || "qwen2.5-coder:1.5b";
const OLLAMA_GENERAL_MODEL = process.env.OLLAMA_MODEL || "phi3.5";

export type Tier = "local" | "bulk" | "premium" | "fallback";

export type TaskKind =
  | "codemod"          // local — small structured edits
  | "classify"         // local — short labels
  | "extract"          // local — JSON extraction from HTML/text
  | "qa-check"         // bulk  — verify other model's output
  | "question-gen"     // bulk  — MCQ generation
  | "seo-page"         // bulk  — programmatic landing pages
  | "social-post"      // bulk  — tweets, captions
  | "long-form"        // premium — blog posts, ad copy, mentor scripts
  | "marketing-strategy" // premium — campaign plans
  | "vision"           // premium — image understanding
  ;

const TIER_FOR: Record<TaskKind, Tier> = {
  "codemod": "local",
  "classify": "local",
  "extract": "local",
  "qa-check": "bulk",
  "question-gen": "bulk",
  "seo-page": "bulk",
  "social-post": "bulk",
  "long-form": "premium",
  "marketing-strategy": "premium",
  "vision": "premium",
};

export interface CompleteArgs {
  task: TaskKind;
  system?: string;
  prompt: string;
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
  tier?: Tier;          // override
  images?: string[];    // base64 or URLs (premium tier only)
}

export interface CompleteResult {
  text: string;
  json?: unknown;
  tier: Tier;
  model: string;
  latencyMs: number;
  usage?: { in: number; out: number };
}

export async function complete(args: CompleteArgs): Promise<CompleteResult> {
  const tier = args.tier ?? TIER_FOR[args.task];
  const order: Tier[] = orderForTier(tier);
  let lastErr: unknown;
  for (const t of order) {
    try {
      return await callTier(t, args);
    } catch (e) {
      lastErr = e;
      console.warn(`[workforce] tier=${t} failed: ${(e as Error).message}; trying next`);
    }
  }
  throw new Error(`workforce: all tiers failed: ${(lastErr as Error)?.message}`);
}

function orderForTier(t: Tier): Tier[] {
  switch (t) {
    case "local":    return ["local", "bulk", "fallback"];
    case "bulk":     return ["bulk", "local", "fallback"];
    case "premium":  return ["premium", "bulk", "fallback"];
    case "fallback": return ["fallback", "bulk"];
  }
}

async function callTier(t: Tier, a: CompleteArgs): Promise<CompleteResult> {
  const start = Date.now();
  if (t === "local") {
    const model = a.task === "codemod" ? OLLAMA_CODEMOD_MODEL : OLLAMA_GENERAL_MODEL;
    const r = await callOllama({ model, system: a.system, prompt: a.prompt, json: a.json, temperature: a.temperature });
    return finalize(r.text, a, "local", model, start, r.json);
  }
  if (t === "bulk") {
    const r = await callGemini({ model: "gemini-1.5-flash", ...a });
    return finalize(r.text, a, "bulk", "gemini-1.5-flash", start, r.json, r.usage);
  }
  if (t === "premium") {
    const r = await callGemini({ model: "gemini-1.5-pro", ...a });
    return finalize(r.text, a, "premium", "gemini-1.5-pro", start, r.json, r.usage);
  }
  const r = await callOpenAI({ model: "gpt-4o-mini", ...a });
  return finalize(r.text, a, "fallback", "gpt-4o-mini", start, r.json, r.usage);
}

function finalize(text: string, a: CompleteArgs, tier: Tier, model: string, start: number, json?: unknown, usage?: any): CompleteResult {
  if (a.json && json === undefined) {
    try { json = JSON.parse(extractJson(text)); } catch { /* leave undefined */ }
  }
  return { text, json, tier, model, latencyMs: Date.now() - start, usage };
}

function extractJson(s: string): string {
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) return fence[1].trim();
  const first = s.indexOf("{"); const last = s.lastIndexOf("}");
  if (first >= 0 && last > first) return s.slice(first, last + 1);
  return s.trim();
}
