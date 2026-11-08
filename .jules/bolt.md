## 2026-11-08 - N+1 Query Optimization in Topic Counts
**Learning:** Resolved an N+1 query bottleneck when fetching topics with their question counts. Previously, fetching counts for topics executed a separate count query per topic via `Promise.all(topics.map(...))`. The optimization uses Drizzle ORM's `.leftJoin()` and `.groupBy()` combined with `sql` aggregation to retrieve the topics and counts in a single batched database query.
**Action:** Use a single batched query with `leftJoin` and `groupBy` when fetching parent records with counts of related records.
