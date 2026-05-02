# Wiring Checklist

Hand this to Antigravity to finish UI plumbing for the new pages/components.

## Routes registered (server) ✅

- `/api/squads` → squad-routes
- `/api/parent` → parent-routes
- `/api/scholarship` → scholarship-routes
- `/api/ai` `/api/adaptive` `/api/predict` `/api/battle` `/api/lifecycle` `/api/anticheat` (already wired by Antigravity)
- WS `/ws/battle` (registered in `server/index.ts`)
- Cron schedules registered if `NODE_ENV=production` or `ENABLE_CRON=1`

## Frontend routes — add to `client/src/App.tsx`

```tsx
import DoubtSolver from "@/pages/DoubtSolver";
import ConceptMap from "@/pages/ConceptMap";
import Battle from "@/pages/Battle";
import ExamDay from "@/pages/ExamDay";

// inside <Switch>
<Route path="/doubt" component={DoubtSolver} />
<Route path="/concepts" component={ConceptMap} />
<Route path="/battle" component={() => <Battle userId={currentUserId} />} />
<Route path="/exam-day" component={ExamDay} />
```

## Dashboard widgets

```tsx
import { DailyPlanCard } from "@/components/DailyPlanCard";
import { RankCard } from "@/components/RankCard";

// inside Dashboard.tsx
<DailyPlanCard />
<RankCard name={user.name} rank={user.rank} streak={user.streak} accuracy={user.accuracy} code={user.referralCode} />
```

## Header nav

Add links to Battle, Concepts, Doubt Solver, Exam Day under appropriate role gates.

## Database migration

```bash
psql $DATABASE_URL -f migrations/0099_phases_1_to_7.sql
```

## Cron in production

Set `ENABLE_CRON=1` in env on the worker dyno (or just one app instance) to avoid duplicate fires.

## Required env keys (see `.env.example`)

Critical for full functionality:
- `GEMINI_API_KEY` (working — uses gemini-1.5-flash/pro)
- `RAZORPAY_*` for billing
- `MSG91_AUTH_KEY` for WhatsApp lifecycle
- `SMTP_*` or `RESEND_API_KEY` for email
- `META_ACCESS_TOKEN` + `META_AD_ACCOUNT_ID` for paid ads automation
- `R2_*` for backups + asset CDN
