## 2024-05-24 - O(N^2) Array Lookup Optimization
**Learning:** Found O(N^2) `.find()` operations inside loops specifically when merging database query results back into an ordered list (e.g., `questionIds.map(id => dbResults.find(q => q.id === id))`). This is a common bottleneck when fetching batch data via Drizzle ORM and needing to preserve specific order.
**Action:** Use pre-computed `Map` for O(1) lookups whenever mapping arrays of IDs back to queried entities in API routes, reducing complexity to O(N).
