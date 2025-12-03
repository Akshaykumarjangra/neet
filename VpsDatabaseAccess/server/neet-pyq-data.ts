
import { InsertQuestion } from "@shared/schema";

// NEET Previous Year Questions organized by year and subject
// Replace with actual questions from NEET papers (2015-2024)
export const neetPYQData: Record<number, {
  physics: Partial<InsertQuestion>[],
  chemistry: Partial<InsertQuestion>[],
  botany: Partial<InsertQuestion>[],
  zoology: Partial<InsertQuestion>[]
}> = {
  2024: {
    physics: [
      {
        questionText: "A particle is projected with velocity v at an angle θ with horizontal. The average power delivered by gravity during the ascent of the particle is:",
        options: [
          { id: "A", text: "mgv sin θ" },
          { id: "B", text: "-mgv sin θ / 2" },
          { id: "C", text: "mgv cos θ" },
          { id: "D", text: "Zero" },
        ],
        correctAnswer: "B",
        solutionDetail: "Average power is work done divided by time. During ascent, gravity does negative work.",
        solutionSteps: [
          "Work done by gravity during ascent = -mgh = -mg(v²sin²θ/2g) = -mv²sin²θ/2",
          "Time for ascent = v sinθ/g",
          "Average power = Work/Time = (-mv²sin²θ/2)/(v sinθ/g) = -mgv sinθ/2",
        ],
        difficultyLevel: 3,
        sourceType: "PYQ 2024",
        relatedTopics: ["Projectile Motion", "Work Power Energy"],
      },
      // Add more 2024 Physics questions
    ],
    chemistry: [
      {
        questionText: "Which of the following exhibits maximum ionic character?",
        options: [
          { id: "A", text: "NaF" },
          { id: "B", text: "NaCl" },
          { id: "C", text: "NaBr" },
          { id: "D", text: "NaI" },
        ],
        correctAnswer: "A",
        solutionDetail: "Ionic character increases with electronegativity difference. F has highest electronegativity.",
        solutionSteps: [
          "Electronegativity order: F > Cl > Br > I",
          "Na has constant electronegativity",
          "ΔEN is maximum for Na-F bond",
          "Hence NaF has maximum ionic character",
        ],
        difficultyLevel: 2,
        sourceType: "PYQ 2024",
        relatedTopics: ["Chemical Bonding", "Ionic Character"],
      },
      // Add more 2024 Chemistry questions
    ],
    botany: [
      {
        questionText: "The process of DNA replication in bacteria is:",
        options: [
          { id: "A", text: "Conservative" },
          { id: "B", text: "Semi-conservative" },
          { id: "C", text: "Dispersive" },
          { id: "D", text: "Non-conservative" },
        ],
        correctAnswer: "B",
        solutionDetail: "Meselson and Stahl experiment proved semi-conservative replication in bacteria.",
        solutionSteps: [
          "DNA double helix unwinds",
          "Each strand serves as template",
          "New strand synthesized complementary to template",
          "Two daughter DNA molecules each have one old and one new strand",
        ],
        difficultyLevel: 2,
        sourceType: "PYQ 2024",
        relatedTopics: ["Molecular Basis of Inheritance", "DNA Replication"],
      },
      // Add more 2024 Botany questions
    ],
    zoology: [
      {
        questionText: "The cells of the human body exhibit which type of cell division?",
        options: [
          { id: "A", text: "Only mitosis" },
          { id: "B", text: "Only meiosis" },
          { id: "C", text: "Both mitosis and meiosis" },
          { id: "D", text: "Neither mitosis nor meiosis" },
        ],
        correctAnswer: "C",
        solutionDetail: "Somatic cells undergo mitosis, germ cells undergo meiosis.",
        solutionSteps: [
          "Mitosis occurs in somatic cells for growth and repair",
          "Meiosis occurs in germ cells to produce gametes",
          "Both processes are essential for human body",
        ],
        difficultyLevel: 1,
        sourceType: "PYQ 2024",
        relatedTopics: ["Cell Division", "Reproduction"],
      },
      // Add more 2024 Zoology questions
    ],
  },
  // Add data for years 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015
};

export const neetExamPattern = {
  totalQuestions: 180,
  physics: 45,
  chemistry: 45,
  botany: 45,
  zoology: 45,
  marksPerQuestion: 4,
  negativeMarking: -1,
  duration: 180, // minutes
};
