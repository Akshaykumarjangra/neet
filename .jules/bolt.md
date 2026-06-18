## 2026-06-03 - O(N²) .find() inside Array.map() Refactoring
**Learning:** Found several places where .map() iterates over an array and performs an Array.find() on another array, resulting in O(N²) time complexity. This pattern is common when merging results from two database queries.
**Action:** When merging arrays from database results, pre-compute a `Map` of the secondary array based on the join key using `new Map(array.map(item => [item.id, item]))`, then use `map.get(key)` inside the `.map()` loop for O(N) performance.
