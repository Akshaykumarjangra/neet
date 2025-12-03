# NEET Prep - Complete NEET Preparation Platform

## Project Overview

**NEET Prep** is a comprehensive, gamified learning platform designed specifically for NEET (National Eligibility cum Entrance Test) exam preparation. It combines interactive learning, gamification mechanics, and adaptive practice to help students master Physics, Chemistry, and Biology.

## Key Features

### 📚 Content Management
- **23 Physics Chapters** (Class 11 & 12) with 1,100+ practice questions
- **30 Chemistry Chapters** with comprehensive coverage
- **Detailed Chapter Content** including:
  - Introduction and overview
  - Detailed notes with Markdown support
  - Learning objectives
  - Key concepts
  - Important formulas
  - Interactive visualizations
  - Video links and PHET simulations
  - Mnemonics and study tips

### 🎮 Gamification System
- **XP & Leveling System** - Earn points for correct answers
- **Study Streaks** - Track consecutive study days
- **Achievements** - Unlock badges for milestones
- **Daily Challenges** - Complete daily tasks for bonus XP
- **Leaderboards** - Compete with other students
- **Combo System** - Build streaks of correct answers
- **Battle Pass Seasons** - Seasonal progression with rewards
- **Cosmetics** - Frames, badges, titles, and emotes
- **Power-ups** - XP boosts, shields, and special abilities

### 📖 Learning Management System (LMS)
- **Chapter Progress Tracking** - Monitor completion percentage
- **Mastery Levels** - Bronze, Silver, Gold progression
- **Study Sessions** - Track time spent on each chapter
- **Bookmarks** - Save important chapters
- **Personal Notes** - Add and organize study notes
- **Highlights** - Mark important text with color coding

### 🧪 Practice & Assessment
- **5,650+ Practice Questions** across all topics
- **Question Bank** with:
  - Multiple difficulty levels
  - Detailed solutions
  - Step-by-step explanations
  - Related topics
  - Source tracking (PYQ, textbook, etc.)
- **Mock Tests** - Full-length practice exams
- **Past Year Papers** - Previous NEET questions
- **Adaptive Practice** - Questions based on weak areas
- **Topic-wise Practice** - Focus on specific subjects
- **Performance Analytics** - Accuracy tracking and statistics

### 🎯 User Features
- **User Authentication** - Secure login/signup with sessions
- **User Profiles** - Customizable profile with cosmetics
- **Admin Dashboard** - Content management and user analytics
- **Responsive Design** - Works on desktop, tablet, and mobile

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching and caching
- **Wouter** - Lightweight routing
- **Radix UI** - Accessible components
- **Three.js** - 3D visualizations
- **D3.js** - Data visualizations
- **Recharts** - Charts and graphs

### Backend
- **Express.js** - Web framework
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **WebSockets** - Real-time communication
- **Passport.js** - Authentication
- **bcrypt** - Password hashing
- **Express Session** - Session management

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PM2** - Process management
- **Vite** - Frontend bundling
- **esbuild** - Backend bundling

## Database Schema

### Core Tables
- `users` - User accounts with gamification data
- `questions` - Question bank (5,650+ questions)
- `content_topics` - Subject topics (113 topics)
- `chapter_content` - Detailed chapter content (53 chapters)

### Gamification Tables
- `achievements` - Achievement definitions
- `user_achievements` - User's unlocked achievements
- `daily_challenges` - Daily challenge definitions
- `user_daily_challenges` - User's challenge progress
- `xp_transactions` - XP earning history
- `leaderboard_entries` - Leaderboard rankings
- `user_combos` - Consecutive correct answer combos
- `season_passes` - Battle pass seasons
- `battle_pass_tiers` - Tier rewards
- `user_season_progress` - User's season progress
- `cosmetics` - Cosmetic items
- `user_cosmetics` - User's owned cosmetics
- `power_up_types` - Power-up definitions
- `user_power_ups` - User's owned power-ups
- `active_power_ups` - Currently active power-ups

### Learning Management Tables
- `user_chapter_progress` - Chapter completion tracking
- `user_chapter_sessions` - Study session tracking
- `user_chapter_bookmarks` - User bookmarks
- `user_chapter_notes` - User notes and highlights

### Assessment Tables
- `test_sessions` - Active test sessions
- `test_session_events` - Event log for tests
- `session_participants` - Multi-user session tracking
- `mock_tests` - Mock test definitions
- `past_year_papers` - Previous year papers
- `user_performance` - Question attempt history

## Project Structure

