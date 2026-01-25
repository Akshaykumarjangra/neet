import { Router, type Request, type Response } from 'express';
import { db } from './db';
import { chapterContent } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { requireAuthWithPasswordCheck, getCurrentUser, requireActiveSubscription } from './auth';
import OpenAI from 'openai';

const router = Router();

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const miniModel = process.env.OPENAI_MINI_MODEL || 'gpt-4o-mini';
const MAX_MESSAGE_LENGTH = 1000;
const MAX_TOKENS = 500;

interface ChapterContext {
  title: string;
  subject?: string;
  keyConcepts?: Array<{ title: string; description: string; formula?: string }>;
  formulas?: string[];
}

function buildSystemPrompt(chapter: any, context?: ChapterContext): string {
  const chapterTitle = context?.title || chapter.chapterTitle || 'this chapter';
  const subject = context?.subject || chapter.subject || '';
  const keyConcepts = context?.keyConcepts || chapter.keyConcepts || [];
  const formulas = context?.formulas || chapter.formulas || [];

  let prompt = `You are an expert NEET tutor helping a student understand ${chapterTitle}${subject ? ` in ${subject}` : ''}.\n\n`;

  if (keyConcepts.length > 0) {
    prompt += `Key concepts in this chapter:\n`;
    keyConcepts.slice(0, 10).forEach((concept, idx) => {
      prompt += `${idx + 1}. ${concept.title}: ${concept.description}\n`;
      if (concept.formula) {
        prompt += `   Formula: ${concept.formula}\n`;
      }
    });
    prompt += '\n';
  }

  if (formulas.length > 0) {
    prompt += `Important formulas:\n`;
    formulas.slice(0, 10).forEach((formula, idx) => {
      prompt += `${idx + 1}. ${formula}\n`;
    });
    prompt += '\n';
  }

  if (chapter.introduction) {
    const introText = chapter.introduction.length > 500
      ? chapter.introduction.substring(0, 500) + '...'
      : chapter.introduction;
    prompt += `Chapter introduction: ${introText}\n\n`;
  }

  if (chapter.detailedNotes) {
    const notesText = chapter.detailedNotes.length > 300
      ? chapter.detailedNotes.substring(0, 300) + '...'
      : chapter.detailedNotes;
    prompt += `Additional context: ${notesText}\n\n`;
  }

  prompt += `Instructions:
- You are an expert NEET tutor helping a student understand this specific chapter
- Provide clear, concise explanations tailored for NEET preparation
- Reference specific concepts, formulas, or examples from this chapter when relevant
- Use simple language but maintain scientific accuracy
- If asked about something not in this chapter, acknowledge it and offer to help with chapter content instead
- Keep responses focused and educational (aim for 2-4 sentences per point)
- Use examples when helpful
- Format formulas clearly when mentioned (use LaTeX notation if needed)
- Be encouraging and supportive
- If the student seems confused, break down concepts into smaller parts
- Always relate answers back to NEET exam relevance when possible\n`;

  return prompt;
}

router.get("/chat/health", (_req: Request, res: Response) => {
  res.json({
    configured: Boolean(process.env.AI_INTEGRATIONS_OPENAI_API_KEY),
    model: miniModel,
  });
});

router.post('/:id/chat', requireAuthWithPasswordCheck, requireActiveSubscription(), async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.id);
    const { message, chapterContext } = req.body;

    if (!Number.isInteger(chapterId) || chapterId <= 0) {
      return res.status(400).json({ error: 'Invalid chapter ID' });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 3) {
      return res.status(400).json({
        error: 'Message must be at least 3 characters long.'
      });
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`
      });
    }

    if (!process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
      return res.status(503).json({ error: 'AI service is not configured' });
    }

    // Fetch chapter from database
    const [chapter] = await db
      .select()
      .from(chapterContent)
      .where(eq(chapterContent.id, chapterId))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    // Build system prompt with chapter context
    const systemPrompt = buildSystemPrompt(chapter, chapterContext);

    // Call OpenAI with timeout protection
    const completionPromise = openai.chat.completions.create({
      model: miniModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: trimmedMessage },
      ],
      max_tokens: MAX_TOKENS,
      temperature: 0.7,
    });

    // Add timeout (30 seconds)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout - please try again')), 30000)
    );

    const completion = await Promise.race([completionPromise, timeoutPromise]);

    const answer = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.';

    res.json({
      answer,
      usage: {
        tokens: completion.usage?.total_tokens,
        model: miniModel,
      },
    });
  } catch (error: any) {
    console.error('Error in chapter chat:', error);

    // Handle specific OpenAI errors
    if (error?.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again in a moment.',
      });
    }

    if (error?.status === 503 || error?.message?.includes('service unavailable')) {
      return res.status(503).json({
        error: 'AI service is temporarily unavailable. Please try again later.',
      });
    }

    res.status(500).json({
      error: error?.message || 'Failed to generate response. Please try again.',
    });
  }
});

export default router;
