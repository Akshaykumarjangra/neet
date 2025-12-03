import { db } from "./server/db";
import { questions } from "@shared/schema";
import * as fs from 'fs';

/**
 * Bulk Question Import Tool
 * 
 * This tool allows you to import multiple questions from a JSON file.
 * See question-template.json for the format.
 */

interface BulkQuestion {
   topicId: number;
   questionText: string;
   options: string[];
   correctAnswer: string;
   difficultyLevel: 1 | 2 | 3;
   solutionDetail: string;
   solutionSteps?: string[];
   relatedTopics?: string[];
   tags?: string[];
}

async function importQuestions(filePath: string) {
   try {
      console.log(`📂 Reading questions from: ${filePath}`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const questionsData: BulkQuestion[] = JSON.parse(fileContent);

      console.log(`📊 Found ${questionsData.length} questions to import`);

      let successCount = 0;
      let errorCount = 0;

      for (const q of questionsData) {
         try {
            // Validate required fields
            if (!q.topicId || !q.questionText || !q.options || !q.correctAnswer || !q.difficultyLevel) {
               console.error(`❌ Skipping invalid question: Missing required fields`);
               errorCount++;
               continue;
            }

            // Validate options
            if (q.options.length !== 4) {
               console.error(`❌ Skipping question: Must have exactly 4 options`);
               errorCount++;
               continue;
            }

            // Validate correct answer
            if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
               console.error(`❌ Skipping question: correctAnswer must be A, B, C, or D`);
               errorCount++;
               continue;
            }

            // Insert question
            await db.insert(questions).values({
               topicId: q.topicId,
               questionText: q.questionText,
               options: q.options,
               correctAnswer: q.correctAnswer,
               difficultyLevel: q.difficultyLevel,
               solutionDetail: q.solutionDetail || "Solution explanation to be added.",
               solutionSteps: q.solutionSteps || [],
               relatedTopics: q.relatedTopics || [],
               tags: q.tags || [],
            });

            successCount++;
            console.log(`✅ Imported: ${q.questionText.substring(0, 50)}...`);
         } catch (err: any) {
            console.error(`❌ Error importing question: ${err.message}`);
            errorCount++;
         }
      }

      console.log(`\n📈 Import Summary:`);
      console.log(`   ✅ Successfully imported: ${successCount}`);
      console.log(`   ❌ Failed: ${errorCount}`);
      console.log(`   📊 Total: ${questionsData.length}`);

   } catch (err: any) {
      console.error(`❌ Fatal error: ${err.message}`);
      process.exit(1);
   }
}

// Get file path from command line argument
const filePath = process.argv[2];

if (!filePath) {
   console.error('❌ Usage: npx tsx bulk-import-questions.ts <path-to-json-file>');
   console.error('   Example: npx tsx bulk-import-questions.ts my-questions.json');
   process.exit(1);
}

importQuestions(filePath).then(() => {
   console.log('✅ Import complete!');
   process.exit(0);
});
