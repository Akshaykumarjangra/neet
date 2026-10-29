
## 2026-10-28 - [Optimize N+1 Query in Chat Threads]
**Learning:** When fetching the latest associated record for a batch of items in Drizzle ORM (e.g., resolving an N+1 query for latest chat messages), use db.selectDistinctOn([table.foreignKeyId]).from(table).where(inArray(table.foreignKeyId, ids)).orderBy(table.foreignKeyId, desc(table.createdAt)) to perform a single batched query efficiently.
**Action:** Use selectDistinctOn with inArray and Map for O(1) lookup to efficiently batch N+1 queries.
