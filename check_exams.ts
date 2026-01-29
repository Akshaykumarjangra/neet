
import { db } from "./server/db";
import { mockExamPapers, mockExamQuestions } from "./shared/schema";
import { sql } from "drizzle-orm";

async function checkExamData() {
    const paperCount = await db.select({ count: sql<number>`count(*)::int` }).from(mockExamPapers);
    const questionCount = await db.select({ count: sql<number>`count(*)::int` }).from(mockExamQuestions);
    console.log("Mock Exam Papers:", paperCount[0].count);
    console.log("Mock Exam Questions:", questionCount[0].count);
    process.exit(0);
}

checkExamData().catch(err => {
    console.error(err);
    process.exit(1);
});
