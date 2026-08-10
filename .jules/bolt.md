
## 2024-05-18 - [Optimizing Drizzle ORM N+1 Queries with selectDistinctOn]
**Learning:** Using map with Promise.all and standard select statements to fetch latest associated records for multiple parent rows leads to N+1 performance bottlenecks.
**Action:** Always extract distinct parent IDs and batch query associated records using `db.selectDistinctOn([table.foreignKeyId])` combined with `.where(inArray(table.foreignKeyId, ids))` and `.orderBy(table.foreignKeyId, desc(table.createdAt))`. Reconstruct the relation mapping efficiently in memory.

## 2024-05-18 - [Brittle E2E Test Selectors]
**Learning:** Writing Playwright E2E assertions against specific UI copy strings (e.g., `getByText('Master NEET with AI')`) causes tests to break whenever marketing copy is updated.
**Action:** When writing Playwright E2E test assertions for the frontend UI, prefer using `page.getByTestId()` with existing `data-testid` attributes (e.g., `text-hero-headline`, `text-pricing-title`) over brittle text-based selectors like `getByText()` to avoid test failures caused by minor copy changes.
