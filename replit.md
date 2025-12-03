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
- Added mentor management system with 5 database tables
- Implemented role-based access control (RBAC)
- Created mentor dashboard with application, profile, availability management
- Added admin panel for mentor verification
- Fixed mentor role assignment bug (approval now updates users.role)

## User Preferences
- Use shadcn/ui components for consistent UI
- Follow React Query patterns for data fetching
- Use Drizzle ORM for database operations
