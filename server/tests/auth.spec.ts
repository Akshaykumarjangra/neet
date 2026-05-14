import { test, describe, mock, afterEach } from 'node:test';
import assert from 'node:assert/strict';

// MUST MOCK POOL CONNECT BEFORE IMPORTING DB OR AUTH
import { Pool } from 'pg';
mock.method(Pool.prototype, 'connect', async () => {
  return {
    query: async () => ({ rows: [] }),
    release: () => {},
  };
});
mock.method(global, 'setTimeout', (cb) => { if (typeof cb === 'function') cb(); });

const { authenticateUser } = await import('../auth.ts');
const { db } = await import('../db.ts');

describe('authenticateUser error handling', () => {
  afterEach(() => {
    // Only restore specific mocks inside the test so the DB connection mocking remains active for other tests
  });

  test('should return null and log error when db query fails', async () => {
    const error = new Error('Database connection failed');
    const dbMock = mock.method(db, 'select', () => {
      throw error;
    });

    const consoleErrorMock = mock.method(console, 'error', () => {});

    const result = await authenticateUser('test@example.com', 'password123');

    assert.equal(result, null);
    assert.equal(consoleErrorMock.mock.calls.length, 1);
    assert.equal(consoleErrorMock.mock.calls[0].arguments[0], 'authenticateUser error:');
    assert.equal(consoleErrorMock.mock.calls[0].arguments[1], error);

    dbMock.mock.restore();
    consoleErrorMock.mock.restore();
  });
});