```
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Page components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utilities and helpers
│   │   ├── styles/                 # Global styles
│   │   └── visuals/                # Visualization components
│   └── index.html                  # Entry point
│
├── server/                          # Backend Express application
│   ├── auth.ts                     # Authentication logic
│   ├── auth-routes.ts              # Auth endpoints
│   ├── routes.ts                   # Main routes
│   ├── db.ts                       # Database connection
│   ├── storage.ts                  # Data access layer
│   ├── gamification.ts             # Gamification logic
│   ├── game-routes.ts              # Gamification endpoints
│   ├── lms-routes.ts               # LMS endpoints
│   ├── chapter-content-routes.ts   # Chapter content endpoints
│   ├── mock-test-routes.ts         # Mock test endpoints
│   ├── admin-routes.ts             # Admin endpoints
│   └── ws/                         # WebSocket handlers
│
├── shared/                          # Shared code
│   ├── schema.ts                   # Database schema & types
│   └── ws-types.ts                 # WebSocket types
│
├── migrations/                      # Database migrations
├── seeds/                          # Database seed scripts
├── dist/                           # Build output
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite config
├── tailwind.config.ts              # TailwindCSS config
├── drizzle.config.ts               # Drizzle ORM config
└── .env                            # Environment variables
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd neet-prep
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Set up database**
```bash
npm run db:push
npm run db:seed
```

5. **Start development server**
```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5001
- Backend API: http://localhost:5001/api
- WebSocket: ws://localhost:5001/ws

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Questions & Topics
- `GET /api/questions` - Get questions with filters
- `GET /api/questions/:id` - Get single question
- `GET /api/topics` - Get all topics
- `GET /api/topics/:subject` - Get topics by subject

### Chapters
- `GET /api/chapters` - Get all chapters
- `GET /api/chapters/:id` - Get chapter by ID
- `GET /api/chapters/by-chapter/:subject/:classLevel/:chapterNumber` - Get chapter by details

### Gamification
- `POST /api/game/award-xp` - Award XP to user
- `POST /api/game/update-streak` - Update study streak
- `GET /api/game/achievements/:userId` - Get user achievements
- `GET /api/game/leaderboard` - Get leaderboard
- `GET /api/game/challenges/daily` - Get daily challenges

### Learning Management
- `GET /api/lms/library` - Get chapter library
- `POST /api/lms/sessions` - Start study session
- `POST /api/lms/bookmarks` - Add bookmark
- `POST /api/lms/notes` - Add note

### Mock Tests
- `GET /api/mock-tests` - Get mock tests
- `POST /api/mock-tests` - Create mock test
- `GET /api/mock-tests/:id` - Get mock test details

## Key Statistics

- **23 Physics Chapters** with 1,100+ questions
- **30 Chemistry Chapters** with comprehensive coverage
- **5,650+ Total Practice Questions**
- **113 Topics** across all subjects
- **20+ Gamification Features**
- **50+ Database Tables**
- **100+ API Endpoints**

## Features Highlights

### 🎓 Learning
- Comprehensive chapter content with notes and formulas
- Interactive visualizations and 3D models
- Video links and PHET simulations
- Step-by-step solutions for all questions
- Adaptive learning based on performance

### 🏆 Gamification
- Real-time XP and leveling system
- Achievement badges and milestones
- Daily challenges with rewards
- Seasonal battle pass system
- Cosmetic customization
- Power-ups and special abilities
- Leaderboards and rankings

### 📊 Analytics
- Performance tracking and statistics
- Accuracy rate monitoring
- Study time analytics
- Progress visualization
- Weak area identification

### 👥 Community
- Leaderboards
- Multi-user test sessions
- Real-time updates via WebSockets
- User profiles and customization

## Performance Optimizations

- Database connection pooling
- Query caching with React Query
- Code splitting and lazy loading
- Image optimization
- Compression middleware
- Rate limiting
- Session management

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- CORS protection
- Helmet.js security headers
- Rate limiting
- SQL injection prevention (Drizzle ORM)
- XSS protection

## Future Enhancements

- AI-powered question generation
- Video content integration
- Live tutoring sessions
- Peer study groups
- Advanced analytics dashboard
- Mobile app (React Native)
- Offline mode
- Multi-language support

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@neetprep.com or open an issue on GitHub.

## Acknowledgments

- NCERT for curriculum reference
- NTA for NEET exam structure
- Open source community for amazing libraries
- All contributors and testers

---

**Last Updated:** November 2025
**Version:** 1.0.0
**Status:** Active Development
