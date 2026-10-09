// @ts-nocheck
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponses, scoreResponses } from "./mock-exam-scoring";

describe("mock-exam attempt flow (integration)", () => {
  it("handles save -> submit flow with sanitized responses", () => {
    const questionItems = [
      { questionId: 1, sectionId: 10 },
      { questionId: 2, sectionId: 10 },
    ];

    const sectionMarks = {
      10: { correct: 4, incorrect: -1, unanswered: 0 },
    };

    const correctOptionByQuestion = {
      1: new Set([11]),
      2: new Set([21]),
    };

    const optionIdsByQuestion = {
      1: new Set([11, 12]),
      2: new Set([21, 22]),
    };

    const responsesInput = [
      { questionId: 1, selectedOptionId: 11, timeSpentSeconds: 12 },
      { questionId: 2, selectedOptionId: 999, timeSpentSeconds: 8 },
      { questionId: 999, selectedOptionId: 1, timeSpentSeconds: 3 },
    ];

    const responseMap = sanitizeResponses(responsesInput, new Set([1, 2]), optionIdsByQuestion);
    const result = scoreResponses(555, questionItems, responseMap, sectionMarks, correctOptionByQuestion);

    assert.equal(result.correctCount, 1);
    assert.equal(result.wrongCount, 0);
    assert.equal(result.unansweredCount, 1);
    assert.equal(result.score, 4);
  });
});
