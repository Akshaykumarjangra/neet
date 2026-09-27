## 2026-09-26 - [N+1 query in DbStorage.getUserStats]
**Learning:** The application had an N+1 query vulnerability when collecting stats per user attempt, which could slow down the page with many attempts.
**Action:** Use Drizzle ORM `leftJoin` to fetch the attempts alongside questions and topics in one batched query instead of hitting the DB per user performance attempt.
