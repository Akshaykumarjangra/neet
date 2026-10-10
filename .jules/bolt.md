## 2026-10-10 - [Fixing O(n²) bottlenecks in Array processing]
**Learning:** Array.prototype.find() within a loop creates an O(N²) bottleneck, particularly detrimental in route handlers querying databases. The pattern was pervasive throughout the codebase.
**Action:** Consistently precompute a Map outside loops (e.g. `new Map(items.map(i => [i.id, i]))`) to achieve O(1) key-based lookups and prevent scaling issues as data sizes grow.
