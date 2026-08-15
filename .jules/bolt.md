## 2026-08-14 - [Resolve N+1 query in chat threads]
**Learning:** In Drizzle ORM, fetching latest associated records inside a loop leads to N+1 queries. The most efficient batched alternative is using `.selectDistinctOn([foreignKey])` combined with `inArray(foreignKey, ids)` and `orderBy(foreignKey, desc(date))`.
**Action:** Always batch related record queries for lists using `inArray` and map them in memory instead of executing queries in `Promise.all()` loops.
