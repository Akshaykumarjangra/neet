import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeLegacyQuestions, type LegacyPracticeQuestion } from "./questionUtils";

describe("normalizeLegacyQuestions", () => {
  it("normalizes a basic legacy question", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        id: 101,
        questionText: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1, // 'B'
        solution: "2 + 2 = 4",
        difficulty: "easy",
        topic: "Math",
      },
    ];

    const result = normalizeLegacyQuestions(legacy);
    assert.equal(result.length, 1);
    assert.equal(result[0].id, 101);
    assert.equal(result[0].questionText, "What is 2 + 2?");
    assert.equal(result[0].options.length, 4);
    assert.deepEqual(result[0].options[0], { id: "A", text: "3" });
    assert.deepEqual(result[0].options[1], { id: "B", text: "4" });
    assert.equal(result[0].correctAnswer, "B");
    assert.equal(result[0].solutionDetail, "2 + 2 = 4");
    assert.equal(result[0].difficultyLevel, 1);
    assert.deepEqual(result[0].relatedTopics, ["Math"]);
    assert.equal(result[0].sourceType, "legacy_practice");
  });

  it("applies default options when options are not provided", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        question: "Is this a question?",
        correctAnswer: "A",
      },
    ];

    const result = normalizeLegacyQuestions(legacy, {
      sourceType: "custom_source",
      defaultDifficulty: 3,
      topicId: 42,
    });

    assert.equal(result.length, 1);
    assert.equal(result[0].questionText, "Is this a question?");
    assert.equal(result[0].topicId, 42);
    assert.equal(result[0].sourceType, "custom_source");
    assert.equal(result[0].difficultyLevel, 3);
  });

  it("handles string versus object options array", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        q: "Mixed options?",
        options: [
          "String Option",
          { text: "Object Option" },
          { id: "X", text: "Custom ID Option" },
        ],
        correctAnswer: "A",
      },
    ];

    const result = normalizeLegacyQuestions(legacy);
    assert.equal(result[0].options.length, 3);
    assert.deepEqual(result[0].options[0], { id: "A", text: "String Option" });
    assert.deepEqual(result[0].options[1], { id: "B", text: "Object Option" });
    assert.deepEqual(result[0].options[2], { id: "X", text: "Custom ID Option" });
  });

  it("handles missing properties gracefully", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        correctAnswer: "A",
      },
    ];

    const result = normalizeLegacyQuestions(legacy);
    assert.equal(result[0].id, 1); // fallback to index + 1
    assert.equal(result[0].questionText, "Practice question"); // fallback text
    assert.deepEqual(result[0].options, []); // fallback to empty options
    assert.equal(result[0].solutionDetail, "Review the concept and try again."); // fallback detail
    assert.equal(result[0].difficultyLevel, 2); // default difficulty is 2
    assert.deepEqual(result[0].relatedTopics, []); // fallback topics array
  });
});
