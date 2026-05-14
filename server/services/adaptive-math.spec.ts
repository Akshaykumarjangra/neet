import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { updateIRT, updateBKT, ETA_THETA, ETA_B, sigmoid, BKT } from './adaptive-math';

describe('updateIRT', () => {
  it('should increase theta and decrease b on a correct answer', () => {
    const initialTheta = 0;
    const initialB = 0;

    const result = updateIRT(initialTheta, initialB, true);

    assert.ok(result.theta > initialTheta, 'Theta should increase after correct answer');
    assert.ok(result.b < initialB, 'B (difficulty) should decrease after correct answer');

    // Explicit exact calculation
    const expectedP = sigmoid(0); // 0.5
    const expectedError = 1 - 0.5; // 0.5
    assert.equal(result.theta, initialTheta + ETA_THETA * expectedError);
    assert.equal(result.b, initialB - ETA_B * expectedError);
  });

  it('should decrease theta and increase b on an incorrect answer', () => {
    const initialTheta = 0;
    const initialB = 0;

    const result = updateIRT(initialTheta, initialB, false);

    assert.ok(result.theta < initialTheta, 'Theta should decrease after incorrect answer');
    assert.ok(result.b > initialB, 'B (difficulty) should increase after incorrect answer');

    // Explicit exact calculation
    const expectedP = sigmoid(0); // 0.5
    const expectedError = 0 - 0.5; // -0.5
    assert.equal(result.theta, initialTheta + ETA_THETA * expectedError);
    assert.equal(result.b, initialB - ETA_B * expectedError);
  });

  it('should handle extreme positive theta inputs smoothly', () => {
    const initialTheta = 10;
    const initialB = 0;

    // correct
    const resultCorrect = updateIRT(initialTheta, initialB, true);
    const p = sigmoid(10);
    const expectedErrorCorrect = 1 - p;
    assert.equal(resultCorrect.theta, initialTheta + ETA_THETA * expectedErrorCorrect);

    // incorrect
    const resultIncorrect = updateIRT(initialTheta, initialB, false);
    const expectedErrorIncorrect = 0 - p;
    assert.equal(resultIncorrect.theta, initialTheta + ETA_THETA * expectedErrorIncorrect);
  });

  it('should handle extreme negative theta inputs smoothly', () => {
    const initialTheta = -10;
    const initialB = 0;

    // correct
    const resultCorrect = updateIRT(initialTheta, initialB, true);
    const p = sigmoid(-10);
    const expectedErrorCorrect = 1 - p;
    assert.equal(resultCorrect.theta, initialTheta + ETA_THETA * expectedErrorCorrect);

    // incorrect
    const resultIncorrect = updateIRT(initialTheta, initialB, false);
    const expectedErrorIncorrect = 0 - p;
    assert.equal(resultIncorrect.theta, initialTheta + ETA_THETA * expectedErrorIncorrect);
  });
});

describe('updateBKT', () => {
  it('should increase probability of knowing on a correct answer', () => {
    const pKnown = 0.5;
    const result = updateBKT(pKnown, true);
    assert.ok(result > pKnown, 'Probability of knowing should increase after a correct answer');
  });

  it('should decrease probability of knowing on an incorrect answer', () => {
    const pKnown = 0.5;
    const result = updateBKT(pKnown, false);
    assert.ok(result < pKnown, 'Probability of knowing should decrease after an incorrect answer');
  });

  it('should handle initial probability correctly on correct answer', () => {
    const result = updateBKT(BKT.p_init, true);
    assert.ok(result > BKT.p_init, 'Probability should increase from initial value after correct answer');
  });

  it('should not exceed 1 or go below 0', () => {
    const resultHigh = updateBKT(1, true);
    assert.ok(resultHigh <= 1, 'Probability should not exceed 1');

    const resultLow = updateBKT(0, false);
    assert.ok(resultLow >= 0, 'Probability should not go below 0');
  });
});
