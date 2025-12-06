import { seedBotany } from "./seed-botany";
import { seedZoology } from "./seed-zoology";

async function seedAllBiology() {
  console.log("=".repeat(60));
  console.log("Starting Complete Biology Content Seeding");
  console.log("=".repeat(60));
  
  try {
    console.log("\n🌱 BOTANY (CLASS 11 & 12)");
    console.log("-".repeat(40));
    await seedBotany();
    
    console.log("\n🦎 ZOOLOGY (CLASS 11 & 12)");
    console.log("-".repeat(40));
    await seedZoology();
    
    console.log("\n" + "=".repeat(60));
    console.log("✅ ALL BIOLOGY CONTENT SEEDED SUCCESSFULLY!");
    console.log("=".repeat(60));
    
  } catch (error) {
    console.error("Error during biology seeding:", error);
    throw error;
  }
}

seedAllBiology()
  .then(() => {
    console.log("\nSeeding complete. Exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
