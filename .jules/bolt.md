## 2024-11-04 - Fix N+1 query in getUserStats
**Learning:** Found a classic N+1 query bottleneck in `getUserStats` inside `server/storage.ts`. The query fetches user performance attempts and then iterates over them, fetching the question and then the topic in separate database roundtrips. In a Node backend communicating with Postgres, this severely impacts performance due to multiple DB roundtrips.
**Action:** Replaced the N+1 loop with a single batched query using `.leftJoin()` to fetch attempt correctness and the associated topic subject in one go, significantly reducing DB hits.
