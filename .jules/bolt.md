## 2024-07-08 - Optimize O(N^2) Array Lookups
**Learning:** The codebase frequently uses Array.find() inside loops (O(N^2)) when merging database results (e.g. in game-routes, mock-test-routes).
**Action:** Pre-compute a Map for O(1) lookups before looping over collections to merge data.
