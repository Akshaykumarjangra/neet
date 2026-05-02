/**
 * Simple script to add Physics questions
 * Run with: npx tsx server/add-physics-questions-now.ts
 * 
 * OR import in your seed file:
 * import { addPhysicsQuestions } from "./add-physics-questions-now";
 * await addPhysicsQuestions();
 */

import { seedPhysicsAllChaptersQuestions } from "./seeds/seed-physics-all-chapters-questions";

export async function addPhysicsQuestions() {
   try {
      console.log("🚀 Adding Physics practice questions...\n");
      const count = await seedPhysicsAllChaptersQuestions();
      console.log(`\n✅ Successfully added ${count} questions!`);
      console.log("\n📝 Next steps:");
      console.log("1. Open your NEET Prep app");
      console.log("2. Go to Practice mode");
      console.log("3. Select Physics");
      console.log("4. Choose any chapter");
      console.log("5. Start practicing!\n");
      return count;
   } catch (error) {
      console.error("❌ Error adding questions:", error);
      throw error;
   }
}

// If run directly
if (import.meta.url === `file://${process.argv[1]}`) {
   addPhysicsQuestions()
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
}
