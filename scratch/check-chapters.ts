import { db } from "../server/db";
import { chapterContent } from "../shared/schema";

async function check() {
  const chapters = await db.select().from(chapterContent).limit(10);
  console.log(JSON.stringify(chapters, null, 2));
  process.exit(0);
}
check();
