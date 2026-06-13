## Bolt Journal
## 2024-05-18 - Avoid O(n^2) when finding items in loops/map
**Learning:** Using `Array.find()` inside loops or `Array.map()` causes an O(N^2) complexity which is a performance bottleneck. I saw this in `server/mock-test-routes.ts` and `server/rank-predictor-routes.ts`.
**Action:** When merging database arrays in loops, pre-compute a `Map` (e.g. `new Map(data.map(item => [item.id, item]))`) for O(1) lookups.
