## 2026-08-25 - Optimize getUserStats N+1 Queries
**Learning:** In `server/storage.ts`, the `getUserStats` method executed a database query for `questions` and `contentTopics` inside a `for...of` loop iterating over user attempts, which is an N+1 query problem that severely degrades backend performance.
**Action:** Replaced the `for...of` loop and nested queries with a single batched Drizzle ORM query using `.innerJoin()` and `sql` aggregations grouped by `contentTopics.subject`.
