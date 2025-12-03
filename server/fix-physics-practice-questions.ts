import { db } from "./db";
import { contentTopics, questions } from "@shared/schema";
import { eq, and } from "drizzle-orm";

/**
 * Fix and generate practice questions for all Physics chapters (1-23)
 * Run with: npx tsx server/fix-physics-practice-questions.ts
 */

async function fixPhysicsPracticeQuestions() {
   console.log("🚀 Fixing Physics practice questions for chapters 1-23...\n");

   // Get all Physics topics from chapters 1-23
   const physicsTopics = await db
      .select()
      .from(contentTopics)
      .where(
         and(
            eq(contentTopics.subject, "Physics"),
            eq(contentTopics.classLevel, "11") // Class 11 has chapters 1-15
         )
      );

   const physicsTopics12 = await db
      .select()
      .from(contentTopics)
      .where(
         and(
            eq(contentTopics.subject, "Physics"),
            eq(contentTopics.classLevel, "12") // Class 12 has chapters 16-23
         )
      );

   const allTopics = [...physicsTopics, ...physicsTopics12];
   console.log(`Found ${allTopics.length} Physics topics\n`);

   let totalCreated = 0;
   let totalUpdated = 0;

   for (const topic of allTopics) {
      console.log(`📚 Processing: Ch ${topic.chapterNumber} - ${topic.topicName}`);

      // Check existing questions
      const existing = await db
         .select()
         .from(questions)
         .where(eq(questions.topicId, topic.id));

      console.log(`   Found ${existing.length} existing questions`);

      // Generate new questions if needed (minimum 10 per topic)
      const needed = Math.max(0, 10 - existing.length);

      if (needed > 0) {
         const newQuestions = generateQuestionsForChapter(
            topic.id,
            topic.chapterNumber,
            topic.topicName,
            needed
         );

         if (newQuestions.length > 0) {
            await db.insert(questions).values(newQuestions);
            totalCreated += newQuestions.length;
            console.log(`   ✅ Created ${newQuestions.length} new questions`);
         }
      } else {
         console.log(`   ✓ Sufficient questions exist`);
      }
   }

   console.log(`\n🎉 Complete!`);
   console.log(`   Created: ${totalCreated} questions`);
   console.log(`   Updated: ${totalUpdated} questions`);
}

function generateQuestionsForChapter(
   topicId: number,
   chapterNum: number,
   topicName: string,
   count: number
) {
   // Generate questions based on chapter number
   const questionSets: Record<number, any[]> = {
      1: generateChapter01Questions(topicId),
      2: generateChapter02Questions(topicId),
      3: generateChapter03Questions(topicId),
      4: generateChapter04Questions(topicId),
      5: generateChapter05Questions(topicId),
      6: generateChapter06Questions(topicId),
      7: generateChapter07Questions(topicId),
      8: generateChapter08Questions(topicId),
      9: generateChapter09Questions(topicId),
      10: generateChapter10Questions(topicId),
      11: generateChapter11Questions(topicId),
      12: generateChapter12Questions(topicId),
      13: generateChapter13Questions(topicId),
      14: generateChapter14Questions(topicId),
      15: generateChapter15Questions(topicId),
      16: generateChapter16Questions(topicId),
      17: generateChapter17Questions(topicId),
      18: generateChapter18Questions(topicId),
      19: generateChapter19Questions(topicId),
      20: generateChapter20Questions(topicId),
      21: generateChapter21Questions(topicId),
      22: generateChapter22Questions(topicId),
      23: generateChapter23Questions(topicId),
   };

   return questionSets[chapterNum]?.slice(0, count) || [];
}

