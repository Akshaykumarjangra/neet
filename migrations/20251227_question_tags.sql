CREATE TABLE IF NOT EXISTS question_tags (
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  tag VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'custom',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (question_id, tag)
);
