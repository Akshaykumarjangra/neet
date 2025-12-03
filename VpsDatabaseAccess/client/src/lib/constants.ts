
// NEET Subject Colors
export const NEET_COLORS = {
  physics: {
    primary: "#3b82f6",
    secondary: "#60a5fa",
    gradient: "from-blue-500 to-blue-600",
  },
  chemistry: {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    gradient: "from-purple-500 to-purple-600",
  },
  botany: {
    primary: "#10b981",
    secondary: "#34d399",
    gradient: "from-green-500 to-green-600",
  },
  zoology: {
    primary: "#f59e0b",
    secondary: "#fbbf24",
    gradient: "from-amber-500 to-amber-600",
  },
} as const;

// Common Physical Constants
export const PHYSICS_CONSTANTS = {
  c: 3e8, // Speed of light (m/s)
  h: 6.626e-34, // Planck's constant (J·s)
  e: 1.602e-19, // Elementary charge (C)
  G: 6.674e-11, // Gravitational constant (N·m²/kg²)
  k: 8.988e9, // Coulomb's constant (N·m²/C²)
} as const;

// Exam Pattern
export const NEET_EXAM = {
  totalQuestions: 180,
  physics: 45,
  chemistry: 45,
  botany: 45,
  zoology: 45,
  marksPerQuestion: 4,
  negativeMarking: -1,
  duration: 180, // minutes
} as const;
