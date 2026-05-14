import { test, describe, mock } from 'node:test';
import assert from 'node:assert';
import { csrfProtection, csrfTokenHandler } from './csrf.ts';
import type { Request, Response, NextFunction } from 'express';

function createMockResponse() {
    const res: any = {
        statusCode: 200,
        body: null
    };
    res.status = mock.fn((code: number) => {
        res.statusCode = code;
        return res;
    });
    res.json = mock.fn((data: any) => {
        res.body = data;
        return res;
    });
    return res;
}

function createMockRequest(options: any = {}) {
    return {
        path: options.path || '/',
        method: options.method || 'GET',
        session: options.session,
        headers: options.headers || {},
        body: options.body || {}
    };
}

describe('CSRF Protection Middleware', () => {
    test('skips exempted paths', () => {
        const middleware = csrfProtection({ ignorePaths: ['/api/webhook'] });
        const req = createMockRequest({ path: '/api/webhook/stripe', method: 'POST' });
        const res = createMockResponse();
        const next = mock.fn();

        middleware(req as any, res as any, next);

        assert.strictEqual(next.mock.calls.length, 1);
        assert.strictEqual(res.statusCode, 200);
    });

    test('skips if no session exists', () => {
        const middleware = csrfProtection();
        const req = createMockRequest({ method: 'POST' }); // no session
        const res = createMockResponse();
        const next = mock.fn();

        middleware(req as any, res as any, next);

        assert.strictEqual(next.mock.calls.length, 1);
    });

    test('generates token if not present in session for safe methods', () => {
        const middleware = csrfProtection();
        const session: any = {};
        const req = createMockRequest({ method: 'GET', session });
        const res = createMockResponse();
        const next = mock.fn();

        middleware(req as any, res as any, next);

        assert.ok(session.csrfToken);
        assert.strictEqual(typeof session.csrfToken, 'string');
        assert.strictEqual(next.mock.calls.length, 1);
    });

    test('blocks POST request without CSRF token', () => {
        const middleware = csrfProtection();
        const session: any = { csrfToken: 'valid-token' };
        const req = createMockRequest({ method: 'POST', session });
        const res = createMockResponse();
        const next = mock.fn();

        middleware(req as any, res as any, next);

        assert.strictEqual(next.mock.calls.length, 0);
        assert.strictEqual(res.statusCode, 403);
        assert.deepStrictEqual(res.body, { error: 'CSRF token missing' });
    });

    test('blocks POST request with invalid CSRF token header', () => {
        const middleware = csrfProtection();
        const session: any = { csrfToken: 'valid-token' };
        const req = createMockRequest({ method: 'POST', session, headers: { 'x-csrf-token': 'invalid-token' } });
        const res = createMockResponse();
        const next = mock.fn();

        middleware(req as any, res as any, next);

        assert.strictEqual(next.mock.calls.length, 0);
        assert.strictEqual(res.statusCode, 403);
        assert.deepStrictEqual(res.body, { error: 'CSRF token invalid' });
    });

    test('allows POST request with valid CSRF token header', () => {
        const middleware = csrfProtection();
        const session: any = { csrfToken: 'valid-token' };
        const req = createMockRequest({ method: 'POST', session, headers: { 'x-csrf-token': 'valid-token' } });
        const res = createMockResponse();
        const next = mock.fn();

        middleware(req as any, res as any, next);

        assert.strictEqual(next.mock.calls.length, 1);
        assert.strictEqual(res.statusCode, 200);
    });

    test('allows POST request with valid CSRF token in body', () => {
        const middleware = csrfProtection();
        const session: any = { csrfToken: 'valid-token' };
        const req = createMockRequest({ method: 'POST', session, body: { _csrf: 'valid-token' } });
        const res = createMockResponse();
        const next = mock.fn();

        middleware(req as any, res as any, next);

        assert.strictEqual(next.mock.calls.length, 1);
        assert.strictEqual(res.statusCode, 200);
    });

    test('csrfTokenHandler generates token and returns it', () => {
        const session: any = {};
        const req = createMockRequest({ session });
        const res = createMockResponse();

        csrfTokenHandler(req as any, res as any);

        assert.ok(session.csrfToken);
        assert.strictEqual(res.body.csrfToken, session.csrfToken);
    });

    test('csrfTokenHandler returns 500 if no session', () => {
        const req = createMockRequest();
        const res = createMockResponse();

        csrfTokenHandler(req as any, res as any);

        assert.strictEqual(res.statusCode, 500);
        assert.deepStrictEqual(res.body, { error: 'Session not initialized' });
    });
});
