import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Import pure math logic to test logic decoupled from Side effects
import { updateBKT } from "./adaptive-math.ts";

describe("adaptive practice engine BKT updates", () => {
  it("handles perfect mastery (pKnown = 1)", () => {
    // If a student perfectly knows a concept, their knowledge remains 1.0
    // regardless of slips (correct=false) or successful attempts (correct=true)
    const pCorrect = updateBKT(1, true);
    assert.equal(pCorrect, 1, "Knowledge should remain 1.0 after a correct answer");

    const pIncorrect = updateBKT(1, false);
    assert.equal(pIncorrect, 1, "Knowledge should remain 1.0 after an incorrect answer (slip)");
  });

  it("handles complete uncertainty (pKnown = 0)", () => {
    // If a student has 0 knowledge, a correct answer is seen as a guess,
    // and an incorrect answer confirms lack of knowledge.
    // In both cases, pPosterior = 0, but because of p_transit (learning by doing),
    // the new pKnown becomes 0.1 (transit probability).
    const pCorrect = updateBKT(0, true);
    assert.equal(pCorrect, 0.1, "Knowledge should increase to p_transit after a correct guess");

    const pIncorrect = updateBKT(0, false);
    assert.equal(pIncorrect, 0.1, "Knowledge should increase to p_transit after an incorrect answer");
  });

  it("updates probability correctly for initial pKnown = 0.3", () => {
    // Expected values based on p_slip=0.1, p_guess=0.2, p_transit=0.1
    // Correct: pObs = 0.3*0.9 + 0.7*0.2 = 0.41
    //          pPosterior = 0.27 / 0.41 = ~0.6585
    //          result = pPosterior + (1 - pPosterior) * 0.1 = ~0.6927
    const pCorrect = updateBKT(0.3, true);
    assert.ok(Math.abs(pCorrect - 0.69268) < 0.0001, `Expected ~0.6927, got ${pCorrect}`);

    // Incorrect: pObs = 0.3*0.1 + 0.7*0.8 = 0.59
    //            pPosterior = 0.03 / 0.59 = ~0.0508
    //            result = pPosterior + (1 - pPosterior) * 0.1 = ~0.1458
    const pIncorrect = updateBKT(0.3, false);
    assert.ok(Math.abs(pIncorrect - 0.14576) < 0.0001, `Expected ~0.1458, got ${pIncorrect}`);
  });

  it("exhibits bounded monotonic behavior", () => {
    let p = 0.3;
    // Multiple consecutive correct answers should approach 1.0
    for (let i = 0; i < 5; i++) {
      const nextP = updateBKT(p, true);
      assert.ok(nextP > p, "Knowledge should increase with correct answers");
      p = nextP;
    }
    assert.ok(p > 0.95, "Knowledge should asymptotically approach 1.0 with consecutive correct answers");

    // Multiple consecutive incorrect answers should approach the lower bound (p_transit = 0.1)
    p = 0.3;
    for (let i = 0; i < 5; i++) {
      const nextP = updateBKT(p, false);
      assert.ok(nextP < p, "Knowledge should decrease with incorrect answers");
      p = nextP;
    }
    assert.ok(p < 0.15 && p > 0.09, "Knowledge should asymptotically approach p_transit (0.1) with consecutive incorrect answers");
  });
});
