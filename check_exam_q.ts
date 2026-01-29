
import { db } from "./server/db";
import { mockExamQuestions } from "./shared/schema";

async function checkExamQuestions() {
    const samples = await db.select().from(mockExamQuestions).limit(5);
    console.log(JSON.stringify(samples, null, 2));
    process.exit(0);
}

checkExamQuestions().catch(err => {
    console.error(err);
    process.exit(1);
});
