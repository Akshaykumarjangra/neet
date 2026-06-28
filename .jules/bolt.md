## 2024-05-18 - Replacing O(N^2) Array.find() inside map with O(1) Map lookup
**Learning:** Using `Array.find()` inside a `.map()` or `.forEach()` loop creates an O(N^2) performance bottleneck, especially when correlating database results. In `server/mock-test-routes.ts`, iterating over ~200 questions with `.find()` resulted in ~40,000 checks.
**Action:** Always pre-compute a `Map` (e.g., `new Map(data.map(item => [item.id, item]))`) for O(1) lookups before looping over arrays to correlate data, turning O(N^2) complexity into O(N).
