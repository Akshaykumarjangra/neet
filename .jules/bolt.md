## 2025-02-23 - [N+1 Backend optimization for chat threads]
**Learning:** There was an N+1 database query problem when listing chat threads. For each thread, a query was made to fetch the latest message, which is inefficient. Using distinctOn + inArray on a batched ID array avoids this.
**Action:** When resolving N+1 database queries, batch them up using `selectDistinctOn` and `inArray` to significantly reduce database round-trips.
