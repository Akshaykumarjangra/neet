## 2026-10-11 - Replace O(N²) nested array lookup with O(N) Map lookup
**Learning:** In `server/mock-test-routes.ts`, `questionIds.map(id => testQuestions.find(q => q.id === id))` runs in O(N²) time. This occurs when returning an ordered list of questions. For large question lists, this causes significant backend processing delays.
**Action:** Always precompute a `Map` when sorting database records by a list of IDs rather than using `find` inside `map`.
