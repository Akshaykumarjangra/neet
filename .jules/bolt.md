
## 2026-10-16 - [N+1 query in topic counts]
**Learning:** Found N+1 query pattern where the system fetched all topics, and then in a loop fetched all questions for each topic to count them, causing large memory footprint and database roundtrips.
**Action:** Use Drizzle ORM to perform a single aggregate query with leftJoin and groupBy, reducing latency and database load.
