CREATE TYPE "public"."billing_interval" AS ENUM('monthly', 'yearly', 'quarterly', 'one_time');--> statement-breakpoint
CREATE TYPE "public"."booking_status" AS ENUM('requested', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."chapter_status" AS ENUM('draft', 'in_review', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."content_asset_type" AS ENUM('video', 'pdf', 'image', 'handwritten_note');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('pending', 'accepted', 'expired', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."keypoint_category" AS ENUM('concept', 'definition', 'law', 'principle', 'theorem', 'rule', 'exception', 'application');--> statement-breakpoint
CREATE TYPE "public"."lead_magnet_type" AS ENUM('pdf', 'video', 'test_series', 'cheatsheet', 'roadmap');--> statement-breakpoint
CREATE TYPE "public"."mock_test_attempt_status" AS ENUM('in_progress', 'submitted', 'auto_submitted', 'expired');--> statement-breakpoint
CREATE TYPE "public"."mock_test_status" AS ENUM('draft', 'scheduled', 'published', 'closed');--> statement-breakpoint
CREATE TYPE "public"."neet_frequency" AS ENUM('low', 'medium', 'high', 'very_high');--> statement-breakpoint
CREATE TYPE "public"."org_member_role" AS ENUM('owner', 'admin', 'teacher', 'student');--> statement-breakpoint
CREATE TYPE "public"."organization_type" AS ENUM('school', 'coaching', 'college', 'corporate');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('free', 'premium', 'organization');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'cancelled', 'expired', 'pending', 'trial', 'past_due', 'paused');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."vote_type" AS ENUM('up', 'down');--> statement-breakpoint
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
CREATE TABLE "admin_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" jsonb,
	"description" text,
	"updated_by" varchar,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_settings_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(50),
	"entity_id" varchar(100),
	"old_value" jsonb,
	"new_value" jsonb,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "battle_pass_seasons" (
	"id" serial PRIMARY KEY NOT NULL,
	"season_name" varchar(100) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"total_tiers" integer DEFAULT 50 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "battle_pass_tiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"season_id" integer NOT NULL,
	"tier_number" integer NOT NULL,
	"xp_required" integer NOT NULL,
	"free_reward" jsonb,
	"premium_reward" jsonb
);
--> statement-breakpoint
CREATE TABLE "chapter_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(50) NOT NULL,
	"class_level" varchar(20) NOT NULL,
	"chapter_number" integer NOT NULL,
	"chapter_title" varchar(200) NOT NULL,
	"introduction" text NOT NULL,
	"key_concepts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"detailed_notes" text NOT NULL,
	"visualizations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"phet_simulations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"important_formulas" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"mnemonics" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"previous_year_questions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"related_chapters" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"ai_summary" text,
	"video_links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"difficulty_level" integer DEFAULT 3 NOT NULL,
	"estimated_study_minutes" integer DEFAULT 180 NOT NULL,
	"formulas" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"learning_objectives" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"prerequisites" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"important_topics" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"ncert_chapter_ref" varchar(100),
	"visualizations_data" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"author_id" varchar,
	"mentor_id" integer,
	"status" "chapter_status" DEFAULT 'draft' NOT NULL,
	"approval_status" "verification_status" DEFAULT 'pending' NOT NULL,
	"approver_id" varchar,
	"rejection_reason" text,
	"version" integer DEFAULT 1 NOT NULL,
	"previous_version_id" integer,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chapter_content_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_content_id" integer NOT NULL,
	"mentor_id" integer NOT NULL,
	"detailed_notes" text,
	"key_concepts" jsonb,
	"formulas" jsonb,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"review_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"reviewed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "chapter_prerequisites" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" varchar(50) NOT NULL,
	"prerequisite_chapter_id" varchar(50) NOT NULL,
	"required_mastery" integer DEFAULT 70 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"thread_id" integer NOT NULL,
	"sender_id" varchar NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_flagged" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_threads" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(200) NOT NULL,
	"student_id" varchar NOT NULL,
	"mentor_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"last_message_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "content_assets" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_content_id" integer,
	"mentor_id" integer,
	"type" "content_asset_type" NOT NULL,
	"title" varchar(300) NOT NULL,
	"description" text,
	"url" varchar(1000) NOT NULL,
	"thumbnail_url" varchar(1000),
	"duration_seconds" integer,
	"page_count" integer,
	"file_size_bytes" integer,
	"transcription" text,
	"metadata" jsonb,
	"is_public" boolean DEFAULT false NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
CREATE TABLE "content_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_content_id" integer NOT NULL,
	"version" integer NOT NULL,
	"content_snapshot" jsonb NOT NULL,
	"change_description" text,
	"created_by" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
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
CREATE TABLE "discussion_replies" (
	"id" serial PRIMARY KEY NOT NULL,
	"discussion_id" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"content" text NOT NULL,
	"is_accepted_answer" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discussion_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"discussion_id" integer,
	"reply_id" integer,
	"vote_type" "vote_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "discussions" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" integer,
	"topic_id" integer,
	"user_id" varchar NOT NULL,
	"title" varchar(300) NOT NULL,
	"content" text NOT NULL,
	"is_pinned" boolean DEFAULT false NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flashcard_decks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"subject" varchar(50),
	"topic_id" integer,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "flashcards" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_id" integer NOT NULL,
	"front_content" text NOT NULL,
	"back_content" text NOT NULL,
	"difficulty" integer DEFAULT 1 NOT NULL,
	"tags" jsonb
);
--> statement-breakpoint
CREATE TABLE "formulas" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" integer,
	"topic_id" integer,
	"subject" varchar(50) NOT NULL,
	"name" varchar(300) NOT NULL,
	"latex_formula" text NOT NULL,
	"plain_formula" text,
	"variables" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"unit" varchar(100),
	"derivation" text,
	"conditions" text,
	"neet_frequency" "neet_frequency" DEFAULT 'medium' NOT NULL,
	"is_high_yield" boolean DEFAULT false NOT NULL,
	"related_keypoints" jsonb DEFAULT '[]'::jsonb,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guest_preview_limits" (
	"guest_token" varchar(64) PRIMARY KEY NOT NULL,
	"previewed_question_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_accessed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "keypoints" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" integer,
	"topic_id" integer,
	"subject" varchar(50) NOT NULL,
	"title" varchar(300) NOT NULL,
	"content" text NOT NULL,
	"category" "keypoint_category" DEFAULT 'concept' NOT NULL,
	"neet_frequency" "neet_frequency" DEFAULT 'medium' NOT NULL,
	"is_high_yield" boolean DEFAULT false NOT NULL,
	"related_formulas" jsonb DEFAULT '[]'::jsonb,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_magnets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"type" "lead_magnet_type" DEFAULT 'pdf' NOT NULL,
	"content_url" varchar(500) NOT NULL,
	"thumbnail_url" varchar(500),
	"call_to_action" varchar(100) DEFAULT 'Download Now',
	"is_active" boolean DEFAULT true NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "lead_magnets_slug_unique" UNIQUE("slug")
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
CREATE TABLE "marketing_agent_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"report_id" integer NOT NULL,
	"agent_name" varchar(100) NOT NULL,
	"task_name" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"output" text,
	"duration_seconds" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "marketing_campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"schedule_cron" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"last_run_at" timestamp,
	"next_run_at" timestamp,
	"config" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "marketing_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"output_summary" text,
	"full_output" text,
	"tasks_completed" integer DEFAULT 0 NOT NULL,
	"total_tasks" integer DEFAULT 0 NOT NULL,
	"error_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mentor_availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"mentor_id" integer NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" varchar(10) NOT NULL,
	"end_time" varchar(10) NOT NULL,
	"is_recurring" boolean DEFAULT true NOT NULL,
	"specific_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mentor_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"mentor_id" integer NOT NULL,
	"student_id" varchar NOT NULL,
	"start_at" timestamp NOT NULL,
	"end_at" timestamp NOT NULL,
	"status" "booking_status" DEFAULT 'requested' NOT NULL,
	"price_cents" integer NOT NULL,
	"payment_status" "payment_status" DEFAULT 'pending' NOT NULL,
	"meeting_link" varchar(500),
	"notes" text,
	"cancellation_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mentor_payouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"mentor_id" integer NOT NULL,
	"amount_cents" integer NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"period_start" timestamp NOT NULL,
	"period_end" timestamp NOT NULL,
	"initiated_at" timestamp,
	"paid_at" timestamp,
	"failure_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mentor_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"mentor_id" integer NOT NULL,
	"student_id" varchar NOT NULL,
	"booking_id" integer,
	"rating" integer NOT NULL,
	"comment" text,
	"is_anonymous" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mentors" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"bio" text,
	"subjects" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"topics" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"hourly_rate_cents" integer DEFAULT 0 NOT NULL,
	"experience_years" integer DEFAULT 0 NOT NULL,
	"education" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"languages" jsonb DEFAULT '["English"]'::jsonb NOT NULL,
	"calendar_timezone" varchar(50) DEFAULT 'UTC',
	"verification_status" "verification_status" DEFAULT 'pending' NOT NULL,
	"verification_documents" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"avg_rating" real DEFAULT 0,
	"review_count" integer DEFAULT 0 NOT NULL,
	"total_earnings_cents" integer DEFAULT 0 NOT NULL,
	"total_sessions_completed" integer DEFAULT 0 NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "mentors_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "mock_exam_assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"user_id" varchar,
	"organization_id" integer,
	"class_section" varchar(50),
	"assigned_by" varchar,
	"assigned_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_attempt_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"attempt_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"section_id" integer NOT NULL,
	"position" integer NOT NULL,
	"snapshot" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_attempt_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"attempt_id" integer NOT NULL,
	"section_id" integer NOT NULL,
	"time_spent_seconds" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "mock_exam_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"attempt_number" integer DEFAULT 1 NOT NULL,
	"status" "mock_test_attempt_status" DEFAULT 'in_progress' NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ends_at" timestamp,
	"submitted_at" timestamp,
	"score" real,
	"total_time_seconds" integer,
	"correct_count" integer DEFAULT 0,
	"wrong_count" integer DEFAULT 0,
	"unanswered_count" integer DEFAULT 0,
	"focus_loss_count" integer DEFAULT 0 NOT NULL,
	"last_focus_loss_at" timestamp,
	"last_active_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "mock_exam_options" (
	"id" serial PRIMARY KEY NOT NULL,
	"question_id" integer NOT NULL,
	"label" varchar(5) NOT NULL,
	"text" text NOT NULL,
	"media_ref" varchar(500),
	"is_correct" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_paper_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"section_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"series_id" integer,
	"title" varchar(200) NOT NULL,
	"description" text,
	"duration_minutes" integer NOT NULL,
	"total_marks" real DEFAULT 0 NOT NULL,
	"instructions" text,
	"shuffle_questions" boolean DEFAULT true NOT NULL,
	"shuffle_options" boolean DEFAULT true NOT NULL,
	"attempts_allowed" integer DEFAULT 1 NOT NULL,
	"status" "mock_test_status" DEFAULT 'draft' NOT NULL,
	"starts_at" timestamp,
	"ends_at" timestamp,
	"created_by" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(50) NOT NULL,
	"topic" varchar(120),
	"subtopic" varchar(120),
	"difficulty" varchar(20) DEFAULT 'medium',
	"stem" text NOT NULL,
	"media_ref" varchar(500),
	"explanation" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"source_year" integer,
	"created_by" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"attempt_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"selected_option_id" integer,
	"is_correct" boolean,
	"time_spent_seconds" integer DEFAULT 0,
	"flagged" boolean DEFAULT false NOT NULL,
	"saved_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_exam_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"paper_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"display_order" integer DEFAULT 1 NOT NULL,
	"question_count" integer NOT NULL,
	"marks_correct" real DEFAULT 4 NOT NULL,
	"marks_incorrect" real DEFAULT -1 NOT NULL,
	"marks_unanswered" real DEFAULT 0 NOT NULL,
	"duration_minutes" integer,
	"instructions" text
);
--> statement-breakpoint
CREATE TABLE "mock_test_series" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"starts_at" timestamp,
	"ends_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
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
	"passing_percentage" integer DEFAULT 40,
	"instructions" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_invitations" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" "org_member_role" DEFAULT 'student' NOT NULL,
	"token" varchar(255) NOT NULL,
	"status" "invitation_status" DEFAULT 'pending' NOT NULL,
	"invited_by" varchar NOT NULL,
	"expires_at" timestamp NOT NULL,
	"accepted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organization_invitations_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "organization_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"organization_id" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"role" "org_member_role" DEFAULT 'student' NOT NULL,
	"department" varchar(100),
	"class_section" varchar(50),
	"employee_id" varchar(50),
	"student_roll_number" varchar(50),
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"invited_by" varchar,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"slug" varchar(100),
	"type" "organization_type" DEFAULT 'school' NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"country" varchar(100) DEFAULT 'India',
	"pincode" varchar(10),
	"logo_url" varchar(500),
	"website" varchar(255),
	"owner_user_id" varchar,
	"billing_email" varchar(255),
	"billing_name" varchar(200),
	"gst_number" varchar(20),
	"total_seats" integer DEFAULT 50 NOT NULL,
	"used_seats" integer DEFAULT 0 NOT NULL,
	"plan_id" integer,
	"subscription_status" "subscription_status" DEFAULT 'pending',
	"subscription_start_date" timestamp,
	"subscription_end_date" timestamp,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "password_reset_tokens_token_unique" UNIQUE("token")
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
CREATE TABLE "payment_transactions" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"subscription_id" integer,
	"organization_id" integer,
	"provider" text NOT NULL,
	"transaction_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"status" text NOT NULL,
	"payment_method" varchar(50),
	"payment_provider" varchar(50),
	"stripe_payment_intent_id" varchar(255),
	"stripe_charge_id" varchar(255),
	"razorpay_order_id" varchar(255),
	"razorpay_payment_id" varchar(255),
	"razorpay_signature" varchar(500),
	"payment_data" jsonb,
	"failure_code" varchar(100),
	"failure_message" text,
	"invoice_url" varchar(500),
	"receipt_email" varchar(255),
	"description" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_preview_limits" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"previewed_question_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"last_accessed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_tags" (
	"question_id" integer NOT NULL,
	"tag" varchar(100) NOT NULL,
	"category" varchar(50) DEFAULT 'custom' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "question_tags_question_id_tag_pk" PRIMARY KEY("question_id","tag")
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_id" integer NOT NULL,
	"question_text" text NOT NULL,
	"option_a" text,
	"option_b" text,
	"option_c" text,
	"option_d" text,
	"options" jsonb,
	"correct_answer" varchar(10) NOT NULL,
	"explanation" text,
	"solution_detail" text,
	"solution_steps" jsonb,
	"difficulty" text,
	"difficulty_level" integer,
	"source_type" varchar(50),
	"related_topics" jsonb,
	"tags" jsonb,
	"pyq_year" integer
);
--> statement-breakpoint
CREATE TABLE "session_participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"user_id" varchar NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	"last_seen_at" timestamp DEFAULT now() NOT NULL,
	"connection_id" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(50) NOT NULL,
	"description" text,
	"plan_type" "subscription_plan" DEFAULT 'premium' NOT NULL,
	"price_monthly_cents" integer NOT NULL,
	"price_yearly_cents" integer,
	"currency" varchar(10) DEFAULT 'INR' NOT NULL,
	"billing_interval" "billing_interval" DEFAULT 'monthly' NOT NULL,
	"stripe_product_id" varchar(255),
	"stripe_price_id_monthly" varchar(255),
	"stripe_price_id_yearly" varchar(255),
	"razorpay_plan_id_monthly" varchar(255),
	"razorpay_plan_id_yearly" varchar(255),
	"features" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"limits" jsonb,
	"trial_days" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscription_plans_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "test_session_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_id" integer NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"event_data" jsonb NOT NULL,
	"sequence" integer NOT NULL,
	"client_timestamp" timestamp,
	"server_timestamp" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"test_type" varchar(50) NOT NULL,
	"subject" varchar(50),
	"total_questions" integer NOT NULL,
	"correct_answers" integer DEFAULT 0 NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"time_taken" integer,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "upgrading_popups" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"cta_text" varchar(50) DEFAULT 'Upgrade Now' NOT NULL,
	"cta_link" varchar(500) DEFAULT '/pricing' NOT NULL,
	"image_url" varchar(500),
	"trigger_type" varchar(50) DEFAULT 'timer' NOT NULL,
	"trigger_value" jsonb,
	"target_pages" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"display_priority" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"achievement_id" integer NOT NULL,
	"unlocked_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_battle_pass_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"season_id" integer NOT NULL,
	"current_tier" integer DEFAULT 1 NOT NULL,
	"current_xp" integer DEFAULT 0 NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"claimed_tiers" jsonb DEFAULT '[]'::jsonb
);
--> statement-breakpoint
CREATE TABLE "user_chapter_bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"chapter_content_id" integer NOT NULL,
	"section_id" varchar(100),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_chapter_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"chapter_content_id" integer NOT NULL,
	"section_id" varchar(100),
	"note_text" text NOT NULL,
	"highlight_text" text,
	"color" varchar(20) DEFAULT 'yellow',
	"position" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
