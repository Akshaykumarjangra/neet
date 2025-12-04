import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, serial, pgEnum, uniqueIndex, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chapterStatusEnum = pgEnum("chapter_status", ["draft", "in_review", "published", "archived"]);

export const userRoleEnum = pgEnum("user_role", ["student", "mentor", "admin"]);

export const verificationStatusEnum = pgEnum("verification_status", ["pending", "approved", "rejected"]);

export const bookingStatusEnum = pgEnum("booking_status", ["requested", "confirmed", "completed", "cancelled"]);

export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "refunded"]);

export const contentAssetTypeEnum = pgEnum("content_asset_type", ["video", "pdf", "image", "handwritten_note"]);

export const contentTopics = pgTable("content_topics", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 50 }).notNull(),
  classLevel: varchar("class_level", { length: 20 }).notNull(),
  topicName: varchar("topic_name", { length: 200 }).notNull(),
  ncertChapter: varchar("ncert_chapter", { length: 100 }),
  referenceBooks: jsonb("reference_books").$type<string[]>(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").references(() => contentTopics.id).notNull(),
  questionText: text("question_text").notNull(),
  options: jsonb("options").$type<{ id: string; text: string }[]>().notNull(),
  correctAnswer: varchar("correct_answer", { length: 10 }).notNull(),
  solutionDetail: text("solution_detail").notNull(),
  solutionSteps: jsonb("solution_steps").$type<string[]>(),
  difficultyLevel: integer("difficulty_level").notNull(),
  sourceType: varchar("source_type", { length: 50 }).notNull(),
  relatedTopics: jsonb("related_topics").$type<string[]>(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRoleEnum("role").notNull().default("student"),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  headline: varchar("headline", { length: 200 }),
  currentLevel: integer("current_level").notNull().default(1),
  totalPoints: integer("total_points").notNull().default(0),
  studyStreak: integer("study_streak").notNull().default(0),
  lastActiveDate: timestamp("last_active_date"),
  streakFreezes: integer("streak_freezes").notNull().default(0),
  adaptiveProfile: jsonb("adaptive_profile").$type<{
    weakAreas?: string[];
    masteryScores?: Record<string, number>;
  }>(),
  isAdmin: boolean("is_admin").notNull().default(false),
  isPaidUser: boolean("is_paid_user").notNull().default(false),
  isVerified: boolean("is_verified").notNull().default(false),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============ MENTOR MANAGEMENT SYSTEM ============

export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull().unique(),
  bio: text("bio"),
  subjects: jsonb("subjects").$type<string[]>().notNull().default([]),
  topics: jsonb("topics").$type<string[]>().notNull().default([]),
  hourlyRate: integer("hourly_rate_cents").notNull().default(0),
  experienceYears: integer("experience_years").notNull().default(0),
  education: jsonb("education").$type<Array<{
    degree: string;
    institution: string;
    year?: number;
  }>>().notNull().default([]),
  languages: jsonb("languages").$type<string[]>().notNull().default(["English"]),
  calendarTimezone: varchar("calendar_timezone", { length: 50 }).default("UTC"),
  verificationStatus: verificationStatusEnum("verification_status").notNull().default("pending"),
  verificationDocuments: jsonb("verification_documents").$type<Array<{
    type: string;
    url: string;
    uploadedAt: string;
    verified?: boolean;
  }>>().notNull().default([]),
  avgRating: real("avg_rating").default(0),
  reviewCount: integer("review_count").notNull().default(0),
  totalEarningsCents: integer("total_earnings_cents").notNull().default(0),
  totalSessionsCompleted: integer("total_sessions_completed").notNull().default(0),
  isAvailable: boolean("is_available").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const mentorAvailability = pgTable("mentor_availability", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id").references(() => mentors.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: varchar("start_time", { length: 10 }).notNull(),
  endTime: varchar("end_time", { length: 10 }).notNull(),
  isRecurring: boolean("is_recurring").notNull().default(true),
  specificDate: timestamp("specific_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const mentorBookings = pgTable("mentor_bookings", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id").references(() => mentors.id).notNull(),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  startAt: timestamp("start_at").notNull(),
  endAt: timestamp("end_at").notNull(),
  status: bookingStatusEnum("status").notNull().default("requested"),
  priceCents: integer("price_cents").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default("pending"),
  meetingLink: varchar("meeting_link", { length: 500 }),
  notes: text("notes"),
  cancellationReason: text("cancellation_reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const mentorReviews = pgTable("mentor_reviews", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id").references(() => mentors.id).notNull(),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  bookingId: integer("booking_id").references(() => mentorBookings.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const mentorPayouts = pgTable("mentor_payouts", {
  id: serial("id").primaryKey(),
  mentorId: integer("mentor_id").references(() => mentors.id).notNull(),
  amountCents: integer("amount_cents").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  periodStart: timestamp("period_start").notNull(),
  periodEnd: timestamp("period_end").notNull(),
  initiatedAt: timestamp("initiated_at"),
  paidAt: timestamp("paid_at"),
  failureReason: text("failure_reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ============ CONTENT ASSETS (Videos, Notes, PDFs) ============

export const contentAssets = pgTable("content_assets", {
  id: serial("id").primaryKey(),
  chapterContentId: integer("chapter_content_id"),
  mentorId: integer("mentor_id").references(() => mentors.id),
  type: contentAssetTypeEnum("type").notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 1000 }).notNull(),
  thumbnailUrl: varchar("thumbnail_url", { length: 1000 }),
  durationSeconds: integer("duration_seconds"),
  pageCount: integer("page_count"),
  fileSizeBytes: integer("file_size_bytes"),
  transcription: text("transcription"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  isPublic: boolean("is_public").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contentVersions = pgTable("content_versions", {
  id: serial("id").primaryKey(),
  chapterContentId: integer("chapter_content_id").notNull(),
  version: integer("version").notNull(),
  contentSnapshot: jsonb("content_snapshot").notNull(),
  changeDescription: text("change_description"),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  xpReward: integer("xp_reward").notNull().default(0),
  unlockCondition: jsonb("unlock_condition").$type<{
    type: string;
    target?: number;
    subject?: string;
  }>().notNull(),
  rarity: varchar("rarity", { length: 20 }).notNull().default("common"),
});

export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  achievementId: integer("achievement_id").references(() => achievements.id).notNull(),
  unlockedAt: timestamp("unlocked_at").notNull().defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }),
  bio: text("bio"),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  totalXp: integer("total_xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  rankTitle: varchar("rank_title", { length: 50 }).default("Beginner"),
  badges: jsonb("badges").$type<string[]>().default([]),
  preferences: jsonb("preferences").$type<Record<string, any>>().default({}),
  equippedFrame: varchar("equipped_frame", { length: 100 }),
  equippedBadge: varchar("equipped_badge", { length: 100 }),
  equippedTitle: varchar("equipped_title", { length: 200 }),
  showProfile: boolean("show_profile").notNull().default(true),
  school: varchar("school", { length: 200 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userCombos = pgTable("user_combos", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  subject: varchar("subject", { length: 50 }).notNull(),
  currentCombo: integer("current_combo").notNull().default(0),
  maxCombo: integer("max_combo").notNull().default(0),
  lastAnswerAt: timestamp("last_answer_at").defaultNow(),
}, (table) => ({
  uniqueUserSubject: uniqueIndex("user_combos_user_subject_unique_idx").on(table.userId, table.subject),
}));

export const dailyChallenges = pgTable("daily_challenges", {
  id: serial("id").primaryKey(),
  challengeDate: timestamp("challenge_date").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  targetType: varchar("target_type", { length: 50 }).notNull(),
  targetValue: integer("target_value").notNull(),
  xpReward: integer("xp_reward").notNull().default(50),
  subject: varchar("subject", { length: 50 }),
});

export const userDailyChallenges = pgTable("user_daily_challenges", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => dailyChallenges.id).notNull(),
  progress: integer("progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const xpTransactions = pgTable("xp_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  amount: integer("amount").notNull(),
  source: varchar("source", { length: 100 }).notNull(),
  sourceId: varchar("source_id", { length: 100 }),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  uniqueUserSourceId: uniqueIndex("xp_transactions_user_source_sourceid_idx").on(table.userId, table.source, table.sourceId),
}));

export const leaderboardEntries = pgTable("leaderboard_entries", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  leaderboardType: varchar("leaderboard_type", { length: 50 }).notNull(),
  score: integer("score").notNull(),
  rank: integer("rank"),
  period: varchar("period", { length: 20 }).notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const chapterPrerequisites = pgTable("chapter_prerequisites", {
  id: serial("id").primaryKey(),
  chapterId: varchar("chapter_id", { length: 50 }).notNull(),
  prerequisiteChapterId: varchar("prerequisite_chapter_id", { length: 50 }).notNull(),
  requiredMastery: integer("required_mastery").notNull().default(70),
});

export const userChapterProgress = pgTable("user_chapter_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  chapterId: varchar("chapter_id", { length: 50 }).notNull(),
  completionPercentage: integer("completion_percentage").notNull().default(0),
  masteryLevel: varchar("mastery_level", { length: 20 }).notNull().default("bronze"),
  timeSpentMinutes: integer("time_spent_minutes").notNull().default(0),
  lastAccessedAt: timestamp("last_accessed_at"),
  notesCompleted: boolean("notes_completed").notNull().default(false),
  visualizationsViewed: boolean("visualizations_viewed").notNull().default(false),
  practiceQuestionsAttempted: integer("practice_questions_attempted").notNull().default(0),
  quizCompleted: boolean("quiz_completed").notNull().default(false),
});

export const testSessions = pgTable("test_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  testType: varchar("test_type", { length: 50 }).notNull(),
  questionsList: jsonb("questions_list").$type<number[]>().notNull(),
  currentQuestionIndex: integer("current_question_index").notNull().default(0),
  answers: jsonb("answers").$type<Record<number, string>>().notNull().default({}),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endsAt: timestamp("ends_at").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("in_progress"),
  score: integer("score"),
});

export const testSessionEvents = pgTable("test_session_events", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id").references(() => testSessions.id).notNull(),
  eventType: varchar("event_type", { length: 50 }).notNull(),
  eventData: jsonb("event_data").notNull(),
  sequence: integer("sequence").notNull(),
  clientTimestamp: timestamp("client_timestamp"),
  serverTimestamp: timestamp("server_timestamp").notNull().defaultNow(),
  userId: varchar("user_id").references(() => users.id).notNull(),
});

export const sessionParticipants = pgTable("session_participants", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id").references(() => testSessions.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  lastSeenAt: timestamp("last_seen_at").notNull().defaultNow(),
  connectionId: varchar("connection_id", { length: 100 }),
  isActive: boolean("is_active").notNull().default(true),
});

export const pastYearPapers = pgTable("past_year_papers", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  examType: varchar("exam_type", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 50 }),
  questionsList: jsonb("questions_list").$type<number[]>().notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  totalMarks: integer("total_marks").notNull(),
  metadata: jsonb("metadata").$type<{
    cutoffMarks?: number;
    totalCandidates?: number;
    difficulty?: string;
  }>(),
});

export const userPerformance = pgTable("user_performance", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  questionId: integer("question_id").references(() => questions.id).notNull(),
  userAnswer: varchar("user_answer", { length: 10 }).notNull(),
  isCorrect: boolean("is_correct").notNull(),
  timeTakenSec: integer("time_taken_sec"),
  attemptDate: timestamp("attempt_date").notNull().defaultNow(),
});

