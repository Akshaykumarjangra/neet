## 2024-10-30 - O(N²) array lookups in merge operations
**Learning:** Using `Array.prototype.find()` inside a `.map()` loop creates an O(N²) time complexity bottleneck, especially noticeable when merging user progress with large datasets like challenges or achievements.
**Action:** Precompute a `Map` outside the loop (e.g., `new Map(items.map(i => [i.id, i]))`) to perform O(1) key-based lookups, reducing overall complexity to O(N).
