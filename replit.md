# AI-Driven Learning Management System (LMS)

## Overview
A comprehensive AI-driven Learning Management System designed for NEET medical entrance exam preparation. The platform features mentor management, content management for videos and handwritten notes, experiential learning, AI-powered personalization, and gamification.

## Project Structure

```
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Landing page
│   │   │   ├── MentorDashboard.tsx  # Mentor portal
│   │   │   ├── AdminDashboard.tsx   # Admin panel
│   │   │   └── ...
│   │   ├── components/       # Shared components
│   │   ├── hooks/           # Custom hooks (useAuth, etc.)
│   │   └── lib/             # Utilities
│   └── index.html
├── server/                   # Express backend
│   ├── index.ts             # Main entry
│   ├── routes.ts            # Main API routes
│   ├── auth-routes.ts       # Authentication routes
│   ├── mentor-routes.ts     # Mentor management APIs
│   ├── lms-routes.ts        # LMS content APIs
│   └── storage.ts           # Database interface
├── shared/                   # Shared types
│   └── schema.ts            # Drizzle schema + Zod types
└── scripts/                  # Migration scripts
```

## Key Features

### 1. Authentication System
- **Routes**: `/api/auth/*`
- Session-based auth with bcrypt password hashing
- Role-based access control (student, mentor, admin)

### 2. Mentor Management System
- **Routes**: `/api/mentors/*`
- **Public APIs**:
  - `GET /api/mentors` - List approved mentors (with search, filters)
  - `GET /api/mentors/:id` - Get mentor profile
- **Authenticated APIs**:
  - `POST /api/mentors/apply` - Submit mentor application
  - `GET /api/mentors/status` - Check mentor status (pending/approved/rejected)
  - `GET /api/mentors/my-profile` - Get own mentor profile (mentor role)
  - `PUT /api/mentors/my-profile` - Update profile (mentor role)
  - `POST /api/mentors/availability` - Set availability slots (mentor role)
  - `DELETE /api/mentors/availability/:id` - Remove slot (mentor role)
- **Admin APIs**:
  - `PUT /api/admin/mentors/:id/verify` - Approve/reject mentor
  - `GET /api/admin/mentors/pending` - List pending applications

### 3. Booking System
- **Routes**: `/api/bookings/*`
- Students can book sessions with approved mentors
- Mentors can confirm/cancel bookings
- Price calculated from mentor's hourly rate

### 4. Admin Panel
- **Routes**: `/admin`
- Mentor verification (approve/reject applications)
- Content approval workflow (planned)

### 5. Gamification System
- **Routes**: `/api/game/*`
- `GET /api/game/stats/live` - Live statistics (public)
- `GET /api/game/leaderboard` - Leaderboard (auth required)
- `GET /api/game/challenges` - Daily challenges (auth required)
- `POST /api/game/achievements/:id/claim` - Claim achievement (auth required)

## Database Schema

### Core Tables
- `users` - User accounts with role enum (student, mentor, admin)
- `mentors` - Mentor profiles (linked to users)
- `mentor_availability` - Weekly availability slots
- `mentor_bookings` - Session bookings
- `mentor_reviews` - Student reviews/ratings
- `mentor_payouts` - Payment tracking

### LMS Tables
- `subjects`, `chapters` - Course structure
- `chapter_content` - Video/notes content with approval workflow
- `content_assets` - Media storage (videos, PDFs, handwritten notes)
- `content_versions` - Version history

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Express session secret

## Running the App
```bash
npm run dev  # Starts both frontend (5000) and backend
```

## Recent Changes (December 2025)

### December 4, 2025 - Interactive Simulations System
- **Simulations Library**: New /simulations page with grid of interactive science simulations
- **Subject Filters**: Filter simulations by Physics, Chemistry, or Biology
- **PhET Integration**: Embedded PhET simulations (Build a Molecule, Balancing Equations)
- **Custom Simulations**:
  - Projectile Motion (Canvas-based physics simulator with velocity, angle, gravity controls)
  - Circuit Builder (Interactive circuit with battery, resistor, bulb, current flow animation)
  - 3D Molecule Viewer (Three.js molecules: H₂O, CO₂, CH₄, NH₃, glucose, ethanol)
- **Chapter Integration**: Added Simulations tab to ChemistryChapter1 with embedded PhET labs
- **Session Store Fix**: Using MemoryStore for development to prevent database timeouts

### December 4, 2025 - Admin Content Management System
- **Content Manager**: New /admin/content page with tabbed interface for managing all LMS content
- **Questions Manager**: Add/edit/delete questions with bulk JSON import, subject/topic/difficulty filters
- **Topics Manager**: Create and organize content topics by subject and class level
- **Mock Tests Builder**: Create tests with question selection, duration, passing marks, publish toggle
- **Flashcards Creator**: Create decks and cards with front/back content, bulk import support
- **Admin API Routes**: 16 new endpoints under /api/admin/* for content CRUD operations

### December 3, 2025 - Major UX/UI Enhancement
- **Public Landing Page**: New Home page with hero section, NEET value proposition, syllabus coverage, social proof, testimonials
- **Mentor Discovery**: New /mentors page with search/filter, mentor cards, profile modal, 3-step booking flow
- **Practice Enhancements**: Added timed mode with configurable timer, attempt summary modal with stats/charts, question flagging/reporting
- **Community Q&A**: New /community page with discussions, voting, replies, filters (public viewing, auth for posting)
- **Content Polish**: Added empty states, loading skeletons, error handling with retry buttons across all pages
- **UX Improvements**: Onboarding wizard for new users, NextBestAction component, dashboard animations

### December 3, 2025 - Database & API Fixes
- **Database Sync**: Created 10+ missing database tables including discussions, discussion_replies, discussion_votes
- **Questions Schema**: Migrated questions table to use JSONB options column
- **Fixed Mentor Routes**: Resolved NaN error on `/api/mentors/:id` route
- **Session Store**: Created user_sessions table to prevent connection timeout

### Previous Updates
- Added mentor management system with 5 database tables
- Implemented role-based access control (RBAC)
- Created mentor dashboard with application, profile, availability management
- Added admin panel for mentor verification

### New Pages Added
- `/` - Public landing page (Home)
- `/mentors` - Public mentor discovery with booking flow
- `/community` - Public Q&A discussion board
- `/practice` - Enhanced practice with timer and flagging
- `/simulations` - Interactive simulations library with filters
- `/admin/content` - Admin content management system

## User Preferences
- Use shadcn/ui components for consistent UI
- Follow React Query patterns for data fetching
- Use Drizzle ORM for database operations
