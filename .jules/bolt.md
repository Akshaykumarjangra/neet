## 2026-08-06 - Resolving N+1 with selectDistinctOn
**Learning:** When fetching the latest associated record for a batch of items in Drizzle ORM to resolve an N+1 query, use db.selectDistinctOn([table.foreignKeyId]) combined with inArray() and orderBy() instead of individual queries in a loop.
**Action:** Apply this pattern whenever querying 'latest' or 'first' associated records for a list of parent entities to drastically reduce database round-trips.
