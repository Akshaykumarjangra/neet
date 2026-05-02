
import { db } from "./server/db";
import { chapterContent } from "./shared/schema";

async function listChapters() {
    const result = await db.select({
        id: chapterContent.id,
        title: chapterContent.chapterTitle,
        intro: chapterContent.introduction
    }).from(chapterContent).limit(10);
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
}

listChapters().catch(err => {
    console.error(err);
    process.exit(1);
});
