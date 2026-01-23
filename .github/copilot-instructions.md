# AI Coding Agent Instructions for ZeroPage

ZeroPage is a comprehensive NEET preparation platform combining adaptive learning, mentorship, and gamification. This guide helps AI agents understand the architecture and development patterns.

## Architecture Overview

**Monorepo Structure** (TypeScript full-stack):
- **`client/src/`** - React 18 + Vite frontend (imports via `@`, `@shared`, `@assets` aliases)
- **`server/`** - Express.js backend with multiple domain-specific route files
- **`shared/schema.ts`** - Drizzle ORM schema (single source of truth for DB tables and Zod types)
- **`scripts/`** - Database migrations and seeding scripts

## Tech Stack Essentials

| Layer | Key Tech | Pattern |
|-------|----------|---------|
| **Frontend** | React 18, Vite, Wouter, TanStack Query | Component pages in `client/src/pages/`, hooks in `client/src/hooks/` |
| **Backend** | Express.js, Drizzle ORM, PostgreSQL | Route grouping by domain (e.g., `auth-routes.ts`, `mentor-routes.ts`) |
| **Database** | PostgreSQL + Drizzle | Schema in `shared/schema.ts`, migrations auto-generated |
| **Real-time** | WebSocket server (`server/ws/`) | Session-based auth via session middleware upgrade |
| **Auth** | Session + bcrypt | `express-session` with PG store, role-based access control (student/mentor/admin/owner) |
| **UI** | Radix UI + Tailwind CSS | Component library in `client/src/components/` (shadcn-style) |

## Critical Development Workflows

### Build & Run
```bash
npm run dev              # Concurrent frontend (Vite) + backend (tsx)
npm run build           # Builds both: client (Vite) + server (esbuild to dist/)
npm run start           # NODE_ENV=production node dist/index.js
npm run db:push        # Drizzle: Apply schema changes to DB
npm run db:generate    # Drizzle: Generate migration files from schema changes
npm run check          # TypeScript type check (no emit)
```

### Database Operations
- Schema modifications: Edit `shared/schema.ts` → Run `npm run db:generate` → `npm run db:push`
- Seeding: Use files in `scripts/` or `server/seeds/` (70+ content generators for biology, physics, chemistry)
- Always use Drizzle operations (`db.insert()`, `db.select()`, etc.) with schema imports from `@shared/schema`

## Project-Specific Patterns

### 1. Authentication & Authorization
**Files**: `server/auth.ts`, `server/auth-routes.ts`

- **Session-based**: Uses `express-session` with PostgreSQL store (`connect-pg-simple`)
- **Auth Middleware Stack**:
  - `requireAuth()` - Basic session check
  - `requireOwner()` - Owner-only routes (admin account: `akg45272@gmail.com`)
  - `requireActiveSubscription()` - Paid feature enforcement
  - `requireAuthWithPasswordCheck()` - Sensitive operations (billing, account settings)
- **Role Enum**: `student | mentor | admin` in `users.role`
- **Passwords**: bcrypt hash (`hashPassword()`, `verifyPassword()` in auth.ts)

### 2. API Route Organization
**Pattern**: Separate route files by domain, registered in `server/routes.ts`

```typescript
// server/routes.ts example:
app.use("/api/auth", authRoutes);
app.use("/api/learning-path", requireActiveSubscription(), learningPathRoutes);
app.use("/api/admin", adminRoutes);
```

**Key Domains**:
- `/api/auth/*` - Login, signup, session management
- `/api/mock-tests/*` - Test creation, submissions, WebSocket real-time sync
- `/api/learning-path/*` - Adaptive content paths (requires subscription)
- `/api/game/*` - Achievements, leaderboard, daily challenges
- `/api/lms/*` - Library, bookmarks, notes, spaced repetition
- `/api/mentors/*` - Mentor profiles, bookings, reviews
- `/api/admin/*` - Content approval, payment config, user management

### 3. Database Schema Patterns
**File**: `shared/schema.ts` (1469 lines)

**Key Tables**:
- `users` - Core user account; roles: student/mentor/admin; `isOwner` for highest privilege
- `questions` - Question bank (difficulty, source, PYQ year, solution steps)
- `chapters` - Course content by subject/class
- `mentor*` - Mentor profiles, availability, bookings, reviews, payouts
- `subscription*` - Plans, user subscriptions, payment transactions
- `*content*` - Content assets (video, PDF, notes), approval workflow

**Zod Integration**:
```typescript
import { insertQuestionSchema } from "@shared/schema";
// Auto-generated Zod schemas from Drizzle tables via drizzle-zod
```

### 4. Frontend Data Fetching
**Pattern**: TanStack Query (React Query) with custom `getQueryFn` hook

```typescript
// client/src/lib/queryClient.ts
const queryFn = getQueryFn({ on401: "throw" }); // Auto-handles auth errors
// Usage: useQuery({ queryKey: ["/api/path"], queryFn })
```

**Protected Routes**: Wrap in `<ProtectedRoute>`, `<GuestRoute>`, or `<OwnerRoute>` components

### 5. Real-Time Features (WebSocket)
**File**: `server/ws/index.ts`

