/**
 * AI Doubt Solver v2 — Multimodal Image + Text Input
 * Phase 1.1 — Uses Gemini API + Ollama fallback
 */
import { Router } from 'express';
import { requireAuth } from './auth';
import { db } from './db';
import { chapterContent } from '@shared/schema';
import { ilike, or } from 'drizzle-orm';
import { logger } from './lib/logger';
import multer from 'multer';

const aiLog = logger.child({ module: 'ai-doubt' });
const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only images (JPG, PNG, WEBP) are allowed.") as any, false);
  }
});

const SYSTEM_PROMPT = `You are an expert NEET exam tutor. Respond ONLY with JSON:
{"question":"..","subject":"Physics|Chemistry|Botany|Zoology","topic":"..","difficulty":"Easy|Medium|Hard",
"steps":[{"stepNumber":1,"title":"..","explanation":"..","formula":".."}],
"finalAnswer":"..","conceptLinks":[{"concept":".."}],"commonMistakes":[".."],"confidence":0.95}`;

async function solveGemini(q: string, img64?: string, retries = 3) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('No GEMINI_API_KEY');
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const parts: any[] = [{ text: SYSTEM_PROMPT + '\nQuestion: ' + q }];
  if (img64) parts.unshift({ inlineData: { mimeType: 'image/jpeg', data: img64 } });
  
  let lastError = null;
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }], generationConfig: { temperature: 0.3, maxOutputTokens: 4096, responseMimeType: 'application/json' } }) });
      if (!r.ok) throw new Error(`Gemini ${r.status}`);
      const d = await r.json();
      return JSON.parse(d.candidates?.[0]?.content?.parts?.[0]?.text || '{}');
    } catch (e) {
      lastError = e;
      await new Promise(res => setTimeout(res, 1000 * (i + 1))); // Exponential backoff
    }
  }
  throw lastError || new Error("Gemini API failed after retries");
}

async function solveOllama(q: string, retries = 2) {
  const url = process.env.OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'llama3.2:3b';
  
  let lastError = null;
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(`${url}/api/generate`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt: SYSTEM_PROMPT + '\nQuestion: ' + q, stream: false, format: 'json' }) });
      if (!r.ok) throw new Error(`Ollama ${r.status}`);
      return JSON.parse((await r.json()).response);
    } catch (e) {
      lastError = e;
      await new Promise(res => setTimeout(res, 1000 * (i + 1))); // Exponential backoff
    }
  }
  throw lastError || new Error("Ollama API failed after retries");
}

async function enrichLinks(sol: any) {
  try {
    const links = sol.conceptLinks || [];
    if (links.length === 0) return sol;

    const conditions = links.map((link: any) => ilike(chapterContent.chapterTitle, `%${link.concept}%`));

    const matches = await db.select({ id: chapterContent.id, title: chapterContent.chapterTitle })
      .from(chapterContent)
      .where(or(...conditions));

    for (const link of links) {
      const ch = matches.find((m: any) => m.title.toLowerCase().includes(link.concept.toLowerCase()));
      if (ch) { link.chapterId = ch.id; link.chapterTitle = ch.title; }
    }
  } catch {}
  return sol;
}

router.post('/solve', requireAuth, async (req, res) => {
  const { question } = req.body;
  if (!question || question.length < 5) return res.status(400).json({ error: 'Question too short' });
  try {
    let sol;
    try { sol = await solveGemini(question); } catch {
      try { sol = await solveOllama(question); } catch {
        return res.status(503).json({ error: 'AI unavailable' });
      }
    }
    res.json({ success: true, solution: await enrichLinks(sol) });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.post('/solve-image', requireAuth, upload.single('image'), async (req, res) => {
  const q = req.body.question || 'Solve this question';
  if (!req.file) return res.status(400).json({ error: 'Upload an image' });
  try {
    const sol = await solveGemini(q, req.file.buffer.toString('base64'));
    res.json({ success: true, solution: await enrichLinks(sol) });
  } catch (e: any) { res.status(503).json({ error: 'Image analysis failed' }); }
});

router.get('/health', async (_req, res) => {
  const s: any = { gemini: process.env.GEMINI_API_KEY ? 'configured' : 'missing' };
  try { const r = await fetch((process.env.OLLAMA_URL || 'http://localhost:11434') + '/api/tags', { signal: AbortSignal.timeout(3000) });
    s.ollama = r.ok ? 'available' : 'error'; } catch { s.ollama = 'unavailable'; }
  res.json(s);
});

export default router;
