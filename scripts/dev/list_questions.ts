
import { db } from "./server/db";
import { questions } from "./shared/schema";

async function listRandomQuestions() {
    const result = await db.select().from(questions).limit(10);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
}

listRandomQuestions().catch(err => {
    console.error(err);
    process.exit(1);
});
