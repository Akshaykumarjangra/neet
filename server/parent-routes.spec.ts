// @ts-nocheck
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import { generateParentLinkToken, PARENT_LINK_TYPE } from "./parent-routes-utils";

describe("generateParentLinkToken", () => {
  let originalParentSecret: string | undefined;
  let originalSessionSecret: string | undefined;

  beforeEach(() => {
    originalParentSecret = process.env.PARENT_LINK_SECRET;
    originalSessionSecret = process.env.SESSION_SECRET;
    process.env.PARENT_LINK_SECRET = "test-secret";
  });

  afterEach(() => {
    if (originalParentSecret !== undefined) {
      process.env.PARENT_LINK_SECRET = originalParentSecret;
    } else {
      delete process.env.PARENT_LINK_SECRET;
    }

    if (originalSessionSecret !== undefined) {
      process.env.SESSION_SECRET = originalSessionSecret;
    } else {
      delete process.env.SESSION_SECRET;
    }
  });

  it("generates a valid JWT with the correct payload", () => {
    const studentId = "student-123";
    const token = generateParentLinkToken(studentId);

    assert.equal(typeof token, "string");

    const decoded = jwt.verify(token, "test-secret") as jwt.JwtPayload;

    assert.equal(decoded.studentId, studentId);
    assert.equal(decoded.type, PARENT_LINK_TYPE);

    // Check expiry exists and is in the future
    assert.ok(decoded.exp);
    assert.ok(decoded.exp > Math.floor(Date.now() / 1000));
  });

  it("throws an error if no secret is available", () => {
    delete process.env.PARENT_LINK_SECRET;
    delete process.env.SESSION_SECRET;

    let errorThrown = false;
    try {
      generateParentLinkToken("student-123");
    } catch (e: any) {
      errorThrown = true;
      assert.equal(e.message, "PARENT_LINK_SECRET or SESSION_SECRET must be set");
    }
    assert.ok(errorThrown, "Expected an error to be thrown");
  });
});
