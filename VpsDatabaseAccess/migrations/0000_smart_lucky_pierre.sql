CREATE TABLE "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"icon" varchar(50) NOT NULL,
	"category" varchar(50) NOT NULL,
	"xp_reward" integer DEFAULT 0 NOT NULL,
	"unlock_condition" jsonb NOT NULL,
	"rarity" varchar(20) DEFAULT 'common' NOT NULL,
	CONSTRAINT "achievements_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "chapter_prerequisites" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" varchar(50) NOT NULL,
	"prerequisite_chapter_id" varchar(50) NOT NULL,
	"required_mastery" integer DEFAULT 70 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(50) NOT NULL,
	"class_level" varchar(20) NOT NULL,
	"topic_name" varchar(200) NOT NULL,
	"ncert_chapter" varchar(100),
	"reference_books" jsonb
);
--> statement-breakpoint
CREATE TABLE "daily_challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"challenge_date" timestamp NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"target_type" varchar(50) NOT NULL,
	"target_value" integer NOT NULL,
	"xp_reward" integer DEFAULT 50 NOT NULL,
	"subject" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "leaderboard_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"leaderboard_type" varchar(50) NOT NULL,
	"score" integer NOT NULL,
	"rank" integer,
	"period" varchar(20) NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"test_type" varchar(50) NOT NULL,
	"title" varchar(200) NOT NULL,
	"questions_list" jsonb NOT NULL,
	"duration_minutes" integer NOT NULL,
	"subject" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "past_year_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"exam_type" varchar(50) NOT NULL,
	"subject" varchar(50),
	"questions_list" jsonb NOT NULL,
	"duration_minutes" integer NOT NULL,
	"total_marks" integer NOT NULL,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_id" integer NOT NULL,
	"question_text" text NOT NULL,
	"options" jsonb NOT NULL,
	"correct_answer" varchar(10) NOT NULL,
	"solution_detail" text NOT NULL,
	"solution_steps" jsonb,
	"difficulty_level" integer NOT NULL,
	"source_type" varchar(50) NOT NULL,
	"related_topics" jsonb
);
--> statement-breakpoint
CREATE TABLE "test_sessions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar NOT NULL,
	"test_type" varchar(50) NOT NULL,
	"questions_list" jsonb NOT NULL,
	"current_question_index" integer DEFAULT 0 NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ends_at" timestamp NOT NULL,
	"status" varchar(20) DEFAULT 'in_progress' NOT NULL,
	"score" integer
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"achievement_id" integer NOT NULL,
	"unlocked_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_chapter_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"chapter_id" varchar(50) NOT NULL,
	"completion_percentage" integer DEFAULT 0 NOT NULL,
	"mastery_level" varchar(20) DEFAULT 'bronze' NOT NULL,
	"time_spent_minutes" integer DEFAULT 0 NOT NULL,
	"last_accessed_at" timestamp,
	"notes_completed" boolean DEFAULT false NOT NULL,
	"visualizations_viewed" boolean DEFAULT false NOT NULL,
	"practice_questions_attempted" integer DEFAULT 0 NOT NULL,
	"quiz_completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_daily_challenges" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"challenge_id" integer NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_performance" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"question_id" integer NOT NULL,
	"user_answer" varchar(10) NOT NULL,
	"is_correct" boolean NOT NULL,
	"time_taken_sec" integer,
	"attempt_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"current_level" integer DEFAULT 1 NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL,
	"study_streak" integer DEFAULT 0 NOT NULL,
	"last_active_date" timestamp,
	"streak_freezes" integer DEFAULT 0 NOT NULL,
	"adaptive_profile" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "xp_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"amount" integer NOT NULL,
	"source" varchar(100) NOT NULL,
	"source_id" varchar(100),
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "leaderboard_entries" ADD CONSTRAINT "leaderboard_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_sessions" ADD CONSTRAINT "test_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_progress" ADD CONSTRAINT "user_chapter_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_daily_challenges" ADD CONSTRAINT "user_daily_challenges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_daily_challenges" ADD CONSTRAINT "user_daily_challenges_challenge_id_daily_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."daily_challenges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_performance" ADD CONSTRAINT "user_performance_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_performance" ADD CONSTRAINT "user_performance_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;