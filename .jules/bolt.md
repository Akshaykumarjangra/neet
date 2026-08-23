## 2024-03-24 - Resolve loop-based N+1 Queries with sql aggregations and innerJoins
**Learning:** Fetching data inside loops creates N+1 query bottlenecks that can dramatically reduce efficiency. Using SQL aggregations with joins resolves this O(n) problem entirely in Drizzle ORM.
**Action:** Instead of fetching associated data row-by-row in a map/for-loop, pre-aggregate by combining `sql<number>\`sum...\`` or `count` along with `.innerJoin()` and `.groupBy()`.
