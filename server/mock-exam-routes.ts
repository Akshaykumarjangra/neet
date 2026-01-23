// @ts-nocheck
import { Router } from "express";
import { db } from "./db";
import {
  mockTestSeries,
  mockExamPapers,
  mockExamSections,
  mockExamQuestions,
  mockExamOptions,
  mockExamPaperQuestions,
  mockExamAttempts,
  mockExamResponses,
  mockExamAttemptSections,
  mockExamAttemptQuestions,
  users,
  webhookEvents,
  mockExamAssignments,
  organizationMembers,
} from "@shared/schema";
import { and, eq, inArray, sql } from "drizzle-orm";
import { requireAuthWithPasswordCheck, getCurrentUser, requireActiveSubscription } from "./auth";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { sanitizeResponses, scoreResponses } from "./mock-exam-scoring";
import { isFeatureEnabled } from "./feature-flags";

const startLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) =>
    req.session?.userId ? `user:${req.session.userId}` : ipKeyGenerator(req, res),
});

const submitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) =>
    req.session?.userId ? `user:${req.session.userId}` : ipKeyGenerator(req, res),
});

function shuffleArray<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isHardDifficulty(value: any) {
  if (value == null) return false;
  const normalized = String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (["hard", "veryhard", "expert", "advanced"].includes(normalized)) {
    return true;
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric >= 4;
}

async function getUserMemberships(userId: string) {
  return db
    .select()
    .from(organizationMembers)
    .where(eq(organizationMembers.userId, userId));
}

function isAssignmentSatisfied(assignments: any[], memberships: any[], userId: string) {
  if (!assignments.length) {
    return true;
  }

  return assignments.some((assignment) => {
    if (assignment.userId && assignment.userId === userId) {
      return true;
    }

    if (assignment.organizationId) {
      return memberships.some((membership) => {
        if (membership.organizationId !== assignment.organizationId) {
          return false;
        }
        if (!assignment.classSection) {
          return true;
        }
        return membership.classSection === assignment.classSection;
      });
    }

    return false;
  });
}

const router = Router();

router.use(requireAuthWithPasswordCheck);

router.get("/papers", async (req, res) => {
  try {
    const seriesId = req.query.seriesId ? Number(req.query.seriesId) : undefined;
    const q = String(req.query.q || "").trim();
    const minDuration = req.query.minDuration ? Number(req.query.minDuration) : undefined;
    const maxDuration = req.query.maxDuration ? Number(req.query.maxDuration) : undefined;
    const statusFilter = String(req.query.status || "available").toLowerCase();
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(req.query.pageSize as string) || 20, 1), 100);
    const now = new Date();

    const baseFilters: any[] = [eq(mockExamPapers.status, "published")];
    if (seriesId) {
      baseFilters.push(eq(mockExamPapers.seriesId, seriesId));
    }
    if (Number.isFinite(minDuration)) {
      baseFilters.push(sql`${mockExamPapers.durationMinutes} >= ${minDuration}`);
    }
    if (Number.isFinite(maxDuration)) {
      baseFilters.push(sql`${mockExamPapers.durationMinutes} <= ${maxDuration}`);
    }
    if (q) {
      baseFilters.push(
        sql`(LOWER(${mockExamPapers.title}) LIKE LOWER(${`%${q}%`}) OR LOWER(${mockExamPapers.description}) LIKE LOWER(${`%${q}%`}))`
      );
    }

    const papers = await db
      .select()
      .from(mockExamPapers)
      .where(baseFilters.length ? and(...baseFilters) : undefined)
      .orderBy(mockExamPapers.id);

    const timeFiltered = papers.filter((p) => {
      const startsAt = p.startsAt;
      const endsAt = p.endsAt;
      const isUpcoming = startsAt && startsAt > now;
      const isCompleted = endsAt && endsAt < now;
      const isAvailable = !isUpcoming && !isCompleted;

      switch (statusFilter) {
        case "all":
          return true;
        case "upcoming":
          return !!isUpcoming;
        case "completed":
          return !!isCompleted;
        case "available":
        default:
          return !!isAvailable;
      }
    });

    const paperIds = timeFiltered.map((p) => p.id);
    const assignments = paperIds.length
      ? await db.select().from(mockExamAssignments).where(inArray(mockExamAssignments.paperId, paperIds))
      : [];
    const assignmentsByPaper: Record<number, any[]> = {};
    for (const assignment of assignments) {
      assignmentsByPaper[assignment.paperId] = assignmentsByPaper[assignment.paperId] || [];
      assignmentsByPaper[assignment.paperId].push(assignment);
    }

    const userId = getCurrentUser(req);
    const memberships = userId ? await getUserMemberships(userId) : [];
    const accessFiltered = timeFiltered.filter((paper) =>
      isAssignmentSatisfied(assignmentsByPaper[paper.id] || [], memberships, userId || "")
    );

    const sections = paperIds.length
      ? await db.select().from(mockExamSections).where(inArray(mockExamSections.paperId, paperIds))
      : [];
    const sectionsByPaper: Record<number, any[]> = {};
    for (const section of sections) {
      sectionsByPaper[section.paperId] = sectionsByPaper[section.paperId] || [];
      sectionsByPaper[section.paperId].push(section);
    }

    const total = accessFiltered.length;
    const paged = accessFiltered.slice((page - 1) * pageSize, page * pageSize);

    const data = paged.map((paper) => ({
      ...paper,
      sectionCount: sectionsByPaper[paper.id]?.length || 0,
      totalQuestions: sectionsByPaper[paper.id]?.reduce((acc, s) => acc + (s.questionCount || 0), 0) || 0,
    }));

    res.json({ data, page, pageSize, total });
  } catch (error) {
    console.error("Failed to list mock exam papers:", error);
    res.status(500).json({ error: "Failed to list mock exam papers" });
  }
});

router.get("/series", async (_req, res) => {
  try {
    const series = await db
      .select()
      .from(mockTestSeries)
      .where(eq(mockTestSeries.isPublished, true))
      .orderBy(mockTestSeries.id);

    res.json({ data: series });
  } catch (error) {
    console.error("Failed to list mock test series:", error);
    res.status(500).json({ error: "Failed to list mock test series" });
  }
});

router.get("/papers/:paperId", async (req, res) => {
  try {
    const paperId = Number(req.params.paperId);
    if (!Number.isInteger(paperId)) {
      return res.status(400).json({ error: "Invalid paper id" });
    }

    const [paper] = await db.select().from(mockExamPapers).where(eq(mockExamPapers.id, paperId)).limit(1);
    if (!paper || paper.status !== "published") {
      return res.status(404).json({ error: "Paper not found or unpublished" });
    }

    const sections = await db
      .select()
      .from(mockExamSections)
      .where(eq(mockExamSections.paperId, paperId))
      .orderBy(mockExamSections.displayOrder);

    res.json({ paper, sections });
  } catch (error) {
    console.error("Failed to fetch mock exam paper:", error);
    res.status(500).json({ error: "Failed to fetch paper" });
  }
});

