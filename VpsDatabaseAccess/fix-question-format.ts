import { db } from "./server/db";
import { questions } from "./shared/schema";
import { eq } from "drizzle-orm";

/**
 * Fix Question Format
 * - Replace {time} placeholders
 * - Convert options to proper format { id: string, text: string }[]
 */

async function fixQuestionFormat() {
   try {
      console.log('🔧 Fixing question format...\n');

      const allQuestions = await db.select().from(questions);
      let fixed = 0;

      for (const q of allQuestions) {
         let needsUpdate = false;
         let updatedText = q.questionText;
         let updatedOptions = q.options;

         // Fix {time} placeholder
         if (q.questionText.includes('{time}')) {
            updatedText = q.questionText.replace(/{time}/g, '5');
            needsUpdate = true;
         }

         // Fix options format
         if (Array.isArray(q.options) && q.options.length > 0) {
            const firstOption = q.options[0];

            // If options are strings, convert to proper format
            if (typeof firstOption === 'string') {
               updatedOptions = q.options.map((opt: any, idx: number) => ({
                  id: String.fromCharCode(65 + idx), // A, B, C, D
                  text: opt
               }));
               needsUpdate = true;
            }
            // If options already have id/text but text is missing
            else if (typeof firstOption === 'object' && !firstOption.text && firstOption.id) {
               // Already in correct format, skip
            }
         }

         if (needsUpdate) {
            await db.update(questions)
               .set({
                  questionText: updatedText,
                  options: updatedOptions
               })
               .where(eq(questions.id, q.id));

            fixed++;

            if (fixed % 100 === 0) {
               console.log(`✅ Fixed ${fixed} questions...`);
            }
         }
      }

      console.log(`\n📊 Summary:`);
      console.log(`   Total questions checked: ${allQuestions.length}`);
      console.log(`   Questions fixed: ${fixed}`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      console.error(err.stack);
      process.exit(1);
   }
}

fixQuestionFormat().then(() => {
   console.log('\n✅ Fix complete!');
   process.exit(0);
});
