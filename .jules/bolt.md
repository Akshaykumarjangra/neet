## 2024-07-24 - Batching independent count queries
**Learning:** Found multiple independent `count(*)` and `GROUP BY` count queries on the `questions` table in the `/api/questions/stats` endpoint. Executing them sequentially adds unnecessary database round-trips.
**Action:** Use SQL conditional aggregation (`SUM(CASE WHEN ... THEN 1 ELSE 0 END)`) combined with `.mapWith(Number)` to combine these into a single query and significantly reduce latency.
