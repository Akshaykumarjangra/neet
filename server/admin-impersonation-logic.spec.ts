import { describe, it, mock } from "node:test";
import * as assert from "node:assert/strict";
import { Request, Response, NextFunction } from "express";
import { enforceImpersonationTimeLimit, MAX_IMPERSONATION_MS } from "./admin-impersonation-logic";

describe("admin-impersonation-logic", () => {
    describe("enforceImpersonationTimeLimit", () => {
        it("should call next if no active impersonation session (no originalAdminId)", () => {
            const req = { session: {} } as unknown as Request;
            const res = {} as unknown as Response;
            const nextFn = mock.fn();
            const next = nextFn as unknown as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(nextFn.mock.calls.length, 1);
        });

        it("should call next if impersonationStartedAt is missing", () => {
            const req = {
                session: {
                    originalAdminId: "admin-1"
                }
            } as unknown as Request;
            const res = {} as unknown as Response;
            const nextFn = mock.fn();
            const next = nextFn as unknown as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(nextFn.mock.calls.length, 1);
        });

        it("should call next if impersonationStartedAt is within MAX_IMPERSONATION_MS", () => {
            const now = Date.now();
            const req = {
                session: {
                    originalAdminId: "admin-1",
                    impersonationStartedAt: now - (MAX_IMPERSONATION_MS - 1000) // 1 second before expiration
                }
            } as unknown as Request;
            const res = {} as unknown as Response;
            const nextFn = mock.fn();
            const next = nextFn as unknown as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(nextFn.mock.calls.length, 1);
        });

        it("should reject with 440 status if impersonationStartedAt exceeds MAX_IMPERSONATION_MS", () => {
            const now = Date.now();
            const req = {
                session: {
                    originalAdminId: "admin-1",
                    impersonationStartedAt: now - (MAX_IMPERSONATION_MS + 1000) // 1 second after expiration
                }
            } as unknown as Request;

            const jsonMock = mock.fn();
            const statusMock = mock.fn(() => ({ json: jsonMock }));
            const res = {
                status: statusMock
            } as unknown as Response;

            const nextFn = mock.fn();
            const next = nextFn as unknown as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(nextFn.mock.calls.length, 0); // next() should not be called
            assert.equal(statusMock.mock.calls.length, 1);
            assert.deepEqual(statusMock.mock.calls[0].arguments, [440]);

            assert.equal(jsonMock.mock.calls.length, 1);
            assert.deepEqual(jsonMock.mock.calls[0].arguments, [{
                error: "Impersonation session expired (1 hour max). Please call /impersonate/stop.",
                code: "IMPERSONATION_EXPIRED",
            }]);
        });
    });
});
