
import { db } from "./server/db";
import { mockExamPapers } from "./shared/schema";

async function listPapers() {
    const papers = await db.select().from(mockExamPapers);
    console.log(JSON.stringify(papers.map(p => p.title), null, 2));
    process.exit(0);
}

listPapers().catch(err => {
    console.error(err);
    process.exit(1);
});
