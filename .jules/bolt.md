## 2026-08-28 - [Performance: Resolving N+1 query in chat threads]
**Learning:** Avoid using Promise.all(.map()) with database queries inside when fetching related data. This leads to an N+1 query pattern where the number of queries scales linearly with the number of parent records, causing severe latency scaling and draining database connections.
**Action:** Use batching and Drizzle's inArray operator along with selectDistinctOn (for fetching the 'latest' or 'first' associated item) to reduce database queries to a single call and O(1) loop lookups.
