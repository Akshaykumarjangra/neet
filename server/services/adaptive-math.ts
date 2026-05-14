export const ETA_THETA = 0.10;
export const ETA_B = 0.05;
export const BKT = { p_init: 0.30, p_transit: 0.10, p_slip: 0.10, p_guess: 0.20 };

export const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

export function updateIRT(theta: number, b: number, correct: boolean): { theta: number; b: number } {
  const p = sigmoid(theta - b);
  const error = (correct ? 1 : 0) - p;
  return { theta: theta + ETA_THETA * error, b: b - ETA_B * error };
}

export function updateBKT(pKnown: number, correct: boolean): number {
  const pCorrectIfKnown = 1 - BKT.p_slip;
  const pCorrectIfNot = BKT.p_guess;
  const pObs = correct
    ? pKnown * pCorrectIfKnown + (1 - pKnown) * pCorrectIfNot
    : pKnown * BKT.p_slip + (1 - pKnown) * (1 - BKT.p_guess);
  const pPosterior = correct
    ? (pKnown * pCorrectIfKnown) / pObs
    : (pKnown * BKT.p_slip) / pObs;
  return pPosterior + (1 - pPosterior) * BKT.p_transit;
}
