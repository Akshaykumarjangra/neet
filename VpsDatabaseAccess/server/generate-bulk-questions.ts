
import { bulkQuestionGenerator } from "./bulk-question-generator";

async function main() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║     NEET 50K+ Question Generator (Sets of 20)           ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("");
  console.log("📊 Generation Plan:");
  console.log("  • Total Target: 50,000+ questions");
  console.log("  • Batch Size: 20 questions per set");
  console.log("  • Total Sets: ~2,500 sets");
  console.log("");
  console.log("📚 Subject Distribution:");
  console.log("  • Physics:    12,000 questions (24 chapters)");
  console.log("  • Chemistry:  13,000 questions (44 chapters)");
  console.log("  • Botany:     12,500 questions (37 chapters)");
  console.log("  • Zoology:    12,500 questions (37 chapters)");
  console.log("");
  console.log("📈 Difficulty Distribution (per set):");
  console.log("  • Easy:    6 questions (30%)");
  console.log("  • Medium: 10 questions (50%)");
  console.log("  • Hard:    4 questions (20%)");
  console.log("");
  console.log("🚀 Starting generation...\n");

  const startTime = Date.now();
  
  try {
    await bulkQuestionGenerator.generateAllQuestions();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);
    
    console.log("\n" + "=".repeat(60));
    console.log(`✅ Generation completed successfully!`);
    console.log(`⏱️  Time taken: ${duration} minutes`);
    console.log("=".repeat(60));
    console.log("\n📝 Next steps:");
    console.log("  1. Questions are now available in the database");
    console.log("  2. Access via /api/questions endpoint");
    console.log("  3. Use in mock tests and practice sessions");
    
  } catch (error) {
    console.error("\n❌ Generation failed:", error);
    process.exit(1);
  }
}

main();
