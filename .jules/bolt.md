## 2024-05-18 - Nested array lookups in route handlers
**Learning:** Found an $O(N^2)$ array search (`array.map(id => items.find(item => item.id === id))`) used to order large sets of database records in `server/mock-test-routes.ts`. With tests potentially having hundreds of questions, this pattern blocks the Node.js event loop synchronously, causing significant CPU overhead on large API payloads.
**Action:** Always pre-compute a `Map` from the fetched items before mapping arrays of IDs to elements, ensuring $O(N)$ sorting and lookup time.
