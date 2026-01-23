ALTER TABLE "mock_exam_attempts"
  ADD COLUMN IF NOT EXISTS "ip_address" varchar(45),
  ADD COLUMN IF NOT EXISTS "user_agent" text,
  ADD COLUMN IF NOT EXISTS "device_fingerprint" varchar(200);
