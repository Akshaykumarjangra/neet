## 2024-03-24 - Array.find() inside maps for merging Drizzle data
**Learning:** Found O(N^2) bottleneck where Drizzle query results are being searched inside a `.map()` using `.find()`. In a full NEET mock test with 200 questions, this causes 40,000 array iterations per request on the critical test load path (`server/mock-test-routes.ts`). The same pattern exists in `server/game-routes.ts`.
**Action:** Use a pre-computed Map for O(1) lookups to reduce operations from O(N*M) to O(N+M) when merging SQL query results with ordered ID arrays.
