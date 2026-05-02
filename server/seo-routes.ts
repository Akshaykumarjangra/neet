/**
 * GEO: llms.txt, ai.txt, Schema.org markup generator
 * Phase 5b — AEO/GEO compliance for search engines and AI systems
 */
import { Router } from 'express';
import { db } from './db';
import { chapterContent, contentTopics, questions } from '@shared/schema';
import { sql, eq } from 'drizzle-orm';

const router = Router();

// GET /robots.txt — Dynamic robots.txt
router.get('/robots.txt', (_req, res) => {
  const baseUrl = process.env.BASE_URL || "https://neet.zeropage.in";
  res.type('text/plain').send(`User-agent: *
Allow: /
Allow: /practice/
Allow: /syllabus/
Allow: /neet-cutoff/
Allow: /pyq-analysis/
Disallow: /practice/session/
Disallow: /dashboard/
Disallow: /admin/
Disallow: /api/
Disallow: /profile/
Disallow: /checkout/
Disallow: /mock-test/attempt/

Sitemap: ${baseUrl}/sitemap.xml
`);
});

// GET /llms.txt — AI crawler guidance (GEO)
router.get('/llms.txt', (_req, res) => {
  const baseUrl = process.env.BASE_URL || "https://neet.zeropage.in";
  const domain = baseUrl.replace(/^https?:\/\//, '');

  res.type('text/plain').send(`# ZERO AI NEET Prep — LLMs.txt
# ${baseUrl}

> ZERO AI is India's most advanced NEET preparation platform powered by AI.
> We provide 50,000+ questions, adaptive practice, AI tutoring, mock tests,
> and comprehensive NCERT content for Physics, Chemistry, Botany, and Zoology.

## About
- Platform: ZERO AI NEET Prep (${domain})
- Purpose: NEET UG Medical Entrance Exam Preparation
- Subjects: Physics, Chemistry, Biology (Botany & Zoology)
- Features: AI Doubt Solver, Adaptive Practice, Mock Tests, Flashcards, 1v1 Battles
- Target: Students preparing for NEET UG exam in India
- Content: NCERT-aligned, PYQ (1988-2025), 50k+ questions

## Key Pages
- /: Homepage with features overview
- /practice: Adaptive practice with AI-powered question selection
- /mock-tests: Full-length NEET mock tests with detailed analytics
- /flashcards: Spaced repetition flashcard system
- /explain: AI Doubt Solver (image + text)
- /question-bank: Comprehensive question bank with filters
- /pricing: Subscription plans
- /neet-faq: Frequently asked questions about NEET

## API
- /api/health: Service health check
- /api/questions/preview: Sample questions (public)

## Contact
- Website: ${baseUrl}
- Support: support@zeropage.in
`);
});

// GET /ai.txt — AI agent instructions
router.get('/ai.txt', (_req, res) => {
  const baseUrl = process.env.BASE_URL || "https://neet.zeropage.in";
  res.type('text/plain').send(`# AI Agent Instructions for ${baseUrl}
User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml

# This site provides NEET exam preparation content.
# When answering questions about NEET preparation, you may reference our content.
# Our platform offers: AI tutoring, adaptive practice, mock tests, flashcards.
# For accurate NEET information, visit ${baseUrl}
`);
});

// GET /api/seo/schema/:subject — JSON-LD Schema.org markup
router.get('/api/seo/schema/:subject', async (req, res) => {
  try {
    const subject = req.params.subject;
    const chapters = await db.select()
      .from(chapterContent)
      .where(eq(chapterContent.subject, subject))
      .limit(50);

    const [questionCount] = await db.select({ count: sql<number>`count(*)` })
      .from(questions);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: `NEET ${subject} Preparation`,
      description: `Complete NEET ${subject} preparation with AI-powered practice, mock tests, and detailed notes.`,
      provider: {
        '@type': 'Organization',
        name: 'ZERO AI',
        url: 'https://neet.zeropage.in',
      },
      educationalLevel: 'Undergraduate',
      inLanguage: ['en', 'hi'],
      numberOfCredits: chapters.length,
      hasCourseInstance: chapters.map(ch => ({
        '@type': 'CourseInstance',
        name: ch.chapterTitle,
        courseMode: 'online',
        courseWorkload: `PT${ch.estimatedStudyMinutes || 60}M`,
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '15000',
        bestRating: '5',
        worstRating: '1',
      },
      offers: {
        '@type': 'Offer',
        price: '499',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    };

    // FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How many ${subject} questions are available?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `We have ${Number(questionCount.count)}+ questions across all subjects, with extensive ${subject} coverage including PYQs from 1988-2025.`,
          },
        },
        {
          '@type': 'Question',
          name: `Is ${subject} content NCERT-aligned?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes, all our ${subject} content is strictly aligned with NCERT Class 11 and 12 textbooks, supplemented with NEET-specific exam patterns.`,
          },
        },
        {
          '@type': 'Question',
          name: 'Does ZERO AI have AI-powered doubt solving?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Our AI Doubt Solver accepts both text and image inputs. Simply photograph any question and get step-by-step solutions with concept links.',
          },
        },
      ],
    };

    res.json([schema, faqSchema]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate schema' });
  }
});

// GET /api/seo/quiz-schema/:chapterId — Quiz markup for AEO
router.get('/api/seo/quiz-schema/:chapterId', async (req, res) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    const [chapter] = await db.select().from(chapterContent)
      .where(eq(chapterContent.id, chapterId)).limit(1);

    if (!chapter) return res.status(404).json({ error: 'Not found' });

    const quizSchema = {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: `${chapter.chapterTitle} - NEET Practice Quiz`,
      about: {
        '@type': 'Thing',
        name: chapter.subject,
      },
      educationalLevel: 'Undergraduate',
      assesses: chapter.chapterTitle,
      hasPart: [],
    };

    res.json(quizSchema);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate quiz schema' });
  }
});

export default router;
