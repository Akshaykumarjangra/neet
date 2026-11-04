## 2024-11-03 - Optimize N+1 Query in Topic API
**Learning:** When determining the count of related records in Drizzle ORM, always use database-level aggregations (e.g., `COUNT()` with `.leftJoin()` and `.groupBy()`) rather than fetching entire associated datasets into memory to read their `.length` property, which causes severe memory and latency bottlenecks.
**Action:** Replaced `Promise.all` and `questions.length` mapped approach with a single `.leftJoin(questions).groupBy(contentTopics.id)` batched query using `sql<number>\`count(${questions.id})\`.mapWith(Number)`.
