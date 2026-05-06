CREATE TABLE IF NOT EXISTS user_chats (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id) NOT NULL,
  chapter_id INTEGER REFERENCES chapter_content(id) NOT NULL,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
