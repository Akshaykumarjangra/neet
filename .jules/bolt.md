## 2026-05-23 - Optimize O(N²) array lookups in loop
**Learning:** Found O(N*M) complexity in `server/mock-test-routes.ts` and `server/rank-predictor-routes.ts` where `Array.prototype.find()` was executed within iterative functions (`.map()` and `for...of`). Although the inputs are moderately sized right now, this logic grows quadratically.
**Action:** Use a precomputed `Map` lookup (`new Map(data.map(q => [q.id, q]))`) to change the complexity from O(N²) to O(N), which drastically improves loop speed on larger inputs while keeping logic 100% identical.
