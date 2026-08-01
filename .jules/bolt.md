## 2024-08-01 - [Resolve N+1 Chat Message Queries]
**Learning:** Drizzle ORM N+1 queries fetching the latest chat messages can cause significant bottlenecks in route endpoints.
**Action:** Use `.selectDistinctOn([table.foreignKeyId])` combined with `inArray` to batch fetch the most recent associated record per primary entity in a single query.
