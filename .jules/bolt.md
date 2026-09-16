## 2026-09-16 - [Optimize Array Lookups in Loops]
**Learning:** O(N^2) time complexity bottlenecks caused by nested array lookups (e.g. `Array.prototype.find()` inside a loop or `.map()`) can cause severe latency bottlenecks.
**Action:** Precompute a `Map` outside the loop to perform O(1) key-based lookups and improve performance.
