## 2024-10-26 - N+1 Queries in Chat Threads
**Learning:** Found an N+1 database bottleneck when fetching the latest message for a batch of chat threads. Executing individual queries per thread in a loop scales poorly and introduces significant latency.
**Action:** Replaced the mapped individual queries with a single batched query using Drizzle ORM's `selectDistinctOn` and `inArray` methods. By precomputing a Map from the batched results, we achieve O(1) in-memory lookups instead of O(N) database round-trips.
