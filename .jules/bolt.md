## 2026-10-25 - [O(n²) Array .find() in Express Routes]
**Learning:** Identified that nested O(n²) Array .find() lookups within Express loops scaling with request payloads or DB records cause performance bottlenecks.
**Action:** Replaced .find() with O(1) Map precomputation, which provides a fast constant-time lookup. Additionally, always deduplicate arrays and use Drizzle's native inArray helper for safer and faster DB queries.
