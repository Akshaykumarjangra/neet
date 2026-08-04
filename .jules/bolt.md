
## 2024-08-03 - [Resolved N+1 Query in `getUserStats`]
**Learning:** Found an N+1 database querying issue when iterating over `userPerformance` attempts to fetch nested `questions` and `contentTopics` data one-by-one. It severely impacts performance, especially for users with numerous attempt records.
**Action:** When working with loop iterations in backend services, pre-fetch related entities in a single batched query using `.innerJoin()` and `inArray()` to dramatically reduce database round-trips.
