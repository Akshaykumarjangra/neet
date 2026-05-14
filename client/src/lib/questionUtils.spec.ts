import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getQuestionLabel, getOptionLabel } from "./questionUtils";

describe("getQuestionLabel", () => {
  it("returns questionText if present", () => {
    assert.equal(
      getQuestionLabel({ questionText: "text", question: "question" }),
      "text"
    );
    assert.equal(getQuestionLabel({ questionText: "text" }), "text");
  });

  it("returns question if questionText is missing", () => {
    assert.equal(getQuestionLabel({ question: "question" }), "question");
  });

  it("returns an empty string if both questionText and question are missing", () => {
    assert.equal(getQuestionLabel({}), "");
  });
});

describe("getOptionLabel", () => {
  it("returns the option if it is a string", () => {
    assert.equal(getOptionLabel("Option A"), "Option A");
  });

  it("returns the text property if the option is an object with text", () => {
    assert.equal(getOptionLabel({ id: "A", text: "Option A" }), "Option A");
    assert.equal(getOptionLabel({ text: "Option A" }), "Option A");
  });

  it("returns an empty string if the option is an object without text", () => {
    assert.equal(getOptionLabel({ id: "A" }), "");
    assert.equal(getOptionLabel({}), "");
  });
});
