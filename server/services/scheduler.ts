import * as cron from "node-cron";
import { triggerMarketingRun } from "./marketing-service";
import { db } from "../db";
import { marketingCampaigns } from "@shared/schema";
import { eq } from "drizzle-orm";

let scheduledTask: any = null;
let isRunning = false;

export async function initScheduler() {
  try {
    const campaign = await db.select().from(marketingCampaigns).where(eq(marketingCampaigns.isActive, true));
    if (campaign[0]?.scheduleCron) {
      scheduleMarketingRun(campaign[0].scheduleCron);
    }
  } catch (error) {
    console.log("[Marketing Scheduler] Table marketing_campaigns might be missing. Skipping init.");
  }
}

export function scheduleMarketingRun(cronExpression: string) {
  if (scheduledTask) {
    scheduledTask.stop();
  }

  if (!cron.validate(cronExpression)) {
    throw new Error(`Invalid cron expression: ${cronExpression}`);
  }

  scheduledTask = cron.schedule(cronExpression, async () => {
    if (isRunning) {
      console.log("[Marketing Scheduler] Already running, skipping this cycle");
      return;
    }

    isRunning = true;
    console.log("[Marketing Scheduler] Starting scheduled marketing run");
    try {
      await triggerMarketingRun();
    } catch (error) {
      console.error("[Marketing Scheduler] Error during marketing run:", error);
    } finally {
      isRunning = false;
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  console.log(`[Marketing Scheduler] Scheduled with cron: ${cronExpression}`);
}

export function stopScheduler() {
  if (scheduledTask) {
    scheduledTask.stop();
    scheduledTask = null;
    console.log("[Marketing Scheduler] Stopped");
  }
}

export function getSchedulerInfo() {
  return {
    isScheduled: scheduledTask !== null,
    isRunning,
  };
}