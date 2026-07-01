## 2024-07-01 - N+1 Query in Admin Content Routes
**Learning:** Found N+1 queries using Promise.all and map that issue a count query for each individual topic or deck in `server/admin-content-routes.ts`. This leads to multiple database hits scaling with the number of rows.
**Action:** Replace `Promise.all` with a single grouped query utilizing `LEFT JOIN` and `COUNT()` with `GROUP BY` to retrieve results in O(1) database queries.