router.post("/papers/:paperId/start", requireActiveSubscription(), startLimiter, async (req, res) => {
  try {
    const paperId = Number(req.params.paperId);
    if (!Number.isInteger(paperId)) {
      return res.status(400).json({ error: "Invalid paper id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [paper] = await db.select().from(mockExamPapers).where(eq(mockExamPapers.id, paperId)).limit(1);
    if (!paper || paper.status !== "published") {
      return res.status(404).json({ error: "Paper not found or unpublished" });
    }

    const now = new Date();
    if (paper.startsAt && paper.startsAt > now) {
      return res.status(403).json({ error: "Paper not yet available" });
    }
    if (paper.endsAt && paper.endsAt < now) {
      return res.status(403).json({ error: "Paper is closed" });
    }

    const assignments = await db
      .select()
      .from(mockExamAssignments)
      .where(eq(mockExamAssignments.paperId, paperId));
    if (assignments.length) {
      const memberships = await getUserMemberships(userId);
      if (!isAssignmentSatisfied(assignments, memberships, userId)) {
        return res.status(403).json({ error: "Paper not assigned to this user" });
      }
    }

    const [activeAttempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(
        and(
          eq(mockExamAttempts.paperId, paperId),
          eq(mockExamAttempts.userId, userId),
          eq(mockExamAttempts.status, "in_progress")
        )
      )
      .limit(1);

    let attempt = activeAttempt;

    const [{ count: finishedCount }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(mockExamAttempts)
      .where(
        and(
          eq(mockExamAttempts.paperId, paperId),
          eq(mockExamAttempts.userId, userId),
          inArray(mockExamAttempts.status, ["submitted", "auto_submitted", "expired"])
        )
      );

    if (!attempt) {
      if (paper.attemptsAllowed && finishedCount >= paper.attemptsAllowed) {
        return res.status(403).json({ error: "No attempts remaining" });
      }

      const deviceFingerprint =
        req.get?.("x-device-fingerprint") ||
        req.get?.("x-device-id") ||
        null;

      const endsAt = paper.durationMinutes
        ? new Date(Date.now() + Number(paper.durationMinutes) * 60 * 1000)
        : null;

      const [created] = await db
        .insert(mockExamAttempts)
        .values({
          paperId,
          userId,
          attemptNumber: finishedCount + 1,
          status: "in_progress",
          endsAt,
          ipAddress: (req.ip || "").slice(0, 45),
          userAgent: req.get?.("user-agent"),
          deviceFingerprint: deviceFingerprint ? String(deviceFingerprint).slice(0, 200) : null,
        })
        .returning();
      attempt = created;
    } else if (!attempt.endsAt && paper.durationMinutes) {
      const endsAt = new Date(new Date(attempt.startedAt).getTime() + Number(paper.durationMinutes) * 60 * 1000);
      const [updated] = await db
        .update(mockExamAttempts)
        .set({ endsAt })
        .where(eq(mockExamAttempts.id, attempt.id))
        .returning();
      attempt = updated || attempt;
    }

    const sections = await db
      .select()
      .from(mockExamSections)
      .where(eq(mockExamSections.paperId, paperId))
      .orderBy(mockExamSections.displayOrder);

    if (attempt.endsAt && attempt.endsAt < new Date()) {
      return res.status(403).json({ error: "Attempt has expired" });
    }

    const attemptQuestions = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attempt.id))
      .orderBy(mockExamAttemptQuestions.position);

    let assembledQuestions: any[] = [];

    if (!attemptQuestions.length) {
      const paperQuestions = await db
        .select()
        .from(mockExamPaperQuestions)
        .where(eq(mockExamPaperQuestions.paperId, paperId))
        .orderBy(mockExamPaperQuestions.position);

      const questionIds = paperQuestions.map((pq) => pq.questionId);
      const questions = questionIds.length
        ? await db.select().from(mockExamQuestions).where(inArray(mockExamQuestions.id, questionIds))
        : [];
      const options = questionIds.length
        ? await db.select().from(mockExamOptions).where(inArray(mockExamOptions.questionId, questionIds))
        : [];

      const questionById: Record<number, any> = {};
      for (const q of questions) {
        questionById[q.id] = q;
      }

      const optionsByQuestion: Record<number, any[]> = {};
      for (const opt of options) {
        optionsByQuestion[opt.questionId] = optionsByQuestion[opt.questionId] || [];
        optionsByQuestion[opt.questionId].push(opt);
      }

      const sectionOrder = sections.map((s) => s.id);
      let position = 1;
      const attemptQuestionRows: any[] = [];

      for (const sectionId of sectionOrder) {
        const sectionQuestions = paperQuestions.filter((pq) => pq.sectionId === sectionId);
        const orderedQuestions = paper.shuffleQuestions ? shuffleArray(sectionQuestions) : sectionQuestions;

        for (const pq of orderedQuestions) {
          const q = questionById[pq.questionId];
          const optionList = optionsByQuestion[q.id] || [];
          const shuffledOptions = paper.shuffleOptions ? shuffleArray(optionList) : optionList;

          const snapshot = {
            id: q.id,
            stem: q.stem,
            mediaRef: q.mediaRef,
            subject: q.subject,
            topic: q.topic,
            subtopic: q.subtopic,
            difficulty: q.difficulty,
            explanation: q.explanation,
            options: shuffledOptions.map((opt) => ({
              id: opt.id,
              label: opt.label,
              text: opt.text,
              mediaRef: opt.mediaRef,
              isCorrect: opt.isCorrect,
            })),
          };

          attemptQuestionRows.push({
            attemptId: attempt.id,
            questionId: q.id,
            sectionId,
            position,
            snapshot,
          });

          assembledQuestions.push({
            id: q.id,
            sectionId,
            subject: q.subject,
            topic: q.topic,
            subtopic: q.subtopic,
            difficulty: q.difficulty,
            stem: q.stem,
            mediaRef: q.mediaRef,
            options: shuffledOptions.map((opt) => ({
              id: opt.id,
              label: opt.label,
              text: opt.text,
              mediaRef: opt.mediaRef,
            })),
            position,
          });

          position += 1;
        }
      }

      if (attemptQuestionRows.length) {
        await db.insert(mockExamAttemptQuestions).values(attemptQuestionRows);
      }
    } else {
      assembledQuestions = attemptQuestions.map((aq) => {
        const snapshot = aq.snapshot || {};
        return {
          id: snapshot.id || aq.questionId,
          sectionId: aq.sectionId,
          subject: snapshot.subject,
          topic: snapshot.topic,
          subtopic: snapshot.subtopic,
          difficulty: snapshot.difficulty,
          stem: snapshot.stem,
          mediaRef: snapshot.mediaRef,
          options: (snapshot.options || []).map((opt: any) => ({
            id: opt.id,
            label: opt.label,
            text: opt.text,
            mediaRef: opt.mediaRef,
          })),
          position: aq.position,
        };
      });
    }

    const savedResponses = attempt
      ? await db
        .select({
          questionId: mockExamResponses.questionId,
          selectedOptionId: mockExamResponses.selectedOptionId,
          flagged: mockExamResponses.flagged,
          timeSpentSeconds: mockExamResponses.timeSpentSeconds,
        })
        .from(mockExamResponses)
        .where(eq(mockExamResponses.attemptId, attempt.id))
      : [];

    res.json({
      attemptId: attempt.id,
      attemptEndsAt: attempt.endsAt,
      paper: {
        ...paper,
        sections: sections.map((s) => ({
          id: s.id,
          name: s.name,
          marksCorrect: s.marksCorrect,
          marksIncorrect: s.marksIncorrect,
          marksUnanswered: s.marksUnanswered,
          questionCount: s.questionCount,
          durationMinutes: s.durationMinutes,
          displayOrder: s.displayOrder,
        })),
      },
      questions: assembledQuestions,
      savedResponses,
    });
  } catch (error) {
    console.error("Failed to start mock exam:", error);
    res.status(500).json({ error: "Failed to start mock exam" });
  }
});

router.post("/attempts/:attemptId/save", submitLimiter, async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }
    if (attempt.status !== "in_progress") {
      return res.status(400).json({ error: "Attempt already submitted" });
    }

    const [paper] = await db
      .select()
      .from(mockExamPapers)
      .where(eq(mockExamPapers.id, attempt.paperId))
      .limit(1);
    if (!paper) {
      return res.status(404).json({ error: "Paper not found" });
    }
    if (paper.endsAt && paper.endsAt < new Date()) {
      return res.status(403).json({ error: "Paper window closed" });
    }
    if (attempt.endsAt && attempt.endsAt < new Date()) {
      return res.status(403).json({ error: "Attempt time expired" });
    }

    const updates = Array.isArray(req.body?.responses) ? req.body.responses : [];
    if (!updates.length) {
      return res.status(400).json({ error: "No responses provided" });
    }

    const attemptQuestions = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attemptId));
    const allowedQuestionIds = new Set(attemptQuestions.map((aq) => aq.questionId));
    const sectionByQuestion: Record<number, number> = {};
    for (const aq of attemptQuestions) {
      sectionByQuestion[aq.questionId] = aq.sectionId;
    }

    if (!attemptQuestions.length) {
      const paperQuestions = await db
        .select()
        .from(mockExamPaperQuestions)
        .where(eq(mockExamPaperQuestions.paperId, attempt.paperId));
      paperQuestions.forEach((pq) => {
        allowedQuestionIds.add(pq.questionId);
        sectionByQuestion[pq.questionId] = pq.sectionId;
      });
    }

    const optionIdsByQuestion: Record<number, Set<number>> = {};
    if (attemptQuestions.length) {
      for (const aq of attemptQuestions) {
        const snapshotOptions = aq.snapshot?.options || [];
        for (const opt of snapshotOptions) {
          optionIdsByQuestion[aq.questionId] = optionIdsByQuestion[aq.questionId] || new Set();
          optionIdsByQuestion[aq.questionId].add(Number(opt.id));
        }
      }
    } else if (allowedQuestionIds.size) {
      const optionRows = await db
        .select()
        .from(mockExamOptions)
        .where(inArray(mockExamOptions.questionId, Array.from(allowedQuestionIds)));
      for (const opt of optionRows) {
        optionIdsByQuestion[opt.questionId] = optionIdsByQuestion[opt.questionId] || new Set();
        optionIdsByQuestion[opt.questionId].add(opt.id);
      }
    }

    const updatesFiltered = updates
      .filter((u: any) => allowedQuestionIds.has(Number(u.questionId)))
      .map((u: any) => {
        const questionId = Number(u.questionId);
        const selectedOptionId = u.selectedOptionId != null ? Number(u.selectedOptionId) : null;
        if (selectedOptionId && !optionIdsByQuestion[questionId]?.has(selectedOptionId)) {
          return { ...u, questionId, selectedOptionId: null };
        }
        return { ...u, questionId, selectedOptionId };
      });
    if (!updatesFiltered.length) {
      return res.status(400).json({ error: "No valid responses for this paper" });
    }

    const questionIdsToUpdate = updatesFiltered.map((u: any) => Number(u.questionId));

    const responseRows = updatesFiltered.map((u: any) => ({
      attemptId,
      questionId: Number(u.questionId),
      selectedOptionId: u.selectedOptionId != null ? Number(u.selectedOptionId) : null,
      isCorrect: null,
      timeSpentSeconds: Number(u.timeSpentSeconds) || 0,
      flagged: !!u.flagged,
    }));

    await db.transaction(async (tx) => {
      await tx
        .delete(mockExamResponses)
        .where(
          and(
            eq(mockExamResponses.attemptId, attemptId),
            inArray(mockExamResponses.questionId, questionIdsToUpdate)
          )
        );

      await tx.insert(mockExamResponses).values(responseRows);

      const allResponses = await tx
        .select()
        .from(mockExamResponses)
        .where(eq(mockExamResponses.attemptId, attemptId));

      const sectionTotals: Record<number, number> = {};
      let totalTimeSeconds = 0;
      for (const resp of allResponses) {
        const sectionId = sectionByQuestion[resp.questionId];
        if (sectionId) {
          sectionTotals[sectionId] = (sectionTotals[sectionId] || 0) + (Number(resp.timeSpentSeconds) || 0);
        }
        totalTimeSeconds += Number(resp.timeSpentSeconds) || 0;
      }

      await tx.delete(mockExamAttemptSections).where(eq(mockExamAttemptSections.attemptId, attemptId));
      const sectionRows = Object.entries(sectionTotals).map(([sectionId, timeSpentSeconds]) => ({
        attemptId,
        sectionId: Number(sectionId),
        timeSpentSeconds: Number(timeSpentSeconds) || 0,
      }));
      if (sectionRows.length) {
        await tx.insert(mockExamAttemptSections).values(sectionRows);
      }

      await tx
        .update(mockExamAttempts)
        .set({
          totalTimeSeconds,
        })
        .where(eq(mockExamAttempts.id, attemptId));
    });

    res.json({ success: true, updated: responseRows.length });
  } catch (error) {
    console.error("Failed to save mock exam responses:", error);
    res.status(500).json({ error: "Failed to save responses" });
  }
});

