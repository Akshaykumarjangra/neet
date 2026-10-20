## 2026-10-20 - Optimize topics endpoint N+1 queries
**Learning:** In `server/admin-content-routes.ts`, the `/topics` endpoint had an N+1 query problem when getting question counts per topic. It performed a `COUNT(*)` query inside a `Promise.all()` map for each topic. Drizzle supports batched aggregations, and replacing the N+1 pattern with a single `.leftJoin` and `.groupBy` reduces round-trips from N+1 to 1.
**Action:** Use a single database call with `.leftJoin` and `.groupBy` to fetch the related counts rather than calling `COUNT(*)` in a loop, reducing query count dramatically.
