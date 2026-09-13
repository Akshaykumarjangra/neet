## 2024-05-24 - [Memory Context - N+1 optimization]
**Learning:** This codebase had N+1 database queries when fetching the latest message for multiple chat threads. When fetching the latest associated record for a batch of items in Drizzle ORM, querying in a loop causes significant performance issues.
**Action:** Replace `Promise.all(threads.map(async () => db.select()...))` loop with a single query using `inArray` and `selectDistinctOn` combined with `orderBy`.
