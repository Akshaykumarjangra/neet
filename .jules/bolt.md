## 2024-05-18 - [Optimized N+1 Query in `getUserStats`]
**Learning:** Found an O(N) database query bottleneck in `server/storage.ts` where fetching user stats required executing one query per attempt inside a `for` loop to fetch the associated question and topic data.
**Action:** Replaced the loop with a single batched Drizzle ORM query using `.leftJoin(questions)` and `.leftJoin(contentTopics)`. This resolves the N+1 issue, improving query complexity from O(N) to O(1), drastically reducing latency for user stat loading.
