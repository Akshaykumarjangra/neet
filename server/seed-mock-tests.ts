
import { db } from "./db";
import { mockTests, questions } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedMockTests() {
  console.log("🎯 Seeding comprehensive mock tests...");

  try {
    // Get all questions to create realistic question lists
    const allQuestions = await db.select().from(questions);
    
    if (allQuestions.length === 0) {
      console.log("⚠️  No questions found in database. Please run question generation first.");
      return;
    }

    console.log(`📊 Found ${allQuestions.length} questions in database`);

    // Organize questions by subject and difficulty
    const physicsList = allQuestions.filter(q => 
      q.relatedTopics?.some((t: string) => t.includes('Physics'))
    ).map(q => q.id);
    
    const chemistryList = allQuestions.filter(q => 
      q.relatedTopics?.some((t: string) => t.includes('Chemistry'))
    ).map(q => q.id);
    
    const botanyList = allQuestions.filter(q => 
      q.relatedTopics?.some((t: string) => t.includes('Botany'))
    ).map(q => q.id);
    
    const zoologyList = allQuestions.filter(q => 
      q.relatedTopics?.some((t: string) => t.includes('Zoology'))
    ).map(q => q.id);

    // Organize by difficulty
    const easyQuestions = allQuestions.filter(q => q.difficultyLevel === 1).map(q => q.id);
    const mediumQuestions = allQuestions.filter(q => q.difficultyLevel === 2).map(q => q.id);
    const hardQuestions = allQuestions.filter(q => q.difficultyLevel >= 3).map(q => q.id);

    const mockTestsData = [
      // ========== FULL LENGTH TESTS (10 tests) ==========
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 1 - All Topics",
        questionsList: allQuestions.slice(0, 180).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 2 - Mixed Difficulty",
        questionsList: allQuestions.slice(180, 360).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 3 - Comprehensive",
        questionsList: allQuestions.slice(360, 540).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 4 - Advanced Level",
        questionsList: [...hardQuestions.slice(0, 60), ...mediumQuestions.slice(0, 80), ...easyQuestions.slice(0, 40)],
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 5 - Foundation Plus",
        questionsList: [...easyQuestions.slice(40, 100), ...mediumQuestions.slice(80, 140), ...hardQuestions.slice(60, 80)],
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 6 - Current Pattern",
        questionsList: allQuestions.slice(540, 720).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 7 - Practice Set A",
        questionsList: allQuestions.slice(720, 900).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 8 - Practice Set B",
        questionsList: allQuestions.slice(900, 1080).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 9 - Grand Test 1",
        questionsList: allQuestions.slice(1080, 1260).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },
      {
        testType: "Full Length",
        title: "NEET Full Length Mock Test 10 - Grand Test 2",
        questionsList: allQuestions.slice(1260, 1440).map(q => q.id),
        durationMinutes: 180,
        subject: null,
      },

      // ========== PHYSICS SUBJECT TESTS (10 tests) ==========
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 1 - Mechanics Focus",
        questionsList: physicsList.slice(0, 45),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 2 - Electricity & Magnetism",
        questionsList: physicsList.slice(45, 90),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 3 - Optics & Modern Physics",
        questionsList: physicsList.slice(90, 135),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 4 - Thermodynamics",
        questionsList: physicsList.slice(135, 180),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 5 - Waves & Sound",
        questionsList: physicsList.slice(180, 225),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 6 - All Topics Mixed",
        questionsList: physicsList.slice(225, 270),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 7 - Advanced Problems",
        questionsList: physicsList.slice(270, 315),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 8 - Numerical Problems",
        questionsList: physicsList.slice(315, 360),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 9 - Conceptual Questions",
        questionsList: physicsList.slice(360, 405),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Subject-wise",
        title: "Physics Complete Mock Test 10 - Final Revision",
        questionsList: physicsList.slice(405, 450),
        durationMinutes: 45,
        subject: "Physics",
      },

      // ========== CHEMISTRY SUBJECT TESTS (10 tests) ==========
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 1 - Physical Chemistry",
        questionsList: chemistryList.slice(0, 45),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 2 - Inorganic Chemistry",
        questionsList: chemistryList.slice(45, 90),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 3 - Organic Chemistry",
        questionsList: chemistryList.slice(90, 135),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 4 - Chemical Bonding",
        questionsList: chemistryList.slice(135, 180),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 5 - Periodic Table & Blocks",
        questionsList: chemistryList.slice(180, 225),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 6 - Reactions & Mechanisms",
        questionsList: chemistryList.slice(225, 270),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 7 - Thermodynamics & Kinetics",
        questionsList: chemistryList.slice(270, 315),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 8 - Electrochemistry",
        questionsList: chemistryList.slice(315, 360),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 9 - All Topics Mixed",
        questionsList: chemistryList.slice(360, 405),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Subject-wise",
        title: "Chemistry Complete Mock Test 10 - Revision Test",
        questionsList: chemistryList.slice(405, 450),
        durationMinutes: 45,
        subject: "Chemistry",
      },

      // ========== BOTANY SUBJECT TESTS (10 tests) ==========
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 1 - Plant Physiology",
        questionsList: botanyList.slice(0, 45),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 2 - Plant Reproduction",
        questionsList: botanyList.slice(45, 90),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 3 - Genetics & Evolution",
        questionsList: botanyList.slice(90, 135),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 4 - Cell Biology",
        questionsList: botanyList.slice(135, 180),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 5 - Plant Morphology",
        questionsList: botanyList.slice(180, 225),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 6 - Plant Taxonomy",
        questionsList: botanyList.slice(225, 270),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 7 - Ecology & Environment",
        questionsList: botanyList.slice(270, 315),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 8 - Biomolecules",
        questionsList: botanyList.slice(315, 360),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 9 - All Topics Mixed",
        questionsList: botanyList.slice(360, 405),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Subject-wise",
        title: "Botany Complete Mock Test 10 - Final Revision",
        questionsList: botanyList.slice(405, 450),
        durationMinutes: 45,
        subject: "Botany",
      },

      // ========== ZOOLOGY SUBJECT TESTS (10 tests) ==========
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 1 - Human Physiology",
        questionsList: zoologyList.slice(0, 45),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 2 - Animal Diversity",
        questionsList: zoologyList.slice(45, 90),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 3 - Genetics & Evolution",
        questionsList: zoologyList.slice(90, 135),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 4 - Biotechnology",
        questionsList: zoologyList.slice(135, 180),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 5 - Reproduction & Development",
        questionsList: zoologyList.slice(180, 225),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 6 - Health & Disease",
        questionsList: zoologyList.slice(225, 270),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 7 - Structural Organization",
        questionsList: zoologyList.slice(270, 315),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 8 - Ecology & Environment",
        questionsList: zoologyList.slice(315, 360),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 9 - All Topics Mixed",
        questionsList: zoologyList.slice(360, 405),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Subject-wise",
        title: "Zoology Complete Mock Test 10 - Comprehensive Review",
        questionsList: zoologyList.slice(405, 450),
        durationMinutes: 45,
        subject: "Zoology",
      },

      // ========== CHAPTER-WISE TESTS (30 tests) ==========
      // Physics Chapter Tests
      {
        testType: "Chapter-wise",
        title: "Physics - Kinematics & Motion",
        questionsList: physicsList.slice(0, 30),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Laws of Motion & Forces",
        questionsList: physicsList.slice(30, 60),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Work Energy & Power",
        questionsList: physicsList.slice(60, 90),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Gravitation",
        questionsList: physicsList.slice(90, 120),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Thermodynamics",
        questionsList: physicsList.slice(120, 150),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Electrostatics",
        questionsList: physicsList.slice(150, 180),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Current Electricity",
        questionsList: physicsList.slice(180, 210),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Magnetism & Matter",
        questionsList: physicsList.slice(210, 240),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Electromagnetic Induction",
        questionsList: physicsList.slice(240, 270),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Chapter-wise",
        title: "Physics - Optics & Wave Optics",
        questionsList: physicsList.slice(270, 300),
        durationMinutes: 30,
        subject: "Physics",
      },

      // Chemistry Chapter Tests
      {
        testType: "Chapter-wise",
        title: "Chemistry - Mole Concept & Stoichiometry",
        questionsList: chemistryList.slice(0, 30),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Atomic Structure",
        questionsList: chemistryList.slice(30, 60),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Chemical Bonding",
        questionsList: chemistryList.slice(60, 90),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - States of Matter",
        questionsList: chemistryList.slice(90, 120),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Thermodynamics",
        questionsList: chemistryList.slice(120, 150),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Chemical Equilibrium",
        questionsList: chemistryList.slice(150, 180),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Redox Reactions",
        questionsList: chemistryList.slice(180, 210),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Periodic Table & Periodicity",
        questionsList: chemistryList.slice(210, 240),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Organic Chemistry Basics",
        questionsList: chemistryList.slice(240, 270),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Chapter-wise",
        title: "Chemistry - Hydrocarbons",
        questionsList: chemistryList.slice(270, 300),
        durationMinutes: 30,
        subject: "Chemistry",
      },

      // Botany Chapter Tests
      {
        testType: "Chapter-wise",
        title: "Botany - Cell Structure & Function",
        questionsList: botanyList.slice(0, 30),
        durationMinutes: 30,
        subject: "Botany",
      },
      {
        testType: "Chapter-wise",
        title: "Botany - Biomolecules",
        questionsList: botanyList.slice(30, 60),
        durationMinutes: 30,
        subject: "Botany",
      },
      {
        testType: "Chapter-wise",
        title: "Botany - Cell Division",
        questionsList: botanyList.slice(60, 90),
        durationMinutes: 30,
        subject: "Botany",
      },
      {
        testType: "Chapter-wise",
        title: "Botany - Photosynthesis",
        questionsList: botanyList.slice(90, 120),
        durationMinutes: 30,
        subject: "Botany",
      },
      {
        testType: "Chapter-wise",
        title: "Botany - Plant Reproduction",
        questionsList: botanyList.slice(120, 150),
        durationMinutes: 30,
        subject: "Botany",
      },

      // Zoology Chapter Tests
      {
        testType: "Chapter-wise",
        title: "Zoology - Animal Kingdom Classification",
        questionsList: zoologyList.slice(0, 30),
        durationMinutes: 30,
        subject: "Zoology",
      },
      {
        testType: "Chapter-wise",
        title: "Zoology - Digestive System",
        questionsList: zoologyList.slice(30, 60),
        durationMinutes: 30,
        subject: "Zoology",
      },
      {
        testType: "Chapter-wise",
        title: "Zoology - Circulatory System",
        questionsList: zoologyList.slice(60, 90),
        durationMinutes: 30,
        subject: "Zoology",
      },
      {
        testType: "Chapter-wise",
        title: "Zoology - Respiratory System",
        questionsList: zoologyList.slice(90, 120),
        durationMinutes: 30,
        subject: "Zoology",
      },
      {
        testType: "Chapter-wise",
        title: "Zoology - Human Reproduction",
        questionsList: zoologyList.slice(120, 150),
        durationMinutes: 30,
        subject: "Zoology",
      },

      // ========== QUICK PRACTICE (20 tests) ==========
      {
        testType: "Quick Practice",
        title: "Physics Quick Practice 1 - Mechanics",
        questionsList: physicsList.slice(0, 15),
        durationMinutes: 15,
        subject: "Physics",
      },
      {
        testType: "Quick Practice",
        title: "Physics Quick Practice 2 - Electricity",
        questionsList: physicsList.slice(15, 30),
        durationMinutes: 15,
        subject: "Physics",
      },
      {
        testType: "Quick Practice",
        title: "Physics Quick Practice 3 - Optics",
        questionsList: physicsList.slice(30, 45),
        durationMinutes: 15,
        subject: "Physics",
      },
      {
        testType: "Quick Practice",
        title: "Physics Quick Practice 4 - Modern Physics",
        questionsList: physicsList.slice(45, 60),
        durationMinutes: 15,
        subject: "Physics",
      },
      {
        testType: "Quick Practice",
        title: "Physics Quick Practice 5 - Thermodynamics",
        questionsList: physicsList.slice(60, 75),
        durationMinutes: 15,
        subject: "Physics",
      },
      {
        testType: "Quick Practice",
        title: "Chemistry Quick Practice 1 - Physical",
        questionsList: chemistryList.slice(0, 15),
        durationMinutes: 15,
        subject: "Chemistry",
      },
      {
        testType: "Quick Practice",
        title: "Chemistry Quick Practice 2 - Inorganic",
        questionsList: chemistryList.slice(15, 30),
        durationMinutes: 15,
        subject: "Chemistry",
      },
      {
        testType: "Quick Practice",
        title: "Chemistry Quick Practice 3 - Organic",
        questionsList: chemistryList.slice(30, 45),
        durationMinutes: 15,
        subject: "Chemistry",
      },
      {
        testType: "Quick Practice",
        title: "Chemistry Quick Practice 4 - Reactions",
        questionsList: chemistryList.slice(45, 60),
        durationMinutes: 15,
        subject: "Chemistry",
      },
      {
        testType: "Quick Practice",
        title: "Chemistry Quick Practice 5 - Equilibrium",
        questionsList: chemistryList.slice(60, 75),
        durationMinutes: 15,
        subject: "Chemistry",
      },
      {
        testType: "Quick Practice",
        title: "Botany Quick Practice 1 - Cell Biology",
        questionsList: botanyList.slice(0, 15),
        durationMinutes: 15,
        subject: "Botany",
      },
      {
        testType: "Quick Practice",
        title: "Botany Quick Practice 2 - Physiology",
        questionsList: botanyList.slice(15, 30),
        durationMinutes: 15,
        subject: "Botany",
      },
      {
        testType: "Quick Practice",
        title: "Botany Quick Practice 3 - Genetics",
        questionsList: botanyList.slice(30, 45),
        durationMinutes: 15,
        subject: "Botany",
      },
      {
        testType: "Quick Practice",
        title: "Botany Quick Practice 4 - Reproduction",
        questionsList: botanyList.slice(45, 60),
        durationMinutes: 15,
        subject: "Botany",
      },
      {
        testType: "Quick Practice",
        title: "Botany Quick Practice 5 - Ecology",
        questionsList: botanyList.slice(60, 75),
        durationMinutes: 15,
        subject: "Botany",
      },
      {
        testType: "Quick Practice",
        title: "Zoology Quick Practice 1 - Physiology",
        questionsList: zoologyList.slice(0, 15),
        durationMinutes: 15,
        subject: "Zoology",
      },
      {
        testType: "Quick Practice",
        title: "Zoology Quick Practice 2 - Diversity",
        questionsList: zoologyList.slice(15, 30),
        durationMinutes: 15,
        subject: "Zoology",
      },
      {
        testType: "Quick Practice",
        title: "Zoology Quick Practice 3 - Genetics",
        questionsList: zoologyList.slice(30, 45),
        durationMinutes: 15,
        subject: "Zoology",
      },
      {
        testType: "Quick Practice",
        title: "Zoology Quick Practice 4 - Reproduction",
        questionsList: zoologyList.slice(45, 60),
        durationMinutes: 15,
        subject: "Zoology",
      },
      {
        testType: "Quick Practice",
        title: "Zoology Quick Practice 5 - Biotechnology",
        questionsList: zoologyList.slice(60, 75),
        durationMinutes: 15,
        subject: "Zoology",
      },

      // ========== MIXED PRACTICE (10 tests) ==========
      {
        testType: "Mixed Practice",
        title: "Physics + Chemistry Combined Test 1",
        questionsList: [...physicsList.slice(0, 22), ...chemistryList.slice(0, 23)],
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "Physics + Chemistry Combined Test 2",
        questionsList: [...physicsList.slice(22, 44), ...chemistryList.slice(23, 46)],
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "Botany + Zoology Combined Test 1",
        questionsList: [...botanyList.slice(0, 22), ...zoologyList.slice(0, 23)],
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "Botany + Zoology Combined Test 2",
        questionsList: [...botanyList.slice(22, 44), ...zoologyList.slice(23, 46)],
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "All Subjects - Easy Level Mix",
        questionsList: easyQuestions.slice(0, 60),
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "All Subjects - Medium Level Mix",
        questionsList: mediumQuestions.slice(0, 60),
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "All Subjects - Hard Level Mix",
        questionsList: hardQuestions.slice(0, 60),
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "Science Complete - Biology Focus",
        questionsList: [...botanyList.slice(0, 15), ...zoologyList.slice(0, 15), ...chemistryList.slice(0, 15)],
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "Science Complete - Physical Science Focus",
        questionsList: [...physicsList.slice(0, 25), ...chemistryList.slice(0, 20)],
        durationMinutes: 45,
        subject: null,
      },
      {
        testType: "Mixed Practice",
        title: "Balanced NEET Practice - All Subjects",
        questionsList: [
          ...physicsList.slice(0, 11),
          ...chemistryList.slice(0, 11),
          ...botanyList.slice(0, 11),
          ...zoologyList.slice(0, 12)
        ],
        durationMinutes: 45,
        subject: null,
      },

      // ========== DIFFICULTY-BASED TESTS (15 tests) ==========
      {
        testType: "Difficulty Practice",
        title: "Foundation Builder - Easy Questions Only",
        questionsList: easyQuestions.slice(0, 50),
        durationMinutes: 40,
        subject: null,
      },
      {
        testType: "Difficulty Practice",
        title: "Foundation Builder 2 - Easy Questions",
        questionsList: easyQuestions.slice(50, 100),
        durationMinutes: 40,
        subject: null,
      },
      {
        testType: "Difficulty Practice",
        title: "Intermediate Challenge - Medium Questions",
        questionsList: mediumQuestions.slice(0, 50),
        durationMinutes: 50,
        subject: null,
      },
      {
        testType: "Difficulty Practice",
        title: "Intermediate Challenge 2 - Medium Questions",
        questionsList: mediumQuestions.slice(50, 100),
        durationMinutes: 50,
        subject: null,
      },
      {
        testType: "Difficulty Practice",
        title: "Advanced Problem Solving - Hard Questions",
        questionsList: hardQuestions.slice(0, 40),
        durationMinutes: 60,
        subject: null,
      },
      {
        testType: "Difficulty Practice",
        title: "Progressive Difficulty - Easy to Hard",
        questionsList: [...easyQuestions.slice(0, 20), ...mediumQuestions.slice(0, 20), ...hardQuestions.slice(0, 10)],
        durationMinutes: 50,
        subject: null,
      },
      {
        testType: "Difficulty Practice",
        title: "Physics - Easy Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Physics')) && q.difficultyLevel === 1
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 30,
        subject: "Physics",
      },
      {
        testType: "Difficulty Practice",
        title: "Physics - Hard Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Physics')) && q.difficultyLevel >= 3
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 45,
        subject: "Physics",
      },
      {
        testType: "Difficulty Practice",
        title: "Chemistry - Easy Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Chemistry')) && q.difficultyLevel === 1
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 30,
        subject: "Chemistry",
      },
      {
        testType: "Difficulty Practice",
        title: "Chemistry - Hard Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Chemistry')) && q.difficultyLevel >= 3
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 45,
        subject: "Chemistry",
      },
      {
        testType: "Difficulty Practice",
        title: "Botany - Easy Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Botany')) && q.difficultyLevel === 1
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 30,
        subject: "Botany",
      },
      {
        testType: "Difficulty Practice",
        title: "Botany - Hard Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Botany')) && q.difficultyLevel >= 3
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 45,
        subject: "Botany",
      },
      {
        testType: "Difficulty Practice",
        title: "Zoology - Easy Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Zoology')) && q.difficultyLevel === 1
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 30,
        subject: "Zoology",
      },
      {
        testType: "Difficulty Practice",
        title: "Zoology - Hard Level",
        questionsList: allQuestions.filter(q => 
          q.relatedTopics?.some((t: string) => t.includes('Zoology')) && q.difficultyLevel >= 3
        ).slice(0, 30).map(q => q.id),
        durationMinutes: 45,
        subject: "Zoology",
      },
      {
        testType: "Difficulty Practice",
        title: "Master Challenge - All Hard Questions",
        questionsList: hardQuestions.slice(40, 90),
        durationMinutes: 75,
        subject: null,
      },
    ];

    // Insert mock tests
    let created = 0;
    let skipped = 0;
    
    for (const test of mockTestsData) {
      if (test.questionsList.length > 0) {
        await db.insert(mockTests).values(test);
        created++;
        console.log(`✅ Created: ${test.title} (${test.questionsList.length} questions)`);
      } else {
        skipped++;
      }
    }

    console.log(`\n✅ Successfully created ${created} mock tests!`);
    if (skipped > 0) {
      console.log(`⚠️  Skipped ${skipped} tests due to insufficient questions`);
    }
    console.log(`\n📈 Test Coverage Summary:`);
    console.log(`   - Full Length Tests: 10`);
    console.log(`   - Subject-wise Tests: 40 (10 per subject)`);
    console.log(`   - Chapter-wise Tests: 30`);
    console.log(`   - Quick Practice: 20`);
    console.log(`   - Mixed Practice: 10`);
    console.log(`   - Difficulty-based: 15`);
    console.log(`   - TOTAL: ${created} comprehensive mock tests`);
    
  } catch (error) {
    console.error("❌ Error seeding mock tests:", error);
    throw error;
  }
}

seedMockTests()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
