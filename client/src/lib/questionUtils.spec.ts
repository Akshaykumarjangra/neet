import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getPrimaryTopicLabel } from "./questionUtils";
import type { Question } from "@shared/schema";

describe("getPrimaryTopicLabel", () => {
  it("returns the first topic if relatedTopics is a valid array with items", () => {
    const question = { relatedTopics: ["Physics", "Math"] } as Pick<Question, "relatedTopics">;
    assert.equal(getPrimaryTopicLabel(question), "Physics");
  });

  it("returns 'Mixed Practice' if relatedTopics is an empty array", () => {
    const question = { relatedTopics: [] } as Pick<Question, "relatedTopics">;
    assert.equal(getPrimaryTopicLabel(question), "Mixed Practice");
  });

  it("returns 'Mixed Practice' if relatedTopics is null", () => {
    const question = { relatedTopics: null } as Pick<Question, "relatedTopics">;
    assert.equal(getPrimaryTopicLabel(question), "Mixed Practice");
  });

  it("returns 'Mixed Practice' if relatedTopics is undefined", () => {
    const question = {} as Pick<Question, "relatedTopics">;
    assert.equal(getPrimaryTopicLabel(question), "Mixed Practice");
  });

  it("returns 'Mixed Practice' if relatedTopics is not an array (e.g. a string)", () => {
    // This simulates runtime behavior where the API might return a string instead of an array
    const question = { relatedTopics: "Physics" as any } as Pick<Question, "relatedTopics">;
    assert.equal(getPrimaryTopicLabel(question), "Mixed Practice");
  });
});
