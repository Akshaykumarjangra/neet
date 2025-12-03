-- Create enum for chapter status
DO $$ BEGIN
  CREATE TYPE chapter_status AS ENUM ('draft', 'in_review', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Content Topics
CREATE TABLE IF NOT EXISTS content_topics (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(50) NOT NULL,
  class_level VARCHAR(20) NOT NULL,
  topic_name VARCHAR(200) NOT NULL,
  ncert_chapter VARCHAR(100),
  reference_books JSONB
);

-- Questions
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES content_topics(id) NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer VARCHAR(10) NOT NULL,
  explanation TEXT NOT NULL,
  difficulty VARCHAR(20),
  tags JSONB
);

-- Update users table to add NEET-specific fields if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='current_level') THEN
    ALTER TABLE users ADD COLUMN current_level INTEGER DEFAULT 1 NOT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='total_points') THEN
    ALTER TABLE users ADD COLUMN total_points INTEGER DEFAULT 0 NOT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='study_streak') THEN
    ALTER TABLE users ADD COLUMN study_streak INTEGER DEFAULT 0 NOT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='last_active_date') THEN
    ALTER TABLE users ADD COLUMN last_active_date TIMESTAMP;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='streak_freezes') THEN
    ALTER TABLE users ADD COLUMN streak_freezes INTEGER DEFAULT 0 NOT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='adaptive_profile') THEN
    ALTER TABLE users ADD COLUMN adaptive_profile JSONB;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='is_admin') THEN
    ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE NOT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='is_paid_user') THEN
    ALTER TABLE users ADD COLUMN is_paid_user BOOLEAN DEFAULT FALSE NOT NULL;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='created_at') THEN
    ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT NOW() NOT NULL;
  END IF;
END $$;

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  xp_reward INTEGER DEFAULT 0 NOT NULL,
  unlock_condition JSONB NOT NULL,
  rarity VARCHAR(20) DEFAULT 'common' NOT NULL
);

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  achievement_id INTEGER REFERENCES achievements(id) NOT NULL,
  unlocked_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Daily Challenges
CREATE TABLE IF NOT EXISTS daily_challenges (
  id SERIAL PRIMARY KEY,
  challenge_date TIMESTAMP NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  target_value INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 50 NOT NULL,
  subject VARCHAR(50)
);

-- User Daily Challenges
CREATE TABLE IF NOT EXISTS user_daily_challenges (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  challenge_id INTEGER REFERENCES daily_challenges(id) NOT NULL,
  progress INTEGER DEFAULT 0 NOT NULL,
  completed BOOLEAN DEFAULT FALSE NOT NULL,
  completed_at TIMESTAMP
);

-- XP Transactions
CREATE TABLE IF NOT EXISTS xp_transactions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  amount INTEGER NOT NULL,
  source VARCHAR(100) NOT NULL,
  source_id VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS xp_transactions_user_source_sourceid_idx 
  ON xp_transactions(user_id, source, source_id);

-- Leaderboard Entries
CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  leaderboard_type VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  rank INTEGER,
  period VARCHAR(20) NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Chapter Prerequisites
CREATE TABLE IF NOT EXISTS chapter_prerequisites (
  id SERIAL PRIMARY KEY,
  chapter_id VARCHAR(50) NOT NULL,
  prerequisite_chapter_id VARCHAR(50) NOT NULL,
  required_mastery INTEGER DEFAULT 70 NOT NULL
);

-- User Chapter Progress
CREATE TABLE IF NOT EXISTS user_chapter_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  chapter_id VARCHAR(50) NOT NULL,
  mastery_level INTEGER DEFAULT 0 NOT NULL,
  time_spent INTEGER DEFAULT 0 NOT NULL,
  last_accessed TIMESTAMP
);

-- Test Sessions
CREATE TABLE IF NOT EXISTS test_sessions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  test_type VARCHAR(50) NOT NULL,
  subject VARCHAR(50),
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER DEFAULT 0 NOT NULL,
  score INTEGER DEFAULT 0 NOT NULL,
  time_taken INTEGER,
  started_at TIMESTAMP DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP
);

-- Test Responses
CREATE TABLE IF NOT EXISTS test_responses (
  id SERIAL PRIMARY KEY,
  test_session_id INTEGER REFERENCES test_sessions(id) NOT NULL,
  question_id INTEGER REFERENCES questions(id) NOT NULL,
  selected_answer VARCHAR(10),
  is_correct BOOLEAN,
  time_spent INTEGER,
  answered_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Battle Pass Seasons
CREATE TABLE IF NOT EXISTS battle_pass_seasons (
  id SERIAL PRIMARY KEY,
  season_name VARCHAR(100) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  total_tiers INTEGER DEFAULT 50 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Battle Pass Tiers
CREATE TABLE IF NOT EXISTS battle_pass_tiers (
  id SERIAL PRIMARY KEY,
  season_id INTEGER REFERENCES battle_pass_seasons(id) NOT NULL,
  tier_number INTEGER NOT NULL,
  xp_required INTEGER NOT NULL,
  free_reward JSONB,
  premium_reward JSONB
);

-- User Battle Pass Progress
CREATE TABLE IF NOT EXISTS user_battle_pass_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  season_id INTEGER REFERENCES battle_pass_seasons(id) NOT NULL,
  current_tier INTEGER DEFAULT 1 NOT NULL,
  current_xp INTEGER DEFAULT 0 NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE NOT NULL,
  claimed_tiers JSONB DEFAULT '[]'::jsonb
);

-- Loot Drops
CREATE TABLE IF NOT EXISTS loot_drops (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  drop_type VARCHAR(50) NOT NULL,
  rarity VARCHAR(20) NOT NULL,
  rewards JSONB NOT NULL,
  dropped_at TIMESTAMP DEFAULT NOW() NOT NULL,
  opened_at TIMESTAMP
);

-- User Inventory
CREATE TABLE IF NOT EXISTS user_inventory (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  item_type VARCHAR(50) NOT NULL,
  item_id VARCHAR(100) NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  metadata JSONB,
  acquired_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Study Sessions
CREATE TABLE IF NOT EXISTS study_sessions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  chapter_id VARCHAR(50),
  duration INTEGER NOT NULL,
  questions_attempted INTEGER DEFAULT 0 NOT NULL,
  questions_correct INTEGER DEFAULT 0 NOT NULL,
  xp_earned INTEGER DEFAULT 0 NOT NULL,
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NOT NULL
);

-- Flashcards
CREATE TABLE IF NOT EXISTS flashcards (
  id SERIAL PRIMARY KEY,
  topic_id INTEGER REFERENCES content_topics(id) NOT NULL,
  front_content TEXT NOT NULL,
  back_content TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1 NOT NULL,
  tags JSONB
);

-- User Flashcard Progress
CREATE TABLE IF NOT EXISTS user_flashcard_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  flashcard_id INTEGER REFERENCES flashcards(id) NOT NULL,
  ease_factor REAL DEFAULT 2.5 NOT NULL,
  interval INTEGER DEFAULT 0 NOT NULL,
  repetitions INTEGER DEFAULT 0 NOT NULL,
  next_review TIMESTAMP,
  last_reviewed TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_user_id ON test_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_id ON xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic_id ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_chapter_progress_user_id ON user_chapter_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id ON study_sessions(user_id);
