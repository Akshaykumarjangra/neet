# Bolt Journal
## 2026-07-12 - [N+1 Query in User Stats]
**Learning:** The getUserStats method iterated over user attempts and executed multiple database queries per iteration, which causes massive overhead as user attempts grow. Replacing nested DB calls in loops with SQL left joins using Drizzle ORM drastically improves performance.
**Action:** Always prefer joining related tables in a single batched query instead of looping through items and executing queries inside the loop.
