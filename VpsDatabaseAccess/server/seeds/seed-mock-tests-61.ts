import { db } from "../db";
import { mockTests } from "@shared/schema";

export const mockTestData = [
  // Physics Mock Tests (20 tests)
  {
    testType: "full_subject",
    title: "Physics - Class 11 Complete Mock Test 1",
    subject: "Physics",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 1),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Physics - Class 11 Complete Mock Test 2",
    subject: "Physics",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 46),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Physics - Class 12 Complete Mock Test 1",
    subject: "Physics",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 91),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Physics - Class 12 Complete Mock Test 2",
    subject: "Physics",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 136),
    durationMinutes: 60,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Mechanics & Motion (Ch 1-5)",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 181),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Gravitation & Properties of Matter",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 211),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Thermodynamics & Heat",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 241),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Oscillations & Waves",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 271),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Electrostatics & Capacitance",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 301),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Current Electricity & Circuits",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 331),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Magnetism & Electromagnetic Induction",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 361),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Alternating Current & EM Waves",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 391),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Ray Optics & Optical Instruments",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 421),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Wave Optics",
    subject: "Physics",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 451),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Modern Physics (Atoms, Nuclei, Dual Nature)",
    subject: "Physics",
    questionsList: Array.from({ length: 35 }, (_, i) => i + 481),
    durationMinutes: 45,
  },
  {
    testType: "chapter_wise",
    title: "Physics - Semiconductor Electronics",
    subject: "Physics",
    questionsList: Array.from({ length: 25 }, (_, i) => i + 516),
    durationMinutes: 35,
  },
  {
    testType: "mixed",
    title: "Physics - NEET Pattern Full Length Test 1",
    subject: "Physics",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 541),
    durationMinutes: 60,
  },
  {
    testType: "mixed",
    title: "Physics - NEET Pattern Full Length Test 2",
    subject: "Physics",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 586),
    durationMinutes: 60,
  },
  {
    testType: "mixed",
    title: "Physics - NEET Pattern Full Length Test 3",
    subject: "Physics",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 631),
    durationMinutes: 60,
  },
  {
    testType: "mixed",
    title: "Physics - High Difficulty Challenge Test",
    subject: "Physics",
    questionsList: Array.from({ length: 40 }, (_, i) => i + 676),
    durationMinutes: 55,
  },

  // Chemistry Mock Tests (20 tests)
  {
    testType: "full_subject",
    title: "Chemistry - Class 11 Complete Mock Test 1",
    subject: "Chemistry",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 716),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Chemistry - Class 11 Complete Mock Test 2",
    subject: "Chemistry",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 761),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Chemistry - Class 12 Complete Mock Test 1",
    subject: "Chemistry",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 806),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Chemistry - Class 12 Complete Mock Test 2",
    subject: "Chemistry",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 851),
    durationMinutes: 60,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Basic Concepts & Atomic Structure",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 896),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Chemical Bonding & Molecular Structure",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 926),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - States of Matter & Thermodynamics",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 956),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Equilibrium & Redox Reactions",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 986),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Hydrogen & s-Block Elements",
    subject: "Chemistry",
    questionsList: Array.from({ length: 25 }, (_, i) => i + 1016),
    durationMinutes: 35,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - p-Block Elements",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1041),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Organic Chemistry Basics & Hydrocarbons",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1071),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Solid State & Solutions",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1101),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Electrochemistry & Chemical Kinetics",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1131),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - d & f Block Elements",
    subject: "Chemistry",
    questionsList: Array.from({ length: 25 }, (_, i) => i + 1161),
    durationMinutes: 35,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Coordination Compounds",
    subject: "Chemistry",
    questionsList: Array.from({ length: 25 }, (_, i) => i + 1186),
    durationMinutes: 35,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Haloalkanes, Alcohols & Phenols",
    subject: "Chemistry",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1211),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Chemistry - Aldehydes, Ketones, Carboxylic Acids & Amines",
    subject: "Chemistry",
    questionsList: Array.from({ length: 35 }, (_, i) => i + 1241),
    durationMinutes: 45,
  },
  {
    testType: "mixed",
    title: "Chemistry - NEET Pattern Full Length Test 1",
    subject: "Chemistry",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 1276),
    durationMinutes: 60,
  },
  {
    testType: "mixed",
    title: "Chemistry - NEET Pattern Full Length Test 2",
    subject: "Chemistry",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 1321),
    durationMinutes: 60,
  },
  {
    testType: "mixed",
    title: "Chemistry - High Difficulty Challenge Test",
    subject: "Chemistry",
    questionsList: Array.from({ length: 40 }, (_, i) => i + 1366),
    durationMinutes: 55,
  },

  // Biology Mock Tests (21 tests)
  {
    testType: "full_subject",
    title: "Biology - Class 11 Complete Mock Test 1",
    subject: "Biology",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 1406),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Biology - Class 11 Complete Mock Test 2",
    subject: "Biology",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 1451),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Biology - Class 12 Complete Mock Test 1",
    subject: "Biology",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 1496),
    durationMinutes: 60,
  },
  {
    testType: "full_subject",
    title: "Biology - Class 12 Complete Mock Test 2",
    subject: "Biology",
    questionsList: Array.from({ length: 45 }, (_, i) => i + 1541),
    durationMinutes: 60,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Living World, Diversity & Classification",
    subject: "Biology",
    questionsList: Array.from({ length: 25 }, (_, i) => i + 1586),
    durationMinutes: 35,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Plant Kingdom & Animal Kingdom",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1611),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Morphology & Anatomy of Flowering Plants",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1641),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Structural Organization in Animals",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1671),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Cell Structure & Functions",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1701),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Biomolecules & Cell Cycle",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1731),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Transport in Plants & Mineral Nutrition",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1761),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Photosynthesis & Respiration",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1791),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Digestion, Breathing & Body Fluids",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1821),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Excretion, Movement & Neural Control",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1851),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Reproduction in Organisms & Plants",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1881),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Human Reproduction & Reproductive Health",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1911),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Genetics: Inheritance & Molecular Basis",
    subject: "Biology",
    questionsList: Array.from({ length: 35 }, (_, i) => i + 1941),
    durationMinutes: 45,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Evolution & Human Health",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 1976),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Biotechnology & Applications",
    subject: "Biology",
    questionsList: Array.from({ length: 30 }, (_, i) => i + 2006),
    durationMinutes: 40,
  },
  {
    testType: "chapter_wise",
    title: "Biology - Ecology, Environment & Biodiversity",
    subject: "Biology",
    questionsList: Array.from({ length: 35 }, (_, i) => i + 2036),
    durationMinutes: 45,
  },
  {
    testType: "mixed",
    title: "Biology - NEET Pattern Full Length Test",
    subject: "Biology",
    questionsList: Array.from({ length: 90 }, (_, i) => i + 2071),
    durationMinutes: 120,
  },
];

export async function seedMockTests() {
  console.log("Seeding 61 mock tests...");

  for (const test of mockTestData) {
    await db
      .insert(mockTests)
      .values(test);
  }

  console.log(`✅ Successfully seeded ${mockTestData.length} mock tests`);
}

seedMockTests()
  .then(() => {
    console.log("Mock tests seeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding mock tests:", error);
    process.exit(1);
  });
