import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { Request, Response, NextFunction } from "express";
import { enforceImpersonationTimeLimit, MAX_IMPERSONATION_MS } from "./admin-impersonation-logic";

describe("admin-impersonation-logic", () => {
    describe("enforceImpersonationTimeLimit", () => {
        it("should call next if no active impersonation session (no originalAdminId)", () => {
            const req = { session: {} } as Request;
            const res = {} as Response;
            const next = mock.fn() as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(next.mock.calls.length, 1);
        });

        it("should call next if impersonationStartedAt is missing", () => {
            const req = {
                session: {
                    originalAdminId: "admin-1"
                }
            } as Request;
            const res = {} as Response;
            const next = mock.fn() as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(next.mock.calls.length, 1);
        });

        it("should call next if impersonationStartedAt is within MAX_IMPERSONATION_MS", () => {
            const now = Date.now();
            const req = {
                session: {
                    originalAdminId: "admin-1",
                    impersonationStartedAt: now - (MAX_IMPERSONATION_MS - 1000) // 1 second before expiration
                }
            } as Request;
            const res = {} as Response;
            const next = mock.fn() as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(next.mock.calls.length, 1);
        });

        it("should reject with 440 status if impersonationStartedAt exceeds MAX_IMPERSONATION_MS", () => {
            const now = Date.now();
            const req = {
                session: {
                    originalAdminId: "admin-1",
                    impersonationStartedAt: now - (MAX_IMPERSONATION_MS + 1000) // 1 second after expiration
                }
            } as Request;

            const jsonMock = mock.fn();
            const res = {
                status: mock.fn(() => ({ json: jsonMock }))
            } as unknown as Response;

            const next = mock.fn() as NextFunction;

            enforceImpersonationTimeLimit(req, res, next);

            assert.equal(next.mock.calls.length, 0); // next() should not be called
            assert.equal(res.status.mock.calls.length, 1);
            assert.deepEqual(res.status.mock.calls[0].arguments, [440]);

            assert.equal(jsonMock.mock.calls.length, 1);
            assert.deepEqual(jsonMock.mock.calls[0].arguments, [{
                error: "Impersonation session expired (1 hour max). Please call /impersonate/stop.",
                code: "IMPERSONATION_EXPIRED",
            }]);
        });
    });
});
