
## 2024-10-24 - Resolving N+1 Queries in Drizzle ORM
**Learning:** Using getTableColumns and GROUP BY is necessary to optimize N+1 queries in Drizzle.
**Action:** Replace Promise.all loops with leftJoin and sql aggregations.
