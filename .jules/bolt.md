
## $(date +%Y-%m-%d) - Prevent Drizzle ORM N+1 Count Bottlenecks
**Learning:** Found multiple instances where `Promise.all()` was used with sequential `.count()` queries inside mapping loops, or even worse, fetching all rows into memory via `storage.getQuestionsByTopic(id)` just to read `length`. This creates severe N+1 latency issues and explosive memory spikes.
**Action:** Always replace sequential counts in loops with a single DB query using `.leftJoin()` and `.groupBy()` along with `sql<number>\`count(...)\`.mapWith(Number)`. Spread the parent table correctly by using `...getTableColumns(tableName)` instead of `...tableName` to avoid runtime execution errors.

## $(date +%Y-%m-%d) - Jest ESM Syntax Fix
**Learning:** Jest naturally crashes with 'Cannot use import statement outside a module' or 'Unexpected token' when executing tests inside a `"type": "module"` repository without `ts-jest` or proper configuration, causing it to randomly fail when parsing `.spec.ts` files or conflicting with `node:test` syntax.
**Action:** Always provide a basic `jest.config.cjs` using `preset: ts-jest` (or manual transform) and explicitly ignore files authored for `node:test` (`testPathIgnorePatterns`) to prevent CI checks from completely breaking. Use `jest.mock('pg')` and mock `global.setTimeout` to prevent underlying async DB loops from triggering unhandled exit calls.
