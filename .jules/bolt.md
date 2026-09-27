## 2024-09-27 - [Resolve N+1 Queries with DistinctOn]
**Learning:** Drizzle ORM combined with PostgreSQL supports `selectDistinctOn` which is perfect for fetching the "latest" related record for a batch of parent records.
**Action:** Next time I encounter a loop that queries a single related record (`.limit(1)`) per item (e.g., getting latest chat message per thread), I will extract the IDs, use `selectDistinctOn([table.foreignKeyId]).from(table).where(inArray(table.foreignKeyId, ids))`, and build a JavaScript `Map` for O(1) in-memory lookups instead of making N round-trip database queries.
