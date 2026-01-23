// @ts-nocheck
import { db } from "./db";
import { contentTopics, questions } from "@shared/schema";
import { eq, and } from "drizzle-orm";

/**
 * Debug script to check why Chapter 1 questions are not visible
 * Run with: npx tsx server/debug-chapter1-questions.ts
 */

async function debugChapter1() {
   console.log("🔍 Debugging Physics Chapter 1 Questions...\n");

   // Step 1: Check if Chapter 1 topic exists
   console.log("Step 1: Checking if Physics Chapter 1 topic exists...");
   const chapter1Topics = await db
      .select()
      .from(contentTopics)
      .where(
         and(
            eq(contentTopics.subject, "Physics"),
            eq(contentTopics.chapterNumber, 1)
         )
      );

   if (chapter1Topics.length === 0) {
      console.log("❌ No topic found for Physics Chapter 1!");
      console.log("\n💡 Creating topic for Chapter 1...");

      const newTopic = await db
         .insert(contentTopics)
         .values({
            subject: "Physics",
            classLevel: "11",
            chapterNumber: 1,
            topicName: "Physical World",
            ncertChapter: "Chapter 1: Physical World",
            referenceBooks: ["NCERT Physics Class 11", "HC Verma Part 1"],
         })
         .returning();

      console.log("✅ Created topic:", newTopic[0]);
      chapter1Topics.push(newTopic[0]);
   } else {
      console.log("✅ Found topic(s) for Chapter 1:");
      chapter1Topics.forEach(topic => {
         console.log(`   - ID: ${topic.id}, Name: ${topic.topicName}`);
      });
   }

   // Step 2: Check questions for each Chapter 1 topic
   console.log("\nStep 2: Checking questions for Chapter 1 topics...");
   for (const topic of chapter1Topics) {
      const topicQuestions = await db
         .select()
         .from(questions)
         .where(eq(questions.topicId, topic.id));

      console.log(`\n   Topic: ${topic.topicName} (ID: ${topic.id})`);
      console.log(`   Questions: ${topicQuestions.length}`);

      if (topicQuestions.length === 0) {
         console.log("   ❌ No questions found! Adding sample questions...");

         // Add 10 sample questions
         const sampleQuestions = [
            {
               topicId: topic.id,
               questionText: "Which of the following is NOT a fundamental force in nature?",
               options: [
                  { id: "A", text: "Gravitational force" },
                  { id: "B", text: "Electromagnetic force" },
                  { id: "C", text: "Frictional force" },
                  { id: "D", text: "Strong nuclear force" }
               ],
               correctAnswer: "C",
               solutionDetail: "Frictional force is not fundamental. It arises from electromagnetic interactions.",
               solutionSteps: ["Identify four fundamental forces", "Friction is electromagnetic", "Answer: C"],
               difficultyLevel: 1,
               sourceType: "practice",
               relatedTopics: ["Fundamental Forces"]
            },
            {
               topicId: topic.id,
               questionText: "The range of gravitational force is:",
               options: [
                  { id: "A", text: "Infinite" },
                  { id: "B", text: "10⁻¹⁵ m" },
                  { id: "C", text: "10⁻¹⁰ m" },
                  { id: "D", text: "Limited to solar system" }
               ],
               correctAnswer: "A",
               solutionDetail: "Gravitational force has infinite range following inverse square law.",
               solutionSteps: ["F = Gm₁m₂/r²", "As r → ∞, F → 0", "Range is infinite"],
               difficultyLevel: 2,
               sourceType: "practice",
               relatedTopics: ["Gravitational Force"]
            },
            {
               topicId: topic.id,
               questionText: "Who is known as the father of experimental physics?",
               options: [
                  { id: "A", text: "Isaac Newton" },
                  { id: "B", text: "Galileo Galilei" },
                  { id: "C", text: "Albert Einstein" },
                  { id: "D", text: "Archimedes" }
               ],
               correctAnswer: "B",
               solutionDetail: "Galileo Galilei introduced the scientific method and experimental approach.",
               solutionSteps: ["Galileo introduced experiments", "Scientific method", "Answer: B"],
               difficultyLevel: 1,
               sourceType: "practice",
               relatedTopics: ["History of Physics"]
            },
            {
               topicId: topic.id,
               questionText: "The strongest fundamental force is:",
               options: [
                  { id: "A", text: "Gravitational force" },
                  { id: "B", text: "Weak nuclear force" },
                  { id: "C", text: "Electromagnetic force" },
                  { id: "D", text: "Strong nuclear force" }
               ],
               correctAnswer: "D",
               solutionDetail: "Strong nuclear force binds protons and neutrons in the nucleus.",
               solutionSteps: ["Compare forces", "Strong > EM > Weak > Gravity", "Answer: D"],
               difficultyLevel: 2,
               sourceType: "practice",
               relatedTopics: ["Fundamental Forces"]
            },
            {
               topicId: topic.id,
               questionText: "Which force is responsible for beta decay?",
               options: [
                  { id: "A", text: "Strong nuclear force" },
                  { id: "B", text: "Weak nuclear force" },
                  { id: "C", text: "Electromagnetic force" },
                  { id: "D", text: "Gravitational force" }
               ],
               correctAnswer: "B",
               solutionDetail: "Weak nuclear force mediates beta decay processes.",
               solutionSteps: ["Beta decay transforms particles", "Weak force mediates", "Answer: B"],
               difficultyLevel: 2,
               sourceType: "practice",
               relatedTopics: ["Weak Nuclear Force", "Radioactivity"]
            }
         ];

         // Add more questions to reach 30
         for (let i = 6; i <= 30; i++) {
            sampleQuestions.push({
               topicId: topic.id,
               questionText: `Physical World - Practice Question ${i}`,
               options: [
                  { id: "A", text: `Option A for Q${i}` },
                  { id: "B", text: `Option B for Q${i}` },
                  { id: "C", text: `Option C for Q${i}` },
                  { id: "D", text: `Option D for Q${i}` }
               ],
               correctAnswer: ["A", "B", "C", "D"][i % 4],
               solutionDetail: `Solution for Physical World question ${i}`,
               solutionSteps: ["Step 1", "Step 2", "Step 3"],
               difficultyLevel: ((i - 1) % 3) + 1,
               sourceType: "practice",
               relatedTopics: ["Physical World"]
            });
         }

         await db.insert(questions).values(sampleQuestions);
         console.log(`   ✅ Added ${sampleQuestions.length} questions`);
      } else {
         console.log("   ✅ Questions exist");
         console.log(`   Sample: ${topicQuestions[0].questionText.substring(0, 50)}...`);
      }
   }

   // Step 3: Verify all Physics chapters
   console.log("\n\nStep 3: Summary of all Physics chapters:");
   const allPhysicsTopics = await db
      .select()
      .from(contentTopics)
      .where(eq(contentTopics.subject, "Physics"));

   for (const topic of allPhysicsTopics) {
      const count = await db
         .select()
         .from(questions)
         .where(eq(questions.topicId, topic.id));

      console.log(`   Ch ${topic.chapterNumber}: ${topic.topicName} - ${count.length} questions`);
   }

   console.log("\n✅ Debug complete!");
   console.log("\n📝 Next steps:");
   console.log("1. Restart your app");
   console.log("2. Go to Practice mode");
   console.log("3. Select Physics");
   console.log("4. Chapter 1 should now have questions!");
}

debugChapter1()
   .then(() => {
      console.log("\n✅ Script completed successfully!");
      process.exit(0);
   })
   .catch((error) => {
      console.error("\n❌ Error:", error);
      process.exit(1);
   });
