## 2026-07-19 - N+1 Query Fix for Flashcard Stats
**Learning:** Found an N+1 query issue in `server/lms-learning-routes.ts` where fetching flashcard statistics for a user executes 4 independent database queries (due today, learned, reviewed today, total) instead of batching them using aggregate functions in a single query.
**Action:** Consolidate multiple independent queries for the same table into a single query using `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` or `count() filter (where ...)` to avoid N+1 query issues and reduce database load and latency.
