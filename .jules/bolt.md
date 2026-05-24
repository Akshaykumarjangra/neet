## 2024-05-24 - Array.find() inside Array.map()
**Learning:** Using `Array.prototype.find()` inside `Array.prototype.map()` scales quadratically, O(N^2), causing hidden performance bottlenecks especially in backend routes like `mock-test-routes.ts` where we fetch standard exams with potentially hundreds of questions.
**Action:** Always refactor sequential loop lookups to use a constant time `Map` for O(1) performance lookup inside loops. For array iteration, this brings the complexity down to O(N).
