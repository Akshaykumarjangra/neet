// @ts-nocheck
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { enforceImpersonationTimeLimit, MAX_IMPERSONATION_MS } from "./admin-impersonation-utils.ts";

describe("enforceImpersonationTimeLimit middleware", () => {
  it("should call next() if not impersonating", () => {
    let nextCalled = false;
    const req = { session: {} };
    const res = {};
    const next = () => { nextCalled = true; };

    enforceImpersonationTimeLimit(req, res, next);
    assert.strictEqual(nextCalled, true);
  });

  it("should call next() if impersonation is within time limit", () => {
    let nextCalled = false;
    const req = {
      session: {
        originalAdminId: 1,
        impersonationStartedAt: Date.now() - 1000 // 1 second ago
      }
    };
    const res = {};
    const next = () => { nextCalled = true; };

    enforceImpersonationTimeLimit(req, res, next);
    assert.strictEqual(nextCalled, true);
  });

  it("should return 440 if impersonation exceeds time limit", () => {
    let nextCalled = false;
    let statusSet = null;
    let jsonSent = null;

    const req = {
      session: {
        originalAdminId: 1,
        impersonationStartedAt: Date.now() - (MAX_IMPERSONATION_MS + 1000) // Exceeded by 1 second
      }
    };
    const res = {
      status: (code) => {
        statusSet = code;
        return res;
      },
      json: (data) => {
        jsonSent = data;
        return res;
      }
    };
    const next = () => { nextCalled = true; };

    enforceImpersonationTimeLimit(req, res, next);

    assert.strictEqual(nextCalled, false, "next() should not be called");
    assert.strictEqual(statusSet, 440, "Status should be 440");
    assert.strictEqual(jsonSent.code, "IMPERSONATION_EXPIRED");
  });
});
