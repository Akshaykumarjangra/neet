## 2024-06-03 - Rank Predictor Map Optimization
**Learning:** Found O(N^2) loops in the `rank-predictor-routes.ts` analysis endpoints where `Array.prototype.find()` was called inside a loop mapping over `responses`. This degrades mock test analysis performance severely due to the high question count per test.
**Action:** When merging Drizzle array results with other lists in loops, pre-compute a `Map` (e.g., `new Map(data.map(item => [item.id, item]))`) for O(1) lookups rather than using nested `Array.find()` to avoid O(N^2) bottlenecks.
