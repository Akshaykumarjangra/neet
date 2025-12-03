import { biologyContentGenerator } from "./biology-content-generator";
import { writeFileSync } from "fs";
import { join } from "path";

// List of chapters identified with content mismatches
const BOTANY_CHAPTERS_TO_FIX = [1, 16, 17, 19, 20, 21, 22, 24, 26, 28];
const ZOOLOGY_CHAPTERS_TO_FIX = [1, 10, 11, 12, 13, 14, 15, 18, 19, 20];

async function fixBiologyChapters() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║     Fix Biology Chapter Content Mismatches             ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  const results = {
    botany: {} as Record<number, any>,
    zoology: {} as Record<number, any>,
  };

  // Fix Botany chapters
  console.log(`🌿 Fixing ${BOTANY_CHAPTERS_TO_FIX.length} Botany chapters...\n`);
  for (const chapterNum of BOTANY_CHAPTERS_TO_FIX) {
    try {
      console.log(`  📖 Generating Botany Chapter ${chapterNum}...`);
      const content = await biologyContentGenerator.generateChapterContent("Botany", chapterNum);
      results.botany[chapterNum] = content;
      console.log(`  ✓ ${content.title}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    } catch (error) {
      console.error(`  ✗ Failed: Chapter ${chapterNum}`, error);
    }
  }

  // Fix Zoology chapters
  console.log(`\n🦁 Fixing ${ZOOLOGY_CHAPTERS_TO_FIX.length} Zoology chapters...\n`);
  for (const chapterNum of ZOOLOGY_CHAPTERS_TO_FIX) {
    try {
      console.log(`  📖 Generating Zoology Chapter ${chapterNum}...`);
      const content = await biologyContentGenerator.generateChapterContent("Zoology", chapterNum);
      results.zoology[chapterNum] = content;
      console.log(`  ✓ ${content.title}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    } catch (error) {
      console.error(`  ✗ Failed: Chapter ${chapterNum}`, error);
    }
  }

  // Save results
  const outputDir = join(process.cwd(), "generated-content");
  writeFileSync(
    join(outputDir, "fixed-biology-chapters.json"),
    JSON.stringify(results, null, 2)
  );

  console.log("\n╔══════════════════════════════════════════════════════════╗");
  console.log("║              Fix Complete!                               ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log(`\n✅ Fixed Chapters:`);
  console.log(`  • Botany: ${BOTANY_CHAPTERS_TO_FIX.length} chapters`);
  console.log(`  • Zoology: ${ZOOLOGY_CHAPTERS_TO_FIX.length} chapters`);
  console.log(`\n📁 Saved to: generated-content/fixed-biology-chapters.json`);
}

fixBiologyChapters().catch(console.error);
