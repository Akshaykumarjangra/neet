import { db } from "./db";
import { dailyChallenges } from "@shared/schema";

const challengeTemplates = [
  // General Study Challenges
  { title: "Question Marathon", description: "Answer 20 questions correctly", targetType: "questions_answered", targetValue: 20, xpReward: 100, subject: null },
  { title: "Streak Master", description: "Maintain your study streak for 5 days", targetType: "streak_days", targetValue: 5, xpReward: 150, subject: null },
  { title: "Accuracy Expert", description: "Achieve 80% accuracy in 15 questions", targetType: "accuracy_threshold", targetValue: 80, xpReward: 120, subject: null },
  { title: "Speed Demon", description: "Answer 30 questions in a single session", targetType: "questions_answered", targetValue: 30, xpReward: 150, subject: null },
  { title: "Combo Crusher", description: "Build a 10-question correct streak", targetType: "combo_streak", targetValue: 10, xpReward: 200, subject: null },
  
  // Physics Challenges
  { title: "Physics Prodigy", description: "Master 15 Physics questions", targetType: "subject_questions", targetValue: 15, xpReward: 100, subject: "Physics" },
  { title: "Mechanics Mastery", description: "Answer 10 Physics questions with 90% accuracy", targetType: "subject_accuracy", targetValue: 90, subject: "Physics" },
  
  // Chemistry Challenges
  { title: "Chemistry Champion", description: "Complete 15 Chemistry questions", targetType: "subject_questions", targetValue: 15, xpReward: 100, subject: "Chemistry" },
  { title: "Organic Expert", description: "Solve 10 Chemistry questions correctly in a row", targetType: "subject_combo", targetValue: 10, xpReward: 150, subject: "Chemistry" },
  
  // Biology Challenges
  { title: "Botany Buff", description: "Answer 12 Botany questions correctly", targetType: "subject_questions", targetValue: 12, xpReward: 100, subject: "Botany" },
  { title: "Zoology Zealot", description: "Complete 12 Zoology questions", targetType: "subject_questions", targetValue: 12, xpReward: 100, subject: "Zoology" },
  { title: "Biology Beast", description: "Achieve 85% accuracy in 20 Biology questions", targetType: "subject_accuracy", targetValue: 85, xpReward: 150, subject: "Biology" },
  
  // Difficulty Challenges
  { title: "Hard Mode Hero", description: "Solve 5 difficult questions correctly", targetType: "difficulty_clear", targetValue: 5, xpReward: 180, subject: null },
  { title: "Mixed Mastery", description: "Answer questions from all 4 subjects", targetType: "subject_variety", targetValue: 4, xpReward: 120, subject: null },
];

async function seedDailyChallenges() {
  console.log("🎯 Seeding daily challenges...");
  
  // Clear existing challenges
  await db.delete(dailyChallenges);
  
  // Create 14 days of challenges starting today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let day = 0; day < 14; day++) {
    const challengeDate = new Date(today);
    challengeDate.setDate(today.getDate() + day);
    
    // Select 3-4 random challenges for each day
    const numChallenges = 3 + Math.floor(Math.random() * 2);
    const shuffled = [...challengeTemplates].sort(() => Math.random() - 0.5);
    const dailySet = shuffled.slice(0, numChallenges);
    
    for (const template of dailySet) {
      await db.insert(dailyChallenges).values({
        challengeDate,
        title: template.title,
        description: template.description,
        targetType: template.targetType,
        targetValue: template.targetValue,
        xpReward: template.xpReward,
        subject: template.subject,
      });
    }
  }
  
  console.log(`✅ Created 14 days of daily challenges`);
}

seedDailyChallenges()
  .then(() => {
    console.log("✅ Daily challenges seeded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error seeding daily challenges:", error);
    process.exit(1);
  });
