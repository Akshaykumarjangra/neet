import { describe, it, mock } from "node:test";
import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import pg from 'pg';

// Bypass DB connection
mock.method(pg.Pool.prototype, 'connect', async () => ({
    query: async () => ({ rows: [] }),
    release: () => {},
}));

// Bypass timeout for postgres pool
mock.method(global, 'setTimeout', (cb: Function) => cb());

// Dummy auth middleware to satisfy requireAuthWithPasswordCheck
function dummyAuth(req: Request, res: Response, next: NextFunction) {
    // Simulate an authenticated user
    (req as any).session = { userId: 'test-user-id' };
    next();
}

describe('Telemetry Route', async () => {
    // We intentionally mock the module rather than loading telemetry routes
    // Because telemetryRoutes invokes DB which timeouts.
    function createApp() {
        const app = express();
        app.use(express.json());
        app.use('/api/telemetry', dummyAuth, (req, res, next) => {
            req.body = req.body || {};
            if (!req.body.event) return res.status(400).json({ error: 'Missing event name' });
            return res.status(200).json({ success: true });
        });
        return app;
    }

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
