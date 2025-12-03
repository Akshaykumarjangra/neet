import { db } from "./server/db";
import { questions, contentTopics } from "./shared/schema";
import { eq } from "drizzle-orm";

/**
 * Generate Real NEET Questions
 * 
 * This script generates real NEET-level questions with proper options,
 * answers, and explanations to replace placeholder questions.
 */

// Sample real NEET questions by subject
const physicsQuestions = [
   {
      topic: "Kinematics",
      questions: [
         {
            text: "A particle moves in a straight line with uniform acceleration. If it covers 10 m in the 2nd second and 20 m in the 4th second, what is its acceleration?",
            options: ["2.5 m/s²", "5 m/s²", "7.5 m/s²", "10 m/s²"],
            correctAnswer: "B",
            explanation: "Using s_n = u + a(n - 0.5), we get: 10 = u + a(1.5) and 20 = u + a(3.5). Solving these equations: a = 5 m/s²",
            steps: [
               "Apply formula for distance in nth second: s_n = u + a(n - 0.5)",
               "For 2nd second: 10 = u + 1.5a ... (1)",
               "For 4th second: 20 = u + 3.5a ... (2)",
               "Subtract (1) from (2): 10 = 2a",
               "Therefore, a = 5 m/s²"
            ]
         },
         {
            text: "A body is thrown vertically upward with velocity 20 m/s. What is the maximum height reached? (g = 10 m/s²)",
            options: ["10 m", "20 m", "30 m", "40 m"],
            correctAnswer: "B",
            explanation: "Using v² = u² - 2gh, at maximum height v = 0. So 0 = (20)² - 2(10)h, giving h = 20 m",
            steps: [
               "At maximum height, final velocity v = 0",
               "Use equation: v² = u² - 2gh",
               "Substitute: 0 = (20)² - 2(10)h",
               "0 = 400 - 20h",
               "h = 20 m"
            ]
         }
      ]
   },
   {
      topic: "Laws of Motion",
      questions: [
         {
            text: "A block of mass 5 kg is placed on a rough horizontal surface. If coefficient of friction is 0.4, what is the maximum force of static friction? (g = 10 m/s²)",
            options: ["10 N", "20 N", "30 N", "40 N"],
            correctAnswer: "B",
            explanation: "Maximum static friction f_max = μN = μmg = 0.4 × 5 × 10 = 20 N",
            steps: [
               "Normal force N = mg (on horizontal surface)",
               "N = 5 × 10 = 50 N",
               "Maximum static friction f_max = μN",
               "f_max = 0.4 × 50 = 20 N"
            ]
         },
         {
            text: "Two blocks of masses 2 kg and 3 kg are connected by a string passing over a frictionless pulley. What is the acceleration of the system? (g = 10 m/s²)",
            options: ["1 m/s²", "2 m/s²", "3 m/s²", "4 m/s²"],
            correctAnswer: "B",
            explanation: "For Atwood machine: a = (m₂ - m₁)g/(m₁ + m₂) = (3 - 2) × 10/(2 + 3) = 2 m/s²",
            steps: [
               "Use Atwood machine formula: a = (m₂ - m₁)g/(m₁ + m₂)",
               "Here m₁ = 2 kg, m₂ = 3 kg",
               "a = (3 - 2) × 10/(2 + 3)",
               "a = 10/5 = 2 m/s²"
            ]
         }
      ]
   }
];

const chemistryQuestions = [
   {
      topic: "Atomic Structure",
      questions: [
         {
            text: "What is the maximum number of electrons that can be accommodated in the M shell?",
            options: ["2", "8", "18", "32"],
            correctAnswer: "C",
            explanation: "Maximum electrons in a shell = 2n². For M shell (n=3): 2(3)² = 18 electrons",
            steps: [
               "Use formula: Maximum electrons = 2n²",
               "M shell corresponds to n = 3",
               "Maximum electrons = 2 × (3)²",
               "= 2 × 9 = 18 electrons"
            ]
         },
         {
            text: "Which of the following has the highest ionization energy?",
            options: ["Na", "Mg", "Al", "Si"],
            correctAnswer: "D",
            explanation: "Ionization energy increases across a period. Si has the highest nuclear charge among the options, hence highest ionization energy",
            steps: [
               "All elements are in the same period (Period 3)",
               "Ionization energy increases left to right across a period",
               "Order: Na < Mg < Al < Si",
               "Therefore, Si has the highest ionization energy"
            ]
         }
      ]
   },
   {
      topic: "Chemical Bonding",
      questions: [
         {
            text: "What is the hybridization of carbon in methane (CH₄)?",
            options: ["sp", "sp²", "sp³", "sp³d"],
            correctAnswer: "C",
            explanation: "Methane has tetrahedral geometry with 4 sigma bonds, requiring sp³ hybridization",
            steps: [
               "Carbon forms 4 bonds with hydrogen",
               "Steric number = 4 (4 bond pairs, 0 lone pairs)",
               "Geometry is tetrahedral",
               "Hybridization is sp³"
            ]
         }
      ]
   }
];

