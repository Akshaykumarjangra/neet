import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { GamificationService } from "./gamification.ts";

describe("GamificationService XP Formula", () => {
  describe("getXpForLevel", () => {
    it("calculates correct XP needed for positive levels", () => {
      assert.equal(GamificationService.getXpForLevel(1), 100);
      assert.equal(GamificationService.getXpForLevel(2), 200);
      assert.equal(GamificationService.getXpForLevel(3), 300);
      assert.equal(GamificationService.getXpForLevel(10), 1000);
    });

    it("handles edge cases (zero and negative levels)", () => {
      assert.equal(GamificationService.getXpForLevel(0), 0);
      assert.equal(GamificationService.getXpForLevel(-1), -100);
      assert.equal(GamificationService.getXpForLevel(-5), -500);
    });
  });

  describe("getTotalXpForLevel", () => {
    it("calculates cumulative XP correctly for positive levels", () => {
      assert.equal(GamificationService.getTotalXpForLevel(1), 100); // 100
      assert.equal(GamificationService.getTotalXpForLevel(2), 300); // 100 + 200
      assert.equal(GamificationService.getTotalXpForLevel(3), 600); // 100 + 200 + 300
      assert.equal(GamificationService.getTotalXpForLevel(4), 1000); // 100 + 200 + 300 + 400
      assert.equal(GamificationService.getTotalXpForLevel(5), 1500); // 100 + 200 + 300 + 400 + 500
    });

    it("returns 0 for zero or negative levels", () => {
      assert.equal(GamificationService.getTotalXpForLevel(0), 0);
      assert.equal(GamificationService.getTotalXpForLevel(-1), 0);
      assert.equal(GamificationService.getTotalXpForLevel(-5), 0);
    });
  });
});
