## 2024-05-19 - [server/mock-test-routes.ts array lookup optimization]
**Learning:** Found an $O(N \times M)$ operation inside `server/mock-test-routes.ts` where `inArray` database fetch is mapped over to reorder them back by mapping `.find()` on the fetched elements. As $N$ and $M$ get big, this nested lookup creates latency.
**Action:** Replace `array.map(() => array.find(...))` pattern with precomputed O(1) Map (`new Map(array.map(q => [q.id, q]))` then `.get(id)`) whenever sorting/reordering results from Drizzle based on original IDs.
