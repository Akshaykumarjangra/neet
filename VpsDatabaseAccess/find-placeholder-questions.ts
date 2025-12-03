import { db } from "./server/db";
import { questions, contentTopics } from "./shared/schema";
import * as fs from 'fs';

/**
 * Find Placeholder Questions Tool
 * 
 * This tool finds all placeholder questions and exports them to a JSON file
 * that you can fill in with real content and then import back.
 */

async function findPlaceholders() {
   try {
      console.log('🔍 Searching for placeholder questions...\n');

      // Get all questions
      const allQuestions = await db.select().from(questions);

      // Get all topics for reference
      const topics = await db.select().from(contentTopics);
      const topicMap = new Map(topics.map(t => [t.id, t]));

      // Find placeholders
      const placeholders = allQuestions.filter(q =>
         q.questionText.includes('[Real question content to be added]') ||
         q.questionText.includes('A comprehensive NEET-level question') ||
         JSON.stringify(q.options).includes('First possible answer') ||
         JSON.stringify(q.options).includes('Second possible answer')
      );

      console.log(`📊 Statistics:`);
      console.log(`   Total questions: ${allQuestions.length}`);
      console.log(`   Placeholder questions: ${placeholders.length}`);
      console.log(`   Real questions: ${allQuestions.length - placeholders.length}\n`);

      // Group by topic
      const byTopic = placeholders.reduce((acc, q) => {
         const topicId = q.topicId;
         if (!acc[topicId]) {
            acc[topicId] = [];
         }
         acc[topicId].push(q);
         return acc;
      }, {} as Record<number, (typeof placeholders)[number][]>);

      console.log('📋 Placeholders by topic:');
      for (const [topicId, qs] of Object.entries(byTopic)) {
         const topic = topicMap.get(Number(topicId));
         console.log(`   ${topic?.subject} - ${topic?.topicName}: ${qs.length} placeholders`);
      }

      // Export to template file
      const templateQuestions = placeholders.slice(0, 10).map(q => {
         const topic = topicMap.get(q.topicId);
         return {
            id: q.id,
            topicId: q.topicId,
            topicName: `${topic?.subject} - ${topic?.topicName}`,
            questionText: "YOUR QUESTION TEXT HERE",
            options: [
               "Option A text",
               "Option B text",
               "Option C text",
               "Option D text"
            ],
            correctAnswer: "A",
            difficultyLevel: 1,
            solutionDetail: "Detailed explanation of the solution",
            solutionSteps: [
               "Step 1: ...",
               "Step 2: ...",
               "Step 3: ...",
               "Step 4: Final answer"
            ],
            relatedTopics: ["Topic 1", "Topic 2"],
            tags: ["neet", "topic-tag"]
         };
      });

      const outputFile = 'placeholder-questions-to-fill.json';
      fs.writeFileSync(outputFile, JSON.stringify(templateQuestions, null, 2));
      console.log(`\n✅ Exported first 10 placeholders to: ${outputFile}`);
      console.log('   Fill in the questions and use update-existing-question.ts to update them');

      // Also export IDs of all placeholders
      const placeholderIds = placeholders.map(q => q.id);
      fs.writeFileSync('placeholder-ids.json', JSON.stringify(placeholderIds, null, 2));
      console.log(`✅ Exported all placeholder IDs to: placeholder-ids.json`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

findPlaceholders().then(() => {
   console.log('\n✅ Search complete!');
   process.exit(0);
});
