import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { identify } from './analytics';

describe('analytics identify', () => {
  beforeEach(() => {
    (globalThis as any).window = {
      posthog: {
        identify: mock.fn()
      },
      gtag: mock.fn()
    };
  });

  afterEach(() => {
    delete (globalThis as any).window;
  });

  test('calls posthog and gtag with correct parameters when userId is string', () => {
    identify('user-123', { role: 'admin' });

    assert.equal((globalThis as any).window.posthog.identify.mock.calls.length, 1);
    assert.deepEqual((globalThis as any).window.posthog.identify.mock.calls[0].arguments, ['user-123', { role: 'admin' }]);

    assert.equal((globalThis as any).window.gtag.mock.calls.length, 1);
    assert.deepEqual((globalThis as any).window.gtag.mock.calls[0].arguments, ['set', { user_id: 'user-123' }]);
  });

  test('calls posthog and gtag with correct parameters when userId is number', () => {
    identify(456, { role: 'user' });

    assert.equal((globalThis as any).window.posthog.identify.mock.calls.length, 1);
    assert.deepEqual((globalThis as any).window.posthog.identify.mock.calls[0].arguments, ['456', { role: 'user' }]);

    assert.equal((globalThis as any).window.gtag.mock.calls.length, 1);
    assert.deepEqual((globalThis as any).window.gtag.mock.calls[0].arguments, ['set', { user_id: '456' }]);
  });

  test('handles missing posthog/gtag gracefully', () => {
    (globalThis as any).window = {};
    // Should not throw
    identify('123', { role: 'admin' });

    // Also test without traits
    identify('123');
  });
});
