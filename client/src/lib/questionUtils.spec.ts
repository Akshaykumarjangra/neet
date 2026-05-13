import { normalizeLegacyQuestions, LegacyPracticeQuestion } from "./questionUtils.ts";

describe("normalizeLegacyQuestions", () => {
  it("maps basic legacy question correctly", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        id: 100,
        questionText: "What is 2+2?",
        options: ["3", "4", "5"],
        correctAnswer: 1, // 'B'
        solution: "2+2=4",
        topic: "Math",
        difficulty: "easy"
      }
    ];

    const result = normalizeLegacyQuestions(legacy);

    expect(result.length).toBe(1);
    const q = result[0];

    expect(q.id).toBe(100);
    expect(q.questionText).toBe("What is 2+2?");
    expect(q.options).toEqual([
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "5" }
    ]);
    expect(q.correctAnswer).toBe("B");
    expect(q.solutionDetail).toBe("2+2=4");
    expect(q.difficultyLevel).toBe(1);
    expect(q.sourceType).toBe("legacy_practice");
    expect(q.relatedTopics).toEqual(["Math"]);
  });

  it("handles fallback properties for question text and solution", () => {
    const legacy1: LegacyPracticeQuestion = {
      q: "Test Q",
      correctAnswer: "A",
      explanation: "Exp"
    };

    const legacy2: LegacyPracticeQuestion = {
      question: "Test Question",
      correctAnswer: "C",
      detail: "Det"
    };

    const result = normalizeLegacyQuestions([legacy1, legacy2]);

    expect(result[0].questionText).toBe("Test Q");
    expect(result[0].solutionDetail).toBe("Exp");

    expect(result[1].questionText).toBe("Test Question");
    expect(result[1].solutionDetail).toBe("Det");
  });

  it("applies default values for missing fields", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        correctAnswer: "C"
      }
    ];

    const result = normalizeLegacyQuestions(legacy, {
      sourceType: "custom_source",
      defaultDifficulty: 4,
      topicId: 42
    });

    const q = result[0];
    expect(q.id).toBe(1); // fallback id to index + 1
    expect(q.topicId).toBe(42);
    expect(q.questionText).toBe("Practice question");
    expect(q.options).toEqual([]);
    expect(q.correctAnswer).toBe("C");
    expect(q.solutionDetail).toBe("Review the concept and try again.");
    expect(q.difficultyLevel).toBe(4);
    expect(q.sourceType).toBe("custom_source");
    expect(q.relatedTopics).toEqual([]);
  });

  it("normalizes mixed option types", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        correctAnswer: "A",
        options: [
          "string option",
          { id: "B", text: "object option" },
          { text: "object without id" },
          {} as any
        ]
      }
    ];

    const result = normalizeLegacyQuestions(legacy);

    expect(result[0].options).toEqual([
      { id: "A", text: "string option" },
      { id: "B", text: "object option" },
      { id: "C", text: "object without id" },
      { id: "D", text: "" }
    ]);
  });

  it("handles difficulty mapping", () => {
    const legacy: LegacyPracticeQuestion[] = [
      { correctAnswer: "A", difficulty: "EASY" },
      { correctAnswer: "A", difficulty: "medium" },
      { correctAnswer: "A", difficulty: "HARD" },
      { correctAnswer: "A", difficulty: "unknown" },
      { correctAnswer: "A", difficulty: "" }
    ];

    const result = normalizeLegacyQuestions(legacy, { defaultDifficulty: 5 });

    expect(result[0].difficultyLevel).toBe(1);
    expect(result[1].difficultyLevel).toBe(2);
    expect(result[2].difficultyLevel).toBe(3);
    expect(result[3].difficultyLevel).toBe(5); // Fallback to default
    expect(result[4].difficultyLevel).toBe(5); // Fallback to default
  });

  it("handles various correctAnswer formats", () => {
    const legacy: LegacyPracticeQuestion[] = [
      { correctAnswer: 0 }, // Should be 'A'
      { correctAnswer: 2 }, // Should be 'C'
      { correctAnswer: "D" },
      { correctAnswer: undefined as any }
    ];

    const result = normalizeLegacyQuestions(legacy);

    expect(result[0].correctAnswer).toBe("A");
    expect(result[1].correctAnswer).toBe("C");
    expect(result[2].correctAnswer).toBe("D");
    expect(result[3].correctAnswer).toBe("A"); // Fallback to 'A'
  });
});