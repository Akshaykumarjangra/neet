
import { db } from "./server/db";
import { questions } from "./shared/schema";
import { ilike, sql } from "drizzle-orm";

async function findPlaceholders() {
    const result = await db.select()
        .from(questions)
        .where(ilike(questions.questionText, "%comprehensive NEET-level%"))
        .limit(5);

    console.log("Placeholders found:", result.length);
    if (result.length > 0) {
        console.log(JSON.stringify(result[0], null, 2));
    }
    process.exit(0);
}

findPlaceholders().catch(err => {
    console.error(err);
    process.exit(1);
});
