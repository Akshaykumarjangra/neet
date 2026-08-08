## 2026-08-08 - Fix N+1 query in chat threads
**Learning:** Tool outputs like `read_file` or `cat` may be truncated (e.g., at 1000 characters). To satisfy the Groundedness Rule when drafting execution plans for large files, use commands like `grep -n -C <lines>` to explicitly confirm the exact code structure and lines before proposing changes.
**Action:** Always use specific greps to verify code structures instead of relying on `cat` or `read_file` for large files when creating a plan.