CREATE TABLE "user_chapter_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"chapter_content_id" integer NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"ended_at" timestamp,
	"duration_minutes" integer,
	"sections_viewed" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"interaction_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_combos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"subject" varchar(50) NOT NULL,
	"current_combo" integer DEFAULT 0 NOT NULL,
	"max_combo" integer DEFAULT 0 NOT NULL,
	"last_answer_at" timestamp DEFAULT now()
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
CREATE TABLE "user_flashcard_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"flashcard_id" integer NOT NULL,
	"ease_factor" real DEFAULT 2.5 NOT NULL,
	"interval" integer DEFAULT 0 NOT NULL,
	"repetitions" integer DEFAULT 0 NOT NULL,
	"next_review" timestamp,
	"last_reviewed" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_formula_bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"formula_id" integer NOT NULL,
	"note" text,
	"mastery_level" integer DEFAULT 0 NOT NULL,
	"last_reviewed_at" timestamp,
	"next_review_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_keypoint_bookmarks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"keypoint_id" integer NOT NULL,
	"note" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"magnet_id" integer,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"name" varchar(100),
	"user_id" varchar,
	"status" varchar(20) DEFAULT 'new',
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
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
CREATE TABLE "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"display_name" varchar(100),
	"bio" text,
	"avatar_url" varchar(500),
	"total_xp" integer DEFAULT 0 NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"rank_title" varchar(50) DEFAULT 'Beginner',
	"badges" jsonb DEFAULT '[]'::jsonb,
	"preferences" jsonb DEFAULT '{}'::jsonb,
	"equipped_frame" varchar(100),
	"equipped_badge" varchar(100),
	"equipped_title" varchar(200),
	"show_profile" boolean DEFAULT true NOT NULL,
	"school" varchar(200),
	"city" varchar(100),
	"state" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"plan_id" integer NOT NULL,
	"organization_id" integer,
	"status" "subscription_status" DEFAULT 'pending' NOT NULL,
	"billing_interval" "billing_interval" DEFAULT 'monthly' NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp,
	"trial_end_date" timestamp,
	"current_period_start" timestamp,
	"current_period_end" timestamp,
	"auto_renew" boolean DEFAULT true NOT NULL,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"razorpay_subscription_id" varchar(255),
	"razorpay_customer_id" varchar(255),
	"cancelled_at" timestamp,
	"cancellation_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_topic_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"topic_id" integer NOT NULL,
	"chapter_id" integer,
	"completion_percentage" integer DEFAULT 0 NOT NULL,
	"mastery_score" integer DEFAULT 0 NOT NULL,
	"questions_attempted" integer DEFAULT 0 NOT NULL,
	"questions_correct" integer DEFAULT 0 NOT NULL,
	"flashcards_reviewed" integer DEFAULT 0 NOT NULL,
	"time_spent_minutes" integer DEFAULT 0 NOT NULL,
	"last_accessed_at" timestamp,
	"is_completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"name" text NOT NULL,
	"company_name" text,
	"role" text DEFAULT 'user' NOT NULL,
	"is_super_admin" boolean DEFAULT false NOT NULL,
	"avatar_url" varchar(500),
	"headline" varchar(200),
	"is_verified" boolean DEFAULT false NOT NULL,
	"two_factor_enabled" boolean DEFAULT false NOT NULL,
	"two_factor_secret" text,
	"payment_status" text DEFAULT 'none' NOT NULL,
	"demo_started_at" timestamp,
	"paid_at" timestamp,
	"payment_provider" text,
	"payment_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"current_level" integer DEFAULT 1 NOT NULL,
	"total_points" integer DEFAULT 0 NOT NULL,
	"study_streak" integer DEFAULT 0 NOT NULL,
	"last_active_date" timestamp,
	"streak_freezes" integer DEFAULT 0 NOT NULL,
	"adaptive_profile" jsonb,
	"is_admin" boolean DEFAULT false NOT NULL,
	"is_paid_user" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp,
	"is_owner" boolean DEFAULT false NOT NULL,
	"is_disabled" boolean DEFAULT false NOT NULL,
	"must_change_password" boolean DEFAULT false NOT NULL,
	"failed_login_attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" varchar(50) NOT NULL,
	"event_id" varchar(255) NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"payload" jsonb NOT NULL,
	"processed" boolean DEFAULT false NOT NULL,
	"processed_at" timestamp,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "webhook_events_event_id_unique" UNIQUE("event_id")
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
ALTER TABLE "admin_settings" ADD CONSTRAINT "admin_settings_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "battle_pass_tiers" ADD CONSTRAINT "battle_pass_tiers_season_id_battle_pass_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."battle_pass_seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter_content" ADD CONSTRAINT "chapter_content_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter_content" ADD CONSTRAINT "chapter_content_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter_content" ADD CONSTRAINT "chapter_content_approver_id_users_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter_content_versions" ADD CONSTRAINT "chapter_content_versions_chapter_content_id_chapter_content_id_fk" FOREIGN KEY ("chapter_content_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapter_content_versions" ADD CONSTRAINT "chapter_content_versions_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_thread_id_chat_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."chat_threads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_threads" ADD CONSTRAINT "chat_threads_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_threads" ADD CONSTRAINT "chat_threads_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_assets" ADD CONSTRAINT "content_assets_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_versions" ADD CONSTRAINT "content_versions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussion_replies" ADD CONSTRAINT "discussion_replies_discussion_id_discussions_id_fk" FOREIGN KEY ("discussion_id") REFERENCES "public"."discussions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussion_replies" ADD CONSTRAINT "discussion_replies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussion_votes" ADD CONSTRAINT "discussion_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussion_votes" ADD CONSTRAINT "discussion_votes_discussion_id_discussions_id_fk" FOREIGN KEY ("discussion_id") REFERENCES "public"."discussions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussion_votes" ADD CONSTRAINT "discussion_votes_reply_id_discussion_replies_id_fk" FOREIGN KEY ("reply_id") REFERENCES "public"."discussion_replies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_chapter_id_chapter_content_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcard_decks" ADD CONSTRAINT "flashcard_decks_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formulas" ADD CONSTRAINT "formulas_chapter_id_chapter_content_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formulas" ADD CONSTRAINT "formulas_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keypoints" ADD CONSTRAINT "keypoints_chapter_id_chapter_content_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "keypoints" ADD CONSTRAINT "keypoints_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leaderboard_entries" ADD CONSTRAINT "leaderboard_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketing_agent_logs" ADD CONSTRAINT "marketing_agent_logs_report_id_marketing_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."marketing_reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marketing_reports" ADD CONSTRAINT "marketing_reports_campaign_id_marketing_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."marketing_campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_availability" ADD CONSTRAINT "mentor_availability_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_bookings" ADD CONSTRAINT "mentor_bookings_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_bookings" ADD CONSTRAINT "mentor_bookings_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_payouts" ADD CONSTRAINT "mentor_payouts_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_reviews" ADD CONSTRAINT "mentor_reviews_mentor_id_mentors_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."mentors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_reviews" ADD CONSTRAINT "mentor_reviews_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentor_reviews" ADD CONSTRAINT "mentor_reviews_booking_id_mentor_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."mentor_bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentors" ADD CONSTRAINT "mentors_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_assignments" ADD CONSTRAINT "mock_exam_assignments_paper_id_mock_exam_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."mock_exam_papers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_assignments" ADD CONSTRAINT "mock_exam_assignments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_assignments" ADD CONSTRAINT "mock_exam_assignments_assigned_by_users_id_fk" FOREIGN KEY ("assigned_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_attempt_questions" ADD CONSTRAINT "mock_exam_attempt_questions_attempt_id_mock_exam_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."mock_exam_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_attempt_questions" ADD CONSTRAINT "mock_exam_attempt_questions_question_id_mock_exam_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."mock_exam_questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_attempt_questions" ADD CONSTRAINT "mock_exam_attempt_questions_section_id_mock_exam_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."mock_exam_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_attempt_sections" ADD CONSTRAINT "mock_exam_attempt_sections_attempt_id_mock_exam_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."mock_exam_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_attempt_sections" ADD CONSTRAINT "mock_exam_attempt_sections_section_id_mock_exam_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."mock_exam_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_attempts" ADD CONSTRAINT "mock_exam_attempts_paper_id_mock_exam_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."mock_exam_papers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_attempts" ADD CONSTRAINT "mock_exam_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_options" ADD CONSTRAINT "mock_exam_options_question_id_mock_exam_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."mock_exam_questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_paper_questions" ADD CONSTRAINT "mock_exam_paper_questions_paper_id_mock_exam_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."mock_exam_papers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_paper_questions" ADD CONSTRAINT "mock_exam_paper_questions_section_id_mock_exam_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."mock_exam_sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_paper_questions" ADD CONSTRAINT "mock_exam_paper_questions_question_id_mock_exam_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."mock_exam_questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_papers" ADD CONSTRAINT "mock_exam_papers_series_id_mock_test_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."mock_test_series"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_papers" ADD CONSTRAINT "mock_exam_papers_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_questions" ADD CONSTRAINT "mock_exam_questions_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_responses" ADD CONSTRAINT "mock_exam_responses_attempt_id_mock_exam_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."mock_exam_attempts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_responses" ADD CONSTRAINT "mock_exam_responses_question_id_mock_exam_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."mock_exam_questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_responses" ADD CONSTRAINT "mock_exam_responses_selected_option_id_mock_exam_options_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."mock_exam_options"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_exam_sections" ADD CONSTRAINT "mock_exam_sections_paper_id_mock_exam_papers_id_fk" FOREIGN KEY ("paper_id") REFERENCES "public"."mock_exam_papers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_invitations" ADD CONSTRAINT "organization_invitations_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_plan_id_subscription_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_subscription_id_user_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."user_subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_preview_limits" ADD CONSTRAINT "question_preview_limits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_tags" ADD CONSTRAINT "question_tags_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_session_id_test_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."test_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_session_events" ADD CONSTRAINT "test_session_events_session_id_test_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."test_sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_session_events" ADD CONSTRAINT "test_session_events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_sessions" ADD CONSTRAINT "test_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_battle_pass_progress" ADD CONSTRAINT "user_battle_pass_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_battle_pass_progress" ADD CONSTRAINT "user_battle_pass_progress_season_id_battle_pass_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."battle_pass_seasons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_bookmarks" ADD CONSTRAINT "user_chapter_bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_bookmarks" ADD CONSTRAINT "user_chapter_bookmarks_chapter_content_id_chapter_content_id_fk" FOREIGN KEY ("chapter_content_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_notes" ADD CONSTRAINT "user_chapter_notes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_notes" ADD CONSTRAINT "user_chapter_notes_chapter_content_id_chapter_content_id_fk" FOREIGN KEY ("chapter_content_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_progress" ADD CONSTRAINT "user_chapter_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_sessions" ADD CONSTRAINT "user_chapter_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_chapter_sessions" ADD CONSTRAINT "user_chapter_sessions_chapter_content_id_chapter_content_id_fk" FOREIGN KEY ("chapter_content_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_combos" ADD CONSTRAINT "user_combos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_daily_challenges" ADD CONSTRAINT "user_daily_challenges_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_daily_challenges" ADD CONSTRAINT "user_daily_challenges_challenge_id_daily_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."daily_challenges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_flashcard_progress" ADD CONSTRAINT "user_flashcard_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_flashcard_progress" ADD CONSTRAINT "user_flashcard_progress_flashcard_id_flashcards_id_fk" FOREIGN KEY ("flashcard_id") REFERENCES "public"."flashcards"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_formula_bookmarks" ADD CONSTRAINT "user_formula_bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_formula_bookmarks" ADD CONSTRAINT "user_formula_bookmarks_formula_id_formulas_id_fk" FOREIGN KEY ("formula_id") REFERENCES "public"."formulas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_keypoint_bookmarks" ADD CONSTRAINT "user_keypoint_bookmarks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_keypoint_bookmarks" ADD CONSTRAINT "user_keypoint_bookmarks_keypoint_id_keypoints_id_fk" FOREIGN KEY ("keypoint_id") REFERENCES "public"."keypoints"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_leads" ADD CONSTRAINT "user_leads_magnet_id_lead_magnets_id_fk" FOREIGN KEY ("magnet_id") REFERENCES "public"."lead_magnets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_leads" ADD CONSTRAINT "user_leads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_performance" ADD CONSTRAINT "user_performance_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_performance" ADD CONSTRAINT "user_performance_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_plan_id_subscription_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_topic_progress" ADD CONSTRAINT "user_topic_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_topic_progress" ADD CONSTRAINT "user_topic_progress_topic_id_content_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."content_topics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_topic_progress" ADD CONSTRAINT "user_topic_progress_chapter_id_chapter_content_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapter_content"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_logs_user_id_idx" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "chapter_content_subject_class_chapter_idx" ON "chapter_content" USING btree ("subject","class_level","chapter_number");--> statement-breakpoint
CREATE INDEX "content_topics_subject_class_idx" ON "content_topics" USING btree ("subject","class_level");--> statement-breakpoint
CREATE INDEX "content_topics_topic_name_idx" ON "content_topics" USING btree ("topic_name");--> statement-breakpoint
CREATE UNIQUE INDEX "discussion_votes_user_discussion_idx" ON "discussion_votes" USING btree ("user_id","discussion_id");--> statement-breakpoint
CREATE UNIQUE INDEX "discussion_votes_user_reply_idx" ON "discussion_votes" USING btree ("user_id","reply_id");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_assignment_idx" ON "mock_exam_assignments" USING btree ("paper_id","user_id","organization_id","class_section");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_attempt_question_idx" ON "mock_exam_attempt_questions" USING btree ("attempt_id","question_id");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_attempt_question_order_idx" ON "mock_exam_attempt_questions" USING btree ("attempt_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_attempt_section_idx" ON "mock_exam_attempt_sections" USING btree ("attempt_id","section_id");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_attempt_user_paper_idx" ON "mock_exam_attempts" USING btree ("paper_id","user_id","attempt_number");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_option_question_label_idx" ON "mock_exam_options" USING btree ("question_id","label");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_paper_question_idx" ON "mock_exam_paper_questions" USING btree ("paper_id","question_id");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_paper_question_order_idx" ON "mock_exam_paper_questions" USING btree ("paper_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "mock_exam_response_attempt_question_idx" ON "mock_exam_responses" USING btree ("attempt_id","question_id");--> statement-breakpoint
CREATE UNIQUE INDEX "org_member_idx" ON "organization_members" USING btree ("organization_id","user_id");--> statement-breakpoint
CREATE INDEX "questions_topic_idx" ON "questions" USING btree ("topic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_chapter_bookmarks_user_chapter_idx" ON "user_chapter_bookmarks" USING btree ("user_id","chapter_content_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_chapter_notes_user_chapter_idx" ON "user_chapter_notes" USING btree ("user_id","chapter_content_id","position");--> statement-breakpoint
CREATE UNIQUE INDEX "user_chapter_sessions_user_chapter_idx" ON "user_chapter_sessions" USING btree ("user_id","chapter_content_id","started_at");--> statement-breakpoint
CREATE UNIQUE INDEX "user_combos_user_subject_unique_idx" ON "user_combos" USING btree ("user_id","subject");--> statement-breakpoint
CREATE UNIQUE INDEX "user_flashcard_progress_idx" ON "user_flashcard_progress" USING btree ("user_id","flashcard_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_formula_bookmarks_idx" ON "user_formula_bookmarks" USING btree ("user_id","formula_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_keypoint_bookmarks_idx" ON "user_keypoint_bookmarks" USING btree ("user_id","keypoint_id");--> statement-breakpoint
CREATE UNIQUE INDEX "active_subscription_idx" ON "user_subscriptions" USING btree ("user_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "user_topic_progress_user_topic_idx" ON "user_topic_progress" USING btree ("user_id","topic_id");--> statement-breakpoint
CREATE UNIQUE INDEX "xp_transactions_user_source_sourceid_idx" ON "xp_transactions" USING btree ("user_id","source","source_id");