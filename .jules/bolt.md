## 2024-05-18 - Fix N+1 in getUserStats
**Learning:** `server/storage.ts` has a severe N+1 problem in `getUserStats` calculating user subject stats by fetching questions and topics one by one in a loop over attempts.
**Action:** Replace the loop with a single query using `inArray` or `leftJoin` to batch fetch related data for all attempts.
