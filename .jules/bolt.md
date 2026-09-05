## 2024-09-04 - Initial Bolt Journal
**Learning:** Initializing journal for critical codebase-specific learnings.
**Action:** Use this to document performance patterns and anti-patterns.

## 2024-09-04 - Map-Find O(N²) Bottlenecks
**Learning:** O(N²) bottlenecks frequently occur in backend API routes (e.g. `mock-test-routes.ts`, `game-routes.ts`, `rank-predictor-routes.ts`) due to iterating over arrays and using `.find()` inside the map loop.
**Action:** Replace `array.find()` inside maps loops with O(1) hash map lookups.
