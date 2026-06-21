import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getQuestionLabel,
  getOptionLabel,
  normalizeLegacyQuestions,
  getDifficultyLabel,
  getPrimaryTopicLabel,
} from "./questionUtils.ts";
import type { LegacyPracticeQuestion } from "./questionUtils.ts";

describe("getQuestionLabel", () => {
  it("should return questionText if available", () => {
    assert.equal(
      getQuestionLabel({ questionText: "text", question: "q" }),
      "text"
    );
  });

  it("should return question if questionText is not available", () => {
    assert.equal(getQuestionLabel({ question: "q" }), "q");
  });

  it("should return empty string if neither is available", () => {
    assert.equal(getQuestionLabel({}), "");
  });
});

describe("getOptionLabel", () => {
  it("should return the option if it is a string", () => {
    assert.equal(getOptionLabel("Option A"), "Option A");
  });

  it("should return the text property if option is an object", () => {
    assert.equal(getOptionLabel({ id: "A", text: "Option A" }), "Option A");
  });

  it("should return an empty string for invalid options", () => {
    assert.equal(getOptionLabel({}), "");
    // @ts-expect-error testing invalid input
    assert.equal(getOptionLabel(null), "");
  });
});

describe("normalizeLegacyQuestions", () => {
  it("should normalize a basic legacy question with default options", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        question: "What is 2+2?",
        options: ["3", "4", "5"],
        correctAnswer: 1, // index for "4"
      },
    ];

    const result = normalizeLegacyQuestions(legacy);

    assert.equal(result.length, 1);
    assert.equal(result[0].questionText, "What is 2+2?");
    assert.equal(result[0].correctAnswer, "B");
    assert.equal(result[0].difficultyLevel, 2); // default
    assert.equal(result[0].topicId, -1);
    assert.equal(result[0].sourceType, "legacy_practice");
    assert.deepEqual(result[0].options, [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "5" },
    ]);
  });

  it("should map difficulty levels correctly", () => {
    const legacy: LegacyPracticeQuestion[] = [
      { correctAnswer: "A", difficulty: "easy" },
      { correctAnswer: "A", difficulty: "medium" },
      { correctAnswer: "A", difficulty: "hard" },
      { correctAnswer: "A", difficulty: "unknown" },
    ];

    const result = normalizeLegacyQuestions(legacy);
    assert.equal(result[0].difficultyLevel, 1);
    assert.equal(result[1].difficultyLevel, 2);
    assert.equal(result[2].difficultyLevel, 3);
    assert.equal(result[3].difficultyLevel, 2); // default
  });

  it("should handle custom normalize options", () => {
    const legacy: LegacyPracticeQuestion[] = [
      { correctAnswer: "A" },
    ];
    const result = normalizeLegacyQuestions(legacy, {
      sourceType: "custom_source",
      defaultDifficulty: 3,
      topicId: 42,
    });

    assert.equal(result[0].sourceType, "custom_source");
    assert.equal(result[0].difficultyLevel, 3);
    assert.equal(result[0].topicId, 42);
  });

  it("should handle object options with text and ids", () => {
    const legacy: LegacyPracticeQuestion[] = [
      {
        correctAnswer: "A",
        options: [
          { id: "A", text: "Option A" },
          { text: "Option B" }, // missing id
        ],
      },
    ];

    const result = normalizeLegacyQuestions(legacy);
    assert.deepEqual(result[0].options, [
      { id: "A", text: "Option A" },
      { id: "B", text: "Option B" },
    ]);
  });
});

describe("getDifficultyLabel", () => {
  it("should return 'Easy' for level 1 or below", () => {
    assert.equal(getDifficultyLabel(1), "Easy");
    assert.equal(getDifficultyLabel(0), "Easy");
    assert.equal(getDifficultyLabel(undefined), "Easy");
  });

  it("should return 'Medium' for level 2", () => {
    assert.equal(getDifficultyLabel(2), "Medium");
  });

  it("should return 'Hard' for level 3 or above", () => {
    assert.equal(getDifficultyLabel(3), "Hard");
    assert.equal(getDifficultyLabel(4), "Hard");
  });
});

describe("getPrimaryTopicLabel", () => {
  it("should return the first topic if available", () => {
    assert.equal(
      getPrimaryTopicLabel({ relatedTopics: ["Math", "Science"] }),
      "Math"
    );
  });

  it("should return 'Mixed Practice' if no topics are available", () => {
    assert.equal(getPrimaryTopicLabel({ relatedTopics: [] }), "Mixed Practice");
    assert.equal(getPrimaryTopicLabel({}), "Mixed Practice");
  });
});
