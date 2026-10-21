## 2026-10-21 - [N+1 Optimization in Chat Routes]
**Learning:** In Drizzle ORM, N+1 queries can be elegantly batched using selectDistinctOn along with inArray to fetch the latest related record for a list of parent entities.
**Action:** Use this pattern to replace mapping over parent entities and querying related entities one by one.
