## 2026-08-16 - [Resolve N+1 query in server/routes.ts]
**Learning:** Detected an N+1 query vulnerability when fetching /api/topics/with-counts in `server/routes.ts`. The existing codebase fetches all topics then loops and fetches all questions for each topic, which creates a huge bottleneck on larger datasets.
**Action:** Add a batched query method `getTopicsWithQuestionCounts` in `server/storage.ts` (and its interface) utilizing Drizzle ORM's `leftJoin` and `groupBy` alongside SQL aggregate functions for batching, and use it in `server/routes.ts` to completely eliminate the N+1 problem.
