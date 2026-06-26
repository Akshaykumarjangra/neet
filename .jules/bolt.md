
## 2024-05-18 - [Optimize Nested Array.find() Performance Bottleneck]
**Learning:** Found instances where `.map()` arrays were querying inner structures with `.find()`, reducing performance from O(N) to O(N^2). This is especially costly on large inputs such as returning mock-test questions.
**Action:** Always pre-compute a dictionary using `new Map()` prior to `.map()` iterations when querying elements by ID to preserve O(1) lookups.
