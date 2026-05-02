import { spawn } from "child_process";
import { db } from "../db";
import { marketingReports, marketingAgentLogs, marketingCampaigns } from "@shared/schema";
import { eq } from "drizzle-orm";
import path from "path";

const MARKETING_SWARM_PATH = path.join(process.cwd(), "..", "marketing_swarm");

export interface MarketingRunResult {
  success: boolean;
  reportId: number;
  output?: string;
  error?: string;
}

export async function triggerMarketingRun(campaignId?: number): Promise<MarketingRunResult> {
  const reportId = await createReportRecord(campaignId);

  try {
    const websiteUrl = process.env.NEET_WEBSITE_URL || "https://nanoschool.in";
    const industry = "NEET Preparation / EdTech";

    const output = await runCrewAiMarketing(websiteUrl, industry);

    await updateReportSuccess(reportId, output);

    return { success: true, reportId, output };
  } catch (error: any) {
    await updateReportFailure(reportId, error.message);
    return { success: false, reportId, error: error.message };
  }
}

async function createReportRecord(campaignId?: number): Promise<number> {
  const [report] = await db.insert(marketingReports).values({
    campaignId: campaignId ?? null,
    status: "running",
    startedAt: new Date(),
    tasksCompleted: 0,
    totalTasks: 37,
  }).returning();

  return report.id;
}

async function updateReportSuccess(reportId: number, output: string) {
  const summary = output.slice(0, 500);
  await db.update(marketingReports)
    .set({
      status: "completed",
      completedAt: new Date(),
      outputSummary: summary,
      fullOutput: output,
      tasksCompleted: 37,
    })
    .where(eq(marketingReports.id, reportId));
}

async function updateReportFailure(reportId: number, errorMessage: string) {
  await db.update(marketingReports)
    .set({
      status: "failed",
      completedAt: new Date(),
      errorMessage,
    })
    .where(eq(marketingReports.id, reportId));
}

function runCrewAiMarketing(websiteUrl: string, industry: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const env = {
      ...process.env,
      WEBSITE_URL: websiteUrl,
      INDUSTRY: industry,
    };

    const proc = spawn("crewai", ["run"], {
      cwd: MARKETING_SWARM_PATH,
      env,
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    proc.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`crewai run failed with code ${code}: ${stderr || stdout}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });

    setTimeout(() => {
      proc.kill();
      reject(new Error("Marketing run timed out after 30 minutes"));
    }, 30 * 60 * 1000);
  });
}

export async function getReports(limit = 20, offset = 0) {
  return db.select().from(marketingReports)
    .orderBy(marketingReports.createdAt)
    .limit(limit)
    .offset(offset);
}

export async function getReportById(id: number) {
  const reports = await db.select().from(marketingReports).where(eq(marketingReports.id, id));
  return reports[0] || null;
}

export async function getCampaignSchedule() {
  const campaigns = await db.select().from(marketingCampaigns).where(eq(marketingCampaigns.isActive, true));
  return campaigns[0] || null;
}

export async function setCampaignSchedule(cronExpression: string, config?: any) {
  const existing = await getCampaignSchedule();

  if (existing) {
    await db.update(marketingCampaigns)
      .set({ scheduleCron: cronExpression, config: config || existing.config, updatedAt: new Date() })
      .where(eq(marketingCampaigns.id, existing.id));
    return existing.id;
  } else {
    const [campaign] = await db.insert(marketingCampaigns).values({
      name: "Default Marketing Campaign",
      scheduleCron: cronExpression,
      config: config || { websiteUrl: process.env.NEET_WEBSITE_URL || "https://nanoschool.in", industry: "NEET Preparation / EdTech" },
      isActive: true,
    }).returning();
    return campaign.id;
  }
}

export async function getSchedulerStatus() {
  const reports = await db.select().from(marketingReports)
    .orderBy(marketingReports.createdAt)
    .limit(5);
  const campaign = await getCampaignSchedule();

  return {
    nextScheduledRun: campaign?.nextRunAt || null,
    scheduleCron: campaign?.scheduleCron || null,
    recentReports: reports,
    isActive: campaign?.isActive || false,
  };
}