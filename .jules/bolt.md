## 2026-09-16 - [Optimize Array Lookups in Loops]
**Learning:** O(N^2) time complexity bottlenecks caused by nested array lookups (e.g. `Array.prototype.find()` inside a loop or `.map()`) can cause severe latency bottlenecks.
**Action:** Precompute a `Map` outside the loop to perform O(1) key-based lookups and improve performance.
## 2026-09-17 - [Fix Jest Config for ESM with ts-jest]
**Learning:** Jest parse errors on `node:test` files with `Cannot use import statement outside a module` when `type: module` is set.
**Action:** Configure `jest.config.cjs` to use `ts-jest` with ESM support and ignore native `node:test` files using `testPathIgnorePatterns: ['\\.spec\\.ts$']` to prevent Jest from attempting to run them.
