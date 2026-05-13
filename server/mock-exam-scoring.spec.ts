// @ts-nocheck
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponses, scoreResponses } from "./mock-exam-scoring";

describe("mock-exam scoring", () => {
  it("scores correct, wrong, and unanswered responses with negative marking", () => {
    const questionItems = [
      { questionId: 1, sectionId: 10 },
      { questionId: 2, sectionId: 10 },
      { questionId: 3, sectionId: 10 },
    ];

    const sectionMarks = {
      10: { correct: 4, incorrect: -1, unanswered: 0 },
    };

    const correctOptionByQuestion = {
      1: new Set([11]),
      2: new Set([21]),
      3: new Set([31]),
    };

    const optionIdsByQuestion = {
      1: new Set([11, 12]),
      2: new Set([21, 22]),
      3: new Set([31, 32]),
    };

    const responsesInput = [
      { questionId: 1, selectedOptionId: 11, timeSpentSeconds: 20 },
      { questionId: 2, selectedOptionId: 22, timeSpentSeconds: 15 },
    ];

    const responseMap = sanitizeResponses(responsesInput, new Set([1, 2, 3]), optionIdsByQuestion);
    const result = scoreResponses(99, questionItems, responseMap, sectionMarks, correctOptionByQuestion);

    assert.equal(result.correctCount, 1);
    assert.equal(result.wrongCount, 1);
    assert.equal(result.unansweredCount, 1);
    assert.equal(result.score, 3);
    assert.equal(result.totalTimeSeconds, 35);
    assert.equal(result.responseRows.length, 3);
  });

  describe("sanitizeResponses", () => {
    it("handles null/undefined/empty responsesInput array", () => {
      assert.equal(sanitizeResponses(null as any, new Set(), {}).size, 0);
      assert.equal(sanitizeResponses(undefined as any, new Set(), {}).size, 0);
      assert.equal(sanitizeResponses([], new Set(), {}).size, 0);
    });

    it("ignores null/undefined/invalid items in responsesInput", () => {
      const result = sanitizeResponses(
        [null as any, undefined as any, { questionId: "not a number" as any }, {} as any],
        new Set([1]),
        {}
      );
      assert.equal(result.size, 0);
    });

    it("ignores responses where questionId is not in allowedQuestionIds", () => {
      const result = sanitizeResponses(
        [{ questionId: 1, selectedOptionId: 101 }, { questionId: 2, selectedOptionId: 201 }],
        new Set([1]),
        { 1: new Set([101]) }
      );
      assert.equal(result.size, 1);
      assert.ok(result.has(1));
      assert.equal(result.has(2), false);
    });

    it("handles null or undefined selectedOptionId", () => {
      const result = sanitizeResponses(
        [{ questionId: 1, selectedOptionId: null }, { questionId: 2, selectedOptionId: undefined }],
        new Set([1, 2]),
        { 1: new Set([101]), 2: new Set([201]) }
      );
      assert.equal(result.size, 2);
      assert.equal(result.get(1)?.selectedOptionId, null);
      assert.equal(result.get(2)?.selectedOptionId, null);
    });

    it("parses string selectedOptionId to number", () => {
      const result = sanitizeResponses(
        [{ questionId: 1, selectedOptionId: "101" as any }],
        new Set([1]),
        { 1: new Set([101]) }
      );
      assert.equal(result.size, 1);
      assert.equal(result.get(1)?.selectedOptionId, 101);
    });

    it("sanitizes responses with invalid option ids", () => {
      const responseMap = sanitizeResponses(
        [{ questionId: 1, selectedOptionId: 999 }],
        new Set([1]),
        { 1: new Set([101, 102]) }
      );

      const response = responseMap.get(1);
      assert.ok(response);
      assert.equal(response.selectedOptionId, null);
    });
  });

  it("aggregates section time totals", () => {
    const questionItems = [
      { questionId: 1, sectionId: 10 },
      { questionId: 2, sectionId: 11 },
    ];

    const sectionMarks = {
      10: { correct: 4, incorrect: -1, unanswered: 0 },
      11: { correct: 4, incorrect: -1, unanswered: 0 },
    };

    const correctOptionByQuestion = {
      1: new Set([101]),
      2: new Set([201]),
    };

    const optionIdsByQuestion = {
      1: new Set([101, 102]),
      2: new Set([201, 202]),
    };

    const responsesInput = [
      { questionId: 1, selectedOptionId: 101, timeSpentSeconds: 40 },
      { questionId: 2, selectedOptionId: 201, timeSpentSeconds: 55 },
    ];

    const responseMap = sanitizeResponses(responsesInput, new Set([1, 2]), optionIdsByQuestion);
    const result = scoreResponses(101, questionItems, responseMap, sectionMarks, correctOptionByQuestion);

    assert.equal(result.sectionTime[10], 40);
    assert.equal(result.sectionTime[11], 55);
  });
});
