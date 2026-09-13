
## 2025-05-24 - N+1 Query in user stats
**Learning:** The `getUserStats` function had a severe N+1 query problem, fetching the question and topic for every single attempt in a loop. Drizzle ORM's `.leftJoin()` allows fetching related data in a single batched query, dramatically reducing database round-trips.
**Action:** When aggregating data that requires related table information, always use JOINs instead of nested loop queries.
