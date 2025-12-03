import { db } from "../db";
import { contentTopics, questions } from "@shared/schema";
import { eq, and } from "drizzle-orm";

/**
 * Seed practice questions for ALL Physics chapters (1-23)
 * Import and call this from server/seed.ts
 */

export async function seedPhysicsAllChaptersQuestions() {
   console.log("🚀 Seeding Physics practice questions for all chapters...\n");

   // Get all Physics topics
   const physicsTopics = await db
      .select()
      .from(contentTopics)
      .where(eq(contentTopics.subject, "Physics"));

   console.log(`Found ${physicsTopics.length} Physics topics\n`);

   let totalCreated = 0;

   for (const topic of physicsTopics) {
      console.log(`📚 Ch ${topic.chapterNumber} - ${topic.topicName}`);

      // Check existing questions
      const existing = await db
         .select()
         .from(questions)
         .where(eq(questions.topicId, topic.id));

      if (existing.length >= 10) {
         console.log(`   ✓ Already has ${existing.length} questions\n`);
         continue;
      }

      // Generate questions based on chapter
      const newQuestions = getQuestionsForChapter(topic.id, topic.chapterNumber);

      if (newQuestions.length > 0) {
         await db.insert(questions).values(newQuestions);
         totalCreated += newQuestions.length;
         console.log(`   ✅ Created ${newQuestions.length} questions\n`);
      }
   }

   console.log(`🎉 Total created: ${totalCreated} questions`);
   return totalCreated;
}

function getQuestionsForChapter(topicId: number, chapterNum: number) {
   // Map chapter numbers to question generators
   const generators: Record<number, () => any[]> = {
      1: () => getChapter01Questions(topicId),
      2: () => getChapter02Questions(topicId),
      3: () => getChapter03Questions(topicId),
   };

   // Use specific generator if available, otherwise use generic
   if (generators[chapterNum]) {
      return generators[chapterNum]();
   }

   // Generic questions for chapters 4-23
   return getGenericQuestions(topicId, chapterNum);
}


