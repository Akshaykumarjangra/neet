## 2026-10-07 - N+1 Query in Bulk Upserts
**Learning:** Performing multiple `db.select()` inside a `for...of` loop followed by conditional `db.insert` or `db.update` creates a severe N+1 database roundtrip bottleneck when saving multiple settings in `server/admin-routes.ts` and `server/lms-automation-routes.ts`.
**Action:** Use Drizzle ORM's `onConflictDoUpdate` on bulk insert operations (e.g. `db.insert(...).values(arr).onConflictDoUpdate({ target: ..., set: ... })`) to dramatically reduce database operations from O(N) to O(1) query.
