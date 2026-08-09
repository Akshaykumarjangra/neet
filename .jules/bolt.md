
## 2024-05-18 - [Optimizing Drizzle ORM N+1 Queries with selectDistinctOn]
**Learning:** Using map with Promise.all and standard select statements to fetch latest associated records for multiple parent rows leads to N+1 performance bottlenecks.
**Action:** Always extract distinct parent IDs and batch query associated records using `db.selectDistinctOn([table.foreignKeyId])` combined with `.where(inArray(table.foreignKeyId, ids))` and `.orderBy(table.foreignKeyId, desc(table.createdAt))`. Reconstruct the relation mapping efficiently in memory.
