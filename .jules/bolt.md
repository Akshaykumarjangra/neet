## 2025-05-18 - Avoid Nested Find
**Learning:** Found O(N^2) complexity where `map` was wrapping a `.find` on an array instead of O(1) hash map lookups.
**Action:** Replace `array.find(id === item.id)` inside a `map` with precomputed `Map` lookups.
