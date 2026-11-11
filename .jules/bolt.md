## 2024-11-11 - Resolving N+1 Database Query in Drizzle ORM
**Learning:** Resolving N+1 queries by executing `db.select()` inside a loop causes a lot of performance bottlenecks in large datasets. We can use a single batched query with `.leftJoin()` and `.groupBy()` along with `count()` aggregations to significantly reduce database round-trips.
**Action:** When fetching aggregated stats like counts for multiple parent rows, avoid a map-await-query loop. Instead, implement a single joined database query using Drizzle ORM aggregations.