export const mockTests = pgTable("mock_tests", {
  id: serial("id").primaryKey(),
  testType: varchar("test_type", { length: 50 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  questionsList: jsonb("questions_list").$type<number[]>().notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  subject: varchar("subject", { length: 50 }),
  passingPercentage: integer("passing_percentage").default(40),
  instructions: text("instructions"),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const flashcardDecks = pgTable("flashcard_decks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 50 }),
  topicId: integer("topic_id").references(() => contentTopics.id),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  deckId: integer("deck_id").references(() => flashcardDecks.id).notNull(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chapterContent = pgTable("chapter_content", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 50 }).notNull(),
  classLevel: varchar("class_level", { length: 20 }).notNull(),
  chapterNumber: integer("chapter_number").notNull(),
  chapterTitle: varchar("chapter_title", { length: 200 }).notNull(),
  introduction: text("introduction").notNull(),
  keyConcepts: jsonb("key_concepts").$type<Array<{
    title: string;
    description: string;
    formula?: string;
  }>>().notNull().default([]),
  detailedNotes: text("detailed_notes").notNull(),
  visualizations: jsonb("visualizations").$type<Array<
    | { id: string; type: "threejs"; title: string; description: string; config: { modelType: "electric-field" | "molecular-structure" | "cell-organelle" | "wave-interference" | "atomic-model" | "circuit-diagram"; fieldLines?: number; moleculeId?: string; scale?: number } }
    | { id: string; type: "d3"; title: string; description: string; config: { chartType: "bar" | "line" | "pie" | "scatter"; dataPoints: number; animated: boolean } }
    | { id: string; type: "image"; title: string; description: string; config: { assetUrl: string; width?: number; height?: number } }
    | { id: string; type: "video"; title: string; description: string; config: { assetUrl: string; duration?: string; autoplay?: boolean } }
  >>().notNull().default([]),
  phetSimulations: jsonb("phet_simulations").$type<Array<{
    title: string;
    url: string;
    description: string;
  }>>().notNull().default([]),
  importantFormulas: jsonb("important_formulas").$type<Array<{
    name: string;
    formula: string;
    variables: string;
    unit?: string;
  }>>().notNull().default([]),
  mnemonics: jsonb("mnemonics").$type<Array<{
    topic: string;
    mnemonic: string;
  }>>().notNull().default([]),
  previousYearQuestions: jsonb("previous_year_questions").$type<number[]>().notNull().default([]),
  relatedChapters: jsonb("related_chapters").$type<Array<{
    subject: string;
    classLevel: string;
    chapterNumber: number;
    title: string;
  }>>().notNull().default([]),
  aiSummary: text("ai_summary"),
  videoLinks: jsonb("video_links").$type<Array<{
    title: string;
    url: string;
    duration?: string;
    source: string;
  }>>().notNull().default([]),
  difficultyLevel: integer("difficulty_level").notNull().default(3),
  estimatedStudyMinutes: integer("estimated_study_minutes").notNull().default(180),
  
  // Simple content fields for quick seeding
  formulas: jsonb("formulas").$type<string[]>().notNull().default([]),
  learningObjectives: jsonb("learning_objectives").$type<string[]>().notNull().default([]),
  prerequisites: jsonb("prerequisites").$type<string[]>().notNull().default([]),
  importantTopics: jsonb("important_topics").$type<string[]>().notNull().default([]),
  ncertChapterRef: varchar("ncert_chapter_ref", { length: 100 }),
  visualizationsData: jsonb("visualizations_data").$type<Array<{
    type: string;
    title: string;
    description: string;
    config?: Record<string, any>;
  }>>().notNull().default([]),
  
  authorId: varchar("author_id").references(() => users.id),
  mentorId: integer("mentor_id").references(() => mentors.id),
  status: chapterStatusEnum("status").notNull().default("draft"),
  approvalStatus: verificationStatusEnum("approval_status").notNull().default("pending"),
  approverId: varchar("approver_id").references(() => users.id),
  rejectionReason: text("rejection_reason"),
  version: integer("version").notNull().default(1),
  previousVersionId: integer("previous_version_id"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  uniqueSubjectChapter: uniqueIndex("chapter_content_subject_class_chapter_idx").on(table.subject, table.classLevel, table.chapterNumber),
}));

export const insertContentTopicSchema = createInsertSchema(contentTopics).omit({
  id: true,
} as any);

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
} as any);

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  currentLevel: true,
  totalPoints: true,
  studyStreak: true,
} as any);

