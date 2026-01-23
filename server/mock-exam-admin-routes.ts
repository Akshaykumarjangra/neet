// @ts-nocheck
import { Router } from "express";
import { requireAuthWithPasswordCheck, requireOwner } from "./auth";
import { db } from "./db";
import {
  auditLogs,
  mockExamAssignments,
  mockExamPapers,
  mockExamSections,
  webhookEvents,
} from "@shared/schema";
import { and, eq, inArray, sql } from "drizzle-orm";

const router = Router();

router.use(requireAuthWithPasswordCheck);
router.use(requireOwner);

async function recordAuditLog(req: any, details: {
  action: string;
  entityType: string;
  entityId?: string | number | null;
  oldValue?: any;
  newValue?: any;
}) {
  try {
    await db.insert(auditLogs).values({
      userId: req.session?.userId || null,
      action: details.action,
      entityType: details.entityType,
      entityId: details.entityId ? String(details.entityId) : null,
      oldValue: details.oldValue ?? null,
      newValue: details.newValue ?? null,
      ipAddress: (req.ip || "").slice(0, 45),
      userAgent: req.get?.("user-agent"),
    });
  } catch (error) {
    console.error("Failed to record audit log:", error);
  }
}

router.post("/jobs/auto-submit-expired", async (_req, res) => {
  res.status(503).json({ error: "Background jobs are disabled on this environment." });
});

router.post("/jobs/purge-old-attempts", async (req, res) => {
  res.status(503).json({ error: "Background jobs are disabled on this environment." });
});

router.get("/papers", async (req, res) => {
  try {
    const status = String(req.query.status || "all").toLowerCase();
    const q = String(req.query.q || "").trim();

    const filters: any[] = [];
    if (status && status !== "all") {
      filters.push(eq(mockExamPapers.status, status));
    }
    if (q) {
      filters.push(
        sql`(LOWER(${mockExamPapers.title}) LIKE LOWER(${`%${q}%`}) OR LOWER(${mockExamPapers.description}) LIKE LOWER(${`%${q}%`}))`
      );
    }

    const papers = await db
      .select()
      .from(mockExamPapers)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(mockExamPapers.id);

    const paperIds = papers.map((paper) => paper.id);
    const sections = paperIds.length
      ? await db.select().from(mockExamSections).where(inArray(mockExamSections.paperId, paperIds))
      : [];

    const sectionsByPaper: Record<number, any[]> = {};
    for (const section of sections) {
      sectionsByPaper[section.paperId] = sectionsByPaper[section.paperId] || [];
      sectionsByPaper[section.paperId].push(section);
    }

    const data = papers.map((paper) => ({
      ...paper,
      sectionCount: sectionsByPaper[paper.id]?.length || 0,
      totalQuestions: sectionsByPaper[paper.id]?.reduce((acc, s) => acc + (s.questionCount || 0), 0) || 0,
    }));

    res.json({ data });
  } catch (error) {
    console.error("Failed to list mock exam papers:", error);
    res.status(500).json({ error: "Failed to list papers" });
  }
});

