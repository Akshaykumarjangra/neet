# ZERO AI Project Architecture

This document provides a high-level overview of the ZERO AI platform architecture, including components, API endpoints, and database schema.

## 1. Technology Stack

- **Frontend:**
  - React 18 / Vite
  - Tailwind CSS (Styling)
  - Framer Motion (Animations)
  - Wouter (Routing)
  - TanStack Query (Data Fetching)
  - Lucide React (Icons)
  - shadcn/ui (UI Components)

- **Backend:**
  - Node.js / Express
  - Drizzle ORM (Database Access)
  - Passport.js (Authentication)
  - WebSocket (Real-time Battle/Chat)

- **Database:**
  - PostgreSQL

---

## 2. Directory Structure

- `/client`: Frontend source code.
  - `/src/pages`: Main application views.
  - `/src/components`: Reusable UI components.
  - `/src/hooks`: Custom React hooks.
  - `/src/lib`: Utility functions and clients.
- `/server`: Backend source code.
  - `/routes.ts`: Main API route registration.
  - `/auth.ts`: Authentication logic.
  - `/db.ts`: Database connection.
  - `/storage.ts`: Data access layer.
- `/shared`: Shared types and schemas.
  - `schema.ts`: Drizzle database schema and Zod validation.

---

## 3. Core Components (Frontend)

### Key Pages
- **Dashboard:** Overview of progress, daily challenges, and stats.
- **Question Bank:** Filterable repository of NEET-style questions.
- **Mock Tests:** Full-length and subject-wise practice tests.
- **Chapter Viewer:** Detailed study notes with 3D visualizations and AI chat.
- **Battle Mode:** 1v1 real-time competitive learning.
- **Simulations:** Interactive 3D/2D scientific simulations (Three.js/PhET).
- **Mentor Discovery:** Find and book sessions with medical mentors.

### Specialized Components
- **ChapterChatbot:** Context-aware AI tutor for specific chapters.
- **GamificationPanel:** Displays XP, levels, and achievements.
- **ThreeDViewer:** Renders Three.js models for complex concepts.
- **Paywall:** Handles premium content access control.

---

## 4. API Endpoints

### Authentication (`/api/auth`)
- `POST /register`: User registration.
- `POST /login`: User login.
- `POST /logout`: User logout.
- `GET /user`: Get current user session.

### Learning Content
- `GET /api/chapters`: List all chapters.
- `GET /api/chapters/by-chapter/:subject/:class/:num`: Get specific chapter content.
- `GET /api/topics`: Get topics with question counts.

### Practice & Tests
- `GET /api/questions`: Paginated question bank with filters.
- `GET /api/questions/stats`: Overview of question distribution.
- `GET /api/mock-tests`: List available mock tests.
- `POST /api/adaptive/generate`: Create personalized practice sessions.

### Advanced Features
- `POST /api/ai/solve`: AI Doubt Solver with image/text support.
- `POST /api/predict/rank`: NEET rank prediction based on performance.
- `GET /api/battle/lobby`: WebSocket-based 1v1 match making.

---

## 5. Database Schema (Highlights)

### User Management
- **`users`**: Core user data, subscription status, points, and streaks.
- **`user_profiles`**: Extended profile data, bios, and rank titles.

### Educational Content
- **`content_topics`**: NCERT-aligned topics and chapters.
- **`questions`**: MCQ bank with explanations and difficulty levels.
- **`chapter_content`**: Rich text notes, formulas, and visualization metadata.

### Mentor System
- **`mentors`**: Mentor bios, subjects, and hourly rates.
- **`mentor_bookings`**: Scheduling and session management.

### Engagement & Progress
- **`achievements`**: Gamification badges and rewards.
- **`user_performance`**: Tracks every question attempt for analytics.
- **`mock_exam_attempts`**: Full history of mock test performance.
- **`xp_transactions`**: Detailed log of XP gains.

---

## 6. Real-time Infrastructure

The platform uses WebSockets for:
1. **1v1 Battles:** Synchronizing game state between players.
2. **Real-time Chat:** Messaging between students and mentors.
3. **Telemetry:** Tracking user engagement for anti-cheat and analytics.
