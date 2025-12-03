import { db } from "./server/db";
import { questions } from "./shared/schema";

async function checkRealQuestions() {
   const allQuestions = await db.select().from(questions).limit(100);

   const real = allQuestions.filter(q =>
      !q.questionText.includes('[Real question content to be added]') &&
      !q.questionText.includes('A comprehensive NEET-level question') &&
      !JSON.stringify(q.options).includes('First possible answer')
   );

   console.log('Total checked:', allQuestions.length);
   console.log('Real questions:', real.length);

   if (real.length > 0) {
      console.log('\nSample real question:');
      console.log('Question:', real[0].questionText);
      console.log('Options:', real[0].options);
      console.log('Answer:', real[0].correctAnswer);
   }

   process.exit(0);
}

checkRealQuestions();
