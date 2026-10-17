## 2026-10-17 - [O(N²) bottleneck in test reconstruction]
**Learning:** Found O(N²) iteration caused by nested `Array.find()` inside `Array.map()` when merging test questions with IDs in mock tests, causing CPU and latency issues for large tests.
**Action:** Replaced `find()` lookup inside `map()` with an O(1) precomputed `Map` of records by ID.
