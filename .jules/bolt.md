
## 2026-10-10 - Resolving N+1 for latest associated records
**Learning:** Fetching the latest associated record for a batch of items using Promise.all in a loop creates significant N+1 database round-trip overhead.
**Action:** Use db.selectDistinctOn([foreignKey]) with inArray() to batch the query, and map the results in memory.
