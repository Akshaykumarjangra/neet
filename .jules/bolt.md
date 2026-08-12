## 2024-08-12 - [Batch Drizzle ORM aggregate queries]
**Learning:** Found multiple independent `.select().from(table).where(...)` queries being run to fetch stats for the same table (e.g. flashcard progress stats). This creates N+1 database queries.
**Action:** Always combine independent aggregate counting queries into a single query using conditional aggregates, e.g. `sql<number>\`SUM(CASE WHEN ${condition} THEN 1 ELSE 0 END)\`.mapWith(Number)`.
