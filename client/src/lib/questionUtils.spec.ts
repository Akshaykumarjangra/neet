import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getDifficultyLabel } from "./questionUtils.js";

describe("getDifficultyLabel", () => {
  it("should return 'Easy' for undefined, 0, 1, or negative values", () => {
    assert.equal(getDifficultyLabel(undefined), "Easy");
    assert.equal(getDifficultyLabel(0), "Easy");
    assert.equal(getDifficultyLabel(1), "Easy");
    assert.equal(getDifficultyLabel(-1), "Easy");
  });

  it("should return 'Medium' for level 2", () => {
    assert.equal(getDifficultyLabel(2), "Medium");
  });

  it("should return 'Hard' for level 3 or greater", () => {
    assert.equal(getDifficultyLabel(3), "Hard");
    assert.equal(getDifficultyLabel(4), "Hard");
    assert.equal(getDifficultyLabel(10), "Hard");
  });

  it("should return 'Level X' for values strictly between 1 and 2, and 2 and 3", () => {
    assert.equal(getDifficultyLabel(1.5), "Level 1.5");
    assert.equal(getDifficultyLabel(2.5), "Level 2.5");
  });
});
