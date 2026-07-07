## 2024-07-06 - [Fix N+1 Query in `topics/with-counts` and admin `topics` route]
**Learning:** Found N+1 query problem where `questions` are queried inside `topics.map` using `Promise.all`. This causes multiple single queries to fetch question counts or details. It is a well-known anti-pattern affecting backend performance.
**Action:** Replace `Promise.all` with a single grouped database query with aggregation, e.g. using `.leftJoin(questions)` and `groupBy` to get the topics and their question counts in one query. Or optimize other similar `Promise.all` occurrences.
