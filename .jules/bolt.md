
## 2024-05-18 - [Resolve N+1 Query in chat-routes.ts]
**Learning:** When fetching the latest associated record for a batch of items in Drizzle ORM (e.g., resolving an N+1 query for latest chat messages), you can avoid fetching the whole dataset and reading lengths or doing nested `.map(db.select...)` requests by doing one batched query instead.
**Action:** Used `db.selectDistinctOn([table.foreignKeyId]).from(table).where(inArray(table.foreignKeyId, ids)).orderBy(table.foreignKeyId, desc(table.createdAt))` to perform a single batched query efficiently and mapped the result in-memory.
