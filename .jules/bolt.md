## 2025-05-18 - Playwright Test Failures Unrelated to Changes
**Learning:** Running `npx playwright test` reveals preexisting failures in `example.spec.ts` where string expectations and selectors fail due to application copy matching discrepancies. The changes made today to resolving N+1 backend database queries have no frontend dependency on the broken selectors.
**Action:** Ignore unrelated preexisting test errors when verifying optimizations, as they are outside the scope of fixing backend performance.
