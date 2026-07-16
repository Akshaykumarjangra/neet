## 2024-05-18 - [Optimization] Hash map lookup in rank predictor
**Learning:** In the rank predictor analysis route, the application matches student responses to question data using nested array searches (`Array.find()`) inside a loop over all responses. Since NEET mock exams have 200 questions, an O(N^2) matching leads to 40,000 iterations for every attempt analyzed.
**Action:** Replace `questions.find()` with a pre-computed `Map` for O(1) lookups, bringing the operation down to O(N) (400 iterations). Always use hash maps when joining large Drizzle result sets in memory.
