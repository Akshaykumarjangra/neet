
## 2024-08-08 - [Resolve N+1 Queries with Database Count Aggregations]
**Learning:** When fetching records alongside a count of related records (e.g. topics and their question counts), using a loop over records and executing `getQuestionsByTopic` for each leads to a severe N+1 problem, causing latency and memory bottlenecks.
**Action:** Replace the nested loop with a single query using `.leftJoin()` and `.groupBy()` along with `sql<number>\`COUNT(${table.field})\`.mapWith(Number)`. Use `...getTableColumns(tableName)` instead of `...tableName` to avoid runtime errors when selecting all columns with custom SQL aggregations.
