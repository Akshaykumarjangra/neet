
import { db } from "./db";
import { questions, chapterContent, subscriptionPlans, mockTests } from "@shared/schema";
import { sql } from "drizzle-orm";

async function verifyDb() {
    console.log("📊 Verifying Database Content...");

    try {
        const plansCount = await db.select({ count: sql<number>`count(*)` }).from(subscriptionPlans);
        const questionsCount = await db.select({ count: sql<number>`count(*)` }).from(questions);
        const chaptersCount = await db.select({ count: sql<number>`count(*)` }).from(chapterContent);
        const mockTestsCount = await db.select({ count: sql<number>`count(*)` }).from(mockTests);

        console.log(`\n📋 Current Counts:`);
        console.log(`- Plans: ${plansCount[0].count}`);
        console.log(`- Questions: ${questionsCount[0].count}`);
        console.log(`- Chapters: ${chaptersCount[0].count}`);
        console.log(`- Mock Tests: ${mockTestsCount[0].count}`);

        if (Number(questionsCount[0].count) > 0 && Number(chaptersCount[0].count) > 0) {
            console.log("\n✅ Database appears to be populated!");
        } else {
            console.log("\n⚠️ Database might be empty or partially populated.");
        }
    } catch (err) {
        console.error("Verification failed:", err);
    } finally {
        process.exit(0);
    }
}

verifyDb();
