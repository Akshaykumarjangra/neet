import { db } from "./server/db";
import { questions, contentTopics } from "@shared/schema";

/**
 * Progress Tracker
 * 
 * Shows a visual representation of how many real questions you have per topic
 */

async function checkProgress() {
   try {
      console.log('📊 NEET Question Database Progress Report\n');
      console.log('='.repeat(70));

      // Get all questions
      const allQuestions = await db.select().from(questions);

      // Get all topics
      const topics = await db.select().from(contentTopics);

      // Calculate stats
      const totalQuestions = allQuestions.length;
      const realQuestions = allQuestions.filter(q =>
         !q.questionText.includes('[Real question content to be added]') &&
         !q.questionText.includes('A comprehensive NEET-level question') &&
         !JSON.stringify(q.options).includes('First possible answer')
      );
      const placeholders = totalQuestions - realQuestions.length;

      console.log(`\n📈 Overall Statistics:`);
      console.log(`   Total Questions: ${totalQuestions}`);
      console.log(`   ✅ Real Questions: ${realQuestions.length} (${((realQuestions.length / totalQuestions) * 100).toFixed(1)}%)`);
      console.log(`   ⏳ Placeholders: ${placeholders} (${((placeholders / totalQuestions) * 100).toFixed(1)}%)`);

      // Progress bar
      const progressPercent = (realQuestions.length / totalQuestions) * 100;
      const progressBar = '█'.repeat(Math.floor(progressPercent / 2)) + '░'.repeat(50 - Math.floor(progressPercent / 2));
      console.log(`\n   Progress: [${progressBar}] ${progressPercent.toFixed(1)}%\n`);

      console.log('='.repeat(70));

      // Group by subject
      const subjects = ['Physics', 'Chemistry', 'Botany', 'Zoology'];

      for (const subject of subjects) {
         const subjectTopics = topics.filter(t => t.subject === subject);
         const subjectQuestions = allQuestions.filter(q =>
            subjectTopics.some(t => t.id === q.topicId)
         );
         const subjectReal = subjectQuestions.filter(q =>
            !q.questionText.includes('[Real question content to be added]') &&
            !q.questionText.includes('A comprehensive NEET-level question') &&
            !JSON.stringify(q.options).includes('First possible answer')
         );

         console.log(`\n📚 ${subject.toUpperCase()}`);
         console.log(`   Total: ${subjectQuestions.length} | Real: ${subjectReal.length} | Placeholders: ${subjectQuestions.length - subjectReal.length}`);

         const subjectProgress = (subjectReal.length / subjectQuestions.length) * 100;
         const subjectBar = '█'.repeat(Math.floor(subjectProgress / 5)) + '░'.repeat(20 - Math.floor(subjectProgress / 5));
         console.log(`   [${subjectBar}] ${subjectProgress.toFixed(1)}%`);

         // Show topics
         for (const topic of subjectTopics) {
            const topicQuestions = allQuestions.filter(q => q.topicId === topic.id);
            const topicReal = topicQuestions.filter(q =>
               !q.questionText.includes('[Real question content to be added]') &&
               !q.questionText.includes('A comprehensive NEET-level question') &&
               !JSON.stringify(q.options).includes('First possible answer')
            );

            const topicProgress = (topicReal.length / topicQuestions.length) * 100;
            const topicBar = '█'.repeat(Math.floor(topicProgress / 10)) + '░'.repeat(10 - Math.floor(topicProgress / 10));
            const status = topicProgress === 100 ? '✅' : topicProgress > 50 ? '🟡' : '🔴';

            console.log(`   ${status} ${topic.topicName.padEnd(30)} [${topicBar}] ${topicReal.length}/${topicQuestions.length}`);
         }
      }

      console.log('\n' + '='.repeat(70));
      console.log('\n💡 Next Steps:');

      // Find topic with least questions
      const topicStats = topics.map(topic => {
         const topicQuestions = allQuestions.filter(q => q.topicId === topic.id);
         const topicReal = topicQuestions.filter(q =>
            !q.questionText.includes('[Real question content to be added]') &&
            !q.questionText.includes('A comprehensive NEET-level question') &&
            !JSON.stringify(q.options).includes('First possible answer')
         );
         return {
            topic,
            real: topicReal.length,
            total: topicQuestions.length,
            percent: (topicReal.length / topicQuestions.length) * 100
         };
      }).sort((a, b) => a.percent - b.percent);

      console.log(`\n   🎯 Focus on these topics first (lowest completion):`);
      topicStats.slice(0, 5).forEach((stat, i) => {
         console.log(`      ${i + 1}. ${stat.topic.subject} - ${stat.topic.topicName}: ${stat.real}/${stat.total} (${stat.percent.toFixed(1)}%)`);
      });

      console.log(`\n   📝 To add questions to a topic:`);
      console.log(`      1. Edit question-template.json with topicId: ${topicStats[0].topic.id}`);
      console.log(`      2. Run: npx tsx bulk-import-questions.ts question-template.json`);
      console.log(`\n   🔍 To replace placeholders:`);
      console.log(`      1. Run: npx tsx find-placeholder-questions.ts`);
      console.log(`      2. Edit: placeholder-questions-to-fill.json`);
      console.log(`      3. Run: npx tsx batch-update-questions.ts placeholder-questions-to-fill.json`);

      console.log('\n' + '='.repeat(70) + '\n');

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

checkProgress().then(() => {
   process.exit(0);
});
