## 2024-05-18 - Local test scripts fail due to Postgres timeout
**Learning:** Ad-hoc test scripts using Drizzle ORM fail with "Connection terminated due to connection timeout" in the execution environment since no live local DB instance is configured in the sandbox.
**Action:** Do not rely on ad-hoc scripts to test DB queries locally. Rely on understanding the codebase architecture and SQL patterns instead.
## 2024-05-18 - Batching independent DB aggregations
**Learning:** In Drizzle ORM, running multiple independent count queries on the same table sequentially causes an N+1-like delay. These can be effectively batched using multiple `sql` aggregate expressions in a single `.select()` call.
**Action:** Replace sequential `db.select({ count: ... })` queries targeting the same table (or joining similar data) with a batched query using conditional aggregation or multiple selects. Alternatively, use `Promise.all` to run independent queries concurrently instead of sequentially.
## 2024-05-18 - Replacing memory-based counting with database aggregation
**Learning:** `app.get("/api/topics/with-counts")` pulls ALL questions for every single topic into memory using `storage.getQuestionsByTopic(topic.id)`, maps over the result, and just takes `.length` of the questions array! This is an N+1 query disaster and a memory hog because it queries complete rows of thousands of questions just to get a count.
**Action:** Replace in-memory array mapping for counts with an aggregated DB query using `.leftJoin` and `.groupBy` alongside Drizzle's `sql<number>\`count(...)\``.
## 2024-05-18 - CI Failures (Playwright and Jest)
**Learning:** The GitHub Actions CI run failed due to three separate issues:
1.  Playwright tests in `tests/e2e/example.spec.ts` have overly strict, hardcoded assertions for the page title (`/NEET Prep/`) and the Pricing page header (`h1, h2` with text "Pricing"), which do not match the current frontend implementation (`NEET 2026 Preparation — AI-Powered Learning Platform | ZERO AI` and `Choose Your Plan`).
2.  Playwright assertions should use `data-testid` where available (like `data-testid="text-pricing-title"` for pricing) or use `.or()` to gracefully fallback to robust locators, as per the repository's rules.
3.  Jest tests run on `server/mentor-booking-utils.spec.ts`, `client/src/components/mentors/bookingUtils.spec.ts`, `server/mock-exam-scoring.spec.ts`, `tests/e2e/example.spec.ts`, `server/mock-exam-flow.spec.ts`, and `server/telemetry-routes.spec.ts` failed with `SyntaxError: Cannot use import statement outside a module` and babel compilation errors. This indicates that `jest.config.cjs` (or `ts-jest` mapping) is misconfigured or unable to parse native Node.js ESM specification files (which shouldn't be run by Jest in the first place).
**Action:**
1. Fix the Playwright test assertions in `tests/e2e/example.spec.ts` to match the actual page titles and use `data-testid`.
2. Fix the Jest configuration or exclude `node:test` specification files from the Jest run.
