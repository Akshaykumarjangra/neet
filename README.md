# ZeroPage - NEET Prep Application

A full-stack learning management system tailored for NEET preparation, featuring interactive chapters, mock tests, and gamified learning.

## Tech Stack

*   **Frontend:** React, Vite, TailwindCSS, Radix UI
*   **Backend:** Node.js, Express, PostgreSQL (Drizzle ORM)
*   **Database:** PostgreSQL (Coolify / Neon)
*   **Storage:** Local Volume Storage (Coolify compatible)
*   **Tools:** TypeScript, PM2, Docker

## Getting Started

### Prerequisites

*   Node.js (v20+)
*   npm

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables in `.env` (copy from `.env.local.example` if needed).

### Running Locally

To run both backend and frontend concurrently:

```bash
npm run dev
```

*   **Frontend:** [http://localhost:5002](http://localhost:5002) (or next available port)
*   **Backend:** [http://localhost:5001](http://localhost:5001)

### Building for Production

```bash
npm run build
```

The build artifacts will be in the `dist/` directory.

### Running in Production

To start the production server:

```bash
npm start
```

## Project Structure

*   `client/` - React frontend code.
*   `server/` - Express backend code.
*   `shared/` - Shared types and schema definitions (Drizzle ORM).
*   `landing/` - Landing page components (if applicable).

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts backend and frontend in development mode concurrently. |
| `npm run build` | Builds both client and server for production. |
| `npm run start` | Starts the production server from the `dist` folder. |
| `npm run check` | Runs TypeScript type checking. |
| `npm run lint` | Runs TypeScript linting (no emit). |
| `npm run db:push` | Pushes Drizzle schema changes to the database. |
| `npm run db:studio` | Opens Drizzle Studio to manage database content. |
| `npm run analyze` | Builds the client with bundle analysis enabled. |

## Deployment

The application is containerized using Docker.

1.  Build the image: `docker build -t zero-page .`
2.  Run the container: `docker run -p 5001:5001 -e DATABASE_URL=... zero-page`

