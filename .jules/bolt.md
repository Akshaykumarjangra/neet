## 2024-06-05 - Optimize O(N^2) lookups with Maps
**Learning:** Found O(N^2) nested loop array lookups (`.find()` inside `.map()` or `for` loops) in backend routes.
**Action:** Replace `Array.find` inside loops with O(1) `Map` lookups for performance optimization, especially in data merging logic.
