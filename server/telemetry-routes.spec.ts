// telemetry-routes.spec.ts – Jest + Supertest tests for telemetry endpoint

import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { describe, it, mock } from 'node:test';

import telemetryRoutes from './telemetry-routes';

// Create an app that uses the dummy auth before the telemetry routes
function createApp() {
    const app = express();
    app.use(express.json());

    // We overwrite the middleware on the router locally for tests
    // so we don't hit the DB or throw Auth required errors
    telemetryRoutes.stack.forEach((layer) => {
        if (layer.route && layer.route.path === '/telemetry') {
            // Find and replace the auth middleware directly
            const authIndex = layer.route.stack.findIndex((m: any) => m.name === 'requireAuthWithPasswordCheck');
            if (authIndex !== -1) {
                layer.route.stack[authIndex].handle = (req: Request, res: Response, next: NextFunction) => {
                    (req as any).session = { userId: 'test-user-id' };
                    (req as any).user = { id: 'test-user-id' };
                    next();
                };
            }
        }
    });

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
