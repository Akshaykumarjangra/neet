## 2024-05-18 - Replacing N+1 queries with single batched queries
**Learning:** `storage.ts` often contains helper methods with loops that call other storage methods, resulting in N+1 queries. We can significantly improve the performance of methods like `getUserStats` by resolving the N+1 queries using single batched SQL queries with `innerJoin`.
**Action:** Always inspect loops in database querying logic to see if we can use a single batched query with `innerJoin` instead.
