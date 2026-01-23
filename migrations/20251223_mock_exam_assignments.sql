CREATE TABLE IF NOT EXISTS "mock_exam_assignments" (
  "id" serial PRIMARY KEY,
  "paper_id" integer NOT NULL REFERENCES "mock_exam_papers"("id") ON DELETE CASCADE,
  "user_id" varchar REFERENCES "users"("id"),
  "organization_id" integer,
  "class_section" varchar(50),
  "assigned_by" varchar REFERENCES "users"("id"),
  "assigned_at" timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_assignment_idx" ON "mock_exam_assignments" ("paper_id", "user_id", "organization_id", "class_section");