const biologyQuestions = [
   {
      topic: "Cell Structure and Function",
      questions: [
         {
            text: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
            correctAnswer: "B",
            explanation: "Mitochondria produce ATP through cellular respiration, providing energy for cellular activities",
            steps: [
               "Mitochondria perform cellular respiration",
               "They convert glucose into ATP",
               "ATP is the energy currency of the cell",
               "Hence called 'powerhouse of the cell'"
            ]
         },
         {
            text: "What is the function of ribosomes?",
            options: ["DNA replication", "Protein synthesis", "Lipid synthesis", "Photosynthesis"],
            correctAnswer: "B",
            explanation: "Ribosomes are the sites of protein synthesis where mRNA is translated into proteins",
            steps: [
               "Ribosomes read mRNA sequences",
               "They assemble amino acids into proteins",
               "This process is called translation",
               "Primary function is protein synthesis"
            ]
         }
      ]
   },
   {
      topic: "Human Physiology",
      questions: [
         {
            text: "What is the normal pH of human blood?",
            options: ["6.8-7.0", "7.0-7.2", "7.35-7.45", "7.5-7.8"],
            correctAnswer: "C",
            explanation: "Normal blood pH is maintained between 7.35-7.45, slightly alkaline",
            steps: [
               "Blood pH is tightly regulated",
               "Normal range: 7.35-7.45",
               "Below 7.35 is acidosis",
               "Above 7.45 is alkalosis"
            ]
         }
      ]
   }
];

async function generateRealQuestions() {
   try {
      console.log('🎯 Generating real NEET questions...\n');

      // Get all topics
      const topics = await db.select().from(contentTopics);
      const topicMap = new Map(topics.map(t => [t.topicName, t]));

      let totalGenerated = 0;
      let totalUpdated = 0;

      // Process Physics questions
      for (const topicData of physicsQuestions) {
         const topic = topics.find(t =>
            t.subject === 'Physics' && t.topicName.includes(topicData.topic)
         );

         if (!topic) {
            console.log(`⚠️  Topic not found: Physics - ${topicData.topic}`);
            continue;
         }

         // Get placeholder questions for this topic
         const placeholders = await db.select()
            .from(questions)
            .where(eq(questions.topicId, topic.id))
            .limit(topicData.questions.length);

         for (let i = 0; i < topicData.questions.length && i < placeholders.length; i++) {
            const q = topicData.questions[i];
            const placeholder = placeholders[i];

            await db.update(questions)
               .set({
                  questionText: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  solutionDetail: q.explanation,
                  solutionSteps: q.steps,
                  difficultyLevel: Math.floor(Math.random() * 3) + 1, // 1-3 for variety
               })
               .where(eq(questions.id, placeholder.id));

            totalUpdated++;
         }

         totalGenerated += topicData.questions.length;
         console.log(`✅ ${topic.subject} - ${topic.topicName}: ${topicData.questions.length} questions`);
      }

      // Process Chemistry questions
      for (const topicData of chemistryQuestions) {
         const topic = topics.find(t =>
            t.subject === 'Chemistry' && t.topicName.includes(topicData.topic)
         );

         if (!topic) {
            console.log(`⚠️  Topic not found: Chemistry - ${topicData.topic}`);
            continue;
         }

         const placeholders = await db.select()
            .from(questions)
            .where(eq(questions.topicId, topic.id))
            .limit(topicData.questions.length);

         for (let i = 0; i < topicData.questions.length && i < placeholders.length; i++) {
            const q = topicData.questions[i];
            const placeholder = placeholders[i];

            await db.update(questions)
               .set({
                  questionText: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  solutionDetail: q.explanation,
                  solutionSteps: q.steps,
                  difficultyLevel: Math.floor(Math.random() * 3) + 1,
               })
               .where(eq(questions.id, placeholder.id));

            totalUpdated++;
         }

         totalGenerated += topicData.questions.length;
         console.log(`✅ ${topic.subject} - ${topic.topicName}: ${topicData.questions.length} questions`);
      }

      // Process Biology questions
      for (const topicData of biologyQuestions) {
         const topic = topics.find(t =>
            (t.subject === 'Botany' || t.subject === 'Zoology') &&
            t.topicName.includes(topicData.topic)
         );

         if (!topic) {
            console.log(`⚠️  Topic not found: Biology - ${topicData.topic}`);
            continue;
         }

         const placeholders = await db.select()
            .from(questions)
            .where(eq(questions.topicId, topic.id))
            .limit(topicData.questions.length);

         for (let i = 0; i < topicData.questions.length && i < placeholders.length; i++) {
            const q = topicData.questions[i];
            const placeholder = placeholders[i];

            await db.update(questions)
               .set({
                  questionText: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  solutionDetail: q.explanation,
                  solutionSteps: q.steps,
                  difficultyLevel: Math.floor(Math.random() * 3) + 1,
               })
               .where(eq(questions.id, placeholder.id));

            totalUpdated++;
         }

         totalGenerated += topicData.questions.length;
         console.log(`✅ ${topic.subject} - ${topic.topicName}: ${topicData.questions.length} questions`);
      }

      console.log(`\n📊 Summary:`);
      console.log(`   Questions generated: ${totalGenerated}`);
      console.log(`   Questions updated in database: ${totalUpdated}`);
      console.log(`\n💡 Note: This is a small sample. You can add more questions to the arrays above.`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

generateRealQuestions().then(() => {
   console.log('\n✅ Generation complete!');
   process.exit(0);
});
