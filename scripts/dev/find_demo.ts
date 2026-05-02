
import { db } from "./server/db";
import { mockTests } from "./shared/schema";
import { ilike } from "drizzle-orm";

async function findDemo() {
    const demos = await db.select().from(mockTests).where(ilike(mockTests.title, "%demo%"));
    console.log(JSON.stringify(demos, null, 2));
    process.exit(0);
}

findDemo().catch(err => {
    console.error(err);
    process.exit(1);
});
