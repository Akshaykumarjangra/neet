## 2024-05-23 - [N+1 Query Bottlenecks in Drizzle ORM Loops]
**Learning:** Performing multiple independent database queries inside loops (e.g. fetching related questions and topics for each performance attempt one by one) causes severe N+1 latency bottlenecks and memory issues.
**Action:** Replace nested queries and loops with a single batched query using `.leftJoin()` or `.innerJoin()` to dramatically reduce database round trips and improve backend execution performance.
