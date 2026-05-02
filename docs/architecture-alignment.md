# Architecture Alignment Notes

After cross-checking with `architecture.md` and `shared/schema.ts`, the following
canonical conventions are now baked into every Phase 1–7 file we added.

## Identity & ownership

- **`users.id` is `varchar` (UUID), not int.** Every `user_id` foreign key is `varchar`.
- **Streak state lives on `users` already**: `study_streak`, `streak_freezes`, `last_active_date`.
  `services/streaks.ts` mutates these — we did NOT add duplicate columns.
- **Adaptive ability lives in `users.adaptive_profile` jsonb** under `masteryScores: { [subject]: theta }`.
  `services/adaptive.ts` reads/writes via `jsonb_set`. We did NOT add `theta_jsonb`.

## Attempts

- The attempts table is **`user_performance`** (not "attempts"):
  `user_id varchar, question_id int, is_correct bool, time_taken_sec int, attempt_date timestamptz`.
- Every service that aggregates "minutes studied / accuracy / weekly stats" queries `user_performance`.

## Mock exams

- `mock_exam_attempts.submitted_at` (not `completed_at`).
- Per-question responses live in **`mock_exam_responses`** (`is_correct`, `time_spent_seconds`, `flagged`).
  `services/mock-analyzer.ts` uses this join.
- Anti-cheat columns already exist on `mock_exam_attempts`: `focus_loss_count`,
  `device_fingerprint`, `last_active_at`, `ip_address`, `user_agent`. The
  client-side `lib/anti-cheat.ts` posts events that should update these — wire
  via existing `/api/anticheat` routes.

## Flashcards / SRS

- Cards live in `flashcards` (deck-level, no user state).
- **SRS state per user is `user_flashcard_progress`**: `ease_factor`, `interval`,
  `repetitions`, `next_review`, `last_reviewed`. `services/daily-plan.ts` queries
  `next_review <= now()` for due cards.

## Questions

- No direct `subject` or `chapter_id`. Subject is **resolved via `topic_id → content_topics.subject`**.
- Difficulty is `difficulty` (text) or `difficulty_level` (int).
- We added `irt_b real` and `concept_ids int[]` columns (in `0099_phases_1_to_7.sql`).
- Battle WS now reads question text from canonical `question_text` + `option_a..d` columns.

## Migration

`migrations/0099_phases_1_to_7.sql` was rewritten to:
- Use `varchar` for every user FK.
- NOT re-declare existing user columns (`streak_freezes`, `last_active_date`).
- Reference `content_topics(id)` for concepts (not the non-existent `chapters(id)`).
- Add indexes on the canonical `user_performance` and `user_flashcard_progress` tables.
- Add `coupons` table (was missing) referenced by `scholarship_attempts`.

## Apply order

```bash
cd neet
psql $DATABASE_URL -f migrations/0099_phases_1_to_7.sql   # additive, idempotent
ENABLE_CRON=1 npm run dev                                  # boot with schedules
# Antigravity: wire client routes per docs/wiring-checklist.md
```

## Files reconciled in this pass

- `server/services/adaptive.ts` — IRT writes to `users.adaptive_profile`, reads `user_performance` for "recent" filter.
- `server/services/daily-plan.ts` — flashcards via `user_flashcard_progress.next_review`, streak via `study_streak`.
- `server/services/streaks.ts` — uses canonical `study_streak` / `streak_freezes` / `last_active_date`.
- `server/services/mock-analyzer.ts` — joins `mock_exam_responses` + `mock_exam_attempt_questions`.
- `server/services/lifecycle.ts` — varchar `userId`.
- `server/services/attribution.ts` — varchar `userId`.
- `server/services/concepts.ts` — varchar `userId`.
- `server/services/cron.ts` — inactive-sweep query uses `lifecycle_sends` instead of phantom `last_lifecycle_jsonb`.
- `server/services/referrals.ts` — varchar IDs throughout.
- `server/middleware/quota.ts` — varchar IDs.
- `server/ws/battle.ts` — varchar IDs, canonical question columns.
- `server/squad-routes.ts` — `user_performance` for activity stats.
- `server/parent-routes.ts` — `user_performance` + `submitted_at`.
- `server/scholarship-routes.ts` — varchar IDs.
- `scripts/workforce/parent-summary.ts` — `user_performance` + `submitted_at`.
- `migrations/0099_phases_1_to_7.sql` — fully rewritten.
