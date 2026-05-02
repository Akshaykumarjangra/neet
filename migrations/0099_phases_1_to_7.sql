-- Phases 1–7 schema additions, ALIGNED with canonical schema.ts.
-- Key facts (per architecture.md + shared/schema.ts):
--   users.id is varchar (UUID)   → all user FKs use varchar
--   users.adaptiveProfile (jsonb) already holds masteryScores → no theta_jsonb
--   users.studyStreak / lastActiveDate / streakFreezes already exist
--   user_performance is the attempts table (NOT a table called "attempts")
--   user_flashcard_progress.next_review is the SRS due field
--   mock_exam_attempts.submitted_at (not completed_at)
--   mock_exam_attempts already has focus_loss_count, device_fingerprint, last_active_at
-- Apply: psql $DATABASE_URL -f migrations/0099_phases_1_to_7.sql

-- =========================================================
-- Phase 1: adaptive engine
-- =========================================================
-- Question-level IRT difficulty parameter
ALTER TABLE questions ADD COLUMN IF NOT EXISTS irt_b real DEFAULT 0;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS concept_ids integer[] DEFAULT '{}';

CREATE TABLE IF NOT EXISTS concepts (
  id serial PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  topic_id integer REFERENCES content_topics(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS concept_prereqs (
  from_id integer NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  to_id integer NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  PRIMARY KEY (from_id, to_id)
);

CREATE TABLE IF NOT EXISTS user_concept_mastery (
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  concept_id integer NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  p_known real NOT NULL DEFAULT 0.3,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, concept_id)
);

CREATE TABLE IF NOT EXISTS daily_plans (
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  plan_jsonb jsonb NOT NULL,
  completed_jsonb jsonb DEFAULT '{}'::jsonb,
  PRIMARY KEY (user_id, date)
);

CREATE TABLE IF NOT EXISTS mock_analysis (
  attempt_id integer PRIMARY KEY REFERENCES mock_exam_attempts(id) ON DELETE CASCADE,
  json jsonb NOT NULL,
  generated_at timestamptz DEFAULT now()
);

-- =========================================================
-- Phase 3: battles, squads, parents
-- (streak_freezes, last_active_date already on users — DO NOT re-add)
-- =========================================================
CREATE TABLE IF NOT EXISTS user_ratings (
  user_id varchar PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  rating real NOT NULL DEFAULT 1500,
  rd real NOT NULL DEFAULT 350,
  vol real NOT NULL DEFAULT 0.06
);

CREATE TABLE IF NOT EXISTS battles (
  id text PRIMARY KEY,
  a_user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  b_user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  a_score integer NOT NULL DEFAULT 0,
  b_score integer NOT NULL DEFAULT 0,
  winner_user_id varchar,
  finished_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS squads (
  id serial PRIMARY KEY,
  name text NOT NULL,
  code text UNIQUE NOT NULL,
  weekly_goal_minutes integer DEFAULT 600,
  created_at timestamptz DEFAULT now()
);
CREATE TABLE IF NOT EXISTS squad_members (
  squad_id integer NOT NULL REFERENCES squads(id) ON DELETE CASCADE,
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (squad_id, user_id)
);

CREATE TABLE IF NOT EXISTS parent_links (
  id serial PRIMARY KEY,
  parent_phone text NOT NULL,
  student_user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE (parent_phone, student_user_id)
);

-- =========================================================
-- Phase 4: tiers, billing recovery, referrals, scholarship
-- (paymentStatus, isPaidUser already on users — but no granular tier)
-- =========================================================
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier text DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code text UNIQUE;

CREATE TABLE IF NOT EXISTS usage_events (
  id bigserial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS usage_events_user_event_time ON usage_events (user_id, event, created_at DESC);

CREATE TABLE IF NOT EXISTS subscriptions (
  id serial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  razorpay_sub_id text UNIQUE,
  status text NOT NULL,
  plan_id text NOT NULL,
  current_end timestamptz
);

CREATE TABLE IF NOT EXISTS referrals (
  referrer_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referee_id varchar PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  credited_at timestamptz
);

CREATE TABLE IF NOT EXISTS wallets (
  user_id varchar PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  balance integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS coupons (
  code text PRIMARY KEY,
  discount_pct integer NOT NULL,
  valid_until timestamptz,
  user_id varchar REFERENCES users(id) ON DELETE SET NULL,
  source text,
  redeemed_at timestamptz
);

CREATE TABLE IF NOT EXISTS scholarship_attempts (
  id serial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score integer, percentile real, coupon_code text REFERENCES coupons(code),
  attempted_at timestamptz DEFAULT now()
);

-- =========================================================
-- Phase 5: marketing, lifecycle, events, attribution
-- =========================================================
CREATE TABLE IF NOT EXISTS touches (
  id bigserial PRIMARY KEY,
  user_id varchar REFERENCES users(id) ON DELETE SET NULL,
  fingerprint text,
  ts timestamptz NOT NULL DEFAULT now(),
  channel text NOT NULL, campaign text, cost real DEFAULT 0
);
CREATE INDEX IF NOT EXISTS touches_user_ts ON touches (user_id, ts);

CREATE TABLE IF NOT EXISTS lifecycle_sends (
  id bigserial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event text NOT NULL, channel text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  opened_at timestamptz, clicked_at timestamptz
);
CREATE INDEX IF NOT EXISTS lifecycle_user_event ON lifecycle_sends (user_id, event, sent_at DESC);

CREATE TABLE IF NOT EXISTS push_queue (
  id bigserial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL, body text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(), sent_at timestamptz
);

CREATE TABLE IF NOT EXISTS billing_events (
  id bigserial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount integer NOT NULL, currency text DEFAULT 'INR',
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id bigserial PRIMARY KEY,
  user_id varchar REFERENCES users(id) ON DELETE SET NULL,
  session_id text,
  event text NOT NULL, props jsonb DEFAULT '{}'::jsonb,
  url text, ts timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS events_user_ts ON events (user_id, ts DESC);
CREATE INDEX IF NOT EXISTS events_event_ts ON events (event, ts DESC);

-- =========================================================
-- Phase 0/05: indexes that were missing on canonical tables
-- =========================================================
CREATE INDEX IF NOT EXISTS up_user_time ON user_performance (user_id, attempt_date DESC);
CREATE INDEX IF NOT EXISTS up_question ON user_performance (question_id);
CREATE INDEX IF NOT EXISTS questions_topic_diff ON questions (topic_id, difficulty_level);
CREATE INDEX IF NOT EXISTS ufp_user_due ON user_flashcard_progress (user_id, next_review);
