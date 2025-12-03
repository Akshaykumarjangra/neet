import { biologyContentGenerator } from "./biology-content-generator";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

async function main() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║     NEET Biology Chapter Content Generator             ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("");

  try {
    // Create output directory
    const outputDir = join(process.cwd(), "generated-content");
    mkdirSync(outputDir, { recursive: true });

    // Generate Botany chapters
    console.log("🌿 PHASE 1: Generating Botany Chapters");
    console.log("=" .repeat(60));
    const botanyChapters = await biologyContentGenerator.generateAllBotanyChapters();
    
    // Save Botany content
    const botanyData = Object.fromEntries(botanyChapters);
    writeFileSync(
      join(outputDir, "botany-chapters.json"),
      JSON.stringify(botanyData, null, 2)
    );
    console.log(`\n✓ Saved ${botanyChapters.size} Botany chapters to botany-chapters.json\n`);

    // Generate Zoology chapters
    console.log("🦁 PHASE 2: Generating Zoology Chapters");
    console.log("=".repeat(60));
    const zoologyChapters = await biologyContentGenerator.generateAllZoologyChapters();
    
    // Save Zoology content
    const zoologyData = Object.fromEntries(zoologyChapters);
    writeFileSync(
      join(outputDir, "zoology-chapters.json"),
      JSON.stringify(zoologyData, null, 2)
    );
    console.log(`\n✓ Saved ${zoologyChapters.size} Zoology chapters to zoology-chapters.json\n`);

    console.log("╔══════════════════════════════════════════════════════════╗");
    console.log("║              Generation Complete!                        ║");
    console.log("╚══════════════════════════════════════════════════════════╝");
    console.log(`\n📊 Summary:`);
    console.log(`  • Botany Chapters: ${botanyChapters.size}`);
    console.log(`  • Zoology Chapters: ${zoologyChapters.size}`);
    console.log(`  • Total: ${botanyChapters.size + zoologyChapters.size}`);
    console.log(`\n📁 Output: ${outputDir}`);
    console.log("\n✅ Ready to generate React components!");

  } catch (error) {
    console.error("\n❌ Generation failed:", error);
    process.exit(1);
  }
}

main();
