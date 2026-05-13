// Benchmark simulation for N+1 query overhead vs pre-fetched
// This creates a realistic simulation of the database calls for 50 achievements

async function mockDbQuery(delayMs: number = 2) {
  return new Promise(resolve => setTimeout(() => resolve([{ count: 10, totalMinutes: 120, maxScore: 85 }]), delayMs));
}

async function nPlusOneBenchmark(numAchievements: number) {
  let unlockCount = 0;
  for (let i = 0; i < numAchievements; i++) {
    // Simulated DB query for each achievement (different types, but taking approx same time)
    const [result] = await mockDbQuery() as any;
    if (result.count >= 5 || result.totalMinutes >= 60 || result.maxScore >= 50) {
      unlockCount++;
    }
  }
  return unlockCount;
}

async function prefetchBenchmark(numAchievements: number) {
  let unlockCount = 0;

  // Simulated pre-fetch (could take slightly longer if joining, but let's assume 3 queries or grouped)
  const [stats] = await mockDbQuery(6) as any;

  for (let i = 0; i < numAchievements; i++) {
    if (stats.count >= 5 || stats.totalMinutes >= 60 || stats.maxScore >= 50) {
      unlockCount++;
    }
  }
  return unlockCount;
}

async function run() {
  const numAchievements = 50;

  console.log(`Benchmarking gamification achievements with ${numAchievements} elements...`);

  const start1 = performance.now();
  await nPlusOneBenchmark(numAchievements);
  const end1 = performance.now();
  const time1 = (end1 - start1).toFixed(2);
  console.log(`Baseline (N+1 approach) took: ${time1} ms`);

  const start2 = performance.now();
  await prefetchBenchmark(numAchievements);
  const end2 = performance.now();
  const time2 = (end2 - start2).toFixed(2);
  console.log(`Optimized (Prefetch approach) took: ${time2} ms`);

  const improvement = ((parseFloat(time1) - parseFloat(time2)) / parseFloat(time1) * 100).toFixed(2);
  console.log(`Performance Improvement: ${improvement}%`);
}

run();
