## 2024-07-23 - Database query optimization
**Learning:** Promise.all N+1 issues can be efficiently replaced with a single SQL \`.leftJoin\` and \`.groupBy\`.
**Action:** Always verify if a map loop invoking database queries can be transformed into a batched query.
