import { db } from "./server/db";
import { chapterContent } from "./shared/schema";
import { eq } from "drizzle-orm";

async function updateChapterDifficulty() {
   try {
      console.log('🎯 Updating chapter difficulty levels...\n');

      const allChapters = await db.select().from(chapterContent);
      console.log(`📊 Total chapters found: ${allChapters.length}\n`);

      // Include Botany and Zoology as separate subjects for now
      const subjects = ['Physics', 'Chemistry', 'Botany', 'Zoology'];
      const classes = ['Class 11', 'Class 12'];

      for (const subject of subjects) {
         console.log(`\n📚 ${subject}:`);

         for (const classLevel of classes) {
            const chapters = allChapters.filter(
               ch => ch.subject === subject && ch.classLevel === classLevel
            );

            if (chapters.length === 0) {
               console.log(`  ${classLevel}: No chapters found`);
               continue;
            }

            chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
            const totalChapters = chapters.length;

            if (classLevel === 'Class 11') {
               // Class 11: 60% Easy, 40% Medium
               const easyCount = Math.ceil(totalChapters * 0.6);

               for (let i = 0; i < chapters.length; i++) {
                  const chapter = chapters[i];
                  const difficultyLevel = i < easyCount ? (i % 2 === 0 ? 1 : 2) : (i % 2 === 0 ? 3 : 4);

                  await db.update(chapterContent)
                     .set({ difficultyLevel })
                     .where(eq(chapterContent.id, chapter.id));
               }

               console.log(`  ${classLevel}: ${chapters.length} chapters (${easyCount} Easy, ${totalChapters - easyCount} Medium)`);

            } else {
               // Class 12: 40% Medium, 60% Hard
               const mediumCount = Math.ceil(totalChapters * 0.4);

               for (let i = 0; i < chapters.length; i++) {
                  const chapter = chapters[i];
                  const difficultyLevel = i < mediumCount ? (i % 2 === 0 ? 3 : 4) : (i % 2 === 0 ? 5 : 6);

                  await db.update(chapterContent)
                     .set({ difficultyLevel })
                     .where(eq(chapterContent.id, chapter.id));
               }

               console.log(`  ${classLevel}: ${chapters.length} chapters (${mediumCount} Medium, ${totalChapters - mediumCount} Hard)`);
            }
         }
      }

      console.log('\n✅ Chapter difficulty levels updated successfully!');

      const updated = await db.select().from(chapterContent);
      const easy = updated.filter(ch => ch.difficultyLevel <= 2).length;
      const medium = updated.filter(ch => ch.difficultyLevel >= 3 && ch.difficultyLevel <= 4).length;
      const hard = updated.filter(ch => ch.difficultyLevel >= 5).length;

      console.log('\n📊 Final Distribution:');
      console.log(`  Easy (1-2): ${easy} chapters`);
      console.log(`  Medium (3-4): ${medium} chapters`);
      console.log(`  Hard (5-6): ${hard} chapters`);
      console.log(`  Total: ${updated.length} chapters`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

updateChapterDifficulty().then(() => {
   console.log('\n✅ Update complete!');
   process.exit(0);
});
