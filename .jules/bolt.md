## 2024-05-30 - O(N^2) Array Find in Loops
**Learning:** In `server/mock-test-routes.ts`, iterating over an array of IDs and using `Array.prototype.find()` on the data array created a classic O(N^2) performance bottleneck, dropping execution time from ~300ms to ~35ms when optimized to O(N) using a `Map`.
**Action:** When merging array results with other lists in loops, pre-compute a `Map` (e.g., `new Map(data.map(item => [item.id, item]))`) for O(1) lookups rather than using nested `Array.find()` to avoid O(N^2) performance bottlenecks.
