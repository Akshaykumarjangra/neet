## 2024-05-18 - Local test scripts fail due to Postgres timeout
**Learning:** Ad-hoc test scripts using Drizzle ORM fail with "Connection terminated due to connection timeout" in the execution environment since no live local DB instance is configured in the sandbox.
**Action:** Do not rely on ad-hoc scripts to test DB queries locally. Rely on understanding the codebase architecture and SQL patterns instead.
## 2024-05-18 - Batching independent DB aggregations
**Learning:** In Drizzle ORM, running multiple independent count queries on the same table sequentially causes an N+1-like delay. These can be effectively batched using multiple `sql` aggregate expressions in a single `.select()` call.
**Action:** Replace sequential `db.select({ count: ... })` queries targeting the same table (or joining similar data) with a batched query using conditional aggregation or multiple selects. Alternatively, use `Promise.all` to run independent queries concurrently instead of sequentially.
## 2024-05-18 - Replacing memory-based counting with database aggregation
**Learning:** `app.get("/api/topics/with-counts")` pulls ALL questions for every single topic into memory using `storage.getQuestionsByTopic(topic.id)`, maps over the result, and just takes `.length` of the questions array! This is an N+1 query disaster and a memory hog because it queries complete rows of thousands of questions just to get a count.
**Action:** Replace in-memory array mapping for counts with an aggregated DB query using `.leftJoin` and `.groupBy` alongside Drizzle's `sql<number>\`count(...)\``.
