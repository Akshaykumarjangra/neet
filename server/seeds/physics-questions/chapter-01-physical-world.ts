// Physics Chapter 1: Physical World - Practice Questions

export const chapter01Questions = [
   {
      questionText: "Which of the following is NOT a fundamental force in nature?",
      options: [
         { id: "A", text: "Gravitational force" },
         { id: "B", text: "Electromagnetic force" },
         { id: "C", text: "Frictional force" },
         { id: "D", text: "Strong nuclear force" }
      ],
      correctAnswer: "C",
      solutionDetail: "Frictional force is not a fundamental force. It is a manifestation of electromagnetic forces between atoms and molecules at surfaces. The four fundamental forces are: Gravitational, Electromagnetic, Strong Nuclear, and Weak Nuclear forces.",
      solutionSteps: [
         "Identify the four fundamental forces in nature",
         "Gravitational force acts between masses",
         "Electromagnetic force acts between charges",
         "Strong nuclear force binds nucleons in nucleus",
         "Weak nuclear force is responsible for radioactive decay",
         "Friction is derived from electromagnetic interactions"
      ],
      difficultyLevel: 1,
      sourceType: "practice"
   },
   {
      questionText: "The range of gravitational force is:",
      options: [
         { id: "A", text: "Infinite" },
         { id: "B", text: "10⁻¹⁵ m" },
         { id: "C", text: "10⁻¹⁰ m" },
         { id: "D", text: "Limited to solar system" }
      ],
      correctAnswer: "A",
      solutionDetail: "Gravitational force has infinite range, though it decreases with distance as 1/r². It acts between all masses in the universe, no matter how far apart they are.",
      solutionSteps: [
         "Gravitational force follows inverse square law: F = Gm₁m₂/r²",
         "As r → ∞, F → 0 but never becomes exactly zero",
         "Therefore, range is infinite",
         "Compare with strong nuclear force (range ~10⁻¹⁵ m)"
      ],
      difficultyLevel: 2,
      sourceType: "practice"
   }
];
