## 2025-02-12 - Map Lookup Optimization for Array Loops
**Learning:** The server logic for games and mock exams frequently joins nested arrays using `O(N^2)` Array.find loops inside Array.map operations.
**Action:** By initializing a `Map` lookup outside the map loop, you can reduce this algorithm's complexity to `O(N)`. This is a low-risk, simple optimization often found in standard business logic array merging.
