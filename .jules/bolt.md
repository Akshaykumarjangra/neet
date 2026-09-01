## 2023-11-09 - [Optimize chat thread list]
**Learning:** Identifying and fixing an N+1 query problem by replacing `Promise.all` with a single batch fetch using `selectDistinctOn` drastically reduces latency for listing items that need their latest associated record.
**Action:** Always check `map(async)` loops containing database queries and replace them with single batched queries using `inArray` or `selectDistinctOn`.
