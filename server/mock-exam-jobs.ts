// @ts-nocheck
import { db } from "./db";
import {
  mockExamAttempts,
  mockExamPapers,
  mockExamResponses,
  mockExamPaperQuestions,
  mockExamSections,
  mockExamQuestions,
  mockExamOptions,
  mockExamAttemptSections,
  mockExamAttemptQuestions,
} from "@shared/schema";
import { and, eq, inArray, lt, or } from "drizzle-orm";

/**
 * Auto-submits attempts whose paper window has ended.
 */
export async function autoSubmitExpiredAttempts() {
  const now = new Date();

  const expiredAttempts = await db
    .select({
      attemptId: mockExamAttempts.id,
      paperId: mockExamAttempts.paperId,
    })
    .from(mockExamAttempts)
    .innerJoin(mockExamPapers, eq(mockExamAttempts.paperId, mockExamPapers.id))
    .where(
      and(
        eq(mockExamAttempts.status, "in_progress"),
        or(
          lt(mockExamPapers.endsAt, now),
          lt(mockExamAttempts.endsAt, now)
        )
      )
    );

  if (!expiredAttempts.length) {
    return;
  }

  const paperIds = Array.from(new Set(expiredAttempts.map((a) => a.paperId)));
  const paperSections = await db
    .select()
    .from(mockExamSections)
    .where(inArray(mockExamSections.paperId, paperIds));
  const paperSectionById: Record<number, any> = {};
  for (const s of paperSections) {
    paperSectionById[s.id] = s;
  }

  const paperQuestions = await db
    .select()
    .from(mockExamPaperQuestions)
    .where(inArray(mockExamPaperQuestions.paperId, paperIds));
  const questionIds = paperQuestions.map((pq) => pq.questionId);

  const options = questionIds.length
    ? await db.select().from(mockExamOptions).where(inArray(mockExamOptions.questionId, questionIds))
    : [];

  const sectionByQuestion: Record<number, number> = {};
  const paperQuestionsByPaper: Record<number, any[]> = {};
  for (const pq of paperQuestions) {
    sectionByQuestion[pq.questionId] = pq.sectionId;
    paperQuestionsByPaper[pq.paperId] = paperQuestionsByPaper[pq.paperId] || [];
    paperQuestionsByPaper[pq.paperId].push(pq);
  }

  const sectionMarks: Record<number, { correct: number; incorrect: number; unanswered: number }> = {};
  for (const section of paperSections) {
    sectionMarks[section.id] = {
      correct: Number(section.marksCorrect ?? 0),
      incorrect: Number(section.marksIncorrect ?? 0),
      unanswered: Number(section.marksUnanswered ?? 0),
    };
  }

  const correctOptionByQuestion: Record<number, Set<number>> = {};
  for (const opt of options) {
    if (opt.isCorrect) {
      correctOptionByQuestion[opt.questionId] = correctOptionByQuestion[opt.questionId] || new Set();
      correctOptionByQuestion[opt.questionId].add(opt.id);
    }
  }

  for (const attempt of expiredAttempts) {
    const attemptResponses = await db
      .select()
      .from(mockExamResponses)
      .where(eq(mockExamResponses.attemptId, attempt.attemptId));

    const responseByQuestion = new Map<number, any>();
    for (const r of attemptResponses) {
      responseByQuestion.set(r.questionId, r);
    }

    const attemptQuestionRows = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attempt.attemptId));

    const questionItems = attemptQuestionRows.length
      ? attemptQuestionRows.map((aq) => ({
          questionId: aq.questionId,
          sectionId: aq.sectionId,
          snapshot: aq.snapshot,
        }))
      : (paperQuestionsByPaper[attempt.paperId] || []).map((pq) => ({
          questionId: pq.questionId,
          sectionId: pq.sectionId,
        }));

    const correctOptionByQuestionLocal: Record<number, Set<number>> = {};
    if (attemptQuestionRows.length) {
      for (const aq of attemptQuestionRows) {
        const snapshotOptions = aq.snapshot?.options || [];
        for (const opt of snapshotOptions) {
          if (opt.isCorrect) {
            correctOptionByQuestionLocal[aq.questionId] = correctOptionByQuestionLocal[aq.questionId] || new Set();
            correctOptionByQuestionLocal[aq.questionId].add(Number(opt.id));
          }
        }
      }
    }

    const optionLookup = attemptQuestionRows.length ? correctOptionByQuestionLocal : correctOptionByQuestion;

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    let totalScore = 0;
    let totalTimeSeconds = 0;

    const sectionTime: Record<number, number> = {};
    const responseRows: any[] = [];

    for (const item of questionItems) {
      const existing = responseByQuestion.get(item.questionId);
      const sectionId = item.sectionId || sectionByQuestion[item.questionId];
      const marksCfg = sectionMarks[sectionId] || { correct: 0, incorrect: 0, unanswered: 0 };

      if (!existing || !existing.selectedOptionId) {
        unansweredCount += 1;
        totalScore += marksCfg.unanswered;
        responseRows.push({
          attemptId: attempt.attemptId,
          questionId: item.questionId,
          selectedOptionId: null,
          isCorrect: null,
          timeSpentSeconds: existing?.timeSpentSeconds || 0,
          flagged: existing?.flagged || false,
        });
        if (existing?.timeSpentSeconds) {
          totalTimeSeconds += Number(existing.timeSpentSeconds) || 0;
          sectionTime[sectionId] = (sectionTime[sectionId] || 0) + (Number(existing.timeSpentSeconds) || 0);
        }
        continue;
      }

      const isCorrect = optionLookup[item.questionId]?.has(Number(existing.selectedOptionId)) || false;
      if (isCorrect) {
        correctCount += 1;
        totalScore += marksCfg.correct;
      } else {
        wrongCount += 1;
        totalScore += marksCfg.incorrect;
      }

      const timeSpent = Number(existing.timeSpentSeconds) || 0;
      totalTimeSeconds += timeSpent;
      sectionTime[sectionId] = (sectionTime[sectionId] || 0) + timeSpent;

      responseRows.push({
        attemptId: attempt.attemptId,
        questionId: item.questionId,
        selectedOptionId: Number(existing.selectedOptionId),
        isCorrect,
        timeSpentSeconds: timeSpent,
        flagged: !!existing.flagged,
      });
    }

    await db.transaction(async (tx) => {
      await tx.delete(mockExamResponses).where(eq(mockExamResponses.attemptId, attempt.attemptId));
      if (responseRows.length) {
        await tx.insert(mockExamResponses).values(responseRows);
      }

      await tx.delete(mockExamAttemptSections).where(eq(mockExamAttemptSections.attemptId, attempt.attemptId));
      const sectionRows = Object.entries(sectionTime).map(([sectionId, timeSpentSeconds]) => ({
        attemptId: attempt.attemptId,
        sectionId: Number(sectionId),
        timeSpentSeconds: Number(timeSpentSeconds) || 0,
      }));
      if (sectionRows.length) {
        await tx.insert(mockExamAttemptSections).values(sectionRows);
      }

      await tx
        .update(mockExamAttempts)
        .set({
          status: "auto_submitted",
          submittedAt: new Date(),
          score: totalScore,
          totalTimeSeconds,
          correctCount,
          wrongCount,
          unansweredCount,
        })
        .where(eq(mockExamAttempts.id, attempt.attemptId));
    });
  }
}

export async function purgeOldMockExamAttempts(retentionDays = 90) {
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

  const attemptsToDelete = await db
    .select({ id: mockExamAttempts.id })
    .from(mockExamAttempts)
    .where(
      and(
        lt(mockExamAttempts.submittedAt, cutoff),
        inArray(mockExamAttempts.status, ["submitted", "auto_submitted", "expired"])
      )
    );

  if (!attemptsToDelete.length) {
    return { deleted: 0 };
  }

  const attemptIds = attemptsToDelete.map((row) => row.id);

  await db.transaction(async (tx) => {
    await tx.delete(mockExamResponses).where(inArray(mockExamResponses.attemptId, attemptIds));
    await tx.delete(mockExamAttemptSections).where(inArray(mockExamAttemptSections.attemptId, attemptIds));
    await tx.delete(mockExamAttemptQuestions).where(inArray(mockExamAttemptQuestions.attemptId, attemptIds));
    await tx.delete(mockExamAttempts).where(inArray(mockExamAttempts.id, attemptIds));
  });

  return { deleted: attemptIds.length };
}
