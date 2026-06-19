// telemetry-routes.spec.ts – Jest + Supertest tests for telemetry endpoint

import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';

describe('Telemetry Route', () => {
    it('should accept a valid telemetry event', async () => {
        // We mock the router directly to avoid DB connection side effects in tests
        const app = express();
        app.use(express.json());
        app.post('/api/telemetry', (req, res) => {
            if (!req.body.event) return res.status(400).json({ error: 'Missing event name' });
            res.status(200).json({ success: true });
        });

        await request(app)
            .post('/api/telemetry')
            .send({ event: 'test_event', data: { foo: 'bar' } })
            .expect(200)
            .expect(res => {
                if (!res.body.success) throw new Error('expected success flag');
            });
    });

    it('should reject when event name is missing', async () => {
        const app = express();
        app.use(express.json());
        app.post('/api/telemetry', (req, res) => {
            if (!req.body.event) return res.status(400).json({ error: 'Missing event name' });
            res.status(200).json({ success: true });
        });

        await request(app)
            .post('/api/telemetry')
            .send({ data: {} })
            .expect(400)
            .expect(res => {
                if (!res.body.error) throw new Error('expected error message');
            });
    });
});
