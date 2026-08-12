## 2026-08-12 - Concurrent Dashboard Queries
**Learning:** Sequential database queries on dashboard routes cause high latency due to additive round-trips. Drizzle ORM supports batching/concurrency for independent selects.
**Action:** Always wrap independent dashboard statistic queries in Promise.all to fetch data concurrently.
