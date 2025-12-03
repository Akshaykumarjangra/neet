import { db } from "./server/db";
import { questions } from "@shared/schema";
import { eq } from "drizzle-orm";
import * as fs from 'fs';

/**
 * Batch Update Questions Tool
 * 
 * This tool allows you to update multiple questions at once from a JSON file.
 * Each question must include an 'id' field to identify which question to update.
 */

interface QuestionUpdate {
   id: number;
   questionText?: string;
   options?: string[];
   correctAnswer?: string;
   difficultyLevel?: 1 | 2 | 3;
   solutionDetail?: string;
   solutionSteps?: string[];
   relatedTopics?: string[];
   tags?: string[];
}

async function batchUpdateQuestions(filePath: string) {
   try {
      console.log(`📂 Reading updates from: ${filePath}`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const updates: QuestionUpdate[] = JSON.parse(fileContent);

      console.log(`📊 Found ${updates.length} questions to update`);

      let successCount = 0;
      let errorCount = 0;

      for (const update of updates) {
         try {
            if (!update.id) {
               console.error(`❌ Skipping: Missing question ID`);
               errorCount++;
               continue;
            }

            // Build update object (only include provided fields)
            const updateData: any = {};
            if (update.questionText) updateData.questionText = update.questionText;
            if (update.options) updateData.options = update.options;
            if (update.correctAnswer) updateData.correctAnswer = update.correctAnswer;
            if (update.difficultyLevel) updateData.difficultyLevel = update.difficultyLevel;
            if (update.solutionDetail) updateData.solutionDetail = update.solutionDetail;
            if (update.solutionSteps) updateData.solutionSteps = update.solutionSteps;
            if (update.relatedTopics) updateData.relatedTopics = update.relatedTopics;
            if (update.tags) updateData.tags = update.tags;

            // Update the question
            await db.update(questions)
               .set(updateData)
               .where(eq(questions.id, update.id));

            successCount++;
            console.log(`✅ Updated question ${update.id}: ${update.questionText?.substring(0, 50)}...`);
         } catch (err: any) {
            console.error(`❌ Error updating question ${update.id}: ${err.message}`);
            errorCount++;
         }
      }

      console.log(`\n📈 Update Summary:`);
      console.log(`   ✅ Successfully updated: ${successCount}`);
      console.log(`   ❌ Failed: ${errorCount}`);
      console.log(`   📊 Total: ${updates.length}`);

   } catch (err: any) {
      console.error(`❌ Fatal error: ${err.message}`);
      process.exit(1);
   }
}

// Get file path from command line argument
const filePath = process.argv[2];

if (!filePath) {
   console.error('❌ Usage: npx tsx batch-update-questions.ts <path-to-json-file>');
   console.error('   Example: npx tsx batch-update-questions.ts placeholder-questions-to-fill.json');
   process.exit(1);
}

batchUpdateQuestions(filePath).then(() => {
   console.log('✅ Batch update complete!');
   process.exit(0);
});
