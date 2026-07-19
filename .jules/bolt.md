## 2025-02-17 - N+1 Query in getUserStats
**Learning:** Found a severe N+1 query loop in `server/storage.ts` inside `getUserStats`. The method originally executed a `.select()` query for `contentTopics` individually inside a `for...of` loop over all user attempts.
**Action:** Replaced the loop with a single batched `.leftJoin` query that joins `userPerformance`, `questions`, and `contentTopics`, preventing the database from processing O(N) queries for a highly requested stats route.
