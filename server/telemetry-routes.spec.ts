import { describe, it } from "node:test";
import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import telemetryRoutes from './telemetry-routes';

// We cannot mutate the auth module directly in ES Modules easily.
// Let's use jest.mock if we were in jest, but we are using node:test.
// The easiest way is to provide a session directly. The router will call auth.
// Actually, telemetry-routes uses `import { requireAuthWithPasswordCheck } from './auth';`
// Which we can't easily mock in node:test without loaders.
// But we *can* just avoid calling the db if the user has NO session, since requireAuth returns 401 right away.
// Wait, we need it to pass auth to test the telemetry handler.
// Since we don't have a DB, requireAuthWithPasswordCheck will throw or timeout.
// Let's just mock `db.select` on the drizzle object to avoid the timeout!

import { db } from './db';

// Mock DB
(db as any).select = () => ({
    from: () => ({
        where: () => ({
            limit: () => Promise.resolve([{ mustChangePassword: false }])
        })
    })
});

function createApp() {
    const app = express();
    app.use(express.json());
    // Provide a fake session
    app.use((req: Request, res: Response, next: NextFunction) => {
        (req as any).session = { userId: 'test-user-id' };
        next();
    });
    app.use('/api', telemetryRoutes);
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