export const insertUserPerformanceSchema = createInsertSchema(userPerformance).omit({
  id: true,
  attemptDate: true,
} as any);

export const insertMockTestSchema = createInsertSchema(mockTests).omit({
  id: true,
  createdAt: true,
} as any);

export const insertFlashcardDeckSchema = createInsertSchema(flashcardDecks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertFlashcardSchema = createInsertSchema(flashcards).omit({
  id: true,
  createdAt: true,
} as any);

export const insertChapterContentSchema = createInsertSchema(chapterContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
} as any);

export const insertUserAchievementSchema = createInsertSchema(userAchievements).omit({
  id: true,
  unlockedAt: true,
} as any);

export const insertDailyChallengeSchema = createInsertSchema(dailyChallenges).omit({
  id: true,
} as any);

export const insertUserDailyChallengeSchema = createInsertSchema(userDailyChallenges).omit({
  id: true,
} as any);

export const insertXpTransactionSchema = createInsertSchema(xpTransactions).omit({
  id: true,
  createdAt: true,
} as any);

export const insertLeaderboardEntrySchema = createInsertSchema(leaderboardEntries).omit({
  id: true,
  updatedAt: true,
} as any);

export const insertChapterPrerequisiteSchema = createInsertSchema(chapterPrerequisites).omit({
  id: true,
} as any);

