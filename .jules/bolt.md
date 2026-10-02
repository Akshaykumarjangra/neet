## 2024-05-14 - N+1 Query on chat threads
**Learning:** Found an N+1 query pattern where fetching `chatThreads` initiates a database loop `Promise.all(threads.map(async (thread) => ...))` to fetch the `latestMessage` for each thread.
**Action:** Replace the nested queries with a single batched query fetching the latest messages for all threads via `db.selectDistinctOn` and `inArray`, avoiding the N+1 latency bottleneck.
