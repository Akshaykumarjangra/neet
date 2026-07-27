
## 2024-05-18 - [Optimizing N+1 queries in Drizzle]
**Learning:** When fetching the latest associated record for a batch of items (e.g., resolving an N+1 query for latest chat messages), using `Promise.all` with a `.limit(1)` query per item is inefficient.
**Action:** Use `db.selectDistinctOn([table.foreignKeyId]).from(table).where(inArray(table.foreignKeyId, ids)).orderBy(table.foreignKeyId, desc(table.createdAt))` to perform a single batched query efficiently.
