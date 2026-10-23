## 2026-10-22 - [O(n^2) Nested Array Lookups]
**Learning:** Found multiple instances where `.find()` is used inside `.map()` to correlate records from the database in `server/game-routes.ts`, causing O(N²) time complexity bottlenecks during data serialization.
**Action:** Precompute a `Map` outside the loop to perform O(1) key-based lookups, reducing the time complexity to O(N).
