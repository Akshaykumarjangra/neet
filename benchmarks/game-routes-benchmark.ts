import { performance } from 'perf_hooks';

// Simulate the data
const numChallenges = 10000;
const numProgress = 10000;

const challenges = Array.from({ length: numChallenges }, (_, i) => ({
  id: i,
  title: `Challenge ${i}`,
  description: `Description ${i}`,
  targetValue: 100,
  xpReward: 50,
}));

const progress = Array.from({ length: numProgress }, (_, i) => ({
  challengeId: i,
  progress: Math.floor(Math.random() * 100),
  completed: Math.random() > 0.5,
}));

// Function 1: The original way
function originalMerge() {
  return challenges.map(challenge => {
    const userProgress = progress.find(p => p.challengeId === challenge.id);
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      progress: userProgress?.progress || 0,
      target: challenge.targetValue,
      xpReward: challenge.xpReward,
      completed: userProgress?.completed || false,
    };
  });
}

// Function 2: The optimized way
function optimizedMerge() {
  const progressMap = new Map(progress.map(p => [p.challengeId, p]));
  return challenges.map(challenge => {
    const userProgress = progressMap.get(challenge.id);
    return {
      id: challenge.id,
      title: challenge.title,
      description: challenge.description,
      progress: userProgress?.progress || 0,
      target: challenge.targetValue,
      xpReward: challenge.xpReward,
      completed: userProgress?.completed || false,
    };
  });
}

function runBenchmark() {
  console.log('--- Benchmarking Original Merge ---');
  let start = performance.now();
  originalMerge();
  let end = performance.now();
  console.log(`Original Time: ${(end - start).toFixed(2)} ms`);

  console.log('--- Benchmarking Optimized Merge ---');
  start = performance.now();
  optimizedMerge();
  end = performance.now();
  console.log(`Optimized Time: ${(end - start).toFixed(2)} ms`);
}

runBenchmark();
