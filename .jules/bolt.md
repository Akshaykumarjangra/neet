## 2026-09-08 - [Optimize getUserStats N+1 database queries]
**Learning:** The storage class had an N+1 query issue in the getUserStats method which was looping through all attempts and executing individual queries for topic/subject info.
**Action:** Replaced the loop with a single grouped database query with aggregation functions using sql to batch operations and reduce DB roundtrips.
