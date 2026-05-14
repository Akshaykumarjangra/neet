## 2024-05-15 - Unmemoized Subject Data Array in Dashboard Component
**Learning:** Hard-coded array iterations in a top-level component rendering block can cause unnecessary recreations and re-evaluations during each render, even if the userStats object is mostly unchanged.
**Action:** Use `useMemo` for static and dynamically mapped data variables depending on external state/queries.
