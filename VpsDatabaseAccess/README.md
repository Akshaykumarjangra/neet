# NEET Prep - Complete NEET Preparation Platform

A comprehensive, gamified learning platform for NEET (National Eligibility cum Entrance Test) preparation with interactive 3D visualizations, mock tests, and adaptive learning paths.

## Features

### 🎮 Gamification System
- XP and leveling system
- Achievements and badges
- Daily challenges
- Leaderboards
- Study streaks
- Battle pass/season system
- Cosmetics and power-ups

### 📚 Learning Content
- Complete NEET syllabus coverage (Physics, Chemistry, Biology)
- Interactive 3D visualizations (Three.js, D3.js)
- PhET simulations integration
- Detailed chapter notes
- Video links and resources
- Formulas and mnemonics

### 📝 Practice & Assessment
- 50,000+ practice questions
- Mock tests (full-length and topic-wise)
- Previous year questions (PYQ)
- Adaptive practice based on performance
- Real-time test sessions with WebSocket
- Detailed solutions and explanations

### 📊 Progress Tracking
- Subject-wise analytics
- Chapter progress tracking
- Performance metrics
- Weak area identification
- Study time tracking
- Bookmarks and notes

### 🎯 Learning Management
- Personalized learning paths
- Chapter prerequisites
- Mastery levels
- Study sessions tracking
- Progress visualization

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **Shadcn/ui** component library
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Three.js** for 3D visualizations
- **D3.js** for data visualizations
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **WebSocket** for real-time features
- **Passport.js** for authentication
- **Bcrypt** for password hashing

### DevOps & Production
- **Docker** & Docker Compose
- **PM2** for process management
- **Nginx** reverse proxy support
- **Helmet** for security headers
- **Rate limiting** for API protection
- **Compression** middleware
- **Health checks** and monitoring

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- npm or yarn

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd VpsDatabaseAccess
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start PostgreSQL:**
   ```bash
   # macOS with Homebrew
   brew services start postgresql@14
   
   # Create database
   createdb neet_prep
   ```

5. **Run migrations:**
   ```bash
   npm run db:push
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Open browser:**
   ```
   http://localhost:5001
   ```

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

### Quick Production Start

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start with PM2:**
   ```bash
   npm run start:pm2
   ```

3. **Or use Docker:**
   ```bash
   npm run docker:up
   ```

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run check` - Type check with TypeScript
- `npm run lint` - Run linter

### Database
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate migrations
- `npm run db:migrate` - Run migrations
- `npm run db:studio` - Open Drizzle Studio

### Production
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run start:pm2` - Start with PM2
- `npm run health` - Check application health

### Docker
- `npm run docker:build` - Build Docker image
- `npm run docker:up` - Start with Docker Compose
- `npm run docker:down` - Stop Docker containers
- `npm run docker:logs` - View Docker logs

### Monitoring
- `npm run logs:pm2` - View PM2 logs
- `npm run audit:prod` - Audit production dependencies

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── visuals/       # 3D visualizations
│   └── index.html
├── server/                # Backend Express application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── auth.ts           # Authentication logic
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Data access layer
│   ├── gamification.ts   # Gamification logic
│   ├── seeds/            # Database seeders
│   └── ws/               # WebSocket handlers
├── shared/               # Shared code between client/server
│   ├── schema.ts         # Database schema
│   └── ws-types.ts       # WebSocket types
├── migrations/           # Database migrations
├── dist/                 # Production build output
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment template
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── ecosystem.config.cjs  # PM2 configuration
├── DEPLOYMENT.md         # Deployment guide
└── SECURITY.md           # Security documentation
```

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/neet_prep

# Security
SESSION_SECRET=your-strong-random-secret

# Server
PORT=5001
NODE_ENV=production

# Optional
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

See [.env.example](./.env.example) for complete list.

## API Documentation

### Health Check
```bash
GET /api/health
```

### Authentication
```bash
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Questions & Practice
```bash
GET  /api/questions
GET  /api/questions/:id
POST /api/questions
GET  /api/topics
```

### Mock Tests
```bash
GET  /api/mock-tests
GET  /api/mock-tests/:id
POST /api/mock-tests
```

### Gamification
```bash
GET  /api/game/profile/:userId
GET  /api/game/leaderboard
GET  /api/game/achievements/:userId
POST /api/game/award-xp
```

## Security

See [SECURITY.md](./SECURITY.md) for security policy and best practices.

### Security Features
- ✅ Helmet.js security headers
- ✅ Rate limiting
- ✅ CORS protection
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ Secure session management
- ✅ Password hashing (bcrypt)
- ✅ Input validation (Zod)

## Performance

- **Compression** enabled for all responses
- **Connection pooling** for database
- **Cluster mode** support with PM2
- **Static asset** optimization
- **Code splitting** in frontend
- **Lazy loading** for visualizations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/neet-prep/issues)
- Email: support@example.com

## Acknowledgments

- NEET syllabus based on NTA guidelines
- PhET Interactive Simulations
- Three.js community
- React and Node.js communities