- **Purpose**: Live mock test sync, question state, submission handling
- **Auth**: Session middleware applied during upgrade; `userId` extracted and validated
- **Message Flow**: Client sends `WSMessage` (see `shared/ws-types.ts`), server routes to handlers (`server/ws/handlers.ts`)
- **SessionManager**: Maintains test sessions in memory (`TestSessionManager`)

### 6. Shared Type System
**File**: `shared/schema.ts` + `shared/ws-types.ts`

- **Schema-First**: DB structure = Zod validation = API contracts
- **WebSocket Messages**: Typed in `ws-types.ts` (e.g., `TEST_START`, `SUBMIT_ANSWER`, `DISCONNECT`)
- **Enum Pattern**: Use pgEnum for database enums (e.g., `chapterStatusEnum`, `userRoleEnum`)

### 7. Content & Question Generation
**Seeding Structure**: `server/seeds/` contains 70+ generators
- Biology, Physics, Chemistry chapters per class (11, 12)
- Auto-generates questions from topic content
- Run individually via TypeScript compilation or batch seed scripts
- Example: `physics-class11-chapters-6-10.ts` seeds 1,651 questions with difficulty/PYQ tags

### 8. Admin Features & Owner-Only Routes
- **Owner Account** (`isOwner = true`): Auto-created at startup with `OWNER_INITIAL_PASSWORD` env var
- **Admin Dashboard** (`/admin`): Content approval, user management, payment config
- **Payment Config** (`/admin/payments`): Stripe/Razorpay integration, plan CRUD
- **Paywall Enforcement**: Server-side subscription check on sensitive endpoints (e.g., mock test start)

### 9. Subscription & Monetization
**Introduced Dec 6, 2025**

- **3-Tier Plans**: Free, Premium (₹999/month), Organization (custom)
- **Database Tables**: `subscription_plans`, `user_subscriptions`, `payment_transactions`
- **Paywall Component**: `client/src/components/Paywall.tsx` (inline/fullpage/modal variants)
- **Enforcement**: `requireActiveSubscription()` middleware on protected routes
- **Free Tier Limit**: 1 mock test/month (server-side enforced)

## Critical Files to Know

| File | Purpose |
|------|---------|
| `shared/schema.ts` | Single source of truth for DB, types, validation |
| `server/index.ts` | Server startup, middleware setup, owner account init |
| `server/routes.ts` | Main API route registration (1074 lines) |
| `server/db.ts` | Drizzle ORM + PostgreSQL pool setup (optimized for 20 max connections) |
| `server/auth.ts` | Password hashing, user auth, auth middleware |
| `server/ws/index.ts` | WebSocket server for real-time test sync |
| `client/src/App.tsx` | Route definitions and page imports (277 lines) |
| `client/src/lib/queryClient.ts` | TanStack Query client with custom fetch logic |
| `vite.config.ts` | Frontend build config with vendor chunk splitting |
| `drizzle.config.ts` | ORM migrations config |

## Common Development Tasks

### Adding a New API Route
1. Create `server/new-feature-routes.ts`
2. Export router from that file
3. Import and register in `server/routes.ts`: `app.use("/api/new-feature", newFeatureRoutes)`
4. Add auth middleware if needed

### Adding a Database Table
1. Add table definition to `shared/schema.ts`
2. Run `npm run db:generate` (creates migration)
3. Run `npm run db:push` (applies to DB)
4. Import schema in route files to use

### Extending Schema with Zod
- Use `drizzle-zod`'s `createInsertSchema()` for auto-generated validation
- Override if custom validation needed

### Frontend Component Pattern
```typescript
// client/src/pages/NewPage.tsx
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";

export default function NewPage() {
  const { data } = useQuery({
    queryKey: ["/api/endpoint"],
    queryFn: getQueryFn({ on401: "throw" })
  });
  return <div>...</div>;
}
```

## Debugging & Monitoring

- **Health Check**: `GET /api/health` - DB connectivity + uptime
- **Logs**: Express middleware logs all requests; check terminal during dev
- **WebSocket Debug**: Enabled in `server/ws/index.ts` with console logs for connection events
- **Type Errors**: `npm run check` before commits

## Environment Variables

**Essential**:
- `DATABASE_URL` - PostgreSQL connection
- `NODE_ENV` - "development" or "production"
- `OWNER_INITIAL_PASSWORD` - Bootstrap owner account at startup
- `SESSION_SECRET` - Session encryption key

**Optional** (for features):
- `REPL_ID` - Replit detection (for dev plugins)
- `DATABASE_SSL` - SSL connection mode
- `DB_POOL_MAX`, `DB_POOL_MIN` - Connection pool sizing

## Common Pitfalls

1. **Schema Changes**: Always run `npm run db:generate` → `npm run db:push` (never edit migrations manually)
2. **Auth Checks**: Use middleware stack, not inline checks
3. **WebSocket Auth**: Session middleware applied; userId always validated
4. **Query Keys**: Match API path structure in TanStack Query keys for consistency
5. **Subscription Logic**: Check both `isPaidUser` flag AND active subscription entry in DB
6. **Seed Scripts**: These are one-time utilities; don't assume they re-run on server start

---

**Last Updated**: December 10, 2025  
**Project**: ZeroPage NEET Preparation Platform  
**Contributors**: Recommended for AI agent onboarding before substantial code changes
