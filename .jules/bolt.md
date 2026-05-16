## 2024-05-16 - O(N^2) Array finding in mapping over results
**Learning:** Found an O(N^2) complexity issue where `.map` is used with `.find` directly on a dataset retrieved from Drizzle ORM. As noted in memory, "When merging Drizzle array results with other lists in loops, pre-compute a Map for O(1) lookups rather than using nested Array.find() to avoid O(N^2) performance bottlenecks."
**Action:** Replace nested array `.find()` in map functions with a precomputed Map lookup when dealing with database results to improve performance from O(N^2) to O(N).
## 2024-05-16 - CI `npm ci` failure due to out-of-sync lockfile
**Learning:** The CI check failed because `npm ci` enforces that `package.json` and `package-lock.json` are exactly in sync. Sometimes modifying branch code or changing external things without syncing lockfile breaks it.
**Action:** When CI fails on `npm ci` with an EUSAGE lockfile sync error, run `npm install` locally, commit the resulting changes to `package-lock.json`, and push the fix so CI can pass.