router.post("/attempts/:attemptId/focus-loss", async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }
    if (attempt.status !== "in_progress") {
      return res.status(400).json({ error: "Attempt already submitted" });
    }

    const now = new Date();
    const [updated] = await db
      .update(mockExamAttempts)
      .set({
        focusLossCount: sql`${mockExamAttempts.focusLossCount} + 1`,
        lastFocusLossAt: now,
      })
      .where(eq(mockExamAttempts.id, attemptId))
      .returning();

    res.json({ focusLossCount: updated?.focusLossCount ?? attempt.focusLossCount + 1, lastFocusLossAt: now });
  } catch (error) {
    console.error("Failed to record focus loss:", error);
    res.status(500).json({ error: "Failed to record focus loss" });
  }
});

router.post("/attempts/:attemptId/heartbeat", async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) return res.status(400).json({ error: "Invalid attempt id" });

    const userId = getCurrentUser(req);
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) return res.status(404).json({ error: "Attempt not found" });
    if (attempt.status !== "in_progress") return res.status(400).json({ error: "Attempt not in progress" });

    const now = new Date();
    // Verify attempt hasn't expired
    if (attempt.endsAt && attempt.endsAt < now) {
      return res.status(403).json({ error: "Attempt expired" });
    }

    const { timeSpentSeconds } = req.body;
    const updates: any = { lastActiveAt: now };

    // Accumulate time spent if provided (client sends incremental or total, let's assume client tracks delta or accurate total)
    // Ideally we trust server time difference, but for simple MVP heartbeat we just update activity timestamp
    // If we want to track timeSpentSeconds from client:
    if (typeof timeSpentSeconds === 'number') {
      updates.totalTimeSeconds = timeSpentSeconds;
    }

    await db
      .update(mockExamAttempts)
      .set(updates)
      .where(eq(mockExamAttempts.id, attemptId));

    res.json({ success: true, serverTime: now.toISOString() });
  } catch (error) {
    console.error("Heartbeat failed:", error);
    res.status(500).json({ error: "Heartbeat failed" });
  }
});

