import { db } from "../server/db";
import { questions } from "../shared/schema";
import { sql } from "drizzle-orm";

async function check() {
  const [result] = await db.select({ count: sql<number>`count(*)` }).from(questions);
  console.log(`Questions: ${result.count}`);
  process.exit(0);
}
check();
