## 2026-05-28 - Pre-compute Maps for Array Merging
**Learning:** When merging Drizzle ORM array results with other arrays (e.g. mapping achievements with user status), using nested `Array.prototype.find` inside a loop creates an O(N^2) bottleneck, which is particularly impactful on larger datasets.
**Action:** Always pre-compute a `Map` lookup for the inner array (e.g., `const map = new Map(data.map(item => [item.id, item]))`) to achieve O(N) performance when combining dataset arrays.
