// telemetry-routes.spec.ts – Jest + Supertest tests for telemetry endpoint

import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';

// Mock DB connection bypass logic
jest.mock('./db', () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([{ id: 1 }])
  },
  testConnection: jest.fn()
}));

// We must require telemetryRoutes after mocking db
import telemetryRoutes from './telemetry-routes';

// Dummy auth middleware to satisfy requireAuthWithPasswordCheck
function dummyAuth(req: Request, res: Response, next: NextFunction) {
    // Simulate an authenticated user
    (req as any).session = { userId: 'test-user-id' };
    next();
}

// Create an app that uses the dummy auth before the telemetry routes
function createApp() {
    const app = express();
    app.use(express.json());
    app.use(dummyAuth);
    app.use('/api', telemetryRoutes);
    // Error handler to avoid unhandled errors in tests
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        res.status(500).json({ error: 'internal' });
    });
    return app;
}

describe('Telemetry Route', () => {
    it('should accept a valid telemetry event', async () => {
        const app = createApp();
        await request(app)
            .post('/api/telemetry')
            .send({ event: 'test_event', data: { foo: 'bar' } })
            .expect(200);
    });

    it('should reject when event name is missing', async () => {
        const app = createApp();
        await request(app)
            .post('/api/telemetry')
            .send({ data: {} })
            .expect(400);
    });
});
