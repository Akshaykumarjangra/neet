// telemetry-routes.spec.ts – Jest + Supertest tests for telemetry endpoint

// Mock db.ts globally before it gets imported by anything
jest.mock('./db', () => ({
  db: {
    select: jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{ id: 'test-user-id', isBlocked: false }])
        })
      })
    })
  },
  pool: {
    connect: jest.fn().mockResolvedValue({ release: jest.fn() })
  }
}));

// Mock storage.ts so it doesn't try to connect to the db
jest.mock('./storage', () => ({
  storage: {
    getUser: jest.fn().mockResolvedValue({ id: 'test-user-id', isBlocked: false }),
  }
}));

import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import telemetryRoutes from './telemetry-routes';

// Dummy auth middleware to satisfy requireAuthWithPasswordCheck
function dummyAuth(req: any, res: any, next: any) {
    // Simulate an authenticated user
    (req as any).session = { userId: 'test-user-id' };
    next();
}

// Create an app that uses the dummy auth before the telemetry routes
function createApp() {
    const app = express();
    app.use(express.json());
    // Replace the real auth middleware with dummy for testing
    app.use(dummyAuth);
    app.use('/api', telemetryRoutes);
    // Error handler to avoid unhandled errors in tests
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error('Unhandled error in test app:', err);
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
            .expect(200)
            .expect(res => {
                if (!res.body.success) throw new Error('expected success flag');
            });
    });

    it('should reject when event name is missing', async () => {
        const app = createApp();
        await request(app)
            .post('/api/telemetry')
            .send({ data: {} })
            .expect(400)
            .expect(res => {
                if (!res.body.error) throw new Error('expected error message');
            });
    });
});
