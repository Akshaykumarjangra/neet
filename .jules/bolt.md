## 2024-03-24 - O(n^2) nested loop in array mapping
**Learning:** Found O(N^2) complexity where `.map` is combined with `.find`. This scales poorly for large arrays, like fetching questions for mock tests, leading to performance bottlenecks during array processing.
**Action:** Replaced O(N^2) `.map(id => arr.find(item => item.id === id))` with an O(N) approach using a pre-computed `Map` or `Record`.