export const insertUserChapterProgressSchema = createInsertSchema(userChapterProgress).omit({
  id: true,
} as any);

// LMS: User study sessions tracking
export const userChapterSessions = pgTable("user_chapter_sessions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  chapterContentId: integer("chapter_content_id").references(() => chapterContent.id).notNull(),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  endedAt: timestamp("ended_at"),
  durationMinutes: integer("duration_minutes"),
  sectionsViewed: jsonb("sections_viewed").$type<string[]>().notNull().default([]),
  interactionCount: integer("interaction_count").notNull().default(0),
}, (table) => ({
  userChapterIdx: uniqueIndex("user_chapter_sessions_user_chapter_idx").on(table.userId, table.chapterContentId, table.startedAt),
}));

// LMS: User bookmarks for chapters
export const userChapterBookmarks = pgTable("user_chapter_bookmarks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  chapterContentId: integer("chapter_content_id").references(() => chapterContent.id).notNull(),
  sectionId: varchar("section_id", { length: 100 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  userChapterIdx: uniqueIndex("user_chapter_bookmarks_user_chapter_idx").on(table.userId, table.chapterContentId),
}));

// LMS: User notes within chapters
export const userChapterNotes = pgTable("user_chapter_notes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  chapterContentId: integer("chapter_content_id").references(() => chapterContent.id).notNull(),
  sectionId: varchar("section_id", { length: 100 }),
  noteText: text("note_text").notNull(),
  highlightText: text("highlight_text"),
  color: varchar("color", { length: 20 }).default("yellow"),
  position: integer("position"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  userChapterIdx: uniqueIndex("user_chapter_notes_user_chapter_idx").on(table.userId, table.chapterContentId, table.position),
}));