// Chapter 1: Physical World
function generateChapter01Questions(topicId: number) {
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
         relatedTopics: ["Fundamental Forces", "Nature of Physical Laws"]
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
         solutionDetail: "Gravitational force has infinite range. It follows inverse square law (F ∝ 1/r²), so it never becomes exactly zero, only approaches zero as distance increases.",
         solutionSteps: ["F = Gm₁m₂/r²", "As r → ∞, F → 0 but never zero", "Range is infinite"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Gravitational Force", "Fundamental Forces"]
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
         solutionDetail: "Galileo Galilei is called the father of experimental physics for introducing the scientific method and conducting systematic experiments to test hypotheses.",
         solutionSteps: ["Galileo introduced experimental method", "Conducted systematic observations", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["History of Physics", "Scientific Method"]
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
         solutionDetail: "Strong nuclear force is the strongest fundamental force. It binds protons and neutrons in the nucleus, overcoming electromagnetic repulsion between protons.",
         solutionSteps: ["Compare relative strengths", "Strong > EM > Weak > Gravitational", "Answer: D"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Fundamental Forces", "Nuclear Physics"]
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
         solutionDetail: "Weak nuclear force is responsible for beta decay, where a neutron converts to a proton (or vice versa) with emission of an electron/positron and neutrino.",
         solutionSteps: ["Beta decay involves particle transformation", "Weak force mediates this process", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Weak Nuclear Force", "Radioactivity"]
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
         solutionDetail: "Physics studies phenomena from subatomic scale (~10⁻¹⁵ m for nuclear dimensions) to cosmic scale (~10²⁶ m for observable universe), spanning over 40 orders of magnitude.",
         solutionSteps: ["Nuclear scale: ~10⁻¹⁵ m", "Universe scale: ~10²⁶ m", "Answer: A"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Scope of Physics", "Length Scales"]
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
         solutionDetail: "Planetary motion is a macroscopic phenomenon observable at large scales. The other options involve quantum/atomic scale phenomena.",
         solutionSteps: ["Macroscopic = large scale, visible", "Planetary motion fits this", "Answer: C"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Macroscopic vs Microscopic", "Classical Mechanics"]
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
         solutionDetail: "James Clerk Maxwell unified electricity and magnetism through his famous Maxwell's equations, showing that light is an electromagnetic wave.",
         solutionSteps: ["Maxwell formulated electromagnetic theory", "Unified E and M fields", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Electromagnetism", "History of Physics"]
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
         solutionDetail: "Kinematics deals with motion (displacement, velocity, acceleration) without considering the forces causing the motion. Dynamics includes forces.",
         solutionSteps: ["Kinematics = motion description only", "Dynamics = motion + forces", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Kinematics", "Branches of Mechanics"]
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
         solutionDetail: "Albert Einstein proposed both Special Theory of Relativity (1905) and General Theory of Relativity (1915), revolutionizing our understanding of space, time, and gravity.",
         solutionSteps: ["Einstein proposed relativity", "Special (1905) and General (1915)", "Answer: C"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Modern Physics", "Relativity"]
      }
   ];
}

// Chapter 2: Units and Measurements
function generateChapter02Questions(topicId: number) {
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
         solutionDetail: "Newton (N) is the SI unit of force. 1 N = 1 kg⋅m/s². Dyne is CGS unit, Joule is energy unit, Watt is power unit.",
         solutionSteps: ["Force = mass × acceleration", "SI: kg⋅m/s² = Newton", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["SI Units", "Force"]
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
         solutionDetail: "Time is a fundamental quantity. The seven fundamental quantities in SI are: length, mass, time, electric current, temperature, amount of substance, and luminous intensity.",
         solutionSteps: ["Fundamental quantities are independent", "Time is one of seven fundamental quantities", "Answer: C"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Fundamental Quantities", "SI System"]
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
         solutionDetail: "Energy = Force × Distance = [MLT⁻²][L] = [ML²T⁻²]. This applies to all forms of energy (kinetic, potential, thermal, etc.).",
         solutionSteps: ["Energy = Force × Distance", "[MLT⁻²] × [L] = [ML²T⁻²]", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Dimensional Analysis", "Energy"]
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
         solutionDetail: "1 parsec = 3.26 light years = 3.08 × 10¹⁶ m. Parsec is used in astronomy to measure large distances.",
         solutionSteps: ["Parsec is astronomical unit", "1 parsec = 3.26 ly", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Units of Length", "Astronomical Distances"]
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
         solutionDetail: "Standard vernier caliper has least count of 0.1 mm (or 0.01 cm). Least count = 1 MSD - 1 VSD = 1 mm - 0.9 mm = 0.1 mm.",
         solutionSteps: ["LC = 1 MSD - 1 VSD", "= 1 mm - 0.9 mm", "= 0.1 mm", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Vernier Caliper", "Measurements"]
      },
      {
         topicId,
         questionText: "Which of the following has dimensions [ML⁻¹T⁻²]?",
         options: [
            { id: "A", text: "Force" },
            { id: "B", text: "Pressure" },
            { id: "C", text: "Energy" },
            { id: "D", text: "Power" }
         ],
         correctAnswer: "B",
         solutionDetail: "Pressure = Force/Area = [MLT⁻²]/[L²] = [ML⁻¹T⁻²]. This is the dimensional formula for pressure and stress.",
         solutionSteps: ["Pressure = Force/Area", "[MLT⁻²]/[L²] = [ML⁻¹T⁻²]", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Dimensional Analysis", "Pressure"]
      },
      {
         topicId,
         questionText: "The percentage error in measurement of mass and velocity are 2% and 3% respectively. The maximum error in kinetic energy is:",
         options: [
            { id: "A", text: "5%" },
            { id: "B", text: "8%" },
            { id: "C", text: "11%" },
            { id: "D", text: "6%" }
         ],
         correctAnswer: "B",
         solutionDetail: "KE = ½mv². Error in KE = Error in m + 2×Error in v = 2% + 2×3% = 2% + 6% = 8%.",
         solutionSteps: ["KE = ½mv²", "ΔKE/KE = Δm/m + 2(Δv/v)", "= 2% + 2(3%) = 8%", "Answer: B"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Error Analysis", "Kinetic Energy"]
      },
      {
         topicId,
         questionText: "The number of significant figures in 0.00340 is:",
         options: [
            { id: "A", text: "2" },
            { id: "B", text: "3" },
            { id: "C", text: "4" },
            { id: "D", text: "5" }
         ],
         correctAnswer: "B",
         solutionDetail: "0.00340 has 3 significant figures (3, 4, and the trailing 0). Leading zeros are not significant, but trailing zeros after decimal point are significant.",
         solutionSteps: ["Leading zeros not significant", "3, 4, and trailing 0 are significant", "Total = 3", "Answer: B"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Significant Figures", "Measurements"]
      },
      {
         topicId,
         questionText: "The dimensional formula [ML⁻³] represents:",
         options: [
            { id: "A", text: "Density" },
            { id: "B", text: "Pressure" },
            { id: "C", text: "Force" },
            { id: "D", text: "Energy density" }
         ],
         correctAnswer: "A",
         solutionDetail: "Density = Mass/Volume = [M]/[L³] = [ML⁻³]. This is the dimensional formula for mass density.",
         solutionSteps: ["Density = Mass/Volume", "[M]/[L³] = [ML⁻³]", "Answer: A"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Dimensional Analysis", "Density"]
      },
      {
         topicId,
         questionText: "1 fermi is equal to:",
         options: [
            { id: "A", text: "10⁻¹⁵ m" },
            { id: "B", text: "10⁻¹⁰ m" },
            { id: "C", text: "10⁻⁹ m" },
            { id: "D", text: "10⁻¹² m" }
         ],
         correctAnswer: "A",
         solutionDetail: "1 fermi = 10⁻¹⁵ m = 1 femtometer (fm). It is used to measure nuclear dimensions.",
         solutionSteps: ["Fermi is nuclear length unit", "1 fermi = 10⁻¹⁵ m", "Answer: A"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Units of Length", "Nuclear Physics"]
      }
   ];
}

// Chapter 3: Motion in a Straight Line
function generateChapter03Questions(topicId: number) {
   return [
      {
         topicId,
         questionText: "A body moving with uniform acceleration has a velocity of 10 m/s after 5 seconds and 20 m/s after 10 seconds. What is its acceleration?",
         options: [
            { id: "A", text: "1 m/s²" },
            { id: "B", text: "2 m/s²" },
            { id: "C", text: "3 m/s²" },
            { id: "D", text: "4 m/s²" }
         ],
         correctAnswer: "B",
         solutionDetail: "Using v = u + at: At t=5s, v=10 m/s; At t=10s, v=20 m/s. Change in velocity = 20-10 = 10 m/s in time 10-5 = 5s. Therefore a = Δv/Δt = 10/5 = 2 m/s².",
         solutionSteps: ["v₁ = 10 m/s at t₁ = 5s", "v₂ = 20 m/s at t₂ = 10s", "a = (v₂-v₁)/(t₂-t₁) = 10/5 = 2 m/s²"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Uniform Acceleration", "Equations of Motion"]
      },
      {
         topicId,
         questionText: "The area under velocity-time graph represents:",
         options: [
            { id: "A", text: "Acceleration" },
            { id: "B", text: "Displacement" },
            { id: "C", text: "Velocity" },
            { id: "D", text: "Force" }
         ],
         correctAnswer: "B",
         solutionDetail: "Area under v-t graph = ∫v dt = displacement. This is a fundamental concept in kinematics.",
         solutionSteps: ["Area = ∫v dt", "This equals displacement", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Velocity-Time Graph", "Displacement"]
      },
      {
         topicId,
         questionText: "A particle starts from rest and moves with constant acceleration. The ratio of distances covered in successive equal time intervals is:",
         options: [
            { id: "A", text: "1:2:3:4" },
            { id: "B", text: "1:3:5:7" },
            { id: "C", text: "1:4:9:16" },
            { id: "D", text: "1:1:1:1" }
         ],
         correctAnswer: "B",
         solutionDetail: "For motion starting from rest with constant acceleration, distances in successive equal intervals follow odd number ratio: 1:3:5:7:... This comes from s = ½at².",
         solutionSteps: ["s ∝ t² for constant acceleration", "Successive intervals: 1²:(2²-1²):(3²-2²):(4²-3²)", "= 1:3:5:7"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Constant Acceleration", "Distance-Time Relation"]
      },
      {
         topicId,
         questionText: "The slope of position-time graph gives:",
         options: [
            { id: "A", text: "Acceleration" },
            { id: "B", text: "Velocity" },
            { id: "C", text: "Displacement" },
            { id: "D", text: "Distance" }
         ],
         correctAnswer: "B",
         solutionDetail: "Slope of x-t graph = dx/dt = velocity. This is the instantaneous velocity at any point.",
         solutionSteps: ["Slope = dx/dt", "This is velocity", "Answer: B"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Position-Time Graph", "Velocity"]
      },
      {
         topicId,
         questionText: "A stone is dropped from a height h. It reaches the ground in time t. The height of the stone at time t/2 is:",
         options: [
            { id: "A", text: "h/2" },
            { id: "B", text: "h/4" },
            { id: "C", text: "3h/4" },
            { id: "D", text: "h/8" }
         ],
         correctAnswer: "C",
         solutionDetail: "Using s = ½gt²: At time t, h = ½gt². At time t/2, distance fallen = ½g(t/2)² = ½gt²/4 = h/4. Height remaining = h - h/4 = 3h/4.",
         solutionSteps: ["h = ½gt²", "At t/2: s = ½g(t/2)² = h/4", "Height = h - h/4 = 3h/4"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Free Fall", "Equations of Motion"]
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
         solutionDetail: "Option D is dimensionally incorrect. The correct equation is s = ut + ½at² or s = vt - ½at². In option D, vt has dimension [LT⁻¹][T] = [L], but ½at has dimension [LT⁻²][T] = [LT⁻¹], which cannot be added.",
         solutionSteps: ["Check dimensions of each term", "vt: [L], ½at: [LT⁻¹]", "Cannot add different dimensions"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Equations of Motion", "Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "A car accelerates from rest at a constant rate α for some time, after which it decelerates at a constant rate β to come to rest. If the total time elapsed is t, the maximum velocity acquired is:",
         options: [
            { id: "A", text: "αβt/(α+β)" },
            { id: "B", text: "(α+β)t/αβ" },
            { id: "C", text: "αβt/(α-β)" },
            { id: "D", text: "t(α+β)/2" }
         ],
         correctAnswer: "A",
         solutionDetail: "Let t₁ be acceleration time and t₂ be deceleration time. v_max = αt₁ = βt₂. Also t₁ + t₂ = t. Solving: t₁ = βt/(α+β), so v_max = αβt/(α+β).",
         solutionSteps: ["v = αt₁ = βt₂", "t₁ + t₂ = t", "Solve: v = αβt/(α+β)"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Acceleration", "Deceleration", "Kinematics"]
      },
      {
         topicId,
         questionText: "The velocity-time graph of a particle is a straight line inclined to the time axis. The particle has:",
         options: [
            { id: "A", text: "Uniform velocity" },
            { id: "B", text: "Uniform acceleration" },
            { id: "C", text: "Variable acceleration" },
            { id: "D", text: "Zero acceleration" }
         ],
         correctAnswer: "B",
         solutionDetail: "A straight line v-t graph indicates constant slope, which means constant acceleration (a = dv/dt = constant).",
         solutionSteps: ["Straight line → constant slope", "Slope of v-t graph = acceleration", "Answer: Uniform acceleration"],
         difficultyLevel: 1,
         sourceType: "practice",
         relatedTopics: ["Velocity-Time Graph", "Acceleration"]
      },
      {
         topicId,
         questionText: "A body travels half its total path in the last second of its fall from rest. The total time of fall is:",
         options: [
            { id: "A", text: "(2+√2) s" },
            { id: "B", text: "(2-√2) s" },
            { id: "C", text: "2√2 s" },
            { id: "D", text: "√2 s" }
         ],
         correctAnswer: "A",
         solutionDetail: "Let total time be t. Total distance h = ½gt². Distance in last second = h/2. Using s_nth = u + a(n-½), we get ½gt² = ½g(t-½). Solving: t = (2+√2) s.",
         solutionSteps: ["h = ½gt²", "Distance in last second = h/2", "Solve equation: t = (2+√2) s"],
         difficultyLevel: 3,
         sourceType: "practice",
         relatedTopics: ["Free Fall", "nth Second Distance"]
      },
      {
         topicId,
         questionText: "The displacement of a particle is given by x = 3t² + 7t - 9. Its acceleration at t = 2s is:",
         options: [
            { id: "A", text: "3 m/s²" },
            { id: "B", text: "6 m/s²" },
            { id: "C", text: "9 m/s²" },
            { id: "D", text: "12 m/s²" }
         ],
         correctAnswer: "B",
         solutionDetail: "Acceleration a = d²x/dt². Given x = 3t² + 7t - 9. First derivative: v = dx/dt = 6t + 7. Second derivative: a = dv/dt = 6 m/s² (constant).",
         solutionSteps: ["x = 3t² + 7t - 9", "v = dx/dt = 6t + 7", "a = dv/dt = 6 m/s²"],
         difficultyLevel: 2,
         sourceType: "practice",
         relatedTopics: ["Calculus in Motion", "Acceleration"]
      }
   ];
}

// Placeholder functions for remaining chapters (4-23)
// These will generate basic questions - can be enhanced later
function generateChapter04Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Motion in a Plane", 4);
}

function generateChapter05Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Laws of Motion", 5);
}

function generateChapter06Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Work, Energy and Power", 6);
}

function generateChapter07Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Rotational Motion", 7);
}

function generateChapter08Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Gravitation", 8);
}

function generateChapter09Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Mechanical Properties of Solids", 9);
}

function generateChapter10Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Mechanical Properties of Fluids", 10);
}

function generateChapter11Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Thermal Properties of Matter", 11);
}

function generateChapter12Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Thermodynamics", 12);
}

function generateChapter13Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Kinetic Theory", 13);
}

function generateChapter14Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Oscillations", 14);
}

function generateChapter15Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Waves", 15);
}

function generateChapter16Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Electric Charges and Fields", 16);
}

function generateChapter17Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Electrostatic Potential", 17);
}

function generateChapter18Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Current Electricity", 18);
}

function generateChapter19Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Moving Charges and Magnetism", 19);
}

function generateChapter20Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Magnetism and Matter", 20);
}

function generateChapter21Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Electromagnetic Induction", 21);
}

function generateChapter22Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Alternating Current", 22);
}

function generateChapter23Questions(topicId: number) {
   return generateGenericQuestions(topicId, "Electromagnetic Waves", 23);
}

// Generic question generator for chapters not yet detailed
function generateGenericQuestions(topicId: number, chapterName: string, chapterNum: number) {
   const questions = [];
   for (let i = 1; i <= 10; i++) {
      questions.push({
         topicId,
         questionText: `${chapterName} - Practice Question ${i}: This is a placeholder question for Chapter ${chapterNum}. [To be replaced with actual NEET-style question]`,
         options: [
            { id: "A", text: "Option A" },
            { id: "B", text: "Option B" },
            { id: "C", text: "Option C" },
            { id: "D", text: "Option D" }
         ],
         correctAnswer: "A",
         solutionDetail: `This is a placeholder solution for ${chapterName}. Detailed explanation will be added.`,
         solutionSteps: ["Step 1: Identify given data", "Step 2: Apply relevant formula", "Step 3: Calculate answer"],
         difficultyLevel: (i % 3) + 1, // Distribute difficulty 1, 2, 3
         sourceType: "practice",
         relatedTopics: [chapterName]
      });
   }
   return questions;
}

// Run the script
fixPhysicsPracticeQuestions()
   .then(() => {
      console.log("\n✅ Script completed successfully!");
      process.exit(0);
   })
   .catch((error) => {
      console.error("\n❌ Error:", error);
      process.exit(1);
   });
