## 2024-03-24 - [Optimize chat thread N+1 query]
**Learning:** Resolving N+1 database queries when fetching the latest chat message for each thread by using Drizzle ORM`s `selectDistinctOn` combined with `inArray` to drastically improve backend execution performance, preventing multiple individual queries.
**Action:** Replace nested queries and `Promise.all` inside loops with a single batched query using `selectDistinctOn`, and precompute a Map for O(1) key-based lookups.
