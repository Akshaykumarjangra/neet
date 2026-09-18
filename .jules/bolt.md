## 2024-05-10 - [N+1 query resolving in chat threads]
**Learning:** Fetching the latest chat message for each thread inside a mapping loop is an N+1 query problem, which severely affects backend execution performance. We can batch this using a DISTINCT ON query.
**Action:** Replace nested `db.select()` queries inside `.map()` loops with a single batch query, such as using `db.selectDistinctOn([chatMessages.threadId]).from(chatMessages).where(inArray(chatMessages.threadId, threadIds)).orderBy(chatMessages.threadId, desc(chatMessages.createdAt))`.