export const insertUserChapterSessionSchema = createInsertSchema(userChapterSessions).omit({
  id: true,
  startedAt: true,
} as any);

export const insertUserChapterBookmarkSchema = createInsertSchema(userChapterBookmarks).omit({
  id: true,
  createdAt: true,
} as any);

export const insertUserChapterNoteSchema = createInsertSchema(userChapterNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertTestSessionSchema = createInsertSchema(testSessions).omit({
  id: true,
  startedAt: true,
} as any);

// ============ LMS KEYPOINTS & FORMULAS ============

export const keypointCategoryEnum = pgEnum("keypoint_category", [
  "concept", "definition", "law", "principle", "theorem", "rule", "exception", "application"
]);

export const neetFrequencyEnum = pgEnum("neet_frequency", ["low", "medium", "high", "very_high"]);

export const keypoints = pgTable("keypoints", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").references(() => chapterContent.id),
  topicId: integer("topic_id").references(() => contentTopics.id),
  subject: varchar("subject", { length: 50 }).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  content: text("content").notNull(),
  category: keypointCategoryEnum("category").notNull().default("concept"),
  neetFrequency: neetFrequencyEnum("neet_frequency").notNull().default("medium"),
  isHighYield: boolean("is_high_yield").notNull().default(false),
  relatedFormulas: jsonb("related_formulas").$type<number[]>().default([]),
  tags: jsonb("tags").$type<string[]>().default([]),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const formulas = pgTable("formulas", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").references(() => chapterContent.id),
  topicId: integer("topic_id").references(() => contentTopics.id),
  subject: varchar("subject", { length: 50 }).notNull(),
  name: varchar("name", { length: 300 }).notNull(),
  latexFormula: text("latex_formula").notNull(),
  plainFormula: text("plain_formula"),
  variables: jsonb("variables").$type<Array<{ symbol: string; meaning: string; unit?: string }>>().notNull().default([]),
  unit: varchar("unit", { length: 100 }),
  derivation: text("derivation"),
  conditions: text("conditions"),
  neetFrequency: neetFrequencyEnum("neet_frequency").notNull().default("medium"),
  isHighYield: boolean("is_high_yield").notNull().default(false),
  relatedKeypoints: jsonb("related_keypoints").$type<number[]>().default([]),
  tags: jsonb("tags").$type<string[]>().default([]),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userTopicProgress = pgTable("user_topic_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  topicId: integer("topic_id").references(() => contentTopics.id).notNull(),
  chapterId: integer("chapter_id").references(() => chapterContent.id),
  completionPercentage: integer("completion_percentage").notNull().default(0),
  masteryScore: integer("mastery_score").notNull().default(0),
  questionsAttempted: integer("questions_attempted").notNull().default(0),
  questionsCorrect: integer("questions_correct").notNull().default(0),
  flashcardsReviewed: integer("flashcards_reviewed").notNull().default(0),
  timeSpentMinutes: integer("time_spent_minutes").notNull().default(0),
  lastAccessedAt: timestamp("last_accessed_at"),
  isCompleted: boolean("is_completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  userTopicIdx: uniqueIndex("user_topic_progress_user_topic_idx").on(table.userId, table.topicId),
}));

export const userKeypointBookmarks = pgTable("user_keypoint_bookmarks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  keypointId: integer("keypoint_id").references(() => keypoints.id).notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  userKeypointIdx: uniqueIndex("user_keypoint_bookmarks_idx").on(table.userId, table.keypointId),
}));

export const userFormulaBookmarks = pgTable("user_formula_bookmarks", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  formulaId: integer("formula_id").references(() => formulas.id).notNull(),
  note: text("note"),
  masteryLevel: integer("mastery_level").notNull().default(0),
  lastReviewedAt: timestamp("last_reviewed_at"),
  nextReviewAt: timestamp("next_review_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  userFormulaIdx: uniqueIndex("user_formula_bookmarks_idx").on(table.userId, table.formulaId),
}));

export const userFlashcardProgress = pgTable("user_flashcard_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  flashcardId: integer("flashcard_id").references(() => flashcards.id).notNull(),
  easeFactor: real("ease_factor").notNull().default(2.5),
  interval: integer("interval").notNull().default(1),
  repetitions: integer("repetitions").notNull().default(0),
  nextReviewAt: timestamp("next_review_at").notNull().defaultNow(),
  lastReviewedAt: timestamp("last_reviewed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  userFlashcardIdx: uniqueIndex("user_flashcard_progress_idx").on(table.userId, table.flashcardId),
}));

