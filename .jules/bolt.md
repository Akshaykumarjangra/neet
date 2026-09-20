## 2024-05-24 - [O(n²) array lookup in mapping]
**Learning:** Using `.find()` inside a `.map()` to order/filter arrays causes O(n²) execution time, which can silently bottleneck backend endpoints (like mock test fetching where N is up to 200 questions, leading to 40,000 iterations).
**Action:** Always precompute a `Map` (hash map) prior to the loop/map to achieve O(1) lookups and O(n) overall time complexity.
