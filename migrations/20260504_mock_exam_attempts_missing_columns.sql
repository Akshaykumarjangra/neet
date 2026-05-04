-- Add columns that exist in schema.ts but are missing from mock_exam_attempts table
-- in databases that were initialised with 20251222_mock_exam_core.sql instead of 0007_tearful_chameleon.sql

ALTER TABLE "mock_exam_attempts"
  ADD COLUMN IF NOT EXISTS "ends_at" timestamp,
  ADD COLUMN IF NOT EXISTS "focus_loss_count" integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "last_focus_loss_at" timestamp,
  ADD COLUMN IF NOT EXISTS "last_active_at" timestamp,
  ADD COLUMN IF NOT EXISTS "ip_address" varchar(45),
  ADD COLUMN IF NOT EXISTS "user_agent" text,
  ADD COLUMN IF NOT EXISTS "device_fingerprint" varchar(200);
