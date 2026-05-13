import { db } from './server/db';
import { users, achievements, userAchievements, userChapterNotes } from './shared/schema';
import { GamificationService } from './server/gamification';
import { eq } from 'drizzle-orm';

async function runBenchmark() {
  const [user] = await db.insert(users).values({
    name: 'test_bench_user',
    currentLevel: 1,
    totalPoints: 0,
    studyStreak: 0
  }).returning();

  const userId = user.id;

  // Insert some achievements
  const types = [
    'bookmarks_created', 'notes_created', 'chapters_with_notes',
    'chapters_viewed', 'total_study_time', 'questions_solved'
  ];

  for (let i = 0; i < 50; i++) {
    await db.insert(achievements).values({
      name: `Achievement ${i}`,
      description: `Desc ${i}`,
      icon: 'star',
      xpReward: 10,
      unlockCondition: {
        type: types[i % types.length],
        target: i * 10
      }
    });
  }

  console.log("Starting benchmark...");
  const start = performance.now();

  for (let i = 0; i < 10; i++) {
    await GamificationService.checkAchievements(userId);
  }

  const end = performance.now();
  console.log(`Benchmark completed in ${end - start} ms`);

  process.exit(0);
}

runBenchmark().catch(console.error);
