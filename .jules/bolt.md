## 2024-06-08 - O(N^2) Array lookups in backend loops
**Learning:** Performing nested `Array.find()` lookups on unindexed database arrays within request response mapping functions can create O(N^2) bottlenecks when iterating through sets.
**Action:** Pre-compute a `Map` structure upfront for O(1) constant-time lookups to improve looping algorithm efficiency from O(N^2) to O(N).
