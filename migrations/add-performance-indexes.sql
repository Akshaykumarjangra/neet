-- Phase 0.7 — Database Index Audit
-- Add missing indexes on high-query tables for performance

-- Users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users (role);
CREATE INDEX IF NOT EXISTS idx_users_is_paid ON users (is_paid_user);
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users (last_active_date);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);

-- Questions table
CREATE INDEX IF NOT EXISTS idx_questions_topic_difficulty ON questions (topic_id, difficulty_level);
CREATE INDEX IF NOT EXISTS idx_questions_pyq_year ON questions (pyq_year) WHERE pyq_year IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_questions_source_type ON questions (source_type);

-- User performance
CREATE INDEX IF NOT EXISTS idx_user_performance_user ON user_performance (user_id);
CREATE INDEX IF NOT EXISTS idx_user_performance_question ON user_performance (question_id);
CREATE INDEX IF NOT EXISTS idx_user_performance_user_date ON user_performance (user_id, attempt_date DESC);
CREATE INDEX IF NOT EXISTS idx_user_performance_correct ON user_performance (user_id, is_correct);

-- Content topics
CREATE INDEX IF NOT EXISTS idx_content_topics_subject_class ON content_topics (subject, class_level);

-- Chapter content
CREATE INDEX IF NOT EXISTS idx_chapter_content_subject ON chapter_content (subject);
CREATE INDEX IF NOT EXISTS idx_chapter_content_status ON chapter_content (status);
CREATE INDEX IF NOT EXISTS idx_chapter_content_subject_class ON chapter_content (subject, class_level);

-- Mock exam attempts
CREATE INDEX IF NOT EXISTS idx_mock_exam_attempts_user ON mock_exam_attempts (user_id);
CREATE INDEX IF NOT EXISTS idx_mock_exam_attempts_paper ON mock_exam_attempts (paper_id);
CREATE INDEX IF NOT EXISTS idx_mock_exam_attempts_status ON mock_exam_attempts (status);
CREATE INDEX IF NOT EXISTS idx_mock_exam_attempts_user_status ON mock_exam_attempts (user_id, status);

-- Mock exam responses
CREATE INDEX IF NOT EXISTS idx_mock_exam_responses_attempt ON mock_exam_responses (attempt_id);
CREATE INDEX IF NOT EXISTS idx_mock_exam_responses_question ON mock_exam_responses (question_id);

-- Mock exam questions
CREATE INDEX IF NOT EXISTS idx_mock_exam_questions_subject ON mock_exam_questions (subject);
CREATE INDEX IF NOT EXISTS idx_mock_exam_questions_topic ON mock_exam_questions (topic);
CREATE INDEX IF NOT EXISTS idx_mock_exam_questions_difficulty ON mock_exam_questions (difficulty);

-- Flashcards
CREATE INDEX IF NOT EXISTS idx_flashcards_topic ON flashcards (topic_id);

-- User flashcard progress
CREATE INDEX IF NOT EXISTS idx_user_flashcard_progress_user ON user_flashcard_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_user_flashcard_progress_next_review ON user_flashcard_progress (user_id, next_review);

-- Leaderboard entries
CREATE INDEX IF NOT EXISTS idx_leaderboard_type_period ON leaderboard_entries (leaderboard_type, period);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard_entries (score DESC);

-- XP transactions
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user ON xp_transactions (user_id);
CREATE INDEX IF NOT EXISTS idx_xp_transactions_created ON xp_transactions (created_at DESC);

-- User chapter progress
CREATE INDEX IF NOT EXISTS idx_user_chapter_progress_user ON user_chapter_progress (user_id);
CREATE INDEX IF NOT EXISTS idx_user_chapter_progress_chapter ON user_chapter_progress (chapter_id);

-- Mentor bookings
CREATE INDEX IF NOT EXISTS idx_mentor_bookings_mentor ON mentor_bookings (mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_bookings_student ON mentor_bookings (student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_bookings_status ON mentor_bookings (status);
CREATE INDEX IF NOT EXISTS idx_mentor_bookings_start ON mentor_bookings (start_at);

-- Keypoints
CREATE INDEX IF NOT EXISTS idx_keypoints_chapter ON keypoints (chapter_id);
CREATE INDEX IF NOT EXISTS idx_keypoints_subject ON keypoints (subject);
CREATE INDEX IF NOT EXISTS idx_keypoints_high_yield ON keypoints (is_high_yield) WHERE is_high_yield = true;

-- Formulas
CREATE INDEX IF NOT EXISTS idx_formulas_chapter ON formulas (chapter_id);
CREATE INDEX IF NOT EXISTS idx_formulas_subject ON formulas (subject);
CREATE INDEX IF NOT EXISTS idx_formulas_high_yield ON formulas (is_high_yield) WHERE is_high_yield = true;

-- Marketing reports
CREATE INDEX IF NOT EXISTS idx_marketing_reports_status ON marketing_reports (status);
CREATE INDEX IF NOT EXISTS idx_marketing_reports_created ON marketing_reports (created_at DESC);
