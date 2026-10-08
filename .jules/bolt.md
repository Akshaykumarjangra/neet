## 2026-10-07 - Jest + node:test ESM conflict in CI
**Learning:** Jest attempts to parse `node:test` files and throws `SyntaxError: Cannot use import statement outside a module` when running in CI because the project uses `"type": "module"` and lacks a Jest config.
**Action:** Created `jest.config.cjs` to use `ts-jest` with `useESM: true` and added `testPathIgnorePatterns: ['\\.spec\\.ts$']` to exclude `node:test` files from Jest runs.

## 2026-10-07 - N+1 Query in Bulk Upserts
**Learning:** Performing multiple `db.select()` inside a `for...of` loop followed by conditional `db.insert` or `db.update` creates a severe N+1 database roundtrip bottleneck when saving multiple settings in `server/admin-routes.ts` and `server/lms-automation-routes.ts`.
**Action:** Use Drizzle ORM's `onConflictDoUpdate` on bulk insert operations (e.g. `db.insert(...).values(arr).onConflictDoUpdate({ target: ..., set: ... })`) to dramatically reduce database operations from O(N) to O(1) query.
