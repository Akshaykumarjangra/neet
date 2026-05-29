## 2024-05-18 - Avoid O(N*M) nested array lookups
**Learning:** Using `.find()` inside a `.map()` block to merge two arrays by ID (e.g., getting user progress for challenges) creates an O(N*M) loop which scales poorly as the table sizes grow. Instead, build a Map for O(1) lookups, changing complexity to O(N+M).
**Action:** Always pre-compute a `Map` or an indexed object when looking up array elements inside a loop mapping over another array.
