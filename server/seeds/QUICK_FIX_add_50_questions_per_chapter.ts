#!/usr/bin/env tsx
/**
 * QUICK FIX: Add 50 questions to each chapter
 * 
 * This adds placeholder questions so users see content immediately.
 * Replace with real NEET questions later!
 * 
 * Usage:
 *   npx tsx server/seeds/QUICK_FIX_add_50_questions_per_chapter.ts
 */

import 'dotenv/config';
import { db } from '../db';
import { contentTopics, questions } from '@shared/schema';
import { eq } from 'drizzle-orm';

async function quickFixAddQuestions() {
   console.log('🚀 QUICK FIX: Adding 50 questions per chapter...\n');

   try {
      // Get all topics
      const topics = await db.select().from(contentTopics);
      console.log(`📚 Found ${topics.length} topics\n`);

      let totalAdded = 0;

      for (const topic of topics) {
         // Check existing questions
         const existing = await db
            .select()
            .from(questions)
            .where(eq(questions.topicId, topic.id));

         const currentCount = existing.length;
         const targetCount = 50;
         const needed = targetCount - currentCount;

         if (needed > 0) {
            console.log(`📖 ${topic.subject} Ch${topic.chapterNumber}: ${topic.topicName}`);
            console.log(`   Current: ${currentCount} questions`);
            console.log(`   Adding: ${needed} questions...`);

            // Generate questions
            const newQuestions = [];
            for (let i = 1; i <= needed; i++) {
               const questionNum = currentCount + i;
               const difficulty = ((i - 1) % 5) + 1; // Cycle 1-5

               newQuestions.push({
                  topicId: topic.id,
                  questionText: `${topic.topicName} - Question ${questionNum}: A comprehensive NEET-level question testing understanding of ${topic.topicName} concepts. [Real question content to be added]`,
                  options: [
                     {
                        id: "A",
                        text: `Option A: First possible answer for question ${questionNum}`
                     },
                     {
                        id: "B",
                        text: `Option B: Second possible answer for question ${questionNum}`
                     },
                     {
                        id: "C",
                        text: `Option C: Third possible answer for question ${questionNum}`
                     },
                     {
                        id: "D",
                        text: `Option D: Fourth possible answer for question ${questionNum}`
                     }
                  ],
                  correctAnswer: ["A", "B", "C", "D"][i % 4],
                  solutionDetail: `Detailed solution for ${topic.topicName} question ${questionNum}:\n\n` +
                     `1. Understand the concept: ${topic.topicName}\n` +
                     `2. Identify the given information\n` +
                     `3. Apply the relevant formula or principle\n` +
                     `4. Calculate step by step\n` +
                     `5. Verify the answer\n\n` +
                     `[Complete solution to be added with real question]`,
                  solutionSteps: [
                     `Step 1: Analyze the question and identify key concepts`,
                     `Step 2: Recall relevant formulas and principles`,
                     `Step 3: Apply the concept to solve the problem`,
                     `Step 4: Calculate and verify the result`
                  ],
                  difficultyLevel: difficulty,
                  sourceType: 'practice',
                  relatedTopics: [topic.topicName, `Chapter ${topic.chapterNumber}`, topic.subject]
               });
            }

            // Insert in batches of 10
            for (let i = 0; i < newQuestions.length; i += 10) {
               const batch = newQuestions.slice(i, i + 10);
               await db.insert(questions).values(batch);
            }

            totalAdded += needed;
            console.log(`   ✅ Added ${needed} questions (Total now: ${targetCount})\n`);
         } else {
            console.log(`✓ ${topic.subject} Ch${topic.chapterNumber}: ${topic.topicName} - Already has ${currentCount} questions\n`);
         }
      }

      console.log(`\n🎉 COMPLETE!`);
      console.log(`📊 Total questions added: ${totalAdded}`);
      console.log(`📚 All chapters now have 50 questions each`);
      console.log(`\n⚠️  NOTE: These are placeholder questions.`);
      console.log(`   Replace with real NEET questions for production!`);

   } catch (error) {
      console.error('❌ Error:', error);
      throw error;
   } finally {
      process.exit(0);
   }
}

// Run the script
quickFixAddQuestions();
