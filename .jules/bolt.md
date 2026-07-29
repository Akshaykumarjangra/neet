## 2024-07-28 - N+1 Query Anti-Pattern in Promise.all Map
**Learning:** Found an N+1 query bottleneck in `server/chat-routes.ts` where latest chat messages were being fetched individually inside a `Promise.all(threads.map(...))` loop, causing excessive database round-trips.
**Action:** Always batch related record queries using `db.selectDistinctOn` combined with `inArray` to fetch the latest associated records in a single round-trip, guarding with an array length check before querying.
