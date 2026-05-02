import { Router } from "express";
import { db } from "./db";
import { marketingReports, marketingCampaigns, insertMarketingReportSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { triggerMarketingRun, getReports, getReportById, getSchedulerStatus, setCampaignSchedule, getCampaignSchedule } from "./services/marketing-service";
import { scheduleMarketingRun, stopScheduler, getSchedulerInfo } from "./services/scheduler";
import { requireAdmin } from "./auth";
import { recordAuditLog } from "./lib/audit";

const router = Router();

// Get marketing reports
router.get("/reports", requireAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    const reports = await getReports(limit, offset);
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Get specific report
router.get("/reports/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const report = await getReportById(id);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ error: "Failed to fetch report" });
  }
});

// Trigger marketing run manually
router.post("/run", requireAdmin, async (req, res) => {
  try {
    const campaign = await getCampaignSchedule();
    const result = await triggerMarketingRun(campaign?.id);

    if (result.success) {
      await recordAuditLog(req, {
        action: "trigger_marketing_run",
        resourceType: "marketing",
        resourceId: result.reportId?.toString(),
        status: "success",
        details: { campaignId: campaign?.id }
      });
      res.json({ success: true, reportId: result.reportId, message: "Marketing run triggered successfully" });
    } else {
      await recordAuditLog(req, {
        action: "trigger_marketing_run",
        resourceType: "marketing",
        status: "failure",
        details: { campaignId: campaign?.id, error: result.error }
      });
      res.status(500).json({ success: false, reportId: result.reportId, error: result.error });
    }
  } catch (error: any) {
    console.error("Error triggering marketing:", error);
    res.status(500).json({ error: error.message || "Failed to trigger marketing run" });
  }
});

// Get current schedule
router.get("/schedule", requireAdmin, async (req, res) => {
  try {
    const schedule = await getCampaignSchedule();
    const schedulerInfo = getSchedulerInfo();
    res.json({
      schedule: schedule?.scheduleCron || null,
      isActive: schedule?.isActive || false,
      nextRunAt: schedule?.nextRunAt || null,
      ...schedulerInfo,
    });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
});

// Set/update schedule
router.post("/schedule", requireAdmin, async (req, res) => {
  try {
    const { cronExpression, config } = req.body;

    if (!cronExpression) {
      return res.status(400).json({ error: "Cron expression is required" });
    }

    const campaignId = await setCampaignSchedule(cronExpression, config);
    scheduleMarketingRun(cronExpression);

    await recordAuditLog(req, {
      action: "update_marketing_schedule",
      resourceType: "marketing",
      resourceId: campaignId?.toString(),
      status: "success",
      details: { cronExpression, config }
    });

    res.json({ success: true, campaignId, message: "Schedule updated successfully" });
  } catch (error: any) {
    console.error("Error setting schedule:", error);
    res.status(500).json({ error: error.message || "Failed to set schedule" });
  }
});

// Get scheduler status
router.get("/status", requireAdmin, async (req, res) => {
  try {
    const status = await getSchedulerStatus();
    res.json(status);
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ error: "Failed to fetch status" });
  }
});

export default router;