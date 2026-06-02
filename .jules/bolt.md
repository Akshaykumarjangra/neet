## 2024-11-20 - Map Lookups over Array.find in Loops
**Learning:** In Drizzle ORM workflows where data arrays from the database are combined in memory inside a `.map` or `for...of` loop, using `Array.prototype.find()` creates hidden O(N²) bottlenecks that cripple performance on larger sets (like mock exam responses or user achievements).
**Action:** When merging arrays by an ID, ALWAYS pre-compute a lookup Map (`new Map(data.map(item => [item.id, item]))`) before the loop to reduce lookup complexity to O(1) and overall processing to O(N).
