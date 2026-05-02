
import { db } from "./server/db";
import { mockTests, questions, chapterContent } from "./shared/schema";
import { ilike, or } from "drizzle-orm";

async function findDummy() {
    const dummyTests = await db.select().from(mockTests).where(ilike(mockTests.title, "%dummy%"));
    console.log("Dummy Tests:", dummyTests.length);

    const dummyQuestions = await db.select().from(questions).where(ilike(questions.questionText, "%dummy%")).limit(5);
    console.log("Dummy Questions Sample:", JSON.stringify(dummyQuestions, null, 2));

    const dummyChapters = await db.select().from(chapterContent).where(ilike(chapterContent.chapterTitle, "%dummy%"));
    console.log("Dummy Chapters:", JSON.stringify(dummyChapters, null, 2));

    process.exit(0);
}

findDummy().catch(err => {
    console.error(err);
    process.exit(1);
});
