## 2024-05-24 - N+1 Query in Lifecycle Routes Loop
**Learning:** Found N+1 database queries inside an array loop in the backend routes (e.g., fetching users sequentially after querying for mock exam attempts).
**Action:** Replace nested loops performing individual lookups with `.innerJoin()` or `.leftJoin()` during the initial query to batch database calls and eliminate the N+1 latency bottleneck.
