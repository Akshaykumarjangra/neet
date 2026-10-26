
## 2023-10-26 - N+1 query optimization using selectDistinctOn and inArray
**Learning:** Found an N+1 query in `server/chat-routes.ts` where we fetched the latest chat message for each chat thread separately inside a `Promise.all` map function. This can cause latency and DB overhead when listing many threads.
**Action:** Replaced the mapped querying with a single batched query using Drizzle ORM's `selectDistinctOn`, querying all thread IDs using `inArray`. Results are mapped back to threads in O(1) time using a JS Map, significantly reducing DB hits.
