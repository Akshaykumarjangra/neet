
## 2026-08-21 - [Optimize multiple count queries]
**Learning:** When executing multiple independent Drizzle ORM count queries on the same table with different conditions, batch them into a single query using conditional SQL aggregation (e.g. `SUM(CASE WHEN condition THEN 1 ELSE 0 END)`) to reduce latency and database round-trips.
**Action:** Group these similar count queries into a single query with conditional aggregate functions, and apply `.mapWith(Number)` to properly convert the bigint results to standard JavaScript numbers.
