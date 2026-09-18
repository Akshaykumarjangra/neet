## 2024-05-24 - Initializing Bolt Journal
**Learning:** This journal will capture performance optimizations specific to this codebase's architecture.
**Action:** Always document critical findings here.

## 2024-05-24 - Array.prototype.find() inside Array.prototype.map() causes O(N^2) Time Complexity Bottleneck
**Learning:** Found multiple instances where an array is mapped, and inside the map function, another array is searched using `.find()`. This leads to an O(N^2) time complexity, which could cause a performance bottleneck if the arrays are large.
**Action:** Replace the O(N^2) nested loop with an O(N) hash map (Set/Map) lookup by precomputing the map outside the loop.
