## 2026-08-17 - [Resolve N+1 Topic Question Counting]
**Learning:** Counting related records by fetching the entire dataset (e.g., storage.getQuestionsByTopic(id)) into memory causes massive latency/memory bottlenecks.
**Action:** When counting related records or aggregating across relationships in Drizzle, always use a batched LEFT JOIN query with GROUP BY and sql<number>`count(...)`.mapWith(Number).
