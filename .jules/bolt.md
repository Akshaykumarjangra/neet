## 2026-07-08 - O(N²) bottlenecks in Drizzle array mapping
**Learning:** When retrieving arrays of records via Drizzle and merging them using loop operations like `.map` or `for...of`, using `.find()` inside the loop creates an O(N²) performance bottleneck.
**Action:** Pre-compute a `Map` of the retrieved arrays keyed by their ID to change the lookups to O(1) before looping through the dataset.
