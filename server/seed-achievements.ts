import { db } from "./db";
import { achievements } from "@shared/schema";

const achievementData = [
  // Getting Started
  { name: "First Steps", description: "Answer your first question", category: "progress", rarity: "common", xpReward: 50, icon: "BookOpen", requirement: { type: "questions_answered", target: 1 } },
  { name: "Rookie", description: "Answer 10 questions correctly", category: "progress", rarity: "common", xpReward: 100, icon: "Target", requirement: { type: "questions_answered", target: 10 } },
  { name: "Scholar", description: "Answer 50 questions correctly", category: "progress", rarity: "rare", xpReward: 200, icon: "GraduationCap", requirement: { type: "questions_answered", target: 50 } },
  { name: "Expert", description: "Answer 100 questions correctly", category: "progress", rarity: "epic", xpReward: 500, icon: "Award", requirement: { type: "questions_answered", target: 100 } },
  { name: "Master", description: "Answer 500 questions correctly", category: "progress", rarity: "legendary", xpReward: 1000, icon: "Trophy", requirement: { type: "questions_answered", target: 500 } },
  
  // Streaks
  { name: "Streak Starter", description: "Maintain a 3-day study streak", category: "streak", rarity: "common", xpReward: 100, icon: "Flame", requirement: { type: "study_streak", target: 3 } },
  { name: "Consistent Learner", description: "Maintain a 7-day study streak", category: "streak", rarity: "rare", xpReward: 250, icon: "Zap", requirement: { type: "study_streak", target: 7 } },
  { name: "Dedicated Scholar", description: "Maintain a 30-day study streak", category: "streak", rarity: "epic", xpReward: 500, icon: "Star", requirement: { type: "study_streak", target: 30 } },
  { name: "Unstoppable", description: "Maintain a 100-day study streak", category: "streak", rarity: "legendary", xpReward: 1500, icon: "Sparkles", requirement: { type: "study_streak", target: 100 } },
  
  // Accuracy
  { name: "Sharpshooter", description: "Achieve 90% accuracy in 20 questions", category: "accuracy", rarity: "rare", xpReward: 150, icon: "Crosshair", requirement: { type: "accuracy_threshold", target: 90 } },
  { name: "Perfectionist", description: "Answer 10 questions with 100% accuracy", category: "accuracy", rarity: "epic", xpReward: 300, icon: "CheckCircle", requirement: { type: "perfect_score", target: 10 } },
  
  // Combos
  { name: "Hot Streak", description: "Get 5 questions right in a row", category: "combo", rarity: "common", xpReward: 100, icon: "TrendingUp", requirement: { type: "combo_streak", target: 5 } },
  { name: "Unstoppable Force", description: "Get 15 questions right in a row", category: "combo", rarity: "rare", xpReward: 250, icon: "Rocket", requirement: { type: "combo_streak", target: 15 } },
  { name: "Combo Master", description: "Get 25 questions right in a row", category: "combo", rarity: "epic", xpReward: 500, icon: "Crown", requirement: { type: "combo_streak", target: 25 } },
  
  // Subject Mastery
  { name: "Physics Pioneer", description: "Answer 100 Physics questions", category: "subject", rarity: "rare", xpReward: 200, icon: "Atom", requirement: { type: "subject_mastery", subject: "Physics", target: 100 } },
  { name: "Chemistry Champion", description: "Answer 100 Chemistry questions", category: "subject", rarity: "rare", xpReward: 200, icon: "Flask", requirement: { type: "subject_mastery", subject: "Chemistry", target: 100 } },
  { name: "Botany Boss", description: "Answer 100 Botany questions", category: "subject", rarity: "rare", xpReward: 200, icon: "Sprout", requirement: { type: "subject_mastery", subject: "Botany", target: 100 } },
  { name: "Zoology Zealot", description: "Answer 100 Zoology questions", category: "subject", rarity: "rare", xpReward: 200, icon: "Bug", requirement: { type: "subject_mastery", subject: "Zoology", target: 100 } },
  
  // Mock Tests
  { name: "Test Taker", description: "Complete your first mock test", category: "tests", rarity: "common", xpReward: 150, icon: "FileCheck", requirement: { type: "mock_tests_completed", target: 1 } },
  { name: "Practice Pro", description: "Complete 5 mock tests", category: "tests", rarity: "rare", xpReward: 300, icon: "ClipboardCheck", requirement: { type: "mock_tests_completed", target: 5 } },
  { name: "Mock Master", description: "Complete 10 mock tests", category: "tests", rarity: "epic", xpReward: 600, icon: "Award", requirement: { type: "mock_tests_completed", target: 10 } },
  { name: "Test Champion", description: "Score above 80% in a mock test", category: "tests", rarity: "rare", xpReward: 250, icon: "Target", requirement: { type: "mock_test_score", target: 80 } },
  
  // Daily Challenges
  { name: "Challenge Accepted", description: "Complete your first daily challenge", category: "challenges", rarity: "common", xpReward: 100, icon: "Zap", requirement: { type: "daily_challenges_completed", target: 1 } },
  { name: "Challenge Crusher", description: "Complete 10 daily challenges", category: "challenges", rarity: "rare", xpReward: 250, icon: "TrendingUp", requirement: { type: "daily_challenges_completed", target: 10 } },
  { name: "Challenge Master", description: "Complete 50 daily challenges", category: "challenges", rarity: "epic", xpReward: 500, icon: "Trophy", requirement: { type: "daily_challenges_completed", target: 50 } },
  
  // Speed
  { name: "Speed Demon", description: "Answer 50 questions in a single day", category: "speed", rarity: "rare", xpReward: 200, icon: "Zap", requirement: { type: "daily_questions", target: 50 } },
  { name: "Marathon Runner", description: "Study for 2 hours in a single session", category: "speed", rarity: "epic", xpReward: 300, icon: "Clock", requirement: { type: "study_time_session", target: 120 } },
  
  // Levels
  { name: "Level Up!", description: "Reach level 5", category: "level", rarity: "common", xpReward: 100, icon: "TrendingUp", requirement: { type: "level_reached", target: 5 } },
  { name: "Power Player", description: "Reach level 10", category: "level", rarity: "rare", xpReward: 250, icon: "Star", requirement: { type: "level_reached", target: 10 } },
  { name: "Elite Scholar", description: "Reach level 25", category: "level", rarity: "epic", xpReward: 500, icon: "Crown", requirement: { type: "level_reached", target: 25 } },
  { name: "Legend", description: "Reach level 50", category: "level", rarity: "legendary", xpReward: 1000, icon: "Trophy", requirement: { type: "level_reached", target: 50 } },
  
  // Variety
  { name: "Well Rounded", description: "Answer questions from all 4 subjects in one day", category: "variety", rarity: "rare", xpReward: 150, icon: "Grid", requirement: { type: "subject_variety", target: 4 } },
  { name: "Jack of All Trades", description: "Answer 50 questions from each subject", category: "variety", rarity: "epic", xpReward: 400, icon: "Award", requirement: { type: "all_subjects_mastery", target: 50 } },
  
  // Study/LMS - Bookmarks
  { name: "Bookworm", description: "Bookmark your first chapter", category: "study", rarity: "common", xpReward: 50, icon: "Bookmark", requirement: { type: "bookmarks_created", target: 1 } },
  { name: "Organized Scholar", description: "Bookmark 10 chapters", category: "study", rarity: "rare", xpReward: 150, icon: "BookMarked", requirement: { type: "bookmarks_created", target: 10 } },
  { name: "Library Curator", description: "Bookmark 25 chapters", category: "study", rarity: "epic", xpReward: 300, icon: "Library", requirement: { type: "bookmarks_created", target: 25 } },
  
  // Study/LMS - Notes
  { name: "Note Taker", description: "Create your first note", category: "study", rarity: "common", xpReward: 50, icon: "StickyNote", requirement: { type: "notes_created", target: 1 } },
  { name: "Diligent Student", description: "Create notes in 5 different chapters", category: "study", rarity: "rare", xpReward: 200, icon: "NotebookPen", requirement: { type: "chapters_with_notes", target: 5 } },
  { name: "Master Annotator", description: "Create notes in 20 chapters", category: "study", rarity: "epic", xpReward: 400, icon: "NotebookText", requirement: { type: "chapters_with_notes", target: 20 } },
  
  // Study/LMS - Chapter Viewing
  { name: "Knowledge Seeker", description: "View your first chapter", category: "study", rarity: "common", xpReward: 30, icon: "Eye", requirement: { type: "chapters_viewed", target: 1 } },
  { name: "Content Explorer", description: "View 10 different chapters", category: "study", rarity: "rare", xpReward: 150, icon: "Compass", requirement: { type: "chapters_viewed", target: 10 } },
  { name: "Avid Learner", description: "View 25 different chapters", category: "study", rarity: "epic", xpReward: 350, icon: "BookOpen", requirement: { type: "chapters_viewed", target: 25 } },
  
  // Study/LMS - Study Time
  { name: "Time Traveler", description: "Study for 1 hour total", category: "study", rarity: "rare", xpReward: 100, icon: "Clock", requirement: { type: "total_study_time", target: 60 } },
  { name: "Marathon Studier", description: "Study for 10 hours total", category: "study", rarity: "epic", xpReward: 500, icon: "Hourglass", requirement: { type: "total_study_time", target: 600 } },
  { name: "Dedication Incarnate", description: "Study for 50 hours total", category: "study", rarity: "legendary", xpReward: 1500, icon: "Trophy", requirement: { type: "total_study_time", target: 3000 } },
];

async function seedAchievements() {
  console.log("🏆 Seeding achievements...");
  
  // Clear existing achievements
  await db.delete(achievements);
  
  for (const achievement of achievementData) {
    await db.insert(achievements).values({
      name: achievement.name,
      description: achievement.description,
      category: achievement.category,
      rarity: achievement.rarity,
      xpReward: achievement.xpReward,
      icon: achievement.icon,
      unlockCondition: achievement.requirement,
    });
  }
  
  console.log(`✅ Created ${achievementData.length} achievements`);
}

seedAchievements()
  .then(() => {
    console.log("✅ Achievements seeded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error seeding achievements:", error);
    process.exit(1);
  });
