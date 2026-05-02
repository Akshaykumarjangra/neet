/**
 * Centralized cron schedule for all background jobs.
 * Wire from server/index.ts: import "./services/cron";
 */
import cron from "node-cron";
import { spawn } from "node:child_process";
import { fire } from "./lifecycle";
import { db } from "../db";
import { sql } from "drizzle-orm";

function run(label: string, cmd: string, args: string[]) {
  console.log(`[cron] ${label} starting`);
  const p = spawn(cmd, args, { stdio: "inherit", shell: true });
  p.on("exit", c => console.log(`[cron] ${label} exit=${c}`));
}

// Daily content factory — 6am IST = 00:30 UTC
cron.schedule("30 0 * * *", () => run("social-daily", "npm", ["run", "workforce:social"]));

// Daily SEO page generation — 1am IST
cron.schedule("30 19 * * *", () => run("seo-pages", "npm", ["run", "workforce:seo", "--", "--limit=50"]));

// Daily ad optimization — 9am IST
cron.schedule("30 3 * * *", () => run("ads-optimize", "npm", ["run", "workforce:ads:optimize"]));

// Hourly Reddit/Quora draft generation
cron.schedule("0 * * * *", () => run("reddit-quora", "npm", ["run", "workforce:reddit"]));
 
// Marketing Swarm (The 30-Agent Swarm) — 2am IST
cron.schedule("30 20 * * *", () => run("marketing-swarm", "npm", ["run", "workforce:swarm"]));

// Lifecycle inactive-3d sweep — 7pm IST
cron.schedule("30 13 * * *", async () => {
  const r = await db.execute(sql`
    SELECT u.id FROM users u
    WHERE u.last_active_date < (now() - interval '3 days')
      AND NOT EXISTS (
        SELECT 1 FROM lifecycle_sends s
        WHERE s.user_id = u.id AND s.event = 'inactive.3d' AND s.sent_at > now() - interval '7 days'
      )
    LIMIT 500
  `);
  for (const row of ((r as any).rows ?? []) as any[]) {
    await fire("inactive.3d", row.id).catch(() => {});
  }
});

// Weekly parent summary — Sunday 8pm IST
cron.schedule("30 14 * * 0", () => run("parent-summary", "npx", ["tsx", "scripts/workforce/parent-summary.ts"]));

// Daily backup — 3am IST
cron.schedule("30 21 * * *", () => run("backup", "bash", ["scripts/ops/backup.sh"]));

console.log("[cron] schedules registered");
