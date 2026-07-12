## 2024-05-24 - Optimize O(N²) Array Lookups to O(1) Map Lookups
**Learning:** When merging Drizzle array results with other lists in loops, pre-compute a `Map` (e.g., `new Map(data.map(item => [item.id, item]))`) for O(1) lookups rather than using nested `Array.find()` to avoid O(N^2) performance bottlenecks.
**Action:** Always prefer `Map` for cross-referencing arrays instead of `Array.find` inside loops or `.map()` blocks.
