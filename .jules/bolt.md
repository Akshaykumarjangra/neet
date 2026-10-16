
## 2026-10-16 - [N+1 query in topic counts]
**Learning:** Found N+1 query pattern where the system fetched all topics, and then in a loop fetched all questions for each topic to count them, causing large memory footprint and database roundtrips.
**Action:** Use Drizzle ORM to perform a single aggregate query with leftJoin and groupBy, reducing latency and database load.

## 2026-10-16 - [Jest CI Fix]
**Learning:** In this project, `.spec.ts` files are exclusively for the native `node:test` runner, and E2E tests belong to Playwright.
**Action:** Created `jest.config.cjs` to ignore `\.spec\.ts` and `/tests/e2e/` so Jest doesn't try to parse them and fail with SyntaxErrors.