router.post("/attempts/:attemptId/submit", submitLimiter, async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);
    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }
    if (attempt.status !== "in_progress") {
      return res.status(400).json({ error: "Attempt already submitted" });
    }

    const [paper] = await db
      .select()
      .from(mockExamPapers)
      .where(eq(mockExamPapers.id, attempt.paperId))
      .limit(1);
    if (!paper) {
      return res.status(404).json({ error: "Paper not found" });
    }
    const now = new Date();
    const isClosed = (paper.endsAt && paper.endsAt < now) || (attempt.endsAt && attempt.endsAt < now);

    const responsesInput = Array.isArray(req.body?.responses) ? req.body.responses : [];

    const paperId = attempt.paperId;
    const paperSections = await db
      .select()
      .from(mockExamSections)
      .where(eq(mockExamSections.paperId, paperId));

    const attemptQuestions = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attemptId));

    let questionItems: Array<{ questionId: number; sectionId: number; snapshot?: any }> = [];
    const sectionByQuestion: Record<number, number> = {};
    const correctOptionByQuestion: Record<number, Set<number>> = {};
    const optionIdsByQuestion: Record<number, Set<number>> = {};

    if (attemptQuestions.length) {
      questionItems = attemptQuestions.map((aq) => ({
        questionId: aq.questionId,
        sectionId: aq.sectionId,
        snapshot: aq.snapshot,
      }));

      for (const aq of attemptQuestions) {
        sectionByQuestion[aq.questionId] = aq.sectionId;
        const snapshotOptions = aq.snapshot?.options || [];
        for (const opt of snapshotOptions) {
          if (opt.isCorrect) {
            correctOptionByQuestion[aq.questionId] = correctOptionByQuestion[aq.questionId] || new Set();
            correctOptionByQuestion[aq.questionId].add(Number(opt.id));
          }
          optionIdsByQuestion[aq.questionId] = optionIdsByQuestion[aq.questionId] || new Set();
          optionIdsByQuestion[aq.questionId].add(Number(opt.id));
        }
      }
    } else {
      const paperQuestions = await db
        .select()
        .from(mockExamPaperQuestions)
        .where(eq(mockExamPaperQuestions.paperId, paperId));
      const questionIds = paperQuestions.map((pq) => pq.questionId);
      for (const pq of paperQuestions) {
        sectionByQuestion[pq.questionId] = pq.sectionId;
        questionItems.push({ questionId: pq.questionId, sectionId: pq.sectionId });
      }

      const options = questionIds.length
        ? await db.select().from(mockExamOptions).where(inArray(mockExamOptions.questionId, questionIds))
        : [];
      for (const opt of options) {
        if (opt.isCorrect) {
          correctOptionByQuestion[opt.questionId] = correctOptionByQuestion[opt.questionId] || new Set();
          correctOptionByQuestion[opt.questionId].add(opt.id);
        }
        optionIdsByQuestion[opt.questionId] = optionIdsByQuestion[opt.questionId] || new Set();
        optionIdsByQuestion[opt.questionId].add(opt.id);
      }
    }

    const sectionMarks: Record<number, { correct: number; incorrect: number; unanswered: number }> = {};
    for (const section of paperSections) {
      sectionMarks[section.id] = {
        correct: Number(section.marksCorrect ?? 0),
        incorrect: Number(section.marksIncorrect ?? 0),
        unanswered: Number(section.marksUnanswered ?? 0),
      };
    }

    const allowedQuestionIds = new Set(questionItems.map((item) => item.questionId));
    const responseMap = sanitizeResponses(responsesInput, allowedQuestionIds, optionIdsByQuestion);

    const {
      responseRows,
      sectionTime,
      totalTimeSeconds,
      score: totalScore,
      correctCount,
      wrongCount,
      unansweredCount,
    } = scoreResponses(attemptId, questionItems, responseMap, sectionMarks, correctOptionByQuestion);

    await db.transaction(async (tx) => {
      await tx.delete(mockExamResponses).where(eq(mockExamResponses.attemptId, attemptId));
      if (responseRows.length) {
        await tx.insert(mockExamResponses).values(responseRows);
      }

      await tx.delete(mockExamAttemptSections).where(eq(mockExamAttemptSections.attemptId, attemptId));
      const sectionRows = Object.entries(sectionTime).map(([sectionId, timeSpentSeconds]) => ({
        attemptId,
        sectionId: Number(sectionId),
        timeSpentSeconds: Number(timeSpentSeconds) || 0,
      }));
      if (sectionRows.length) {
        await tx.insert(mockExamAttemptSections).values(sectionRows);
      }

      await tx.insert(webhookEvents).values({
        eventId: `mock-exam-${attemptId}-${Date.now()}`,
        provider: "mock_exam",
        eventType: isClosed ? "mock_exam_expired" : "mock_exam_submitted",
        payload: {
          attemptId,
          paperId,
          userId,
          status: isClosed ? "expired" : "submitted",
          score: totalScore,
          correctCount,
          wrongCount,
          unansweredCount,
          totalTimeSeconds,
        },
      });

      await tx
        .update(mockExamAttempts)
        .set({
          status: isClosed ? "expired" : "submitted",
          submittedAt: new Date(),
          score: totalScore,
          totalTimeSeconds,
          correctCount,
          wrongCount,
          unansweredCount,
        })
        .where(eq(mockExamAttempts.id, attemptId));
    });

    console.info("[mock-exam] submit", {
      attemptId,
      paperId,
      userId,
      status: isClosed ? "expired" : "submitted",
      score: totalScore,
      correctCount,
      wrongCount,
      unansweredCount,
      totalTimeSeconds,
    });

    res.json({
      attemptId,
      status: isClosed ? "expired" : "submitted",
      score: totalScore,
      correctCount,
      wrongCount,
      unansweredCount,
    });
  } catch (error) {
    console.error("Failed to submit mock exam attempt:", error);
    res.status(500).json({ error: "Failed to submit attempt" });
  }
});

router.get("/attempts/:attemptId/review", async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }
    if (attempt.status === "in_progress") {
      return res.status(400).json({ error: "Attempt not submitted yet" });
    }

    const responses = await db
      .select()
      .from(mockExamResponses)
      .where(eq(mockExamResponses.attemptId, attemptId));

    const responseByQuestion = new Map<number, any>();
    for (const r of responses) {
      responseByQuestion.set(r.questionId, r);
    }

    const attemptQuestions = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attemptId))
      .orderBy(mockExamAttemptQuestions.position);

    let reviewItems: any[] = [];

    if (attemptQuestions.length) {
      reviewItems = attemptQuestions.map((aq) => {
        const snapshot = aq.snapshot || {};
        const opts = snapshot.options || [];
        const resp = responseByQuestion.get(aq.questionId);
        const correctOptionIds = opts.filter((o: any) => o.isCorrect).map((o: any) => o.id);
        return {
          question: {
            id: snapshot.id || aq.questionId,
            stem: snapshot.stem,
            mediaRef: snapshot.mediaRef,
            subject: snapshot.subject,
            topic: snapshot.topic,
            subtopic: snapshot.subtopic,
            difficulty: snapshot.difficulty,
            explanation: snapshot.explanation,
            options: opts.map((o: any) => ({
              id: o.id,
              label: o.label,
              text: o.text,
              mediaRef: o.mediaRef,
              isCorrect: o.isCorrect,
            })),
            correctOptionIds,
          },
          response: resp
            ? {
              selectedOptionId: resp.selectedOptionId,
              isCorrect: resp.isCorrect,
              timeSpentSeconds: resp.timeSpentSeconds,
              flagged: resp.flagged,
            }
            : null,
        };
      });
    } else {
      const questionIds = responses.map((r) => r.questionId);
      const questions = questionIds.length
        ? await db.select().from(mockExamQuestions).where(inArray(mockExamQuestions.id, questionIds))
        : [];
      const options = questionIds.length
        ? await db.select().from(mockExamOptions).where(inArray(mockExamOptions.questionId, questionIds))
        : [];

      const optionsByQuestion: Record<number, any[]> = {};
      for (const opt of options) {
        optionsByQuestion[opt.questionId] = optionsByQuestion[opt.questionId] || [];
        optionsByQuestion[opt.questionId].push(opt);
      }

      reviewItems = questions.map((q) => {
        const resp = responseByQuestion.get(q.id);
        const opts = optionsByQuestion[q.id] || [];
        const correctOptionIds = opts.filter((o) => o.isCorrect).map((o) => o.id);
        return {
          question: {
            id: q.id,
            stem: q.stem,
            mediaRef: q.mediaRef,
            subject: q.subject,
            topic: q.topic,
            subtopic: q.subtopic,
            difficulty: q.difficulty,
            explanation: q.explanation,
            options: opts.map((o) => ({
              id: o.id,
              label: o.label,
              text: o.text,
              mediaRef: o.mediaRef,
              isCorrect: o.isCorrect,
            })),
            correctOptionIds,
          },
          response: resp
            ? {
              selectedOptionId: resp.selectedOptionId,
              isCorrect: resp.isCorrect,
              timeSpentSeconds: resp.timeSpentSeconds,
              flagged: resp.flagged,
            }
            : null,
        };
      });
    }

    const filterParam = String(req.query.filter || "").trim();
    const minTimeSeconds = Math.max(parseInt(req.query.minTimeSeconds as string) || 0, 0);
    const filters = filterParam
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    let filteredItems = reviewItems;
    const slowThreshold = minTimeSeconds > 0 ? minTimeSeconds : 60;

    for (const filter of filters) {
      switch (filter) {
        case "flagged":
          filteredItems = filteredItems.filter((item) => !!item.response?.flagged);
          break;
        case "wrong":
          filteredItems = filteredItems.filter((item) => item.response?.isCorrect === false);
          break;
        case "correct":
          filteredItems = filteredItems.filter((item) => item.response?.isCorrect === true);
          break;
        case "unanswered":
          filteredItems = filteredItems.filter((item) => item.response?.selectedOptionId == null);
          break;
        case "slow":
          filteredItems = filteredItems.filter(
            (item) => (Number(item.response?.timeSpentSeconds) || 0) >= slowThreshold
          );
          break;
        case "hardest":
          filteredItems = filteredItems.filter((item) => isHardDifficulty(item.question?.difficulty));
          break;
        default:
          break;
      }
    }

    res.json({
      attempt: {
        id: attempt.id,
        score: attempt.score,
        correctCount: attempt.correctCount,
        wrongCount: attempt.wrongCount,
        unansweredCount: attempt.unansweredCount,
        submittedAt: attempt.submittedAt,
      },
      items: filteredItems,
    });
  } catch (error) {
    console.error("Failed to fetch mock exam review:", error);
    res.status(500).json({ error: "Failed to fetch attempt review" });
  }
});

