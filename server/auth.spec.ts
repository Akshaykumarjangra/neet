import "./test-setup";
import { describe, it, after } from "node:test";
import * as assert from "node:assert/strict";
import { getCurrentUser } from "./auth";
import { pool } from "./db";
import type { Request } from "express";

describe("auth utils", () => {
  after(() => {
    pool.end();
  });

  describe("getCurrentUser", () => {
    it("returns userId when it exists in session", () => {
      const mockReq = { session: { userId: "user-123" } } as unknown as Request;
      assert.equal(getCurrentUser(mockReq), "user-123");
    });

    it("returns null when session has no userId", () => {
      const mockReq = { session: {} } as unknown as Request;
      assert.equal(getCurrentUser(mockReq), null);
    });

    it("returns null when session userId is undefined", () => {
      const mockReq = { session: { userId: undefined } } as unknown as Request;
      assert.equal(getCurrentUser(mockReq), null);
    });
  });
});
