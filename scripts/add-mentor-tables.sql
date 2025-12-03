-- Add new enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'mentor', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('requested', 'confirmed', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE content_asset_type AS ENUM ('video', 'pdf', 'image', 'handwritten_note');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add new columns to users table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
    ALTER TABLE users ADD COLUMN role user_role NOT NULL DEFAULT 'student';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='avatar_url') THEN
    ALTER TABLE users ADD COLUMN avatar_url VARCHAR(500);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='headline') THEN
    ALTER TABLE users ADD COLUMN headline VARCHAR(200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='is_verified') THEN
    ALTER TABLE users ADD COLUMN is_verified BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='verified_at') THEN
    ALTER TABLE users ADD COLUMN verified_at TIMESTAMP;
  END IF;
END $$;

-- Create mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL UNIQUE,
  bio TEXT,
  subjects JSONB NOT NULL DEFAULT '[]',
  topics JSONB NOT NULL DEFAULT '[]',
  hourly_rate_cents INTEGER NOT NULL DEFAULT 0,
  experience_years INTEGER NOT NULL DEFAULT 0,
  education JSONB NOT NULL DEFAULT '[]',
  languages JSONB NOT NULL DEFAULT '["English"]',
  calendar_timezone VARCHAR(50) DEFAULT 'UTC',
  verification_status verification_status NOT NULL DEFAULT 'pending',
  verification_documents JSONB NOT NULL DEFAULT '[]',
  avg_rating REAL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  total_earnings_cents INTEGER NOT NULL DEFAULT 0,
  total_sessions_completed INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create mentor_availability table
CREATE TABLE IF NOT EXISTS mentor_availability (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES mentors(id) NOT NULL,
  day_of_week INTEGER NOT NULL,
  start_time VARCHAR(10) NOT NULL,
  end_time VARCHAR(10) NOT NULL,
  is_recurring BOOLEAN NOT NULL DEFAULT TRUE,
  specific_date TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create mentor_bookings table
CREATE TABLE IF NOT EXISTS mentor_bookings (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES mentors(id) NOT NULL,
  student_id VARCHAR REFERENCES users(id) NOT NULL,
  start_at TIMESTAMP NOT NULL,
  end_at TIMESTAMP NOT NULL,
  status booking_status NOT NULL DEFAULT 'requested',
  price_cents INTEGER NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  meeting_link VARCHAR(500),
  notes TEXT,
  cancellation_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create mentor_reviews table
CREATE TABLE IF NOT EXISTS mentor_reviews (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES mentors(id) NOT NULL,
  student_id VARCHAR REFERENCES users(id) NOT NULL,
  booking_id INTEGER REFERENCES mentor_bookings(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create mentor_payouts table
CREATE TABLE IF NOT EXISTS mentor_payouts (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES mentors(id) NOT NULL,
  amount_cents INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  period_start TIMESTAMP NOT NULL,
  period_end TIMESTAMP NOT NULL,
  initiated_at TIMESTAMP,
  paid_at TIMESTAMP,
  failure_reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create content_assets table
CREATE TABLE IF NOT EXISTS content_assets (
  id SERIAL PRIMARY KEY,
  chapter_content_id INTEGER,
  mentor_id INTEGER REFERENCES mentors(id),
  type content_asset_type NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  url VARCHAR(1000) NOT NULL,
  thumbnail_url VARCHAR(1000),
  duration_seconds INTEGER,
  page_count INTEGER,
  file_size_bytes INTEGER,
  transcription TEXT,
  metadata JSONB,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create content_versions table
CREATE TABLE IF NOT EXISTS content_versions (
  id SERIAL PRIMARY KEY,
  chapter_content_id INTEGER NOT NULL,
  version INTEGER NOT NULL,
  content_snapshot JSONB NOT NULL,
  change_description TEXT,
  created_by VARCHAR REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add new columns to chapter_content table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chapter_content' AND column_name='mentor_id') THEN
    ALTER TABLE chapter_content ADD COLUMN mentor_id INTEGER REFERENCES mentors(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chapter_content' AND column_name='approval_status') THEN
    ALTER TABLE chapter_content ADD COLUMN approval_status verification_status NOT NULL DEFAULT 'pending';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chapter_content' AND column_name='approver_id') THEN
    ALTER TABLE chapter_content ADD COLUMN approver_id VARCHAR REFERENCES users(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chapter_content' AND column_name='rejection_reason') THEN
    ALTER TABLE chapter_content ADD COLUMN rejection_reason TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='chapter_content' AND column_name='previous_version_id') THEN
    ALTER TABLE chapter_content ADD COLUMN previous_version_id INTEGER;
  END IF;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_mentors_user_id ON mentors(user_id);
CREATE INDEX IF NOT EXISTS idx_mentors_verification_status ON mentors(verification_status);
CREATE INDEX IF NOT EXISTS idx_mentor_availability_mentor_id ON mentor_availability(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_bookings_mentor_id ON mentor_bookings(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_bookings_student_id ON mentor_bookings(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_bookings_status ON mentor_bookings(status);
CREATE INDEX IF NOT EXISTS idx_mentor_reviews_mentor_id ON mentor_reviews(mentor_id);
CREATE INDEX IF NOT EXISTS idx_content_assets_mentor_id ON content_assets(mentor_id);
CREATE INDEX IF NOT EXISTS idx_content_assets_chapter_id ON content_assets(chapter_content_id);
CREATE INDEX IF NOT EXISTS idx_chapter_content_mentor_id ON chapter_content(mentor_id);
CREATE INDEX IF NOT EXISTS idx_chapter_content_approval_status ON chapter_content(approval_status);
