
import { questionSetGenerator } from "./question-set-generator";

async function main() {
  console.log("╔══════════════════════════════════════════════════════╗");
  console.log("║   NEET Question Set Generator (50,000+ Questions)    ║");
  console.log("╚══════════════════════════════════════════════════════╝");
  console.log("");
  console.log("📋 Generation Plan:");
  console.log("  • Physics: 22 chapters × ~227 questions = ~5,000 questions");
  console.log("  • Chemistry: 44 chapters × ~227 questions = ~10,000 questions");
  console.log("  • Botany: 37 chapters × ~338 questions = ~12,500 questions");
  console.log("  • Zoology: 37 chapters × ~338 questions = ~12,500 questions");
  console.log("  • Total: 500+ sets × 100 questions = 50,000+ questions");
  console.log("");
  console.log("⚙️  Question Distribution per Set:");
  console.log("  • Easy (30%): 30 questions");
  console.log("  • Medium (50%): 50 questions");
  console.log("  • Hard (20%): 20 questions");
  console.log("");
  console.log("Starting generation process...\n");

  const startTime = Date.now();
  
  try {
    await questionSetGenerator.generateAllQuestionSets();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log("\n" + "=".repeat(60));
    console.log(`✅ Generation completed in ${duration} seconds`);
    console.log("=".repeat(60));
    
  } catch (error) {
    console.error("\n❌ Generation failed:", error);
    process.exit(1);
  }
}

main();
