## 2026-11-05 - [Database vs Memory Filtering]
**Learning:** Loading entire large tables (like 'questions') into memory just to filter or count rows leads to severe memory bottlenecks (OOM) and latency.
**Action:** Always use database-level aggregates (`count(*)`) and targeted SQL `WHERE` clauses (e.g., using `LIKE`) to filter and count subsets of data instead of JS array methods on full table scans.
