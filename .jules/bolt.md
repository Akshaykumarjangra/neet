
## 2026-07-09 - Replace nested Array.find() with Map lookups to eliminate O(N²) bottlenecks
**Learning:** When merging Drizzle array results with other lists in loops, using nested `Array.find()` causes O(N²) performance bottlenecks. This is especially impactful in routes like mock test generation or ranking where array lengths can easily reach 100-200+ elements.
**Action:** Always pre-compute a `Map` (e.g., `new Map(data.map(item => [item.id, item]))`) for O(1) lookups before looping over the other list to combine results.
