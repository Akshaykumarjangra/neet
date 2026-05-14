import test from "node:test";
import assert from "node:assert";

import "../test-setup"; // Import the setup to mock the db connection

import { hashPassword, verifyPassword } from "../../server/auth";

test("hashPassword and verifyPassword", async (t) => {
  await t.test("verifyPassword correctly matches a password and its hash", async () => {
    const password = "mySecretPassword123!";
    const hash = await hashPassword(password);

    const result = await verifyPassword(password, hash);
    assert.strictEqual(result, true, "verifyPassword should return true for correct password");
  });

  await t.test("verifyPassword returns false for incorrect password", async () => {
    const password = "mySecretPassword123!";
    const wrongPassword = "wrongPassword456!";
    const hash = await hashPassword(password);

    const result = await verifyPassword(wrongPassword, hash);
    assert.strictEqual(result, false, "verifyPassword should return false for incorrect password");
  });
});
