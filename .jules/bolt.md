
## 2026-06-19 - [O(N^2) `.find()` in arrays to O(N) `Map` lookups]
**Learning:** When batching queries in Drizzle ORM and then manually ordering or merging the results with an existing array of IDs, using `.find()` inside a `.map()` creates an O(N^2) operation. For a mock test with 200 questions, this means 40,000 operations.
**Action:** Always pre-compute a `Map` of the query results for O(1) lookups before iterating over the ID array to maintain O(N) performance. This is especially crucial for APIs serving large datasets like mock tests.
