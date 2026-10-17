
## 2026-10-17 - [Optimize Chat Threads N+1 query]
**Learning:** The chat threads endpoint had an N+1 query issue where it individually fetched the latest message for every thread in a loop, which can severely degrade performance. We can use `selectDistinctOn` with an `inArray` batched query to fix this.
**Action:** Replaced the loop with a single `db.selectDistinctOn([chatMessages.threadId])` batched query and mapped the results for O(1) lookup.