export const insertKeypointSchema = createInsertSchema(keypoints).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertFormulaSchema = createInsertSchema(formulas).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertUserTopicProgressSchema = createInsertSchema(userTopicProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertUserKeypointBookmarkSchema = createInsertSchema(userKeypointBookmarks).omit({
  id: true,
  createdAt: true,
} as any);

export const insertUserFormulaBookmarkSchema = createInsertSchema(userFormulaBookmarks).omit({
  id: true,
  createdAt: true,
} as any);

export const insertUserFlashcardProgressSchema = createInsertSchema(userFlashcardProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertPastYearPaperSchema = createInsertSchema(pastYearPapers).omit({
  id: true,
} as any);

export type ContentTopic = typeof contentTopics.$inferSelect;
export type InsertContentTopic = z.infer<typeof insertContentTopicSchema>;

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type UserPerformance = typeof userPerformance.$inferSelect;
export type InsertUserPerformance = z.infer<typeof insertUserPerformanceSchema>;

export type MockTest = typeof mockTests.$inferSelect;
export type InsertMockTest = z.infer<typeof insertMockTestSchema>;

export type FlashcardDeck = typeof flashcardDecks.$inferSelect;
export type InsertFlashcardDeck = z.infer<typeof insertFlashcardDeckSchema>;

export type Flashcard = typeof flashcards.$inferSelect;
export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;

export type ChapterContent = typeof chapterContent.$inferSelect;
export type InsertChapterContent = z.infer<typeof insertChapterContentSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type DailyChallenge = typeof dailyChallenges.$inferSelect;
export type InsertDailyChallenge = z.infer<typeof insertDailyChallengeSchema>;

export type UserDailyChallenge = typeof userDailyChallenges.$inferSelect;
export type InsertUserDailyChallenge = z.infer<typeof insertUserDailyChallengeSchema>;

export type XpTransaction = typeof xpTransactions.$inferSelect;
export type InsertXpTransaction = z.infer<typeof insertXpTransactionSchema>;

export type LeaderboardEntry = typeof leaderboardEntries.$inferSelect;
export type InsertLeaderboardEntry = z.infer<typeof insertLeaderboardEntrySchema>;

export type ChapterPrerequisite = typeof chapterPrerequisites.$inferSelect;
export type InsertChapterPrerequisite = z.infer<typeof insertChapterPrerequisiteSchema>;

export type UserChapterProgress = typeof userChapterProgress.$inferSelect;
export type InsertUserChapterProgress = z.infer<typeof insertUserChapterProgressSchema>;

export type UserChapterSession = typeof userChapterSessions.$inferSelect;
export type InsertUserChapterSession = z.infer<typeof insertUserChapterSessionSchema>;

export type UserChapterBookmark = typeof userChapterBookmarks.$inferSelect;
export type InsertUserChapterBookmark = z.infer<typeof insertUserChapterBookmarkSchema>;

export type UserChapterNote = typeof userChapterNotes.$inferSelect;
export type InsertUserChapterNote = z.infer<typeof insertUserChapterNoteSchema>;

export type TestSession = typeof testSessions.$inferSelect;
export type InsertTestSession = z.infer<typeof insertTestSessionSchema>;

export type PastYearPaper = typeof pastYearPapers.$inferSelect;
export type InsertPastYearPaper = z.infer<typeof insertPastYearPaperSchema>;

export type Keypoint = typeof keypoints.$inferSelect;
export type InsertKeypoint = z.infer<typeof insertKeypointSchema>;

export type Formula = typeof formulas.$inferSelect;
export type InsertFormula = z.infer<typeof insertFormulaSchema>;

export type UserTopicProgress = typeof userTopicProgress.$inferSelect;
export type InsertUserTopicProgress = z.infer<typeof insertUserTopicProgressSchema>;

export type UserKeypointBookmark = typeof userKeypointBookmarks.$inferSelect;
export type InsertUserKeypointBookmark = z.infer<typeof insertUserKeypointBookmarkSchema>;

export type UserFormulaBookmark = typeof userFormulaBookmarks.$inferSelect;
export type InsertUserFormulaBookmark = z.infer<typeof insertUserFormulaBookmarkSchema>;

export type UserFlashcardProgress = typeof userFlashcardProgress.$inferSelect;
export type InsertUserFlashcardProgress = z.infer<typeof insertUserFlashcardProgressSchema>;

// Battle Pass / Season System
export const seasonPasses = pgTable("season_passes", {
  id: serial("id").primaryKey(),
  seasonNumber: integer("season_number").notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  maxTier: integer("max_tier").notNull().default(50),
  isActive: boolean("is_active").notNull().default(true),
});

export const battlePassTiers = pgTable("battle_pass_tiers", {
  id: serial("id").primaryKey(),
  seasonId: integer("season_id").references(() => seasonPasses.id).notNull(),
  tier: integer("tier").notNull(),
  xpRequired: integer("xp_required").notNull(),
  freeReward: jsonb("free_reward").$type<{
    type: 'cosmetic' | 'xp_boost' | 'power_up' | 'badge';
    itemId?: number;
    quantity?: number;
  }>(),
  premiumReward: jsonb("premium_reward").$type<{
    type: 'cosmetic' | 'xp_boost' | 'power_up' | 'badge';
    itemId?: number;
    quantity?: number;
  }>(),
});

export const userSeasonProgress = pgTable("user_season_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  seasonId: integer("season_id").references(() => seasonPasses.id).notNull(),
  currentTier: integer("current_tier").notNull().default(0),
  totalXp: integer("total_xp").notNull().default(0),
  isPremium: boolean("is_premium").notNull().default(false),
  claimedFreeTiers: jsonb("claimed_free_tiers").$type<number[]>().default([]),
  claimedPremiumTiers: jsonb("claimed_premium_tiers").$type<number[]>().default([]),
});

// Cosmetics System
export const cosmetics = pgTable("cosmetics", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(), // 'frame', 'badge', 'title', 'emote', 'avatar_border'
  rarity: varchar("rarity", { length: 20 }).notNull(), // 'common', 'rare', 'epic', 'legendary'
  imageUrl: varchar("image_url", { length: 255 }),
  unlockMethod: varchar("unlock_method", { length: 50 }).notNull(), // 'battle_pass', 'achievement', 'purchase', 'challenge'
  price: integer("price"), // null if not purchasable
  isLimited: boolean("is_limited").notNull().default(false),
  availableUntil: timestamp("available_until"),
});