// Chapter 1: Physical World
function getChapter01Questions(topicId: number) {
   return [
      {
         topicId,
         questionText: "Which of the following is NOT a fundamental force in nature?",
         options: [
            { id: "A", text: "Gravitational force" },
            { id: "B", text: "Electromagnetic force" },
            { id: "C", text: "Frictional force" },
            { id: "D", text: "Strong nuclear force" }
         ],
         correctAnswer: "C",
         solutionDetail: "Frictional force is not fundamental. It arises from electromagnetic interactions between atoms at surfaces. The four fundamental forces are: Gravitational, Electromagnetic, Strong Nuclear, and Weak Nuclear.",
         solutionSteps: ["Identify four fundamental forces", "Friction is electromagnetic in origin", "Answer: C"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Fundamental Forces"]
      },
      {
         topicId,
         questionText: "The range of gravitational force is:",
         options: [
            { id: "A", text: "Infinite" },
            { id: "B", text: "10⁻¹⁵ m" },
            { id: "C", text: "10⁻¹⁰ m" },
            { id: "D", text: "Limited to solar system" }
         ],
         correctAnswer: "A",
         solutionDetail: "Gravitational force has infinite range. It follows inverse square law (F ∝ 1/r²), so it never becomes exactly zero.",
         solutionSteps: ["F = Gm₁m₂/r²", "As r → ∞, F → 0 but never zero", "Range is infinite"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Gravitational Force"]
      },
      {
         topicId,
         questionText: "Who is known as the father of experimental physics?",
         options: [
            { id: "A", text: "Isaac Newton" },
            { id: "B", text: "Galileo Galilei" },
            { id: "C", text: "Albert Einstein" },
            { id: "D", text: "Archimedes" }
         ],
         correctAnswer: "B",
         solutionDetail: "Galileo Galilei is called the father of experimental physics for introducing the scientific method.",
         solutionSteps: ["Galileo introduced experimental method", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["History of Physics"]
      },
      {
         topicId,
         questionText: "The strongest fundamental force is:",
         options: [
            { id: "A", text: "Gravitational force" },
            { id: "B", text: "Weak nuclear force" },
            { id: "C", text: "Electromagnetic force" },
            { id: "D", text: "Strong nuclear force" }
         ],
         correctAnswer: "D",
         solutionDetail: "Strong nuclear force is the strongest fundamental force. It binds protons and neutrons in the nucleus.",
         solutionSteps: ["Compare relative strengths", "Strong > EM > Weak > Gravitational", "Answer: D"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Fundamental Forces"]
      },
      {
         topicId,
         questionText: "Which force is responsible for beta decay?",
         options: [
            { id: "A", text: "Strong nuclear force" },
            { id: "B", text: "Weak nuclear force" },
            { id: "C", text: "Electromagnetic force" },
            { id: "D", text: "Gravitational force" }
         ],
         correctAnswer: "B",
         solutionDetail: "Weak nuclear force is responsible for beta decay.",
         solutionSteps: ["Beta decay involves particle transformation", "Weak force mediates this", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Weak Nuclear Force"]
      },
      {
         topicId,
         questionText: "The scope of physics includes study of phenomena at scales ranging from:",
         options: [
            { id: "A", text: "10⁻¹⁵ m to 10²⁶ m" },
            { id: "B", text: "10⁻¹⁰ m to 10²⁰ m" },
            { id: "C", text: "10⁻⁵ m to 10¹⁵ m" },
            { id: "D", text: "10⁻² m to 10¹⁰ m" }
         ],
         correctAnswer: "A",
         solutionDetail: "Physics studies from subatomic (~10⁻¹⁵ m) to cosmic scale (~10²⁶ m).",
         solutionSteps: ["Nuclear scale: ~10⁻¹⁵ m", "Universe scale: ~10²⁶ m", "Answer: A"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Scope of Physics"]
      },
      {
         topicId,
         questionText: "Which of the following is a macroscopic phenomenon?",
         options: [
            { id: "A", text: "Photoelectric effect" },
            { id: "B", text: "Compton scattering" },
            { id: "C", text: "Planetary motion" },
            { id: "D", text: "Atomic spectra" }
         ],
         correctAnswer: "C",
         solutionDetail: "Planetary motion is macroscopic (large scale, visible).",
         solutionSteps: ["Macroscopic = large scale", "Planetary motion fits", "Answer: C"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Macroscopic Phenomena"]
      },
      {
         topicId,
         questionText: "The unification of electricity and magnetism was achieved by:",
         options: [
            { id: "A", text: "Isaac Newton" },
            { id: "B", text: "James Clerk Maxwell" },
            { id: "C", text: "Michael Faraday" },
            { id: "D", text: "Albert Einstein" }
         ],
         correctAnswer: "B",
         solutionDetail: "James Clerk Maxwell unified electricity and magnetism through Maxwell's equations.",
         solutionSteps: ["Maxwell formulated EM theory", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Electromagnetism"]
      },
      {
         topicId,
         questionText: "Which branch of physics deals with motion without considering forces?",
         options: [
            { id: "A", text: "Dynamics" },
            { id: "B", text: "Kinematics" },
            { id: "C", text: "Statics" },
            { id: "D", text: "Kinetics" }
         ],
         correctAnswer: "B",
         solutionDetail: "Kinematics deals with motion description only, without forces.",
         solutionSteps: ["Kinematics = motion only", "Dynamics = motion + forces", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Kinematics"]
      },
      {
         topicId,
         questionText: "The theory of relativity was proposed by:",
         options: [
            { id: "A", text: "Max Planck" },
            { id: "B", text: "Niels Bohr" },
            { id: "C", text: "Albert Einstein" },
            { id: "D", text: "Werner Heisenberg" }
         ],
         correctAnswer: "C",
         solutionDetail: "Albert Einstein proposed both Special (1905) and General (1915) Theory of Relativity.",
         solutionSteps: ["Einstein proposed relativity", "Answer: C"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Relativity"]
      }
   ];
}

// Chapter 2: Units and Measurements  
function getChapter02Questions(topicId: number) {
   return [
      {
         topicId,
         questionText: "The SI unit of force is:",
         options: [
            { id: "A", text: "Dyne" },
            { id: "B", text: "Newton" },
            { id: "C", text: "Joule" },
            { id: "D", text: "Watt" }
         ],
         correctAnswer: "B",
         solutionDetail: "Newton (N) is the SI unit of force. 1 N = 1 kg⋅m/s².",
         solutionSteps: ["Force = mass × acceleration", "SI: kg⋅m/s² = Newton", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["SI Units"]
      },
      {
         topicId,
         questionText: "Which of the following is a fundamental quantity?",
         options: [
            { id: "A", text: "Force" },
            { id: "B", text: "Velocity" },
            { id: "C", text: "Time" },
            { id: "D", text: "Energy" }
         ],
         correctAnswer: "C",
         solutionDetail: "Time is one of seven fundamental quantities in SI system.",
         solutionSteps: ["Fundamental quantities are independent", "Time is fundamental", "Answer: C"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Fundamental Quantities"]
      },
      {
         topicId,
         questionText: "The dimensional formula of energy is:",
         options: [
            { id: "A", text: "[ML²T⁻²]" },
            { id: "B", text: "[MLT⁻²]" },
            { id: "C", text: "[ML²T⁻¹]" },
            { id: "D", text: "[MLT⁻¹]" }
         ],
         correctAnswer: "A",
         solutionDetail: "Energy = Force × Distance = [MLT⁻²][L] = [ML²T⁻²].",
         solutionSteps: ["Energy = Force × Distance", "[MLT⁻²] × [L] = [ML²T⁻²]", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "1 parsec is equal to:",
         options: [
            { id: "A", text: "3.26 light years" },
            { id: "B", text: "1 light year" },
            { id: "C", text: "10 light years" },
            { id: "D", text: "100 light years" }
         ],
         correctAnswer: "A",
         solutionDetail: "1 parsec = 3.26 light years = 3.08 × 10¹⁶ m.",
         solutionSteps: ["Parsec is astronomical unit", "1 parsec = 3.26 ly", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Units of Length"]
      },
      {
         topicId,
         questionText: "The least count of a vernier caliper is:",
         options: [
            { id: "A", text: "0.1 mm" },
            { id: "B", text: "0.01 mm" },
            { id: "C", text: "0.001 mm" },
            { id: "D", text: "1 mm" }
         ],
         correctAnswer: "A",
         solutionDetail: "Standard vernier caliper has least count of 0.1 mm.",
         solutionSteps: ["LC = 1 MSD - 1 VSD", "= 1 mm - 0.9 mm = 0.1 mm", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Vernier Caliper"]
      },
      {
         topicId,
         questionText: "Which has dimensions [ML⁻¹T⁻²]?",
         options: [
            { id: "A", text: "Force" },
            { id: "B", text: "Pressure" },
            { id: "C", text: "Energy" },
            { id: "D", text: "Power" }
         ],
         correctAnswer: "B",
         solutionDetail: "Pressure = Force/Area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²].",
         solutionSteps: ["Pressure = Force/Area", "[MLT⁻²]/[L²] = [ML⁻¹T⁻²]", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "Error in mass is 2% and velocity is 3%. Maximum error in kinetic energy is:",
         options: [
            { id: "A", text: "5%" },
            { id: "B", text: "8%" },
            { id: "C", text: "11%" },
            { id: "D", text: "6%" }
         ],
         correctAnswer: "B",
         solutionDetail: "KE = ½mv². Error = 2% + 2×3% = 8%.",
         solutionSteps: ["KE = ½mv²", "ΔKE/KE = Δm/m + 2(Δv/v)", "= 2% + 6% = 8%", "Answer: B"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Error Analysis"]
      },
      {
         topicId,
         questionText: "Significant figures in 0.00340 is:",
         options: [
            { id: "A", text: "2" },
            { id: "B", text: "3" },
            { id: "C", text: "4" },
            { id: "D", text: "5" }
         ],
         correctAnswer: "B",
         solutionDetail: "0.00340 has 3 significant figures (3, 4, trailing 0).",
         solutionSteps: ["Leading zeros not significant", "3, 4, trailing 0 are significant", "Total = 3", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Significant Figures"]
      },
      {
         topicId,
         questionText: "[ML⁻³] represents:",
         options: [
            { id: "A", text: "Density" },
            { id: "B", text: "Pressure" },
            { id: "C", text: "Force" },
            { id: "D", text: "Energy density" }
         ],
         correctAnswer: "A",
         solutionDetail: "Density = Mass/Volume = [M]/[L³] = [ML⁻³].",
         solutionSteps: ["Density = Mass/Volume", "[M]/[L³] = [ML⁻³]", "Answer: A"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "1 fermi equals:",
         options: [
            { id: "A", text: "10⁻¹⁵ m" },
            { id: "B", text: "10⁻¹⁰ m" },
            { id: "C", text: "10⁻⁹ m" },
            { id: "D", text: "10⁻¹² m" }
         ],
         correctAnswer: "A",
         solutionDetail: "1 fermi = 10⁻¹⁵ m = 1 femtometer (fm). Used for nuclear dimensions.",
         solutionSteps: ["Fermi is nuclear length unit", "1 fermi = 10⁻¹⁵ m", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Units of Length"]
      }
   ];
}

// Chapter 3: Motion in a Straight Line
function getChapter03Questions(topicId: number) {
   return [
      {
         topicId,
         questionText: "A body has velocity 10 m/s at 5s and 20 m/s at 10s. Its acceleration is:",
         options: [
            { id: "A", text: "1 m/s²" },
            { id: "B", text: "2 m/s²" },
            { id: "C", text: "3 m/s²" },
            { id: "D", text: "4 m/s²" }
         ],
         correctAnswer: "B",
         solutionDetail: "a = (v₂-v₁)/(t₂-t₁) = (20-10)/(10-5) = 10/5 = 2 m/s².",
         solutionSteps: ["Δv = 20-10 = 10 m/s", "Δt = 10-5 = 5s", "a = 10/5 = 2 m/s²"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Uniform Acceleration"]
      },
      {
         topicId,
         questionText: "Area under v-t graph represents:",
         options: [
            { id: "A", text: "Acceleration" },
            { id: "B", text: "Displacement" },
            { id: "C", text: "Velocity" },
            { id: "D", text: "Force" }
         ],
         correctAnswer: "B",
         solutionDetail: "Area under v-t graph = ∫v dt = displacement.",
         solutionSteps: ["Area = ∫v dt", "This equals displacement", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Velocity-Time Graph"]
      },
      {
         topicId,
         questionText: "Starting from rest with constant acceleration, distance ratio in successive equal intervals is:",
         options: [
            { id: "A", text: "1:2:3:4" },
            { id: "B", text: "1:3:5:7" },
            { id: "C", text: "1:4:9:16" },
            { id: "D", text: "1:1:1:1" }
         ],
         correctAnswer: "B",
         solutionDetail: "For constant acceleration from rest, distances follow odd number ratio: 1:3:5:7.",
         solutionSteps: ["s ∝ t²", "Successive: 1²:(2²-1²):(3²-2²):(4²-3²)", "= 1:3:5:7"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Constant Acceleration"]
      },
      {
         topicId,
         questionText: "Slope of x-t graph gives:",
         options: [
            { id: "A", text: "Acceleration" },
            { id: "B", text: "Velocity" },
            { id: "C", text: "Displacement" },
            { id: "D", text: "Distance" }
         ],
         correctAnswer: "B",
         solutionDetail: "Slope of x-t graph = dx/dt = velocity.",
         solutionSteps: ["Slope = dx/dt", "This is velocity", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Position-Time Graph"]
      },
      {
         topicId,
         questionText: "Stone dropped from height h reaches ground in time t. Height at t/2 is:",
         options: [
            { id: "A", text: "h/2" },
            { id: "B", text: "h/4" },
            { id: "C", text: "3h/4" },
            { id: "D", text: "h/8" }
         ],
         correctAnswer: "C",
         solutionDetail: "At t/2, distance fallen = h/4. Height remaining = h - h/4 = 3h/4.",
         solutionSteps: ["h = ½gt²", "At t/2: s = h/4", "Height = h - h/4 = 3h/4"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Free Fall"]
      },
      {
         topicId,
         questionText: "Which equation is dimensionally incorrect?",
         options: [
            { id: "A", text: "v = u + at" },
            { id: "B", text: "s = ut + ½at²" },
            { id: "C", text: "v² = u² + 2as" },
            { id: "D", text: "s = vt + ½at" }
         ],
         correctAnswer: "D",
         solutionDetail: "Option D is wrong. vt has dimension [L], but ½at has [LT⁻¹], cannot be added.",
         solutionSteps: ["Check dimensions", "vt: [L], ½at: [LT⁻¹]", "Cannot add", "Answer: D"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Equations of Motion"]
      },
      {
         topicId,
         questionText: "Car accelerates at α, then decelerates at β. Total time t. Maximum velocity is:",
         options: [
            { id: "A", text: "αβt/(α+β)" },
            { id: "B", text: "(α+β)t/αβ" },
            { id: "C", text: "αβt/(α-β)" },
            { id: "D", text: "t(α+β)/2" }
         ],
         correctAnswer: "A",
         solutionDetail: "v = αt₁ = βt₂, t₁+t₂=t. Solving: v = αβt/(α+β).",
         solutionSteps: ["v = αt₁ = βt₂", "t₁ + t₂ = t", "Solve: v = αβt/(α+β)"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Kinematics"]
      },
      {
         topicId,
         questionText: "Straight line v-t graph means:",
         options: [
            { id: "A", text: "Uniform velocity" },
            { id: "B", text: "Uniform acceleration" },
            { id: "C", text: "Variable acceleration" },
            { id: "D", text: "Zero acceleration" }
         ],
         correctAnswer: "B",
         solutionDetail: "Straight line v-t graph → constant slope → uniform acceleration.",
         solutionSteps: ["Straight line → constant slope", "Slope = acceleration", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Velocity-Time Graph"]
      },
      {
         topicId,
         questionText: "Body travels half distance in last second of fall. Total time is:",
         options: [
            { id: "A", text: "(2+√2) s" },
            { id: "B", text: "(2-√2) s" },
            { id: "C", text: "2√2 s" },
            { id: "D", text: "√2 s" }
         ],
         correctAnswer: "A",
         solutionDetail: "Using h = ½gt² and distance in last second = h/2, solving gives t = (2+√2) s.",
         solutionSteps: ["h = ½gt²", "Last second distance = h/2", "Solve: t = (2+√2) s"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Free Fall"]
      },
      {
         topicId,
         questionText: "x = 3t² + 7t - 9. Acceleration at t=2s is:",
         options: [
            { id: "A", text: "3 m/s²" },
            { id: "B", text: "6 m/s²" },
            { id: "C", text: "9 m/s²" },
            { id: "D", text: "12 m/s²" }
         ],
         correctAnswer: "B",
         solutionDetail: "a = d²x/dt². v = 6t+7, a = 6 m/s² (constant).",
         solutionSteps: ["x = 3t² + 7t - 9", "v = dx/dt = 6t + 7", "a = dv/dt = 6 m/s²"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Calculus in Motion"]
      }
   ];
}

// Generic questions for chapters 4-23
function getGenericQuestions(topicId: number, chapterNum: number) {
   const chapterNames: Record<number, string> = {
      4: "Motion in a Plane",
      5: "Laws of Motion",
      6: "Work, Energy and Power",
      7: "Rotational Motion",
      8: "Gravitation",
      9: "Mechanical Properties of Solids",
      10: "Mechanical Properties of Fluids",
      11: "Thermal Properties of Matter",
      12: "Thermodynamics",
      13: "Kinetic Theory",
      14: "Oscillations",
      15: "Waves",
      16: "Electric Charges and Fields",
      17: "Electrostatic Potential",
      18: "Current Electricity",
      19: "Moving Charges and Magnetism",
      20: "Magnetism and Matter",
      21: "Electromagnetic Induction",
      22: "Alternating Current",
      23: "Electromagnetic Waves"
   };

   const chapterName = chapterNames[chapterNum] || `Chapter ${chapterNum}`;
   const questions = [];

   for (let i = 1; i <= 10; i++) {
      questions.push({
         topicId,
         questionText: `${chapterName} - Practice Question ${i}: [NEET-style question to be added]`,
         options: [
            { id: "A", text: "Option A" },
            { id: "B", text: "Option B" },
            { id: "C", text: "Option C" },
            { id: "D", text: "Option D" }
         ],
         correctAnswer: "A",
         solutionDetail: `Solution for ${chapterName} question ${i}. [Detailed explanation to be added]`,
         solutionSteps: ["Step 1: Identify given data", "Step 2: Apply formula", "Step 3: Calculate"],
         difficultyLevel: (i % 3) + 1,
         sourceType: "practice",
         relatedTopics: [chapterName]
      });
   }

   return questions;
}
