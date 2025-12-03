import { db } from "./server/db";
import { questions, contentTopics } from "./shared/schema";
import { eq } from "drizzle-orm";

/**
 * Bulk Question Generator
 * Generates thousands of questions using templates and patterns
 */

// Question templates by difficulty and topic type
const templates = {
   physics: {
      numerical: [
         {
            pattern: "A {object} of mass {mass} kg moves with velocity {velocity} m/s. Calculate its {property}.",
            objects: ["body", "particle", "block", "car", "ball"],
            properties: ["momentum", "kinetic energy", "force required to stop it in {time} seconds"],
            generator: (obj: string, mass: number, vel: number, prop: string) => {
               const options = prop.includes("momentum")
                  ? [mass * vel * 0.8, mass * vel, mass * vel * 1.2, mass * vel * 1.5]
                  : prop.includes("kinetic")
                     ? [0.5 * mass * vel * vel * 0.8, 0.5 * mass * vel * vel, 0.5 * mass * vel * vel * 1.2, 0.5 * mass * vel * vel * 1.5]
                     : [mass * vel / 2, mass * vel / 3, mass * vel / 4, mass * vel / 5];

               return {
                  text: `A ${obj} of mass ${mass} kg moves with velocity ${vel} m/s. Calculate its ${prop}.`,
                  options: options.map(o => `${o.toFixed(1)} ${prop.includes("momentum") ? "kg⋅m/s" : "J"}`),
                  correctAnswer: "B",
                  explanation: prop.includes("momentum")
                     ? `Momentum p = mv = ${mass} × ${vel} = ${mass * vel} kg⋅m/s`
                     : `Kinetic energy KE = ½mv² = ½ × ${mass} × ${vel}² = ${0.5 * mass * vel * vel} J`
               };
            }
         }
      ],
      conceptual: [
         "Which law explains {phenomenon}?",
         "What happens to {quantity} when {condition}?",
         "The SI unit of {physical_quantity} is:"
      ]
   },
   chemistry: {
      conceptual: [
         {
            pattern: "Which element has atomic number {number}?",
            generator: (num: number) => {
               const elements = [
                  { num: 1, name: "Hydrogen", symbol: "H" },
                  { num: 6, name: "Carbon", symbol: "C" },
                  { num: 7, name: "Nitrogen", symbol: "N" },
                  { num: 8, name: "Oxygen", symbol: "O" },
                  { num: 11, name: "Sodium", symbol: "Na" },
                  { num: 17, name: "Chlorine", symbol: "Cl" },
                  { num: 20, name: "Calcium", symbol: "Ca" }
               ];

               const correct = elements.find(e => e.num === num) || elements[0];
               const others = elements.filter(e => e.num !== num).slice(0, 3);

               return {
                  text: `Which element has atomic number ${num}?`,
                  options: [correct.name, ...others.map(e => e.name)],
                  correctAnswer: "A",
                  explanation: `${correct.name} (${correct.symbol}) has atomic number ${num}.`
               };
            }
         }
      ]
   },
   biology: {
      factual: [
         {
            pattern: "The function of {organelle} is:",
            organelles: [
               { name: "mitochondria", function: "Energy production (ATP synthesis)", others: ["Protein synthesis", "Photosynthesis", "DNA replication"] },
               { name: "ribosome", function: "Protein synthesis", others: ["Energy production", "Lipid synthesis", "DNA replication"] },
               { name: "chloroplast", function: "Photosynthesis", others: ["Respiration", "Protein synthesis", "Cell division"] },
               { name: "nucleus", function: "Genetic control and DNA storage", others: ["Energy production", "Protein synthesis", "Photosynthesis"] }
            ],
            generator: (organelle: any) => {
               return {
                  text: `The function of ${organelle.name} is:`,
                  options: [organelle.function, ...organelle.others],
                  correctAnswer: "A",
                  explanation: `${organelle.name.charAt(0).toUpperCase() + organelle.name.slice(1)} is responsible for ${organelle.function.toLowerCase()}.`
               };
            }
         }
      ]
   }
};

