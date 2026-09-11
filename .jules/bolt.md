## 2024-09-11 - [Resolving N+1 database queries in Drizzle ORM]
**Learning:** When calculating stats that require joining tables (like getting subject stats for user performance), performing single queries in a loop (e.g., getting question and topic for each attempt) creates an N+1 query problem which severely degrades performance.
**Action:** Replace the loop and individual `getQuestionById` and `db.select()` calls with a single database query using `.leftJoin()` or `.innerJoin()` to aggregate all required data at the database level.
