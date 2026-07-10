## 2024-07-10 - O(N^2) Array.find() in Drizzle Data Merging
**Learning:** Found an O(N^2) bottleneck when mapping ordered arrays of IDs to their Drizzle ORM result objects (e.g., `questionIds.map(id => dbResults.find(q => q.id === id))`). For large datasets like mock tests (100-200 questions), this significantly degrades backend performance.
**Action:** Always pre-compute a `Map` (e.g., `new Map(results.map(item => [item.id, item]))`) for O(1) lookups instead of using nested `Array.find()` when reordering or merging database query results.
