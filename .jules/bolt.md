## 2026-10-03 - O(N²) array lookups with .find
**Learning:** Using Array.prototype.find() inside a loop or Array.prototype.map() scales poorly with large arrays, especially when the outer loop also iterates over a large set, leading to O(N²) time complexity.
**Action:** For frequent ID lookups within loops or map statements, transform the target array into a Map upfront using new Map(array.map(item => [item.id, item])). This pre-computation creates O(1) lookups, yielding significant performance gains (O(N) total) for minimal code complexity increase.
