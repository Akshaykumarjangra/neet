// telemetry-routes.spec.ts – Jest + Supertest tests for telemetry endpoint

import express, { Request, Response, NextFunction } from 'express';
import { describe, it } from 'node:test';
import request from 'supertest';

import pg from 'pg';
import test from 'node:test';

// Note: We cannot easily mock the ES module export of `auth` without encountering
// `TypeError: Cannot redefine property`, and we cannot mock `pg` perfectly to
// bypass all db initialization logic via import time side-effects without changing `server/db.ts`.
// However, since `auth.ts` imports `db.ts`, and `db.ts` sets up the connection pool on import,
// we will mock `pg.Pool` prototype methods right here *before* importing anything that touches the DB.

// Mock DB connection timeouts to prevent hang
test.mock.method(pg.Pool.prototype, 'connect', async () => ({
    query: async () => ({ rows: [] }),
    release: () => {}
}));
// Also mock `query` on the pool
test.mock.method(pg.Pool.prototype, 'query', async () => ({ rows: [] }));

// Bypass the retry delay in `testConnection`
test.mock.method(global, 'setTimeout', ((fn: Function) => fn()) as any);

// Dynamic imports are required so that our mocks take effect BEFORE the imported modules execute.
let telemetryRoutes: any;
let auth: any;

// We will use a before block to dynamically import the route handlers

// Create an app that uses the mocked auth before the telemetry routes
function createApp() {
    const app = express();
    app.use(express.json());
    app.use((req, res, next) => {
        // We override the auth checking so we don't have to mock db.select
        // by making getCurrentUser happy and pretending requireAuth... passed.
        (req as any).session = { userId: 'test-user-id' };
        // The router will still run requireAuthWithPasswordCheck.
        // It relies on `req.session.userId`, and we are stubbing out `db.select`
        // or just letting it return empty rows. Let's mock db.select to avoid crashes.
        next();
    });
    app.use('/api', telemetryRoutes.default || telemetryRoutes);
    // Error handler to avoid unhandled errors in tests
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error('Unhandled error in test app:', err);
        res.status(500).json({ error: 'internal' });
    });
    return app;
}

describe('Telemetry Route', () => {
    test.before(async () => {
        telemetryRoutes = await import('./telemetry-routes');

        // Let's also mock the DB query executed in requireAuthWithPasswordCheck
        const { db } = await import('./db');
        // Actually, we mocked pg.Pool.query so `db.select` will return `[]`.
        // This makes `user` undefined in `auth.ts`, so `user?.mustChangePassword` is falsy,
        // and next() is called! Perfect.
    });

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
