-- Mock exam core schema (generated manually to match shared/schema.ts)
DO $$ BEGIN
  CREATE TYPE "mock_test_status" AS ENUM ('draft', 'scheduled', 'published', 'closed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE TYPE "mock_test_attempt_status" AS ENUM ('in_progress', 'submitted', 'auto_submitted', 'expired');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "mock_test_series" (
  "id" serial PRIMARY KEY,
  "title" varchar(200) NOT NULL,
  "description" text,
  "is_published" boolean NOT NULL DEFAULT false,
  "starts_at" timestamp,
  "ends_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "mock_exam_papers" (
  "id" serial PRIMARY KEY,
  "series_id" integer REFERENCES "mock_test_series"("id"),
  "title" varchar(200) NOT NULL,
  "description" text,
  "duration_minutes" integer NOT NULL,
  "total_marks" real NOT NULL DEFAULT 0,
  "instructions" text,
  "shuffle_questions" boolean NOT NULL DEFAULT true,
  "shuffle_options" boolean NOT NULL DEFAULT true,
  "attempts_allowed" integer NOT NULL DEFAULT 1,
  "status" mock_test_status NOT NULL DEFAULT 'draft',
  "starts_at" timestamp,
  "ends_at" timestamp,
  "created_by" varchar REFERENCES "users"("id"),
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "mock_exam_sections" (
  "id" serial PRIMARY KEY,
  "paper_id" integer NOT NULL REFERENCES "mock_exam_papers"("id") ON DELETE CASCADE,
  "name" varchar(100) NOT NULL,
  "display_order" integer NOT NULL DEFAULT 1,
  "question_count" integer NOT NULL,
  "marks_correct" real NOT NULL DEFAULT 4,
  "marks_incorrect" real NOT NULL DEFAULT -1,
  "marks_unanswered" real NOT NULL DEFAULT 0,
  "duration_minutes" integer,
  "instructions" text
);

CREATE TABLE IF NOT EXISTS "mock_exam_questions" (
  "id" serial PRIMARY KEY,
  "subject" varchar(50) NOT NULL,
  "topic" varchar(120),
  "subtopic" varchar(120),
  "difficulty" varchar(20) DEFAULT 'medium',
  "stem" text NOT NULL,
  "explanation" text,
  "tags" jsonb DEFAULT '[]'::jsonb,
  "source_year" integer,
  "created_by" varchar REFERENCES "users"("id"),
  "created_at" timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "mock_exam_options" (
  "id" serial PRIMARY KEY,
  "question_id" integer NOT NULL REFERENCES "mock_exam_questions"("id") ON DELETE CASCADE,
  "label" varchar(5) NOT NULL,
  "text" text NOT NULL,
  "media_ref" varchar(500),
  "is_correct" boolean NOT NULL DEFAULT false
);
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_option_question_label_idx" ON "mock_exam_options" ("question_id", "label");

CREATE TABLE IF NOT EXISTS "mock_exam_paper_questions" (
  "id" serial PRIMARY KEY,
  "paper_id" integer NOT NULL REFERENCES "mock_exam_papers"("id") ON DELETE CASCADE,
  "section_id" integer NOT NULL REFERENCES "mock_exam_sections"("id") ON DELETE CASCADE,
  "question_id" integer NOT NULL REFERENCES "mock_exam_questions"("id"),
  "position" integer NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_paper_question_idx" ON "mock_exam_paper_questions" ("paper_id", "question_id");
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_paper_question_order_idx" ON "mock_exam_paper_questions" ("paper_id", "position");

CREATE TABLE IF NOT EXISTS "mock_exam_attempts" (
  "id" serial PRIMARY KEY,
  "paper_id" integer NOT NULL REFERENCES "mock_exam_papers"("id") ON DELETE CASCADE,
  "user_id" varchar NOT NULL REFERENCES "users"("id"),
  "attempt_number" integer NOT NULL DEFAULT 1,
  "status" mock_test_attempt_status NOT NULL DEFAULT 'in_progress',
  "started_at" timestamp NOT NULL DEFAULT now(),
  "submitted_at" timestamp,
  "score" real,
  "total_time_seconds" integer,
  "correct_count" integer DEFAULT 0,
  "wrong_count" integer DEFAULT 0,
  "unanswered_count" integer DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_attempt_user_paper_idx" ON "mock_exam_attempts" ("paper_id", "user_id", "attempt_number");

CREATE TABLE IF NOT EXISTS "mock_exam_attempt_sections" (
  "id" serial PRIMARY KEY,
  "attempt_id" integer NOT NULL REFERENCES "mock_exam_attempts"("id") ON DELETE CASCADE,
  "section_id" integer NOT NULL REFERENCES "mock_exam_sections"("id"),
  "time_spent_seconds" integer DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_attempt_section_idx" ON "mock_exam_attempt_sections" ("attempt_id", "section_id");

CREATE TABLE IF NOT EXISTS "mock_exam_responses" (
  "id" serial PRIMARY KEY,
  "attempt_id" integer NOT NULL REFERENCES "mock_exam_attempts"("id") ON DELETE CASCADE,
  "question_id" integer NOT NULL REFERENCES "mock_exam_questions"("id"),
  "selected_option_id" integer REFERENCES "mock_exam_options"("id"),
  "is_correct" boolean,
  "time_spent_seconds" integer DEFAULT 0,
  "flagged" boolean NOT NULL DEFAULT false,
  "saved_at" timestamp NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "mock_exam_response_attempt_question_idx" ON "mock_exam_responses" ("attempt_id", "question_id");
