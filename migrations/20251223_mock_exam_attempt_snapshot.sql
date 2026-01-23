ALTER TABLE "mock_exam_attempts"
  ADD COLUMN IF NOT EXISTS "ends_at" timestamp;

CREATE TABLE IF NOT EXISTS "mock_exam_attempt_questions" (
  "id" serial PRIMARY KEY,
  "attempt_id" integer NOT NULL REFERENCES "mock_exam_attempts"("id") ON DELETE CASCADE,
  "question_id" integer NOT NULL REFERENCES "mock_exam_questions"("id"),
  "section_id" integer NOT NULL REFERENCES "mock_exam_sections"("id"),
  "position" integer NOT NULL,
  "snapshot" jsonb NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_attempt_question_idx" ON "mock_exam_attempt_questions" ("attempt_id", "question_id");
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_attempt_question_order_idx" ON "mock_exam_attempt_questions" ("attempt_id", "position");
