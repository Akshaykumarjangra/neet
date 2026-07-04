## 2024-07-04 - [Optimize array lookup for mock test questions]
**Learning:** When fetching multiple records via Drizzle ORM using `inArray` and then re-ordering them to match an original array of IDs, utilizing `.find()` inside a `.map()` creates an O(N^2) bottleneck. This is especially noticeable for large data sets like mock tests that contain hundreds of questions.
**Action:** Pre-compute a `Map` of the fetched records (e.g., `new Map(data.map(item => [item.id, item]))`) for O(1) lookups rather than using nested `Array.find()` to avoid O(N^2) performance bottlenecks.
