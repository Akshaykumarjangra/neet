
import { db } from "../db";
import {
    subscriptionPlans,
    chapterContent,
    questions,
    mockTests
} from "@shared/schema";
import { sql } from "drizzle-orm";

// Import aggregators
// Note: We need to use "require" or dynamic imports if these files immediately execute on import.
// Looking at the files, they end with a call like seedAllBiology().catch(...).
// This means importing them will run them immediately in parallel, which might cause DB lock issues.
// A better approach is to spawn child processes or if we can export the functions.
// Since I cannot easily rewrite all 100+ files to export functions instead of running immediately,
// I will use child_process to run them sequentially.

import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

async function runScript(scriptName: string) {
    console.log(`\n▶️ Running ${scriptName}...`);
    try {
        const scriptPath = path.join(process.cwd(), "server", "seeds", scriptName);
        const { stdout, stderr } = await execAsync(`npx tsx "${scriptPath}"`);
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        console.log(`✅ ${scriptName} completed.`);
    } catch (error: any) {
        console.error(`❌ ${scriptName} failed:`, error.message);
        throw error;
    }
}

async function runAllSeeds() {
    console.log("🚀 STARTING FULL DATABASE SEEDING");
    console.log("=================================");

    try {
        // 1. Basic Metadata
        await runScript("seed-plans.ts");

        // 2. Core Content (Subjects)
        // Running big subject aggregates sequentially to avoid memory/connection limits
        await runScript("seed-all-biology.ts");
        await runScript("seed-all-chemistry.ts");
        await runScript("seed-all-physics-content.ts");

        // 3. Functional/Extras
        await runScript("seed-mock-tests-61.ts");
        // await runScript("seed-daily-challenges.ts"); // If exists

        console.log("\n=================================");
        console.log("✨ FULL DATABASE SEEDING COMPLETED ✨");
        console.log("=================================");
    } catch (error) {
        console.error("\n❌ Seeding Process Failed");
        process.exit(1);
    }
}

runAllSeeds();
