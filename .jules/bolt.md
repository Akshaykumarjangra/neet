## 2025-02-12 - [Resolving N+1 Database Query in Drizzle]
**Learning:** Resolving N+1 database queries when querying the latest message for multiple threads drastically improves performance.
**Action:** Replace nested queries and loops (e.g. `Promise.all(threads.map(async ...))`) with a single batched query using `inArray` or `leftJoin`.
