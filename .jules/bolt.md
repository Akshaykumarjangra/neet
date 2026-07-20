## 2025-02-12 - N+1 Query in Lifecycle Triggers
**Learning:** Found an N+1 query pattern where user records were being fetched one by one inside a loop after fetching high scores.
**Action:** Use `.innerJoin()` in Drizzle ORM to fetch related records directly in the initial database query instead of looping over the initial result set and executing independent queries.
