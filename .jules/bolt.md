## 2024-09-27 - [Resolve N+1 Queries with DistinctOn]
**Learning:** Drizzle ORM combined with PostgreSQL supports `selectDistinctOn` which is perfect for fetching the "latest" related record for a batch of parent records.
**Action:** Next time I encounter a loop that queries a single related record (`.limit(1)`) per item (e.g., getting latest chat message per thread), I will extract the IDs, use `selectDistinctOn([table.foreignKeyId]).from(table).where(inArray(table.foreignKeyId, ids))`, and build a JavaScript `Map` for O(1) in-memory lookups instead of making N round-trip database queries.

## 2024-09-27 - [Jest + ES Modules parse error]
**Learning:** Jest can throw `SyntaxError: Cannot use import statement outside a module` on ESM `node:test` specification files when running natively in CI if `jest.config.cjs` is missing the `extensionsToTreatAsEsm` configurations and `ts-jest` preset.
**Action:** When working in mixed `jest`/`node:test` codebases utilizing type module, I'll ensure `jest.config.cjs` maps correct module aliases, configures `ts-jest` for ESM transformation (`useESM: true`), and ignores `.spec.ts` files meant for `node:test` to prevent parse failures during CI runs.