router.get("/attempts/:attemptId/analytics", async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }
    if (attempt.status === "in_progress") {
      return res.status(400).json({ error: "Attempt not submitted yet" });
    }

    const responses = await db
      .select()
      .from(mockExamResponses)
      .where(eq(mockExamResponses.attemptId, attemptId));

    const attemptQuestions = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attemptId));

    const sections = await db
      .select()
      .from(mockExamSections)
      .where(eq(mockExamSections.paperId, attempt.paperId));

    const questionById: Record<number, any> = {};
    const sectionByQuestion: Record<number, number> = {};
    for (const aq of attemptQuestions) {
      questionById[aq.questionId] = aq.snapshot || {};
      sectionByQuestion[aq.questionId] = aq.sectionId;
    }

    if (!attemptQuestions.length) {
      const questionIds = responses.map((r) => r.questionId);
      const questions = questionIds.length
        ? await db.select().from(mockExamQuestions).where(inArray(mockExamQuestions.id, questionIds))
        : [];
      for (const q of questions) {
        questionById[q.id] = q;
      }
      const paperQuestions = await db
        .select()
        .from(mockExamPaperQuestions)
        .where(eq(mockExamPaperQuestions.paperId, attempt.paperId));
      for (const pq of paperQuestions) {
        sectionByQuestion[pq.questionId] = pq.sectionId;
      }
    }

    const sectionMeta: Record<number, any> = {};
    for (const s of sections) {
      sectionMeta[s.id] = { id: s.id, name: s.name };
    }

    const bySubject: Record<string, any> = {};
    const bySection: Record<number, any> = {};
    const byTopic: Record<string, any> = {};
    const bySubtopic: Record<string, any> = {};

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    let totalTimeSeconds = 0;

    for (const resp of responses) {
      const question = questionById[resp.questionId];
      const subject = question?.subject || "Unknown";
      const topic = question?.topic || "Unspecified";
      const subtopic = question?.subtopic || "Unspecified";
      const sectionId = sectionByQuestion[resp.questionId];

      const timeSpent = Number(resp.timeSpentSeconds) || 0;
      totalTimeSeconds += timeSpent;

      let bucketKey = "unanswered";
      if (resp.isCorrect === true) {
        bucketKey = "correct";
      } else if (resp.isCorrect === false) {
        bucketKey = "wrong";
      }

      if (bucketKey === "correct") correct += 1;
      if (bucketKey === "wrong") wrong += 1;
      if (bucketKey === "unanswered") unanswered += 1;

      if (!bySubject[subject]) {
        bySubject[subject] = {
          subject,
          correct: 0,
          wrong: 0,
          unanswered: 0,
          totalTimeSeconds: 0,
        };
      }
      bySubject[subject][bucketKey] += 1;
      bySubject[subject].totalTimeSeconds += timeSpent;

      const topicKey = `${subject}::${topic}`;
      if (!byTopic[topicKey]) {
        byTopic[topicKey] = {
          subject,
          topic,
          correct: 0,
          wrong: 0,
          unanswered: 0,
          totalTimeSeconds: 0,
        };
      }
      byTopic[topicKey][bucketKey] += 1;
      byTopic[topicKey].totalTimeSeconds += timeSpent;

      const subtopicKey = `${subject}::${topic}::${subtopic}`;
      if (!bySubtopic[subtopicKey]) {
        bySubtopic[subtopicKey] = {
          subject,
          topic,
          subtopic,
          correct: 0,
          wrong: 0,
          unanswered: 0,
          totalTimeSeconds: 0,
        };
      }
      bySubtopic[subtopicKey][bucketKey] += 1;
      bySubtopic[subtopicKey].totalTimeSeconds += timeSpent;

      if (sectionId) {
        if (!bySection[sectionId]) {
          bySection[sectionId] = {
            sectionId,
            name: sectionMeta[sectionId]?.name || "Unknown",
            correct: 0,
            wrong: 0,
            unanswered: 0,
            totalTimeSeconds: 0,
          };
        }
        bySection[sectionId][bucketKey] += 1;
        bySection[sectionId].totalTimeSeconds += timeSpent;
      }
    }

    const totalQuestions = correct + wrong + unanswered;
    const accuracy = totalQuestions ? Number((correct / totalQuestions).toFixed(4)) : 0;

    const bySubjectArray = Object.values(bySubject).map((s: any) => ({
      ...s,
      totalQuestions: s.correct + s.wrong + s.unanswered,
      accuracy: s.correct + s.wrong + s.unanswered ? Number((s.correct / (s.correct + s.wrong + s.unanswered)).toFixed(4)) : 0,
    }));

    const bySectionArray = Object.values(bySection).map((s: any) => ({
      ...s,
      totalQuestions: s.correct + s.wrong + s.unanswered,
      accuracy: s.correct + s.wrong + s.unanswered ? Number((s.correct / (s.correct + s.wrong + s.unanswered)).toFixed(4)) : 0,
    }));

    res.json({
      attemptId,
      totals: {
        totalQuestions,
        correct,
        wrong,
        unanswered,
        accuracy,
        totalTimeSeconds,
      },
      bySubject: bySubjectArray,
      bySection: bySectionArray,
      byTopic: Object.values(byTopic).map((s: any) => ({
        ...s,
        totalQuestions: s.correct + s.wrong + s.unanswered,
        accuracy: s.correct + s.wrong + s.unanswered ? Number((s.correct / (s.correct + s.wrong + s.unanswered)).toFixed(4)) : 0,
      })),
      bySubtopic: Object.values(bySubtopic).map((s: any) => ({
        ...s,
        totalQuestions: s.correct + s.wrong + s.unanswered,
        accuracy: s.correct + s.wrong + s.unanswered ? Number((s.correct / (s.correct + s.wrong + s.unanswered)).toFixed(4)) : 0,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch mock exam analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

router.get("/attempts/:attemptId/summary", async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }
    if (attempt.status === "in_progress") {
      return res.status(400).json({ error: "Attempt not submitted yet" });
    }

    const responses = await db
      .select()
      .from(mockExamResponses)
      .where(eq(mockExamResponses.attemptId, attemptId));

    const attemptQuestions = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attemptId));

    const sections = await db
      .select()
      .from(mockExamSections)
      .where(eq(mockExamSections.paperId, attempt.paperId));

    const questionById: Record<number, any> = {};
    const sectionByQuestion: Record<number, number> = {};
    for (const aq of attemptQuestions) {
      questionById[aq.questionId] = aq.snapshot || {};
      sectionByQuestion[aq.questionId] = aq.sectionId;
    }

    if (!attemptQuestions.length) {
      const questionIds = responses.map((r) => r.questionId);
      const questions = questionIds.length
        ? await db.select().from(mockExamQuestions).where(inArray(mockExamQuestions.id, questionIds))
        : [];
      for (const q of questions) {
        questionById[q.id] = q;
      }
      const paperQuestions = await db
        .select()
        .from(mockExamPaperQuestions)
        .where(eq(mockExamPaperQuestions.paperId, attempt.paperId));
      for (const pq of paperQuestions) {
        sectionByQuestion[pq.questionId] = pq.sectionId;
      }
    }

    const sectionMeta: Record<number, any> = {};
    for (const s of sections) {
      sectionMeta[s.id] = { id: s.id, name: s.name };
    }

    const bySubject: Record<string, any> = {};
    const bySection: Record<number, any> = {};

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    let totalTimeSeconds = 0;

    for (const resp of responses) {
      const question = questionById[resp.questionId];
      const subject = question?.subject || "Unknown";
      const sectionId = sectionByQuestion[resp.questionId];
      const timeSpent = Number(resp.timeSpentSeconds) || 0;
      totalTimeSeconds += timeSpent;

      let bucketKey = "unanswered";
      if (resp.isCorrect === true) {
        bucketKey = "correct";
      } else if (resp.isCorrect === false) {
        bucketKey = "wrong";
      }

      if (bucketKey === "correct") correct += 1;
      if (bucketKey === "wrong") wrong += 1;
      if (bucketKey === "unanswered") unanswered += 1;

      if (!bySubject[subject]) {
        bySubject[subject] = {
          subject,
          correct: 0,
          wrong: 0,
          unanswered: 0,
          totalTimeSeconds: 0,
        };
      }
      bySubject[subject][bucketKey] += 1;
      bySubject[subject].totalTimeSeconds += timeSpent;

      if (sectionId) {
        if (!bySection[sectionId]) {
          bySection[sectionId] = {
            sectionId,
            name: sectionMeta[sectionId]?.name || "Unknown",
            correct: 0,
            wrong: 0,
            unanswered: 0,
            totalTimeSeconds: 0,
          };
        }
        bySection[sectionId][bucketKey] += 1;
        bySection[sectionId].totalTimeSeconds += timeSpent;
      }
    }

    const totalQuestions = correct + wrong + unanswered;
    const accuracy = totalQuestions ? Number((correct / totalQuestions).toFixed(4)) : 0;

    const subjectBreakdown = Object.values(bySubject).map((s: any) => ({
      ...s,
      totalQuestions: s.correct + s.wrong + s.unanswered,
      accuracy: s.correct + s.wrong + s.unanswered ? Number((s.correct / (s.correct + s.wrong + s.unanswered)).toFixed(4)) : 0,
    }));

    const sectionBreakdown = Object.values(bySection).map((s: any) => ({
      ...s,
      totalQuestions: s.correct + s.wrong + s.unanswered,
      accuracy: s.correct + s.wrong + s.unanswered ? Number((s.correct / (s.correct + s.wrong + s.unanswered)).toFixed(4)) : 0,
    }));

    res.json({
      attempt: {
        id: attempt.id,
        paperId: attempt.paperId,
        status: attempt.status,
        score: attempt.score,
        submittedAt: attempt.submittedAt,
        totalTimeSeconds: attempt.totalTimeSeconds,
      },
      totals: {
        totalQuestions,
        correct,
        wrong,
        unanswered,
        accuracy,
        totalTimeSeconds,
        averageTimeSeconds: totalQuestions ? Number((totalTimeSeconds / totalQuestions).toFixed(2)) : 0,
      },
      subjectBreakdown,
      sectionBreakdown,
    });
  } catch (error) {
    console.error("Failed to fetch mock exam summary:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

router.get("/papers/:paperId/leaderboard", async (req, res) => {
  try {
    const paperId = Number(req.params.paperId);
    if (!Number.isInteger(paperId)) {
      return res.status(400).json({ error: "Invalid paper id" });
    }

    const limit = Math.min(Math.max(parseInt(req.query.limit as string) || 50, 1), 200);

    const leaderboard = await db.execute(
      sql`
        SELECT
          a.user_id,
          u.name,
          u.email,
          a.score,
          a.total_time_seconds,
          a.submitted_at,
          RANK() OVER (ORDER BY a.score DESC NULLS LAST, a.total_time_seconds ASC NULLS LAST, a.submitted_at ASC NULLS LAST) AS rank,
          PERCENT_RANK() OVER (ORDER BY a.score DESC NULLS LAST, a.total_time_seconds ASC NULLS LAST, a.submitted_at ASC NULLS LAST) AS percent_rank
        FROM mock_exam_attempts a
        LEFT JOIN users u ON u.id = a.user_id
        WHERE a.paper_id = ${paperId} AND a.status IN ('submitted', 'auto_submitted')
        ORDER BY a.score DESC NULLS LAST, a.total_time_seconds ASC NULLS LAST, a.submitted_at ASC NULLS LAST
        LIMIT ${limit};
      `
    );

    const totalCountResult = await db.execute(
      sql`SELECT count(*)::int AS count FROM mock_exam_attempts WHERE paper_id = ${paperId} AND status IN ('submitted', 'auto_submitted');`
    );

    res.json({
      totalSubmissions: (totalCountResult.rows?.[0]?.count as number) || 0,
      entries: leaderboard.rows?.map((row: any) => ({
        userId: row.user_id,
        name: row.name,
        email: row.email,
        score: Number(row.score),
        totalTimeSeconds: row.total_time_seconds ? Number(row.total_time_seconds) : null,
        submittedAt: row.submitted_at,
        rank: row.rank ? Number(row.rank) : null,
        percentile: row.percent_rank != null ? Math.round((1 - Number(row.percent_rank)) * 100) : null,
      })) || [],
    });
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

router.get("/attempts", async (req, res) => {
  try {
    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const attempts = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.userId, userId))
      .orderBy(sql`COALESCE(${mockExamAttempts.submittedAt}, ${mockExamAttempts.startedAt}) DESC`);

    res.json({ data: attempts });
  } catch (error) {
    console.error("Failed to list attempts:", error);
    res.status(500).json({ error: "Failed to list attempts" });
  }
});


router.get("/attempts/:attemptId/analytics", async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    // Allow viewing analytics for submitted or expired tests
    if (attempt.status === "in_progress") {
      return res.status(400).json({ error: "Test is still in progress" });
    }

    // --- Deep Analytics Calculation ---

    // 1. Fetch all attempts for this paper (for Rank/Percentile)
    const allAttempts = await db
      .select({
        id: mockExamAttempts.id,
        score: mockExamAttempts.score,
        totalTimeSeconds: mockExamAttempts.totalTimeSeconds,
        correctCount: mockExamAttempts.correctCount,
        wrongCount: mockExamAttempts.wrongCount,
        unansweredCount: mockExamAttempts.unansweredCount,
        userId: mockExamAttempts.userId,
      })
      .from(mockExamAttempts)
      .where(
        and(
          eq(mockExamAttempts.paperId, attempt.paperId),
          inArray(mockExamAttempts.status, ["submitted", "auto_submitted", "expired"])
        )
      );

    // Filter to only valid scored attempts (exclude null scores if any)
    const validAttempts = allAttempts.filter(a => a.score != null);

    // Sort by score descending, then time ascending (tie-breaker)
    validAttempts.sort((a, b) => {
      if ((b.score || 0) !== (a.score || 0)) {
        return (b.score || 0) - (a.score || 0);
      }
      return (a.totalTimeSeconds || 0) - (b.totalTimeSeconds || 0);
    });

    const totalParticipants = validAttempts.length;
    const currentRank = validAttempts.findIndex(a => a.id === attemptId) + 1;

    // Percentile = (Number of people behind you / Total people) * 100
    // "Behind you" means strictly lower rank (higher index in our sorted list)
    // Actually, standard percentile definition: (Number of scores < your score / Total scores) * 100
    const peopleBelowMe = validAttempts.filter(a => (a.score || 0) < (attempt.score || 0)).length;
    const percentile = totalParticipants > 1
      ? (peopleBelowMe / totalParticipants) * 100
      : 100; // If you're the only one, you're top 100%? Or 99.9? Let's say 100 for purely ego reasons or 0.

    // 2. Topper Stats
    const topper = validAttempts[0] || null;
    const topperStats = topper ? {
      score: topper.score,
      timeTaken: topper.totalTimeSeconds,
      accuracy: topper.correctCount ? (topper.correctCount / ((topper.correctCount + (topper.wrongCount || 0)) || 1)) * 100 : 0
    } : null;

    // 3. Average Stats
    const avgScore = validAttempts.reduce((acc, curr) => acc + (curr.score || 0), 0) / (totalParticipants || 1);
    const avgTime = validAttempts.reduce((acc, curr) => acc + (curr.totalTimeSeconds || 0), 0) / (totalParticipants || 1);

    // 4. Subject-wise breakdown (existing logic from report, but simplified for analytics chart)
    const sections = await db
      .select()
      .from(mockExamSections)
      .where(eq(mockExamSections.paperId, attempt.paperId));

    const attemptSections = await db
      .select()
      .from(mockExamAttemptSections)
      .where(eq(mockExamAttemptSections.attemptId, attemptId));

    // Need per-subject accuracy. 
    // This is expensive to calculate deeply from raw responses every time?
    // Optimization: We could reuse the logic from `report` or trust the user to hit `report` for detailed item analysis.
    // For this endpoint, we will stick to the "Result Overview" data needed for the charts.

    // Let's re-use the basic aggregates we already have or can easily get.
    // Actually, `mockExamAttemptSections` tracks time spent, but not correctness per section unless we query questions.
    // Let's do a quick aggregate on responses for subject breakdown.

    const questionsWithSections = await db
      .select({
        questionId: mockExamPaperQuestions.questionId,
        sectionId: mockExamPaperQuestions.sectionId,
        sectionName: mockExamSections.name,
        subject: mockExamQuestions.subject
      })
      .from(mockExamPaperQuestions)
      .leftJoin(mockExamQuestions, eq(mockExamPaperQuestions.questionId, mockExamQuestions.id))
      .leftJoin(mockExamSections, eq(mockExamPaperQuestions.sectionId, mockExamSections.id))
      .where(eq(mockExamPaperQuestions.paperId, attempt.paperId));

    const responses = await db
      .select()
      .from(mockExamResponses)
      .where(eq(mockExamResponses.attemptId, attemptId));

    const responseMap = new Map(responses.map(r => [r.questionId, r]));

    const bySubject: Record<string, { correct: number, wrong: number, unanswered: number, totalQuestions: number, totalTimeSeconds: number }> = {};

    questionsWithSections.forEach(q => {
      const subject = q.subject || "General";
      if (!bySubject[subject]) {
        bySubject[subject] = { correct: 0, wrong: 0, unanswered: 0, totalQuestions: 0, totalTimeSeconds: 0 };
      }

      const resp = responseMap.get(q.questionId);
      bySubject[subject].totalQuestions++;

      if (resp) {
        if (resp.isCorrect) bySubject[subject].correct++;
        else if (resp.isCorrect === false) bySubject[subject].wrong++; // strictly false
        else bySubject[subject].unanswered++; // null or undefined

        bySubject[subject].totalTimeSeconds += (resp.timeSpentSeconds || 0);
      } else {
        bySubject[subject].unanswered++;
      }
    });

    const bySubjectArray = Object.entries(bySubject).map(([subject, stats]) => ({
      subject,
      ...stats,
      accuracy: (stats.correct / ((stats.correct + stats.wrong) || 1)) * 100
    }));

    res.json({
      rank: currentRank,
      percentile: Number(percentile.toFixed(2)),
      totalParticipants,
      totals: {
        totalQuestions: questionsWithSections.length,
        correct: attempt.correctCount,
        wrong: attempt.wrongCount,
        unanswered: attempt.unansweredCount,
        accuracy: attempt.correctCount ? (attempt.correctCount / ((attempt.correctCount + (attempt.wrongCount || 0)) || 1)) * 100 : 0,
        totalTimeSeconds: attempt.totalTimeSeconds
      },
      topperStats,
      averageStats: {
        score: avgScore,
        timeTaken: avgTime
      },
      bySubject: bySubjectArray
    });

  } catch (error) {
    console.error("Failed to fetch mock exam analytics:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

router.get("/attempts/:attemptId/report", async (req, res) => {
  try {
    const attemptId = Number(req.params.attemptId);
    if (!Number.isInteger(attemptId)) {
      return res.status(400).json({ error: "Invalid attempt id" });
    }

    const userId = getCurrentUser(req);
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const [attempt] = await db
      .select()
      .from(mockExamAttempts)
      .where(eq(mockExamAttempts.id, attemptId))
      .limit(1);

    if (!attempt || attempt.userId !== userId) {
      return res.status(404).json({ error: "Attempt not found" });
    }
    if (attempt.status === "in_progress") {
      return res.status(400).json({ error: "Attempt not submitted yet" });
    }

    const [paper] = await db
      .select()
      .from(mockExamPapers)
      .where(eq(mockExamPapers.id, attempt.paperId))
      .limit(1);

    const sections = await db
      .select()
      .from(mockExamSections)
      .where(eq(mockExamSections.paperId, attempt.paperId))
      .orderBy(mockExamSections.displayOrder);

    const responses = await db
      .select()
      .from(mockExamResponses)
      .where(eq(mockExamResponses.attemptId, attemptId));

    const attemptQuestions = await db
      .select()
      .from(mockExamAttemptQuestions)
      .where(eq(mockExamAttemptQuestions.attemptId, attemptId))
      .orderBy(mockExamAttemptQuestions.position);

    const responseByQuestion = new Map<number, any>();
    for (const r of responses) {
      responseByQuestion.set(r.questionId, r);
    }

    const sectionMap = new Map<number, any>(
      sections.map((s) => [
        s.id,
        {
          id: s.id,
          name: s.name,
          questionCount: s.questionCount,
          marksCorrect: s.marksCorrect,
          marksIncorrect: s.marksIncorrect,
          marksUnanswered: s.marksUnanswered,
        },
      ])
    );

    let items: any[] = [];

    if (attemptQuestions.length) {
      items = attemptQuestions.map((aq) => {
        const snapshot = aq.snapshot || {};
        const opts = snapshot.options || [];
        const correctOptionIds = opts.filter((o: any) => o.isCorrect).map((o: any) => o.id);
        const section = sectionMap.get(aq.sectionId);
        const resp = responseByQuestion.get(aq.questionId);
        return {
          questionId: snapshot.id || aq.questionId,
          stem: snapshot.stem,
          mediaRef: snapshot.mediaRef,
          subject: snapshot.subject,
          topic: snapshot.topic,
          subtopic: snapshot.subtopic,
          difficulty: snapshot.difficulty,
          explanation: snapshot.explanation,
          section: section
            ? {
              id: section.id,
              name: section.name,
              marksCorrect: section.marksCorrect,
              marksIncorrect: section.marksIncorrect,
              marksUnanswered: section.marksUnanswered,
            }
            : null,
          options: opts.map((o: any) => ({
            id: o.id,
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect,
          })),
          correctOptionIds,
          response: resp
            ? {
              selectedOptionId: resp.selectedOptionId,
              isCorrect: resp.isCorrect,
              timeSpentSeconds: resp.timeSpentSeconds,
              flagged: resp.flagged,
            }
            : null,
        };
      });
    } else {
      const paperQuestions = await db
        .select()
        .from(mockExamPaperQuestions)
        .where(eq(mockExamPaperQuestions.paperId, attempt.paperId));

      const questionIds = responses.map((r) => r.questionId);
      const questions = questionIds.length
        ? await db.select().from(mockExamQuestions).where(inArray(mockExamQuestions.id, questionIds))
        : [];
      const options = questionIds.length
        ? await db.select().from(mockExamOptions).where(inArray(mockExamOptions.questionId, questionIds))
        : [];

      const optionsByQuestion: Record<number, any[]> = {};
      for (const opt of options) {
        optionsByQuestion[opt.questionId] = optionsByQuestion[opt.questionId] || [];
        optionsByQuestion[opt.questionId].push(opt);
      }

      const sectionByQuestion = new Map<number, any>();
      for (const pq of paperQuestions) {
        sectionByQuestion.set(pq.questionId, sectionMap.get(pq.sectionId));
      }

      items = questions.map((q) => {
        const resp = responseByQuestion.get(q.id);
        const opts = optionsByQuestion[q.id] || [];
        const correctOptionIds = opts.filter((o) => o.isCorrect).map((o) => o.id);
        const section = sectionByQuestion.get(q.id);
        return {
          questionId: q.id,
          stem: q.stem,
          mediaRef: q.mediaRef,
          subject: q.subject,
          topic: q.topic,
          subtopic: q.subtopic,
          difficulty: q.difficulty,
          explanation: q.explanation,
          section: section
            ? {
              id: section.id,
              name: section.name,
              marksCorrect: section.marksCorrect,
              marksIncorrect: section.marksIncorrect,
              marksUnanswered: section.marksUnanswered,
            }
            : null,
          options: opts.map((o) => ({
            id: o.id,
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect,
          })),
          correctOptionIds,
          response: resp
            ? {
              selectedOptionId: resp.selectedOptionId,
              isCorrect: resp.isCorrect,
              timeSpentSeconds: resp.timeSpentSeconds,
              flagged: resp.flagged,
            }
            : null,
        };
      });
    }

    const format = String(req.query.format || "json").toLowerCase();
    if (format === "csv") {
      const escapeCsv = (value: any) => {
        const stringValue = value == null ? "" : String(value);
        if (/[",\r\n]/.test(stringValue)) {
          return `"${stringValue.replace(/"/g, "\"\"")}"`;
        }
        return stringValue;
      };

      const header = [
        "questionId",
        "section",
        "subject",
        "topic",
        "subtopic",
        "difficulty",
        "stem",
        "mediaRef",
        "selectedOptionId",
        "isCorrect",
        "correctOptionIds",
        "timeSpentSeconds",
        "flagged",
      ];

      const rows = items.map((item) => [
        item.questionId,
        item.section?.name || "",
        item.subject || "",
        item.topic || "",
        item.subtopic || "",
        item.difficulty || "",
        item.stem || "",
        item.mediaRef || "",
        item.response?.selectedOptionId ?? "",
        item.response?.isCorrect ?? "",
        (item.correctOptionIds || []).join("|"),
        item.response?.timeSpentSeconds ?? "",
        item.response?.flagged ?? "",
      ]);

      const csv = [header, ...rows]
        .map((row) => row.map(escapeCsv).join(","))
        .join("\r\n");

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="mock-exam-report-${attemptId}.csv"`);
      return res.send(csv);
    }

    if (format === "html") {
      const escapeHtml = (value: any) =>
        String(value ?? "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

      const rowsHtml = items
        .map((item: any, index: number) => {
          const optionsHtml = (item.options || [])
            .map((opt: any) => {
              const isCorrect = item.correctOptionIds?.includes(opt.id);
              const isSelected = item.response?.selectedOptionId === opt.id;
              const label = `${escapeHtml(opt.label)}. ${escapeHtml(opt.text)}`;
              const meta = `${isCorrect ? "Correct" : ""}${isSelected ? " Selected" : ""}`.trim();
              return `<li>${label}${meta ? ` <strong>(${escapeHtml(meta)})</strong>` : ""}</li>`;
            })
            .join("");

          return `
            <tr>
              <td>${index + 1}</td>
              <td>${escapeHtml(item.section?.name || "")}</td>
              <td>${escapeHtml(item.subject || "")}</td>
              <td>${escapeHtml(item.topic || "")}</td>
              <td>${escapeHtml(item.stem || "")}</td>
              <td>
                <ul>${optionsHtml}</ul>
                ${item.explanation ? `<div><em>Explanation:</em> ${escapeHtml(item.explanation)}</div>` : ""}
              </td>
              <td>${escapeHtml(item.response?.selectedOptionId ?? "")}</td>
              <td>${escapeHtml(item.response?.isCorrect ?? "")}</td>
              <td>${escapeHtml(item.response?.timeSpentSeconds ?? "")}</td>
              <td>${escapeHtml(item.response?.flagged ?? "")}</td>
            </tr>
          `;
        })
        .join("");

      const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mock Exam Report</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 24px; color: #1f2937; }
      h1 { font-size: 20px; margin-bottom: 8px; }
      .meta { margin-bottom: 16px; font-size: 14px; color: #4b5563; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th, td { border: 1px solid #e5e7eb; padding: 8px; vertical-align: top; }
      th { background: #f3f4f6; text-align: left; }
      ul { padding-left: 16px; margin: 4px 0; }
    </style>
  </head>
  <body>
    <h1>${escapeHtml(paper?.title || "Mock Exam Report")}</h1>
    <div class="meta">
      <div>Attempt ID: ${escapeHtml(attempt.id)}</div>
      <div>Score: ${escapeHtml(attempt.score)}</div>
      <div>Submitted: ${escapeHtml(attempt.submittedAt)}</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Section</th>
          <th>Subject</th>
          <th>Topic</th>
          <th>Question</th>
          <th>Options</th>
          <th>Selected</th>
          <th>Correct</th>
          <th>Time (s)</th>
          <th>Flagged</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  </body>
</html>`;

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="mock-exam-report-${attemptId}.html"`);
      return res.send(html);
    }

    if (format === "pdf") {
      const pdfEnabled = await isFeatureEnabled("mock_exam_pdf");
      if (!pdfEnabled) {
        return res.status(403).json({ error: "PDF export disabled" });
      }

      const { default: PDFDocument } = await import("pdfkit");
      const doc = new PDFDocument({ margin: 40, size: "A4" });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="mock-exam-report-${attemptId}.pdf"`);

      doc.pipe(res);
      doc.fontSize(16).text(paper?.title || "Mock Exam Report", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(11).text(`Attempt ID: ${attempt.id}`);
      doc.text(`Score: ${attempt.score ?? ""}`);
      doc.text(`Submitted: ${attempt.submittedAt ?? ""}`);
      doc.moveDown();

      items.forEach((item: any, index: number) => {
        doc.fontSize(12).text(`${index + 1}. ${item.stem || ""}`);
        doc.fontSize(10).text(`Section: ${item.section?.name || ""} | Subject: ${item.subject || ""}`);
        if (item.mediaRef) {
          doc.text(`Media: ${item.mediaRef}`);
        }
        doc.moveDown(0.2);
        (item.options || []).forEach((opt: any) => {
          const isCorrect = item.correctOptionIds?.includes(opt.id);
          const isSelected = item.response?.selectedOptionId === opt.id;
          const marker = `${isCorrect ? "[Correct]" : ""}${isSelected ? "[Selected]" : ""}`;
          doc.text(`- ${opt.label}. ${opt.text} ${marker}`, { indent: 10 });
        });
        if (item.explanation) {
          doc.moveDown(0.2);
          doc.text(`Explanation: ${item.explanation}`, { indent: 10 });
        }
        doc.moveDown();
      });

      doc.end();
      return;
    }

    res.json({
      paper: paper ? { id: paper.id, title: paper.title, description: paper.description, durationMinutes: paper.durationMinutes } : null,
      attempt: {
        id: attempt.id,
        score: attempt.score,
        correctCount: attempt.correctCount,
        wrongCount: attempt.wrongCount,
        unansweredCount: attempt.unansweredCount,
        totalTimeSeconds: attempt.totalTimeSeconds,
        submittedAt: attempt.submittedAt,
      },
      sections: sections.map((s) => ({
        id: s.id,
        name: s.name,
        questionCount: s.questionCount,
        marksCorrect: s.marksCorrect,
        marksIncorrect: s.marksIncorrect,
        marksUnanswered: s.marksUnanswered,
      })),
      items,
    });
  } catch (error) {
    console.error("Failed to fetch attempt report:", error);
    res.status(500).json({ error: "Failed to fetch attempt report" });
  }
});

export default router;
