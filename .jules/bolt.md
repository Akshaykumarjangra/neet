## 2025-02-14 - N+1 Query in Chat Threads
**Learning:** Found an N+1 query pattern where the backend iterates over chat threads and fetches the latest message for each one individually in a loop using `Promise.all(threads.map(async ...))`. This is a classic N+1 bottleneck.
**Action:** Replaced the loop with a single batched query using Drizzle's `.selectDistinctOn([chatMessages.threadId])` to fetch all latest messages in one database call, checking for empty array first to avoid `inArray` errors.
