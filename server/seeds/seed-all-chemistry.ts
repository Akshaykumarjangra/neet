import { seedPhysicalChemistryClass11 } from "./seed-physical-chemistry-class11";
import { seedPhysicalChemistryClass12 } from "./seed-physical-chemistry-class12";
import { seedOrganicChemistry } from "./seed-organic-chemistry";
import { seedInorganicChemistry } from "./seed-inorganic-chemistry";
import { seedChemistryClass11Visualizations } from "./seed-chemistry-class11-visuals";
import { seedChemistryClass11Metadata } from "./seed-chemistry-class11-metadata";

async function seedAllChemistry() {
  console.log("=".repeat(60));
  console.log("Starting Complete Chemistry Content Seeding");
  console.log("=".repeat(60));
  
  try {
    console.log("\n📚 PHYSICAL CHEMISTRY CLASS 11");
    console.log("-".repeat(40));
    await seedPhysicalChemistryClass11();
    
    console.log("\n📚 PHYSICAL CHEMISTRY CLASS 12");
    console.log("-".repeat(40));
    await seedPhysicalChemistryClass12();
    
    console.log("\n🧪 ORGANIC CHEMISTRY (CLASS 11 & 12)");
    console.log("-".repeat(40));
    await seedOrganicChemistry();
    
    console.log("\n⚗️ INORGANIC CHEMISTRY (CLASS 11 & 12)");
    console.log("-".repeat(40));
    await seedInorganicChemistry();

    console.log("\nUpdating Class 11 Chemistry visualizations");
    console.log("-".repeat(40));
    await seedChemistryClass11Visualizations();

    console.log("\nUpdating Class 11 Chemistry learning metadata");
    console.log("-".repeat(40));
    await seedChemistryClass11Metadata();
    
    console.log("\n" + "=".repeat(60));
    console.log("✅ ALL CHEMISTRY CONTENT SEEDED SUCCESSFULLY!");
    console.log("=".repeat(60));
    
  } catch (error) {
    console.error("Error during chemistry seeding:", error);
    throw error;
  }
}

seedAllChemistry()
  .then(() => {
    console.log("\nSeeding complete. Exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
