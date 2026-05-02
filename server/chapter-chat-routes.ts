import { Router, type Request, type Response } from 'express';
import { db } from './db';
import { chapterContent, userChats, users } from '@shared/schema';
import { eq, desc, and } from 'drizzle-orm';
import { requireAuth, getCurrentUser } from './auth';
import OpenAI from 'openai';
import { z } from 'zod';

const router = Router();

// Only initialize OpenAI client when the key is actually set
const openai = process.env.AI_INTEGRATIONS_OPENAI_API_KEY
  ? new OpenAI({
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    })
  : null;

const miniModel = process.env.OPENAI_MINI_MODEL || 'gpt-4o-mini';
const MAX_MESSAGE_LENGTH = 1000;
const MAX_TOKENS = 1000;

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
    keyConcepts.slice(0, 10).forEach((concept: { title: string; description: string; formula?: string }, idx: number) => {
      prompt += `${idx + 1}. ${concept.title}: ${concept.description}\n`;
      if (concept.formula) {
        prompt += `   Formula: ${concept.formula}\n`;
      }
    });
    prompt += '\n';
  }

  if (formulas.length > 0) {
    prompt += `Important formulas:\n`;
    formulas.slice(0, 10).forEach((formula: string, idx: number) => {
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
- Format formulas clearly using LaTeX notation wrapped in $...$ for inline and $$...$$ for block
- Use markdown formatting: **bold** for key terms, bullet lists for steps, code blocks for formulas
- Be encouraging and supportive
- If the student seems confused, break down concepts into smaller parts
- Always relate answers back to NEET exam relevance when possible\n`;

  return prompt;
}

router.get("/chat/health", (_req: Request, res: Response) => {
  res.json({
    configured: Boolean(process.env.AI_INTEGRATIONS_OPENAI_API_KEY) && openai !== null,
    model: miniModel,
  });
});

// Get chat history for a chapter
router.get("/:id/history", requireAuth, async (req, res) => {
  try {
    const chapterId = parseInt(req.params.id);
    const userId = req.session.userId!;

    if (!Number.isInteger(chapterId)) {
      return res.status(400).json({ error: 'Invalid chapter ID' });
    }

    const history = await db
      .select()
      .from(userChats)
      .where(
        and(
          eq(userChats.userId, userId),
          eq(userChats.chapterId, chapterId)
        )
      )
      .orderBy(userChats.createdAt)
      .limit(50);

    res.json(history);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

router.post('/:id/chat', requireAuth, async (req: Request, res: Response) => {
  try {
    const chapterId = parseInt(req.params.id);
    const { message, chapterContext, history = [], stream = false } = req.body;

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

    if (!openai) {
      return res.status(503).json({ error: 'AI service is not configured' });
    }

    const [chapter] = await db
      .select()
      .from(chapterContent)
      .where(eq(chapterContent.id, chapterId))
      .limit(1);

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' });
    }

    if (!chapter.isFree) {
      const [user] = await db
        .select({ isPaidUser: users.isPaidUser, role: users.role, isOwner: users.isOwner })
        .from(users)
        .where(eq(users.id, req.session.userId!))
        .limit(1);

      const isPremiumUser = user?.isPaidUser || user?.role === "admin" || user?.isOwner;
      
      if (!isPremiumUser) {
        return res.status(403).json({ error: 'This is a premium chapter. Please upgrade your subscription to chat.' });
      }
    }

    // Save user message to database
    await db.insert(userChats).values({
      userId: req.session.userId!,
      chapterId: chapterId,
      role: 'user',
      content: trimmedMessage,
    });

    let systemPrompt = buildSystemPrompt(chapter, chapterContext);
    const recentHistory = Array.isArray(history) ? history.slice(-10).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: String(msg.content).substring(0, 1000)
    })) : [];

    const messages = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: trimmedMessage },
    ];

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      try {
        const streamResponse = await openai.chat.completions.create({
          model: miniModel,
          messages: messages as any[],
          max_tokens: MAX_TOKENS,
          temperature: 0.7,
          stream: true,
        });

        let fullContent = '';
        for await (const chunk of streamResponse) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            fullContent += content;
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }

        // Save assistant message to database
        if (fullContent) {
          await db.insert(userChats).values({
            userId: req.session.userId!,
            chapterId: chapterId,
            role: 'assistant',
            content: fullContent,
          });
        }

        res.write('data: [DONE]\n\n');
        return res.end();
      } catch (streamError: any) {
        console.error('Streaming error:', streamError);
        res.write(`data: ${JSON.stringify({ error: streamError.message })}\n\n`);
        return res.end();
      }
    }

    // Non-streaming fallback
    const completion = await openai.chat.completions.create({
      model: miniModel,
      messages: messages as any[],
      max_tokens: MAX_TOKENS,
      temperature: 0.7,
    });

    const answer = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
    
    // Save assistant message to database
    await db.insert(userChats).values({
      userId: req.session.userId!,
      chapterId: chapterId,
      role: 'assistant',
      content: answer,
    });

    res.json({ answer });

  } catch (error: any) {
    console.error('Error in chapter chat:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate response. Please try again.',
    });
  }
});

export default router;
