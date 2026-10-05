## 2024-05-15 - Fixing N+1 Queries in Drizzle ORM
**Learning:** When fetching associated counts in a loop using `Promise.all`, it creates a severe N+1 database bottleneck.
**Action:** Always replace the loop and nested queries with a single batched query using `.leftJoin()` and `.groupBy()`, utilizing `sql<number>\`count(${table.id})\`.mapWith(Number)` to cast bigint results.
