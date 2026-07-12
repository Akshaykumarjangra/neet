import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import telemetryRoutes from './telemetry-routes';

// Mock the db connection bypass if necessary
jest.mock('./db', () => ({
  db: {
    insert: jest.fn().mockReturnValue({
      values: jest.fn().mockResolvedValue({})
    }),
    select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
                limit: jest.fn().mockResolvedValue([{ id: 'test-user-id' }])
            })
        })
    })
  },
}));

// We also need to prevent 'pg' Pool from trying to connect if it's imported anywhere
jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn().mockResolvedValue({ release: jest.fn() }),
    query: jest.fn(),
    end: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

// Mock auth middleware imports
jest.mock('./auth', () => ({
  requireAuthWithPasswordCheck: (req: Request, res: Response, next: NextFunction) => {
    (req as any).user = 'test-user-id';
    next();
  },
  getCurrentUser: () => 'test-user-id'
}));

function createApp() {
    const app = express();
    app.use(express.json());
    // Since requireAuthWithPasswordCheck verifies users via DB, we mock the auth middleware itself
    app.use('/api', telemetryRoutes);
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error('Unhandled error in test app:', err);
        res.status(500).json({ error: 'Test setup error' });
    });
    return app;
}

describe('Telemetry Route', () => {
    it('should accept a valid telemetry event', async () => {
        const app = createApp();
        const response = await request(app)
            .post('/api/telemetry')
            .send({ event: 'test_event', data: { key: 'value' } });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });
    });

    it('should reject when event name is missing', async () => {
        const app = createApp();
        const response = await request(app)
            .post('/api/telemetry')
            .send({ data: { key: 'value' } });
        expect(response.status).toBe(400);
    });
});
