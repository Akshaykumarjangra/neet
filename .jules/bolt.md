## 2026-10-27 - [Optimized Thread List Query]
**Learning:** Found an N+1 query vulnerability when enriching chat threads with the latest message. Looping over a set of parent rows to fetch related details can trigger severe latency degradation and scale poorly.
**Action:** Refactored the map and nested query in server/chat-routes.ts into a single batch query using inArray and selectDistinctOn, mapping the values using an O(1) hash map Map object to look up the messages per thread efficiently. This is an optimal pattern for this kind of data fetching.