router.patch("/papers/:paperId", async (req, res) => {
  try {
    const paperId = Number(req.params.paperId);
    if (!Number.isInteger(paperId)) {
      return res.status(400).json({ error: "Invalid paper id" });
    }

    const [existing] = await db
      .select()
      .from(mockExamPapers)
      .where(eq(mockExamPapers.id, paperId))
      .limit(1);

    if (!existing) {
      return res.status(404).json({ error: "Paper not found" });
    }

    const {
      title,
      description,
      status,
      startsAt,
      endsAt,
      attemptsAllowed,
      shuffleQuestions,
      shuffleOptions,
    } = req.body || {};

    const [updated] = await db
      .update(mockExamPapers)
      .set({
        title: title ?? undefined,
        description: description ?? undefined,
        status: status ?? undefined,
        startsAt: startsAt ? new Date(startsAt) : startsAt === null ? null : undefined,
        endsAt: endsAt ? new Date(endsAt) : endsAt === null ? null : undefined,
        attemptsAllowed: attemptsAllowed ?? undefined,
        shuffleQuestions: shuffleQuestions ?? undefined,
        shuffleOptions: shuffleOptions ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(mockExamPapers.id, paperId))
      .returning();

    if (status && status !== existing.status) {
      const eventType =
        status === "published"
          ? "mock_exam_published"
          : status === "closed"
          ? "mock_exam_closed"
          : "mock_exam_unpublished";
      await db.insert(webhookEvents).values({
        eventId: `mock-exam-paper-${paperId}-${Date.now()}`,
        provider: "mock_exam",
        eventType,
        payload: {
          paperId,
          status,
          startsAt: updated?.startsAt,
          endsAt: updated?.endsAt,
        },
      });
    }

    await recordAuditLog(req, {
      action: "mock_exam_paper_updated",
      entityType: "mock_exam_paper",
      entityId: paperId,
      oldValue: existing,
      newValue: updated,
    });

    res.json({ paper: updated });
  } catch (error) {
    console.error("Failed to update mock exam paper:", error);
    res.status(500).json({ error: "Failed to update paper" });
  }
});

router.get("/papers/:paperId/assignments", async (req, res) => {
  try {
    const paperId = Number(req.params.paperId);
    if (!Number.isInteger(paperId)) {
      return res.status(400).json({ error: "Invalid paper id" });
    }

    const assignments = await db
      .select()
      .from(mockExamAssignments)
      .where(eq(mockExamAssignments.paperId, paperId));

    res.json({ data: assignments });
  } catch (error) {
    console.error("Failed to list assignments:", error);
    res.status(500).json({ error: "Failed to list assignments" });
  }
});

router.post("/papers/:paperId/assignments", async (req, res) => {
  try {
    const paperId = Number(req.params.paperId);
    if (!Number.isInteger(paperId)) {
      return res.status(400).json({ error: "Invalid paper id" });
    }

    const { userIds, organizationIds, classSections, organizationAssignments, clearExisting } = req.body || {};

    if (clearExisting) {
      await db.delete(mockExamAssignments).where(eq(mockExamAssignments.paperId, paperId));
    }

    const assignmentsToInsert: any[] = [];

    if (Array.isArray(userIds)) {
      for (const userId of userIds) {
        assignmentsToInsert.push({
          paperId,
          userId,
          assignedBy: req.session?.userId || null,
        });
      }
    }

    if (Array.isArray(organizationAssignments)) {
      for (const assignment of organizationAssignments) {
        if (!assignment?.organizationId) continue;
        assignmentsToInsert.push({
          paperId,
          organizationId: Number(assignment.organizationId),
          classSection: assignment.classSection ? String(assignment.classSection) : null,
          assignedBy: req.session?.userId || null,
        });
      }
    } else if (Array.isArray(organizationIds)) {
      const sections = Array.isArray(classSections) && classSections.length ? classSections : [null];
      for (const orgId of organizationIds) {
        for (const section of sections) {
          assignmentsToInsert.push({
            paperId,
            organizationId: Number(orgId),
            classSection: section ? String(section) : null,
            assignedBy: req.session?.userId || null,
          });
        }
      }
    }

    if (!assignmentsToInsert.length) {
      return res.status(400).json({ error: "No assignments provided" });
    }

    const inserted = await db
      .insert(mockExamAssignments)
      .values(assignmentsToInsert)
      .onConflictDoNothing()
      .returning();

    await recordAuditLog(req, {
      action: "mock_exam_assignments_updated",
      entityType: "mock_exam_assignment",
      entityId: paperId,
      newValue: { inserted: inserted.length },
    });

    res.json({ data: inserted });
  } catch (error) {
    console.error("Failed to create assignments:", error);
    res.status(500).json({ error: "Failed to create assignments" });
  }
});

router.delete("/papers/:paperId/assignments", async (req, res) => {
  try {
    const paperId = Number(req.params.paperId);
    if (!Number.isInteger(paperId)) {
      return res.status(400).json({ error: "Invalid paper id" });
    }

    const assignmentIds = Array.isArray(req.body?.assignmentIds) ? req.body.assignmentIds : [];

    if (!assignmentIds.length) {
      await db.delete(mockExamAssignments).where(eq(mockExamAssignments.paperId, paperId));
    } else {
      await db
        .delete(mockExamAssignments)
        .where(and(eq(mockExamAssignments.paperId, paperId), inArray(mockExamAssignments.id, assignmentIds)));
    }

    await recordAuditLog(req, {
      action: "mock_exam_assignments_deleted",
      entityType: "mock_exam_assignment",
      entityId: paperId,
      newValue: { assignmentIds },
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Failed to delete assignments:", error);
    res.status(500).json({ error: "Failed to delete assignments" });
  }
});

export default router;
