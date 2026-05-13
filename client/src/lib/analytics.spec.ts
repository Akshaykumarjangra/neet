import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { identify } from "./analytics.ts";

describe("analytics.identify", () => {
  let originalWindow: any;

  beforeEach(() => {
    originalWindow = (global as any).window;
    (global as any).window = {};
  });

  afterEach(() => {
    (global as any).window = originalWindow;
  });

  it("calls posthog and gtag with correct arguments", () => {
    let posthogCalled = false;
    let gtagCalled = false;

    (global as any).window.posthog = {
      identify: (id: string, traits: any) => {
        assert.equal(id, "123");
        assert.deepEqual(traits, { email: "test@example.com" });
        posthogCalled = true;
      }
    };

    (global as any).window.gtag = (cmd: string, opts: any) => {
      assert.equal(cmd, "set");
      assert.deepEqual(opts, { user_id: "123" });
      gtagCalled = true;
    };

    identify("123", { email: "test@example.com" });

    assert.equal(posthogCalled, true);
    assert.equal(gtagCalled, true);
  });

  it("handles missing posthog and gtag gracefully", () => {
    (global as any).window = {};
    assert.doesNotThrow(() => {
      identify("123", { email: "test@example.com" });
    });
  });

  it("handles missing identify and gtag functions gracefully", () => {
    (global as any).window = {
      posthog: {},
    };
    assert.doesNotThrow(() => {
      identify("123", { email: "test@example.com" });
    });
  });
});
