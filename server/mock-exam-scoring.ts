// @ts-nocheck
export type QuestionItem = {
  questionId: number;
  sectionId: number;
};

export type ResponseInput = {
  questionId: number;
  selectedOptionId?: number | null;
  timeSpentSeconds?: number | null;
  flagged?: boolean;
};

export type SectionMarks = {
  correct: number;
  incorrect: number;
  unanswered: number;
};

export type ScoreResult = {
  responseRows: Array<{
    attemptId: number;
    questionId: number;
    selectedOptionId: number | null;
    isCorrect: boolean | null;
    timeSpentSeconds: number;
    flagged: boolean;
  }>;
  sectionTime: Record<number, number>;
  totalTimeSeconds: number;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
};

export function sanitizeResponses(
  responsesInput: ResponseInput[],
  allowedQuestionIds: Set<number>,
  optionIdsByQuestion: Record<number, Set<number>>
) {
  const responseMap = new Map<number, ResponseInput>();
  for (const r of responsesInput || []) {
    if (!r || typeof r.questionId !== "number") continue;
    if (!allowedQuestionIds.has(r.questionId)) continue;
    const selectedOptionId =
      r.selectedOptionId != null ? Number(r.selectedOptionId) : null;
    if (
      selectedOptionId &&
      !optionIdsByQuestion[r.questionId]?.has(selectedOptionId)
    ) {
      responseMap.set(r.questionId, { ...r, selectedOptionId: null });
      continue;
    }
    responseMap.set(r.questionId, { ...r, selectedOptionId });
  }
  return responseMap;
}

export function scoreResponses(
  attemptId: number,
  questionItems: QuestionItem[],
  responseMap: Map<number, ResponseInput>,
  sectionMarks: Record<number, SectionMarks>,
  correctOptionByQuestion: Record<number, Set<number>>
): ScoreResult {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  let totalScore = 0;
  let totalTimeSeconds = 0;

  const sectionTime: Record<number, number> = {};
  const responseRows: ScoreResult["responseRows"] = [];

  for (const item of questionItems) {
    const r = responseMap.get(item.questionId);
    const marksCfg = sectionMarks[item.sectionId] || {
      correct: 0,
      incorrect: 0,
      unanswered: 0,
    };

    if (!r || !r.selectedOptionId) {
      unansweredCount += 1;
      totalScore += marksCfg.unanswered;
      const timeSpentSeconds = Number(r?.timeSpentSeconds) || 0;
      responseRows.push({
        attemptId,
        questionId: item.questionId,
        selectedOptionId: null,
        isCorrect: null,
        timeSpentSeconds,
        flagged: !!r?.flagged,
      });
      if (timeSpentSeconds) {
        totalTimeSeconds += timeSpentSeconds;
        sectionTime[item.sectionId] =
          (sectionTime[item.sectionId] || 0) + timeSpentSeconds;
      }
      continue;
    }

    const isCorrect =
      correctOptionByQuestion[item.questionId]?.has(
        Number(r.selectedOptionId)
      ) || false;
    if (isCorrect) {
      correctCount += 1;
      totalScore += marksCfg.correct;
    } else {
      wrongCount += 1;
      totalScore += marksCfg.incorrect;
    }

    const timeSpent = Number(r.timeSpentSeconds) || 0;
    totalTimeSeconds += timeSpent;
    sectionTime[item.sectionId] =
      (sectionTime[item.sectionId] || 0) + timeSpent;

    responseRows.push({
      attemptId,
      questionId: item.questionId,
      selectedOptionId: Number(r.selectedOptionId),
      isCorrect,
      timeSpentSeconds: timeSpent,
      flagged: !!r.flagged,
    });
  }

  return {
    responseRows,
    sectionTime,
    totalTimeSeconds,
    score: totalScore,
    correctCount,
    wrongCount,
    unansweredCount,
  };
}
