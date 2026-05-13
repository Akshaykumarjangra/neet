// Benchmark to show N+1 query overhead vs pre-fetched
async function mockDbQuery(delayMs: number = 2) {
  return new Promise(resolve => setTimeout(() => resolve([{ count: 10 }]), delayMs));
}

async function nPlusOneBenchmark(numAchievements: number) {
  let unlockCount = 0;
  for (let i = 0; i < numAchievements; i++) {
    // Simulated DB query for each achievement
    const [result] = await mockDbQuery() as any;
    if (result.count >= 5) {
      unlockCount++;
    }
  }
  return unlockCount;
}

async function prefetchBenchmark(numAchievements: number) {
  let unlockCount = 0;
  // Prefetch once
  const [result] = await mockDbQuery() as any;
  const count = result.count;

  for (let i = 0; i < numAchievements; i++) {
    if (count >= 5) {
      unlockCount++;
    }
  }
  return unlockCount;
}

async function run() {
  const numAchievements = 50;

  console.log(`Benchmarking with ${numAchievements} achievements...`);

  const start1 = performance.now();
  await nPlusOneBenchmark(numAchievements);
  const end1 = performance.now();
  console.log(`N+1 approach took: ${(end1 - start1).toFixed(2)} ms`);

  const start2 = performance.now();
  await prefetchBenchmark(numAchievements);
  const end2 = performance.now();
  console.log(`Prefetch approach took: ${(end2 - start2).toFixed(2)} ms`);
}

run();