export const userCosmetics = pgTable("user_cosmetics", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  cosmeticId: integer("cosmetic_id").references(() => cosmetics.id).notNull(),
  unlockedAt: timestamp("unlocked_at").notNull().defaultNow(),
  isEquipped: boolean("is_equipped").notNull().default(false),
});

// Power-Ups System
export const powerUpTypes = pgTable("power_up_types", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  effectType: varchar("effect_type", { length: 50 }).notNull(), // 'xp_boost', 'shield', 'focus_mode', 'streak_freeze'
  effectValue: integer("effect_value").notNull(), // multiplier percentage or quantity
  durationMinutes: integer("duration_minutes"), // null for instant effects
  price: integer("price").notNull(), // cost in coins or points
});

export const userPowerUps = pgTable("user_power_ups", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  powerUpTypeId: integer("power_up_type_id").references(() => powerUpTypes.id).notNull(),
  quantity: integer("quantity").notNull().default(1),
  acquiredAt: timestamp("acquired_at").notNull().defaultNow(),
});

export const activePowerUps = pgTable("active_power_ups", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  powerUpTypeId: integer("power_up_type_id").references(() => powerUpTypes.id).notNull(),
  activatedAt: timestamp("activated_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Insert Schemas
export const insertSeasonPassSchema = createInsertSchema(seasonPasses).omit({ id: true } as any);
export const insertBattlePassTierSchema = createInsertSchema(battlePassTiers).omit({ id: true } as any);
export const insertUserSeasonProgressSchema = createInsertSchema(userSeasonProgress).omit({ id: true } as any);
export const insertCosmeticSchema = createInsertSchema(cosmetics).omit({ id: true } as any);
export const insertUserCosmeticSchema = createInsertSchema(userCosmetics).omit({ id: true, unlockedAt: true } as any);
export const insertPowerUpTypeSchema = createInsertSchema(powerUpTypes).omit({ id: true } as any);
export const insertUserPowerUpSchema = createInsertSchema(userPowerUps).omit({ id: true, acquiredAt: true } as any);
export const insertActivePowerUpSchema = createInsertSchema(activePowerUps).omit({ id: true, activatedAt: true } as any);
export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({ updatedAt: true } as any);
export const insertUserComboSchema = createInsertSchema(userCombos).omit({ id: true } as any);

// Type Exports
export type SeasonPass = typeof seasonPasses.$inferSelect;
export type InsertSeasonPass = z.infer<typeof insertSeasonPassSchema>;

export type BattlePassTier = typeof battlePassTiers.$inferSelect;
export type InsertBattlePassTier = z.infer<typeof insertBattlePassTierSchema>;

export type UserSeasonProgress = typeof userSeasonProgress.$inferSelect;
export type InsertUserSeasonProgress = z.infer<typeof insertUserSeasonProgressSchema>;

export type Cosmetic = typeof cosmetics.$inferSelect;
export type InsertCosmetic = z.infer<typeof insertCosmeticSchema>;

export type UserCosmetic = typeof userCosmetics.$inferSelect;
export type InsertUserCosmetic = z.infer<typeof insertUserCosmeticSchema>;

export type PowerUpType = typeof powerUpTypes.$inferSelect;
export type InsertPowerUpType = z.infer<typeof insertPowerUpTypeSchema>;

export type UserPowerUp = typeof userPowerUps.$inferSelect;
export type InsertUserPowerUp = z.infer<typeof insertUserPowerUpSchema>;

export type ActivePowerUp = typeof activePowerUps.$inferSelect;
export type InsertActivePowerUp = z.infer<typeof insertActivePowerUpSchema>;

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

export type UserCombo = typeof userCombos.$inferSelect;
export type InsertUserCombo = z.infer<typeof insertUserComboSchema>;

// ============ MENTOR MANAGEMENT SYSTEM Insert Schemas & Types ============

export const insertMentorSchema = createInsertSchema(mentors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  avgRating: true,
  reviewCount: true,
  totalEarningsCents: true,
  totalSessionsCompleted: true,
} as any);

export const insertMentorAvailabilitySchema = createInsertSchema(mentorAvailability).omit({
  id: true,
  createdAt: true,
} as any);

export const insertMentorBookingSchema = createInsertSchema(mentorBookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
} as any);

