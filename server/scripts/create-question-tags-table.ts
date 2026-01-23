import { sql } from "drizzle-orm";
import { db } from "../db";

async function createQuestionTagsTable() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS question_tags (
      question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      tag VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL DEFAULT 'custom',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      PRIMARY KEY (question_id, tag)
    )
  `);

  console.log("question_tags table ensured.");
}

createQuestionTagsTable().catch((error) => {
  console.error("Failed to ensure question_tags table:", error);
  process.exit(1);
});
