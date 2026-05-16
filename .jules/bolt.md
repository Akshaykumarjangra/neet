## 2024-05-16 - O(N^2) Array finding in mapping over results
**Learning:** Found an O(N^2) complexity issue where `.map` is used with `.find` directly on a dataset retrieved from Drizzle ORM. As noted in memory, "When merging Drizzle array results with other lists in loops, pre-compute a Map for O(1) lookups rather than using nested Array.find() to avoid O(N^2) performance bottlenecks."
**Action:** Replace nested array `.find()` in map functions with a precomputed Map lookup when dealing with database results to improve performance from O(N^2) to O(N).
