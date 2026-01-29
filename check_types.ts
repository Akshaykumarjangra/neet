
import { db } from "./server/db";
import { mockTests } from "./shared/schema";
import { sql } from "drizzle-orm";

async function checkTypes() {
    const result = await db.select({
        type: mockTests.testType,
        count: sql<number>`count(*)::int`
    }).from(mockTests).groupBy(mockTests.testType);

    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
}

checkTypes().catch(err => {
    console.error(err);
    process.exit(1);
});
