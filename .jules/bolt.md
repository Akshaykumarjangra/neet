## $(date +%Y-%m-%d) - [N+1 Query in Chat Routes]
**Learning:** Found an N+1 query vulnerability in `server/chat-routes.ts` where we fetch the latest message for each thread inside a `.map` loop using `await db.select()`.
**Action:** Replace `Promise.all(threads.map(... await db.select(...)))` with a single batched query using `.leftJoin()` or by resolving `inArray` based batching like `.selectDistinctOn([chatMessages.threadId])`.
