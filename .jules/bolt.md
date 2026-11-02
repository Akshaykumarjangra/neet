## 2024-11-20 - [Performance Learnt]
**Learning:** Understanding the codebase's architecture and common performance bottlenecks is critical.
**Action:** Always start by identifying potential N+1 queries, unnecessary re-renders, or missing indexes before jumping into micro-optimizations.
## 2024-11-20 - [Performance Learnt]
**Learning:** Found an O(N^2) complexity issue inside server/game-routes.ts where .find() is used inside a .map() loop for merging challenges with user progress.
**Action:** Replace .find() with O(1) map lookup (e.g., using a Javascript Map or Map constructor) to improve backend response times for daily challenges and achievements.
