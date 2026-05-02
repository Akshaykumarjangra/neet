
import { db } from "./server/db";
import { questions } from "./shared/schema";
import { ilike, sql } from "drizzle-orm";

async function countPlaceholderQuestions() {
    const result = await db.select({ count: sql<number>`count(*)::int` })
        .from(questions)
        .where(ilike(questions.questionText, "%[Real question content to be added]%"));

    console.log("Placeholder Questions found:", result[0].count);
    process.exit(0);
}

countPlaceholderQuestions().catch(err => {
    console.error(err);
    process.exit(1);
});
