ALTER TABLE "mock_exam_attempts"
  ADD COLUMN IF NOT EXISTS "focus_loss_count" integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "last_focus_loss_at" timestamp;
