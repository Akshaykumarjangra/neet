import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { AntiCheat } from "./anti-cheat";

class MockEvent {
  defaultPrevented = false;
  constructor(public type: string) {}
  preventDefault() {
    this.defaultPrevented = true;
  }
}

describe("AntiCheat", () => {
  let listeners: Record<string, EventListener[]> = {};

  beforeEach(() => {
    listeners = {};

    const mockAddEventListener = (event: string, cb: EventListener) => {
      listeners[event] = listeners[event] || [];
      listeners[event].push(cb);
    };

    const mockRemoveEventListener = (event: string, cb: EventListener) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter(l => l !== cb);
      }
    };

    Object.defineProperty(globalThis, 'window', {
      value: {
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      },
      configurable: true,
      writable: true,
    });

    Object.defineProperty(globalThis, 'document', {
      value: {
        documentElement: {},
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
        fullscreenElement: null,
        exitFullscreen: async () => {},
      },
      configurable: true,
      writable: true,
    });

    Object.defineProperty(globalThis, 'navigator', {
      value: { userAgent: 'test-agent', language: 'en-US', hardwareConcurrency: 4, deviceMemory: 8 },
      configurable: true,
      writable: true,
    });

    Object.defineProperty(globalThis, 'screen', {
      value: { width: 1920, height: 1080 },
      configurable: true,
      writable: true,
    });

    // Polyfill for crypto.subtle in Node 18/20 if necessary, though v22 should have it globally.
    // If we want to be safe, we can mock crypto if it doesn't exist, but it works on Node 22 natively.
  });

  afterEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).document;
    delete (globalThis as any).navigator;
    delete (globalThis as any).screen;
  });

  it("should initialize, request fullscreen and generate a fingerprint", async () => {
    const ac = new AntiCheat();

    let fullscreenRequested = false;
    const mockEl = {
      requestFullscreen: async () => { fullscreenRequested = true; }
    } as any;

    await ac.start(mockEl);

    assert.equal(fullscreenRequested, true, "requestFullscreen should be called");

    const snap = ac.snapshot();
    assert.equal(snap.blurCount, 0);
    assert.equal(typeof snap.fingerprint, "string");
    assert(snap.fingerprint.length > 0);

    ac.stop();
  });

  it("should handle requestFullscreen rejection gracefully", async () => {
    const ac = new AntiCheat();

    const mockEl = {
      requestFullscreen: async () => { throw new Error("Denied"); }
    } as any;

    await ac.start(mockEl); // Should not throw

    const snap = ac.snapshot();
    assert.equal(typeof snap.fingerprint, "string");

    ac.stop();
  });

  it("should track blur events and call onBlur callback", async () => {
    let blurCountTriggered = 0;
    const ac = new AntiCheat({
      onBlur: (c) => { blurCountTriggered = c; }
    });

    await ac.start({ requestFullscreen: async () => {} } as any);

    assert(listeners['blur'] && listeners['blur'].length === 1);

    // Trigger blur twice
    listeners['blur'][0](new MockEvent('blur') as any);
    listeners['blur'][0](new MockEvent('blur') as any);

    const snap = ac.snapshot();
    assert.equal(snap.blurCount, 2, "Blur count should be 2");
    assert.equal(blurCountTriggered, 2, "Callback should be called with latest count");

    ac.stop();
  });

  it("should track fullscreenchange and call onFullscreenExit when exiting fullscreen", async () => {
    let exitFullscreenTriggered = false;
    const ac = new AntiCheat({
      onFullscreenExit: () => { exitFullscreenTriggered = true; }
    });

    await ac.start({ requestFullscreen: async () => {} } as any);

    assert(listeners['fullscreenchange'] && listeners['fullscreenchange'].length === 1);

    // Trigger fullscreenchange while still in fullscreen
    globalThis.document.fullscreenElement = {} as any;
    listeners['fullscreenchange'][0](new MockEvent('fullscreenchange') as any);
    assert.equal(exitFullscreenTriggered, false, "Should not trigger if still in fullscreen");

    // Trigger fullscreenchange when not in fullscreen
    globalThis.document.fullscreenElement = null;
    listeners['fullscreenchange'][0](new MockEvent('fullscreenchange') as any);
    assert.equal(exitFullscreenTriggered, true, "Should trigger when no fullscreen element");

    ac.stop();
  });

  it("should block and track copy, contextmenu, and paste events", async () => {
    let copyTriggered = false;
    let ctxMenuTriggered = false;
    let pasteTriggered = false;

    const ac = new AntiCheat({
      onCopyAttempt: () => { copyTriggered = true; },
      onContextMenu: () => { ctxMenuTriggered = true; },
      onPaste: () => { pasteTriggered = true; }
    });

    await ac.start({ requestFullscreen: async () => {} } as any);

    const copyEvent = new MockEvent('copy');
    listeners['copy'][0](copyEvent as any);
    assert.equal(copyTriggered, true);
    assert.equal(copyEvent.defaultPrevented, true);

    const ctxEvent = new MockEvent('contextmenu');
    listeners['contextmenu'][0](ctxEvent as any);
    assert.equal(ctxMenuTriggered, true);
    assert.equal(ctxEvent.defaultPrevented, true);

    const pasteEvent = new MockEvent('paste');
    listeners['paste'][0](pasteEvent as any);
    assert.equal(pasteTriggered, true);
    assert.equal(pasteEvent.defaultPrevented, true);

    ac.stop();
  });

  it("should remove all listeners and exit fullscreen on stop", async () => {
    const ac = new AntiCheat();
    let exitFullscreenCalled = false;
    globalThis.document.exitFullscreen = async () => { exitFullscreenCalled = true; };
    globalThis.document.fullscreenElement = {} as any; // Mock being in fullscreen

    await ac.start({ requestFullscreen: async () => {} } as any);

    assert.equal(listeners['blur'].length, 1);
    assert.equal(listeners['copy'].length, 1);

    ac.stop();

    assert.equal(listeners['blur'].length, 0);
    assert.equal(listeners['fullscreenchange'].length, 0);
    assert.equal(listeners['copy'].length, 0);
    assert.equal(listeners['contextmenu'].length, 0);
    assert.equal(listeners['paste'].length, 0);
    assert.equal(exitFullscreenCalled, true);
  });
});
