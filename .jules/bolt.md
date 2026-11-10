## 2026-11-10 - [Resolve N+1 Queries]
**Learning:** Using Promise.all inside a map with single queries to calculate related record counts in Drizzle ORM creates an N+1 query bottleneck.
**Action:** Always use database-level aggregations with .leftJoin() and .groupBy() directly instead.
