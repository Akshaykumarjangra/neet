## 2026-10-13 - O(N^2) Array find in mapping
**Learning:** In Drizzle ORM mapping, when we fetch two lists (e.g. all challenges, user progress) and map over one list using `.find()` on the other list, we create an O(N^2) complexity bottleneck. This is a common performance pattern that needs optimization when handling larger result sets.
**Action:** Use a precomputed Map with O(1) lookups outside the loop instead of `.find()` inside the mapping loop.
