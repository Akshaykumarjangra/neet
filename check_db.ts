
import { db } from "./server/db";
import { users, questions, chapterContent, mockTests, subscriptionPlans } from "./shared/schema";
import { sql } from "drizzle-orm";

async function checkData() {
    console.log("Checking database stats...");

    const userCount = await db.select({ count: sql<number>`count(*)::int` }).from(users);
    const questionCount = await db.select({ count: sql<number>`count(*)::int` }).from(questions);
    const contentCount = await db.select({ count: sql<number>`count(*)::int` }).from(chapterContent);
    const mockCount = await db.select({ count: sql<number>`count(*)::int` }).from(mockTests);
    const planCount = await db.select({ count: sql<number>`count(*)::int` }).from(subscriptionPlans);

    console.log("Users:", userCount[0].count);
    console.log("Questions:", questionCount[0].count);
    console.log("Chapter Content:", contentCount[0].count);
    console.log("Mock Tests:", mockCount[0].count);
    console.log("Plans:", planCount[0].count);

    const dummyQuestions = await db.execute(sql`SELECT count(*) FROM questions WHERE stem ILIKE '%dummy%' OR stem ILIKE '%test%'`);
    console.log("Potentially dummy questions (ILIKE '%dummy%' or '%test%'):", dummyQuestions.rows[0].count);

    const dummyUsers = await db.execute(sql`SELECT email FROM users WHERE email ILIKE '%test%' OR email ILIKE '%dummy%'`);
    console.log("Dummy users:", dummyUsers.rows);

    process.exit(0);
}

checkData().catch(err => {
    console.error(err);
    process.exit(1);
});
