import { db } from "./server/db";
import { questions, contentTopics } from "./shared/schema";
import { eq } from "drizzle-orm";

async function verifyGenerated() {
   const topics = await db.select().from(contentTopics);

   // Check Physics - Kinematics
   const kinematicsTopic = topics.find(t =>
      t.subject === 'Physics' && t.topicName.includes('Kinematics')
   );

   if (kinematicsTopic) {
      console.log('Found topic:', kinematicsTopic.topicName, 'ID:', kinematicsTopic.id);

      const topicQuestions = await db.select()
         .from(questions)
         .where(eq(questions.topicId, kinematicsTopic.id))
         .limit(5);

      console.log('\nFirst 5 questions from this topic:');
      topicQuestions.forEach((q, i) => {
         console.log(`\n${i + 1}. ${q.questionText.substring(0, 80)}...`);
         console.log(`   Options:`, q.options);
      });
   }

   process.exit(0);
}

verifyGenerated();
