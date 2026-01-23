// @ts-nocheck
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

   const normalizeText = (value: string) =>
      value
         .trim()
         .toLowerCase()
         .replace(/\s+/g, " ");

   for (const topic of physicsTopics) {
      const topicName = String(topic.topicName ?? "");
      const normalizedName = topicName.toLowerCase();
      const isChapterOne = normalizedName.includes("physical world");
      const isChapterTwo =
         normalizedName.includes("units and measurement") ||
         normalizedName.includes("units and measurements");
      const chapterNumber = isChapterOne ? 1 : isChapterTwo ? 2 : topic.chapterNumber;
      console.log(`📚 Ch ${chapterNumber} - ${topic.topicName}`);

      // Check existing questions
      const existing = await db
         .select()
         .from(questions)
         .where(eq(questions.topicId, topic.id));

      if (isChapterOne || isChapterTwo) {
         const newQuestions = isChapterOne
            ? getChapter01Questions(topic.id)
            : getChapter02Questions(topic.id);

         if (newQuestions.length > 0) {
            const existingTexts = new Set(
               existing.map((question) => normalizeText(String(question.questionText ?? "")))
            );
            const filteredQuestions = newQuestions.filter(
               (question) =>
                  !existingTexts.has(normalizeText(String(question.questionText ?? "")))
            );

            if (filteredQuestions.length > 0) {
               await db.insert(questions).values(filteredQuestions);
               totalCreated += filteredQuestions.length;
            }

            console.log(
               `   Added ${filteredQuestions.length} new questions (kept ${existing.length} existing)\n`
            );
         }
         continue;
      }

      if (existing.length >= 10) {
         console.log(`   ✓ Already has ${existing.length} questions\n`);
         continue;
      }

      // Generate questions based on chapter
      const newQuestions = getQuestionsForChapter(topic.id, chapterNumber);

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
            { id: "C", text: "Strong nuclear force" },
            { id: "D", text: "Frictional force" }
         ],
         correctAnswer: "D",
         solutionDetail: "Friction is a contact force that arises from electromagnetic interactions between surfaces. The fundamental forces are gravitational, electromagnetic, strong nuclear, and weak nuclear.",
         solutionSteps: [
            "List the four fundamental forces",
            "Identify friction as an emergent contact force",
            "Select the non-fundamental force"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Fundamental Forces"]
      },
      {
         topicId,
         questionText: "Which fundamental force is the strongest?",
         options: [
            { id: "A", text: "Gravitational force" },
            { id: "B", text: "Electromagnetic force" },
            { id: "C", text: "Weak nuclear force" },
            { id: "D", text: "Strong nuclear force" }
         ],
         correctAnswer: "D",
         solutionDetail: "The strong nuclear force has the greatest strength among the four fundamental interactions.",
         solutionSteps: [
            "Compare relative strengths of fundamental forces",
            "Strong nuclear force is the greatest"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Fundamental Forces"]
      },
      {
         topicId,
         questionText: "Beta decay is mediated by which fundamental force?",
         options: [
            { id: "A", text: "Gravitational force" },
            { id: "B", text: "Strong nuclear force" },
            { id: "C", text: "Weak nuclear force" },
            { id: "D", text: "Electromagnetic force" }
         ],
         correctAnswer: "C",
         solutionDetail: "Beta decay involves changes in particle type, which are governed by the weak nuclear interaction.",
         solutionSteps: [
            "Recall the interaction responsible for beta decay",
            "Select weak nuclear force"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Weak Interaction"]
      },
      {
         topicId,
         questionText: "The range of gravitational force is:",
         options: [
            { id: "A", text: "Infinite" },
            { id: "B", text: "10^-15 m" },
            { id: "C", text: "10^-10 m" },
            { id: "D", text: "10^-18 m" }
         ],
         correctAnswer: "A",
         solutionDetail: "Gravity follows an inverse square law and has infinite range, even though it becomes weaker with distance.",
         solutionSteps: [
            "Use inverse square behavior",
            "Gravity never becomes exactly zero",
            "Choose infinite range"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Gravitational Force"]
      },
      {
         topicId,
         questionText: "Electromagnetic force acts between:",
         options: [
            { id: "A", text: "Masses" },
            { id: "B", text: "Electric charges" },
            { id: "C", text: "Quarks only" },
            { id: "D", text: "Neutrons only" }
         ],
         correctAnswer: "B",
         solutionDetail: "Electromagnetic interaction acts between charged particles and is responsible for electric and magnetic effects.",
         solutionSteps: [
            "Identify the source of electromagnetic interaction",
            "Choose electric charges"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Electromagnetic Force"]
      },
      {
         topicId,
         questionText: "Which fundamental force is the weakest?",
         options: [
            { id: "A", text: "Weak nuclear force" },
            { id: "B", text: "Electromagnetic force" },
            { id: "C", text: "Gravitational force" },
            { id: "D", text: "Strong nuclear force" }
         ],
         correctAnswer: "C",
         solutionDetail: "Gravitational force is the weakest of the four fundamental interactions.",
         solutionSteps: [
            "Recall relative strengths of the fundamental forces",
            "Select gravitational force"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Fundamental Forces"]
      },
      {
         topicId,
         questionText: "The range of the strong nuclear force is approximately:",
         options: [
            { id: "A", text: "10^-15 m" },
            { id: "B", text: "10^-10 m" },
            { id: "C", text: "10^6 m" },
            { id: "D", text: "Infinite" }
         ],
         correctAnswer: "A",
         solutionDetail: "The strong nuclear force acts over nuclear dimensions, about 10^-15 m.",
         solutionSteps: [
            "Recall nuclear size scale",
            "Choose 10^-15 m"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Strong Interaction"]
      },
      {
         topicId,
         questionText: "The range of the weak nuclear force is approximately:",
         options: [
            { id: "A", text: "10^-16 m" },
            { id: "B", text: "10^-8 m" },
            { id: "C", text: "10^-2 m" },
            { id: "D", text: "Infinite" }
         ],
         correctAnswer: "A",
         solutionDetail: "The weak interaction is very short range, of order 10^-16 m.",
         solutionSteps: [
            "Weak force is extremely short range",
            "Choose 10^-16 m"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Weak Interaction"]
      },
      {
         topicId,
         questionText: "The unification of electricity and magnetism was achieved by:",
         options: [
            { id: "A", text: "Isaac Newton" },
            { id: "B", text: "James Clerk Maxwell" },
            { id: "C", text: "Albert Einstein" },
            { id: "D", text: "Ernest Rutherford" }
         ],
         correctAnswer: "B",
         solutionDetail: "Maxwell unified electricity and magnetism through a single set of equations.",
         solutionSteps: [
            "Recall the scientist who wrote Maxwell's equations",
            "Select James Clerk Maxwell"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Unification"]
      },
      {
         topicId,
         questionText: "Who is known for establishing the experimental method in physics?",
         options: [
            { id: "A", text: "Galileo Galilei" },
            { id: "B", text: "Johannes Kepler" },
            { id: "C", text: "Isaac Newton" },
            { id: "D", text: "Michael Faraday" }
         ],
         correctAnswer: "A",
         solutionDetail: "Galileo emphasized experiments and measurements as the foundation of physics.",
         solutionSteps: [
            "Identify the pioneer of experimental physics",
            "Choose Galileo Galilei"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Scientific Method", "History of Physics"]
      },
      {
         topicId,
         questionText: "Which theory unified space and time into a single framework?",
         options: [
            { id: "A", text: "Newtonian mechanics" },
            { id: "B", text: "Einstein's relativity" },
            { id: "C", text: "Bohr's atomic model" },
            { id: "D", text: "Planck's quantum theory" }
         ],
         correctAnswer: "B",
         solutionDetail: "Einstein's relativity combines space and time into spacetime.",
         solutionSteps: [
            "Recall the key idea of relativity",
            "Select Einstein's theory"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Relativity", "Unification"]
      },
      {
         topicId,
         questionText: "Electroweak theory unifies which interactions?",
         options: [
            { id: "A", text: "Strong and weak" },
            { id: "B", text: "Electromagnetic and weak" },
            { id: "C", text: "Gravitational and electromagnetic" },
            { id: "D", text: "Strong and gravitational" }
         ],
         correctAnswer: "B",
         solutionDetail: "The electroweak theory combines the electromagnetic and weak interactions.",
         solutionSteps: [
            "Recall the interactions in electroweak unification",
            "Select electromagnetic and weak"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Unification", "Fundamental Forces"]
      },
      {
         topicId,
         questionText: "Which of the following is a macroscopic phenomenon?",
         options: [
            { id: "A", text: "Photoelectric effect" },
            { id: "B", text: "Atomic spectra" },
            { id: "C", text: "Planetary motion" },
            { id: "D", text: "Nuclear decay" }
         ],
         correctAnswer: "C",
         solutionDetail: "Planetary motion involves large-scale bodies and is a macroscopic phenomenon.",
         solutionSteps: [
            "Identify the large-scale example",
            "Choose planetary motion"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Scope of Physics"]
      },
      {
         topicId,
         questionText: "Which of the following is a microscopic (quantum) phenomenon?",
         options: [
            { id: "A", text: "Boiling of water" },
            { id: "B", text: "Planetary motion" },
            { id: "C", text: "Photoelectric effect" },
            { id: "D", text: "Motion of a car" }
         ],
         correctAnswer: "C",
         solutionDetail: "The photoelectric effect is a quantum phenomenon observed at microscopic scales.",
         solutionSteps: [
            "Identify the quantum-scale example",
            "Choose photoelectric effect"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Modern Physics"]
      },
      {
         topicId,
         questionText: "The approximate size of an atom is of the order:",
         options: [
            { id: "A", text: "10^-10 m" },
            { id: "B", text: "10^-15 m" },
            { id: "C", text: "10^-6 m" },
            { id: "D", text: "10^2 m" }
         ],
         correctAnswer: "A",
         solutionDetail: "Typical atomic sizes are about 10^-10 m.",
         solutionSteps: [
            "Recall atomic scale",
            "Select 10^-10 m"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Scale of Physics"]
      },
      {
         topicId,
         questionText: "The approximate size of a nucleus is of the order:",
         options: [
            { id: "A", text: "10^-15 m" },
            { id: "B", text: "10^-10 m" },
            { id: "C", text: "10^-6 m" },
            { id: "D", text: "10^-2 m" }
         ],
         correctAnswer: "A",
         solutionDetail: "Nuclear dimensions are about 10^-15 m.",
         solutionSteps: [
            "Recall nuclear scale",
            "Select 10^-15 m"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Scale of Physics"]
      },
      {
         topicId,
         questionText: "Physics studies phenomena across length scales roughly from:",
         options: [
            { id: "A", text: "10^-15 m to 10^26 m" },
            { id: "B", text: "10^-6 m to 10^6 m" },
            { id: "C", text: "10^-10 m to 10^10 m" },
            { id: "D", text: "10^-3 m to 10^3 m" }
         ],
         correctAnswer: "A",
         solutionDetail: "The scope of physics spans from nuclear scales (~10^-15 m) to cosmic scales (~10^26 m).",
         solutionSteps: [
            "Recall smallest and largest scales mentioned in physics",
            "Select 10^-15 m to 10^26 m"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Scope of Physics"]
      },
      {
         topicId,
         questionText: "Which sequence best represents the scientific method?",
         options: [
            { id: "A", text: "Hypothesis -> Observation -> Conclusion -> Experiment" },
            { id: "B", text: "Observation -> Hypothesis -> Experiment -> Conclusion" },
            { id: "C", text: "Experiment -> Observation -> Hypothesis -> Conclusion" },
            { id: "D", text: "Observation -> Experiment -> Hypothesis -> Conclusion" }
         ],
         correctAnswer: "B",
         solutionDetail: "The scientific method begins with observation, proposes a hypothesis, tests it by experiment, and draws conclusions.",
         solutionSteps: [
            "Start with observation",
            "Form a hypothesis",
            "Test with experiment",
            "Draw conclusions"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Scientific Method"]
      },
      {
         topicId,
         questionText: "Which quantity is conserved in an isolated system?",
         options: [
            { id: "A", text: "Energy" },
            { id: "B", text: "Momentum" },
            { id: "C", text: "Angular momentum" },
            { id: "D", text: "All of these" }
         ],
         correctAnswer: "D",
         solutionDetail: "Energy, momentum, and angular momentum are conserved in isolated systems.",
         solutionSteps: [
            "Recall conservation laws in physics",
            "Identify that all listed quantities are conserved"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Conservation Laws"]
      },
      {
         topicId,
         questionText: "Which of the following is NOT a conservation law?",
         options: [
            { id: "A", text: "Conservation of energy" },
            { id: "B", text: "Conservation of momentum" },
            { id: "C", text: "Conservation of angular momentum" },
            { id: "D", text: "Conservation of force" }
         ],
         correctAnswer: "D",
         solutionDetail: "There is no law of conservation of force. Energy and momentum related quantities are conserved.",
         solutionSteps: [
            "Recall standard conservation laws",
            "Identify the non-existent one"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Conservation Laws"]
      },
      {
         topicId,
         questionText: "Physics is primarily the study of:",
         options: [
            { id: "A", text: "Plant structure and growth" },
            { id: "B", text: "Human behavior and society" },
            { id: "C", text: "Matter, energy, space, and time" },
            { id: "D", text: "Only chemical reactions" }
         ],
         correctAnswer: "C",
         solutionDetail: "Physics focuses on the fundamental laws governing matter, energy, space, and time.",
         solutionSteps: [
            "Identify the broad scope of physics",
            "Select matter, energy, space, and time"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Scope of Physics"]
      },
      {
         topicId,
         questionText: "In physics, unification refers to:",
         options: [
            { id: "A", text: "Using unrelated laws for each phenomenon" },
            { id: "B", text: "Ignoring experimental evidence" },
            { id: "C", text: "Explaining diverse phenomena with a single framework" },
            { id: "D", text: "Studying only macroscopic objects" }
         ],
         correctAnswer: "C",
         solutionDetail: "Unification means explaining different phenomena through a common theory.",
         solutionSteps: [
            "Recall the goal of unification in physics",
            "Choose the single-framework option"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Unification"]
      },
      {
         topicId,
         questionText: "Classical mechanics gives incorrect results for:",
         options: [
            { id: "A", text: "Everyday speeds and sizes" },
            { id: "B", text: "Atomic scale only" },
            { id: "C", text: "Speeds close to the speed of light only" },
            { id: "D", text: "Both atomic scale and near-light speeds" }
         ],
         correctAnswer: "D",
         solutionDetail: "Classical mechanics fails at atomic scales (quantum domain) and at speeds close to light (relativity domain).",
         solutionSteps: [
            "Recall domains where classical physics breaks down",
            "Select both atomic and near-light speed regimes"
         ],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Classical vs Modern Physics"]
      },
      {
         topicId,
         questionText: "Which is a direct application of physics in technology?",
         options: [
            { id: "A", text: "LASER" },
            { id: "B", text: "Photosynthesis" },
            { id: "C", text: "Digestion" },
            { id: "D", text: "Fermentation" }
         ],
         correctAnswer: "A",
         solutionDetail: "LASER technology is based on physical principles of light and stimulated emission.",
         solutionSteps: [
            "Identify the technology rooted in physics",
            "Select LASER"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Physics and Technology"]
      },
      {
         topicId,
         questionText: "The study of subatomic particles and their interactions is called:",
         options: [
            { id: "A", text: "Astrophysics" },
            { id: "B", text: "Particle physics" },
            { id: "C", text: "Geophysics" },
            { id: "D", text: "Acoustics" }
         ],
         correctAnswer: "B",
         solutionDetail: "Particle physics (high energy physics) studies subatomic particles and fundamental interactions.",
         solutionSteps: [
            "Identify the branch dealing with subatomic particles",
            "Choose particle physics"
         ],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Branch of Physics"]
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
         solutionDetail: "Force = mass x acceleration, so the SI unit is kg*m/s^2, called the newton (N).",
         solutionSteps: ["Force = mass x acceleration", "SI unit = kg*m/s^2", "Named newton (N)"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["SI Units"]
      },
      {
         topicId,
         questionText: "Which of the following is a fundamental quantity?",
         options: [
            { id: "A", text: "Force" },
            { id: "B", text: "Time" },
            { id: "C", text: "Energy" },
            { id: "D", text: "Velocity" }
         ],
         correctAnswer: "B",
         solutionDetail: "Time is one of the seven SI base quantities. Force, energy, and velocity are derived.",
         solutionSteps: ["Base quantities are independent", "Time is a base quantity", "Others are derived"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Fundamental Quantities"]
      },
      {
         topicId,
         questionText: "The SI unit of pressure is:",
         options: [
            { id: "A", text: "Pascal" },
            { id: "B", text: "Newton" },
            { id: "C", text: "Joule" },
            { id: "D", text: "Watt" }
         ],
         correctAnswer: "A",
         solutionDetail: "Pressure = force/area, so its SI unit is N/m^2, called the pascal (Pa).",
         solutionSteps: ["Pressure = force/area", "Unit = N/m^2", "Named pascal (Pa)"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Derived Units"]
      },
      {
         topicId,
         questionText: "The dimensional formula of energy is:",
         options: [
            { id: "A", text: "[M L^2 T^-2]" },
            { id: "B", text: "[M L T^-2]" },
            { id: "C", text: "[M L^2 T^-1]" },
            { id: "D", text: "[M L^-1 T^-2]" }
         ],
         correctAnswer: "A",
         solutionDetail: "Energy = force x distance. Force is [M L T^-2], so energy is [M L^2 T^-2].",
         solutionSteps: ["Force = [M L T^-2]", "Multiply by L", "Energy = [M L^2 T^-2]"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "Which quantity has dimensions [M L^-1 T^-2]?",
         options: [
            { id: "A", text: "Pressure" },
            { id: "B", text: "Power" },
            { id: "C", text: "Energy" },
            { id: "D", text: "Momentum" }
         ],
         correctAnswer: "A",
         solutionDetail: "Pressure = force/area = [M L T^-2]/[L^2] = [M L^-1 T^-2].",
         solutionSteps: ["Pressure = force/area", "Divide by L^2", "Get [M L^-1 T^-2]"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "The prefix micro (u) represents:",
         options: [
            { id: "A", text: "10^-3" },
            { id: "B", text: "10^-6" },
            { id: "C", text: "10^-9" },
            { id: "D", text: "10^6" }
         ],
         correctAnswer: "B",
         solutionDetail: "Micro means one millionth, which is 10^-6.",
         solutionSteps: ["Micro = one millionth", "10^-6"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Metric Prefixes"]
      },
      {
         topicId,
         questionText: "1 nanometer is equal to:",
         options: [
            { id: "A", text: "10^-6 m" },
            { id: "B", text: "10^-9 m" },
            { id: "C", text: "10^-12 m" },
            { id: "D", text: "10^9 m" }
         ],
         correctAnswer: "B",
         solutionDetail: "Nano means 10^-9, so 1 nm = 10^-9 m.",
         solutionSteps: ["Nano prefix = 10^-9", "1 nm = 10^-9 m"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Metric Prefixes"]
      },
      {
         topicId,
         questionText: "Parallax error is minimized by:",
         options: [
            { id: "A", text: "Viewing the scale from any angle" },
            { id: "B", text: "Keeping the eye perpendicular to the scale and in line with the pointer" },
            { id: "C", text: "Using a thicker scale" },
            { id: "D", text: "Increasing the least count" }
         ],
         correctAnswer: "B",
         solutionDetail: "Parallax is avoided by keeping the eye in line with the pointer and perpendicular to the scale.",
         solutionSteps: ["Align eye with pointer", "View perpendicular to scale"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Parallax Error"]
      },
      {
         topicId,
         questionText: "Significant figures in 0.00340 are:",
         options: [
            { id: "A", text: "2" },
            { id: "B", text: "3" },
            { id: "C", text: "4" },
            { id: "D", text: "5" }
         ],
         correctAnswer: "B",
         solutionDetail: "Leading zeros are not significant. Digits 3 and 4 are significant, and the trailing zero after decimal is significant. Total = 3.",
         solutionSteps: ["Ignore leading zeros", "Count 3, 4, trailing 0", "Total = 3"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Significant Figures"]
      },
      {
         topicId,
         questionText: "How many significant figures are in 2.500?",
         options: [
            { id: "A", text: "2" },
            { id: "B", text: "3" },
            { id: "C", text: "4" },
            { id: "D", text: "5" }
         ],
         correctAnswer: "C",
         solutionDetail: "Trailing zeros after a decimal point are significant. 2.500 has four significant figures.",
         solutionSteps: ["Decimal present", "Trailing zeros count", "Total = 4"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Significant Figures"]
      },
      {
         topicId,
         questionText: "If Q = a^2 b / c, the percentage error in Q is:",
         options: [
            { id: "A", text: "2%a + %b + %c" },
            { id: "B", text: "%a + %b + %c" },
            { id: "C", text: "2%a + 2%b + %c" },
            { id: "D", text: "2%a + %b - %c" }
         ],
         correctAnswer: "A",
         solutionDetail: "For powers, percentage errors add with their powers: 2%a + %b + %c.",
         solutionSteps: ["Q = a^2 b / c", "Add errors with powers", "2%a + %b + %c"],
         difficultyLevel: 3,
         sourceType: "NEET-style",
         relatedTopics: ["Error Analysis"]
      },
      {
         topicId,
         questionText: "A vernier caliper has 10 vernier divisions equal to 9 main scale divisions. If 1 MSD = 1 mm, its least count is:",
         options: [
            { id: "A", text: "0.1 mm" },
            { id: "B", text: "0.01 mm" },
            { id: "C", text: "0.9 mm" },
            { id: "D", text: "1 mm" }
         ],
         correctAnswer: "A",
         solutionDetail: "1 VSD = 0.9 mm. Least count = 1 MSD - 1 VSD = 1.0 - 0.9 = 0.1 mm.",
         solutionSteps: ["1 VSD = 0.9 mm", "LC = 1.0 - 0.9", "LC = 0.1 mm"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Vernier Caliper"]
      },
      {
         topicId,
         questionText: "A vernier caliper shows a positive zero error of +0.02 cm. If the observed reading is 2.36 cm, the correct length is:",
         options: [
            { id: "A", text: "2.38 cm" },
            { id: "B", text: "2.34 cm" },
            { id: "C", text: "2.36 cm" },
            { id: "D", text: "2.32 cm" }
         ],
         correctAnswer: "B",
         solutionDetail: "Positive zero error is subtracted from the observed reading. 2.36 - 0.02 = 2.34 cm.",
         solutionSteps: ["Positive error means reading is high", "Correct = observed - error", "2.36 - 0.02 = 2.34 cm"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Vernier Caliper", "Zero Error"]
      },
      {
         topicId,
         questionText: "A screw gauge has pitch 0.5 mm and 50 divisions on the circular scale. Least count is:",
         options: [
            { id: "A", text: "0.5 mm" },
            { id: "B", text: "0.05 mm" },
            { id: "C", text: "0.01 mm" },
            { id: "D", text: "0.005 mm" }
         ],
         correctAnswer: "C",
         solutionDetail: "Least count = pitch / number of divisions = 0.5 / 50 = 0.01 mm.",
         solutionSteps: ["LC = pitch / divisions", "0.5/50 = 0.01", "LC = 0.01 mm"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Screw Gauge"]
      },
      {
         topicId,
         questionText: "A screw gauge has a negative zero error of -0.03 mm. If the observed diameter is 5.68 mm, the correct diameter is:",
         options: [
            { id: "A", text: "5.65 mm" },
            { id: "B", text: "5.71 mm" },
            { id: "C", text: "5.68 mm" },
            { id: "D", text: "5.73 mm" }
         ],
         correctAnswer: "B",
         solutionDetail: "Negative zero error is added to the observed reading. 5.68 + 0.03 = 5.71 mm.",
         solutionSteps: ["Negative error means reading is low", "Correct = observed + error", "5.68 + 0.03 = 5.71 mm"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Screw Gauge", "Zero Error"]
      },
      {
         topicId,
         questionText: "Which instrument is most suitable to measure the diameter of a thin wire?",
         options: [
            { id: "A", text: "Meter scale" },
            { id: "B", text: "Vernier caliper" },
            { id: "C", text: "Screw gauge" },
            { id: "D", text: "Measuring cylinder" }
         ],
         correctAnswer: "C",
         solutionDetail: "A screw gauge (micrometer) is used for very small diameters like thin wires.",
         solutionSteps: ["Thin wire needs high precision", "Screw gauge offers smallest least count"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Measurement Instruments"]
      },
      {
         topicId,
         questionText: "Which of the following is dimensionless?",
         options: [
            { id: "A", text: "Strain" },
            { id: "B", text: "Force" },
            { id: "C", text: "Pressure" },
            { id: "D", text: "Energy" }
         ],
         correctAnswer: "A",
         solutionDetail: "Strain is a ratio of lengths, so it is dimensionless.",
         solutionSteps: ["Strain = delta L / L", "Length cancels", "Dimensionless"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "Which statement is correct?",
         options: [
            { id: "A", text: "High accuracy implies high precision" },
            { id: "B", text: "High precision implies high accuracy" },
            { id: "C", text: "A set can be precise but inaccurate" },
            { id: "D", text: "Accuracy and precision are identical" }
         ],
         correctAnswer: "C",
         solutionDetail: "Measurements can be tightly grouped (precise) but far from the true value (inaccurate).",
         solutionSteps: ["Accuracy = closeness to true value", "Precision = closeness of repeated values", "They are not identical"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Accuracy and Precision"]
      },
      {
         topicId,
         questionText: "If the absolute error in length is 0.2 cm and the measured length is 10.0 cm, the percentage error is:",
         options: [
            { id: "A", text: "0.2%" },
            { id: "B", text: "2%" },
            { id: "C", text: "5%" },
            { id: "D", text: "20%" }
         ],
         correctAnswer: "B",
         solutionDetail: "Percentage error = (0.2/10.0) x 100 = 2%.",
         solutionSteps: ["Relative error = 0.2/10.0", "Multiply by 100", "2%"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Error Analysis"]
      },
      {
         topicId,
         questionText: "Which pair has the same dimensions?",
         options: [
            { id: "A", text: "Work and torque" },
            { id: "B", text: "Momentum and power" },
            { id: "C", text: "Force and energy" },
            { id: "D", text: "Pressure and energy" }
         ],
         correctAnswer: "A",
         solutionDetail: "Work and torque both have dimensions [M L^2 T^-2].",
         solutionSteps: ["Work = force x distance", "Torque = force x distance", "Same dimensions"],
         difficultyLevel: 2,
         sourceType: "NEET-style",
         relatedTopics: ["Dimensional Analysis"]
      },
      {
         topicId,
         questionText: "The least count of a measuring instrument is defined as:",
         options: [
            { id: "A", text: "Maximum reading it can measure" },
            { id: "B", text: "Smallest value it can measure" },
            { id: "C", text: "Average of two readings" },
            { id: "D", text: "Random error in measurement" }
         ],
         correctAnswer: "B",
         solutionDetail: "Least count is the smallest measurement that can be reliably measured by the instrument.",
         solutionSteps: ["Least count = smallest readable value", "Defines resolution"],
         difficultyLevel: 1,
         sourceType: "NEET-style",
         relatedTopics: ["Least Count"]
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


