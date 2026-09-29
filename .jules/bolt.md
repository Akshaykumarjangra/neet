## 2024-09-29 - [O(n²) array lookup in map for mock tests]
**Learning:** Found an O(n²) bottleneck in `server/mock-test-routes.ts` where `questionIds.map(id => testQuestions.find(q => q.id === id))` was used to order test questions. While N is usually small, this is a codebase-specific anti-pattern.
**Action:** Precompute a Map of the items by their key before iterating over the ID list, turning the lookup from O(n) to O(1) and the total time complexity from O(n²) to O(n).
