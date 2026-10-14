
## 2026-10-13 - [N+1 Query Bottleneck in Analytics]
**Learning:** The database fetching logic in `DbStorage.getUserStats` used a classic N+1 loop (1 fetch for user attempts, and 2 queries for each attempt for its question and topic), which slows down the API response linearly with user activity.
**Action:** Replaced the loop with a single `innerJoin` in Drizzle ORM to pre-join the `contentTopics` subject directly with the `userPerformance` data in an O(1) database call.
