
## $(date +%Y-%m-%d) - Prevent Drizzle ORM N+1 Count Bottlenecks
**Learning:** Found multiple instances where `Promise.all()` was used with sequential `.count()` queries inside mapping loops, or even worse, fetching all rows into memory via `storage.getQuestionsByTopic(id)` just to read `length`. This creates severe N+1 latency issues and explosive memory spikes.
**Action:** Always replace sequential counts in loops with a single DB query using `.leftJoin()` and `.groupBy()` along with `sql<number>\`count(...)\`.mapWith(Number)`. Spread the parent table correctly by using `...getTableColumns(tableName)` instead of `...tableName` to avoid runtime execution errors.