async function bulkGenerate(count: number = 1000) {
   try {
      console.log(`🎯 Bulk generating ${count} questions...\n`);

      const topics = await db.select().from(contentTopics);
      let totalGenerated = 0;

      // Physics numerical questions
      const physicsTopics = topics.filter(t => t.subject === 'Physics');
      for (const topic of physicsTopics.slice(0, 10)) {
         const questionsToGenerate = Math.min(20, count - totalGenerated);
         if (questionsToGenerate <= 0) break;

         const placeholders = await db.select()
            .from(questions)
            .where(eq(questions.topicId, topic.id))
            .limit(questionsToGenerate);

         for (let i = 0; i < Math.min(questionsToGenerate, placeholders.length); i++) {
            const mass = Math.floor(Math.random() * 10) + 1;
            const velocity = Math.floor(Math.random() * 20) + 5;
            const template = templates.physics.numerical[0];

            const q = template.generator(
               template.objects[i % template.objects.length],
               mass,
               velocity,
               template.properties[i % template.properties.length]
            );

            await db.update(questions)
               .set({
                  questionText: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  solutionDetail: q.explanation,
                  solutionSteps: [q.explanation],
                  difficultyLevel: Math.floor(Math.random() * 3) + 1,
               })
               .where(eq(questions.id, placeholders[i].id));

            totalGenerated++;
         }

         console.log(`✅ ${topic.topicName}: ${Math.min(questionsToGenerate, placeholders.length)} questions`);
      }

      // Chemistry questions
      const chemTopics = topics.filter(t => t.subject === 'Chemistry');
      for (const topic of chemTopics.slice(0, 10)) {
         const questionsToGenerate = Math.min(15, count - totalGenerated);
         if (questionsToGenerate <= 0) break;

         const placeholders = await db.select()
            .from(questions)
            .where(eq(questions.topicId, topic.id))
            .limit(questionsToGenerate);

         for (let i = 0; i < Math.min(questionsToGenerate, placeholders.length); i++) {
            const atomicNumbers = [1, 6, 7, 8, 11, 17, 20];
            const num = atomicNumbers[i % atomicNumbers.length];
            const template = templates.chemistry.conceptual[0];

            const q = template.generator(num);

            await db.update(questions)
               .set({
                  questionText: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  solutionDetail: q.explanation,
                  solutionSteps: [q.explanation],
                  difficultyLevel: 1,
               })
               .where(eq(questions.id, placeholders[i].id));

            totalGenerated++;
         }

         console.log(`✅ ${topic.topicName}: ${Math.min(questionsToGenerate, placeholders.length)} questions`);
      }

      // Biology questions
      const bioTopics = topics.filter(t => t.subject === 'Botany' || t.subject === 'Zoology');
      for (const topic of bioTopics.slice(0, 10)) {
         const questionsToGenerate = Math.min(15, count - totalGenerated);
         if (questionsToGenerate <= 0) break;

         const placeholders = await db.select()
            .from(questions)
            .where(eq(questions.topicId, topic.id))
            .limit(questionsToGenerate);

         const template = templates.biology.factual[0];

         for (let i = 0; i < Math.min(questionsToGenerate, placeholders.length); i++) {
            const organelle = template.organelles[i % template.organelles.length];
            const q = template.generator(organelle);

            await db.update(questions)
               .set({
                  questionText: q.text,
                  options: q.options,
                  correctAnswer: q.correctAnswer,
                  solutionDetail: q.explanation,
                  solutionSteps: [q.explanation],
                  difficultyLevel: 1,
               })
               .where(eq(questions.id, placeholders[i].id));

            totalGenerated++;
         }

         console.log(`✅ ${topic.topicName}: ${Math.min(questionsToGenerate, placeholders.length)} questions`);
      }

      console.log(`\n📊 Summary:`);
      console.log(`   Total questions generated: ${totalGenerated}`);
      console.log(`   Remaining placeholders: ${5650 - totalGenerated - 84}`);

   } catch (err: any) {
      console.error(`❌ Error: ${err.message}`);
      process.exit(1);
   }
}

// Generate 500 questions
bulkGenerate(500).then(() => {
   console.log('\n✅ Bulk generation complete!');
   process.exit(0);
});