export const insertMentorReviewSchema = createInsertSchema(mentorReviews).omit({
  id: true,
  createdAt: true,
} as any);

export const insertMentorPayoutSchema = createInsertSchema(mentorPayouts).omit({
  id: true,
  createdAt: true,
} as any);

export const insertContentAssetSchema = createInsertSchema(contentAssets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
} as any);

export const insertContentVersionSchema = createInsertSchema(contentVersions).omit({
  id: true,
  createdAt: true,
} as any);

export type Mentor = typeof mentors.$inferSelect;
export type InsertMentor = z.infer<typeof insertMentorSchema>;

export type MentorAvailability = typeof mentorAvailability.$inferSelect;
export type InsertMentorAvailability = z.infer<typeof insertMentorAvailabilitySchema>;

export type MentorBooking = typeof mentorBookings.$inferSelect;
export type InsertMentorBooking = z.infer<typeof insertMentorBookingSchema>;

export type MentorReview = typeof mentorReviews.$inferSelect;
export type InsertMentorReview = z.infer<typeof insertMentorReviewSchema>;

export type MentorPayout = typeof mentorPayouts.$inferSelect;
export type InsertMentorPayout = z.infer<typeof insertMentorPayoutSchema>;

export type ContentAsset = typeof contentAssets.$inferSelect;
export type InsertContentAsset = z.infer<typeof insertContentAssetSchema>;

export type ContentVersion = typeof contentVersions.$inferSelect;
export type InsertContentVersion = z.infer<typeof insertContentVersionSchema>;

// ============ COMMUNITY Q&A / DISCUSSIONS ============

export const voteTypeEnum = pgEnum("vote_type", ["up", "down"]);

export const discussions = pgTable("discussions", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").references(() => chapterContent.id),
  topicId: integer("topic_id").references(() => contentTopics.id),
  userId: varchar("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 300 }).notNull(),
  content: text("content").notNull(),
  isPinned: boolean("is_pinned").notNull().default(false),
  isResolved: boolean("is_resolved").notNull().default(false),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const discussionReplies = pgTable("discussion_replies", {
  id: serial("id").primaryKey(),
  discussionId: integer("discussion_id").references(() => discussions.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  isAcceptedAnswer: boolean("is_accepted_answer").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const discussionVotes = pgTable("discussion_votes", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  discussionId: integer("discussion_id").references(() => discussions.id),
  replyId: integer("reply_id").references(() => discussionReplies.id),
  voteType: voteTypeEnum("vote_type").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  uniqueDiscussionVote: uniqueIndex("discussion_votes_user_discussion_idx").on(table.userId, table.discussionId),
  uniqueReplyVote: uniqueIndex("discussion_votes_user_reply_idx").on(table.userId, table.replyId),
}));

export const insertDiscussionSchema = createInsertSchema(discussions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  viewCount: true,
  isPinned: true,
  isResolved: true,
} as any);

export const insertDiscussionReplySchema = createInsertSchema(discussionReplies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isAcceptedAnswer: true,
} as any);

export const insertDiscussionVoteSchema = createInsertSchema(discussionVotes).omit({
  id: true,
  createdAt: true,
} as any);

export type Discussion = typeof discussions.$inferSelect;
export type InsertDiscussion = z.infer<typeof insertDiscussionSchema>;

export type DiscussionReply = typeof discussionReplies.$inferSelect;
export type InsertDiscussionReply = z.infer<typeof insertDiscussionReplySchema>;

export type DiscussionVote = typeof discussionVotes.$inferSelect;
export type InsertDiscussionVote = z.infer<typeof insertDiscussionVoteSchema>;
