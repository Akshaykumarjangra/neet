# Bolt's Journal
## 2026-10-05 - [Optimize N+1 DB Queries via COUNT Aggregation]
**Learning:** Fetching full datasets to calculate lengths/counts (`const items = await db.select().from(table); const total = items.length;`) creates severe memory bottlenecks and slow iterations. Nested queries across attempts multiply this (N+1).
**Action:** Use SQL aggregate functions like `sql<number>\`count(*)\`.mapWith(Number)` alongside `.innerJoin()` and `.groupBy()` for massive performance boosts.
