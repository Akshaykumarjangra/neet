
import { questionSetGenerator } from "./question-set-generator";

async function main() {
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║      NEET 50K+ Question Generation - Enhanced       ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log("");
  console.log("📊 Target Distribution:");
  console.log("  ├─ Physics:    22 chapters × ~227 q = ~5,000 questions");
  console.log("  ├─ Chemistry:  44 chapters × ~227 q = ~10,000 questions");
  console.log("  ├─ Botany:     37 chapters × ~338 q = ~12,500 questions");
  console.log("  └─ Zoology:    37 chapters × ~338 q = ~12,500 questions");
  console.log("");
  console.log("📈 Quality Metrics:");
  console.log("  • Real NEET-style questions with detailed solutions");
  console.log("  • Chapter-specific content alignment");
  console.log("  • Difficulty distribution: 30% Easy, 50% Medium, 20% Hard");
  console.log("  • Step-by-step solutions for each question");
  console.log("");
  console.log("🚀 Starting generation process...\n");

  const startTime = Date.now();
  
  try {
    await questionSetGenerator.generateAllQuestionSets();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);
    
    console.log("\n" + "=".repeat(60));
    console.log(`✅ Generation completed successfully!`);
    console.log(`⏱️  Time taken: ${duration} minutes`);
    console.log("=".repeat(60));
    console.log("\n📝 Next steps:");
    console.log("  1. Verify questions in database");
    console.log("  2. Test question retrieval via API");
    console.log("  3. Access via /api/questions endpoint");
    
  } catch (error) {
    console.error("\n❌ Generation failed:", error);
    process.exit(1);
  }
}

main();
