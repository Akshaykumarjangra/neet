// telemetry-routes.spec.ts – Jest tests for telemetry endpoint (runs in jest runner)

import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';

// Use standard Jest describes/its instead of node:test
// This file runs via standard jest. It previously used "node:test".

// Mock requireAuthWithPasswordCheck to avoid DB hits
jest.mock('./auth', () => ({
    requireAuthWithPasswordCheck: (req: Request, res: Response, next: NextFunction) => {
        (req as any).session = { userId: 'test-user-id' };
        next();
    },
    getCurrentUser: () => 'test-user-id'
}));

import telemetryRoutes from './telemetry-routes';

function createApp() {
    const app = express();
    app.use(express.json());
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
