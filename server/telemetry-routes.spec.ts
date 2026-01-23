// telemetry-routes.spec.ts – Jest + Supertest tests for telemetry endpoint

import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
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
    // Replace the real auth middleware with dummy for testing
    // The telemetryRoutes file imports requireAuthWithPasswordCheck internally,
    // but we can mount the router after applying dummy auth globally.
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
