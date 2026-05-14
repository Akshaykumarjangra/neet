import { test, describe, it, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { AntiCheat } from './anti-cheat';

describe('AntiCheat', () => {
  let eventListeners: Record<string, Function[]> = {};
  let documentEventListeners: Record<string, Function[]> = {};

  beforeEach(() => {
    eventListeners = {};
    documentEventListeners = {};

    (globalThis as any).window = {
      addEventListener: (evt: string, cb: Function) => {
        if (!eventListeners[evt]) eventListeners[evt] = [];
        eventListeners[evt].push(cb);
      },
      removeEventListener: (evt: string, cb: Function) => {
        if (eventListeners[evt]) {
          eventListeners[evt] = eventListeners[evt].filter(fn => fn !== cb);
        }
      }
    };

    (globalThis as any).document = {
      documentElement: {
        requestFullscreen: mock.fn(async () => {})
      },
      fullscreenElement: null,
      addEventListener: (evt: string, cb: Function) => {
        if (!documentEventListeners[evt]) documentEventListeners[evt] = [];
        documentEventListeners[evt].push(cb);
      },
      removeEventListener: (evt: string, cb: Function) => {
        if (documentEventListeners[evt]) {
          documentEventListeners[evt] = documentEventListeners[evt].filter(fn => fn !== cb);
        }
      },
      exitFullscreen: mock.fn(async () => {})
    };

    Object.defineProperty(globalThis, 'navigator', {
      value: {
        userAgent: 'test-agent',
        language: 'en-US',
        hardwareConcurrency: 4,
        deviceMemory: 8
      },
      configurable: true
    });

    (globalThis as any).screen = {
      width: 1920,
      height: 1080
    };
  });

  afterEach(() => {
    delete (globalThis as any).window;
    delete (globalThis as any).document;
    delete (globalThis as any).screen;
    // restore navigator property if necessary, but deleting it usually throws, so we redefine or leave it.
    // actually, in node 22, globalThis.navigator is read-only.
    // By doing Object.defineProperty with configurable: true, we override it.
  });

  it('should initialize and attach event listeners on start()', async () => {
    const ac = new AntiCheat();
    await ac.start();

    assert.equal(eventListeners['blur'].length, 1);
    assert.equal(documentEventListeners['fullscreenchange'].length, 1);
    assert.equal(documentEventListeners['copy'].length, 1);
    assert.equal(documentEventListeners['contextmenu'].length, 1);
    assert.equal(documentEventListeners['paste'].length, 1);

    assert.equal(((globalThis as any).document.documentElement.requestFullscreen as any).mock.callCount(), 1);
  });

  it('should handle requestFullscreen rejection gracefully', async () => {
    (globalThis as any).document.documentElement.requestFullscreen = mock.fn(async () => {
      throw new Error('Fullscreen denied');
    });

    const ac = new AntiCheat();
    // Should not throw
    await ac.start();

    assert.equal(((globalThis as any).document.documentElement.requestFullscreen as any).mock.callCount(), 1);
  });

  it('should track blur events correctly', async () => {
    let onBlurCount = 0;
    const ac = new AntiCheat({
      onBlur: (count) => { onBlurCount = count; }
    });

    await ac.start();

    // Simulate blur event
    eventListeners['blur'][0]();
    assert.equal(onBlurCount, 1);

    eventListeners['blur'][0]();
    assert.equal(onBlurCount, 2);

    const snap = ac.snapshot();
    assert.equal(snap.blurCount, 2);
  });

  it('should handle fullscreen exit event', async () => {
    let fullscreenExitCalled = false;
    const ac = new AntiCheat({
      onFullscreenExit: () => { fullscreenExitCalled = true; }
    });

    await ac.start();

    // Still in fullscreen (fullscreenElement is truthy)
    (globalThis as any).document.fullscreenElement = {};
    documentEventListeners['fullscreenchange'][0]();
    assert.equal(fullscreenExitCalled, false);

    // Exited fullscreen (fullscreenElement is null)
    (globalThis as any).document.fullscreenElement = null;
    documentEventListeners['fullscreenchange'][0]();
    assert.equal(fullscreenExitCalled, true);
  });

  it('should prevent default on blocked events and trigger callbacks', async () => {
    let copyCalled = false;
    let ctxCalled = false;
    let pasteCalled = false;

    const ac = new AntiCheat({
      onCopyAttempt: () => { copyCalled = true; },
      onContextMenu: () => { ctxCalled = true; },
      onPaste: () => { pasteCalled = true; }
    });

    await ac.start();

    const mockEvent = {
      preventDefault: mock.fn()
    };

    documentEventListeners['copy'][0](mockEvent);
    assert.equal(mockEvent.preventDefault.mock.callCount(), 1);
    assert.equal(copyCalled, true);

    documentEventListeners['contextmenu'][0](mockEvent);
    assert.equal(mockEvent.preventDefault.mock.callCount(), 2);
    assert.equal(ctxCalled, true);

    documentEventListeners['paste'][0](mockEvent);
    assert.equal(mockEvent.preventDefault.mock.callCount(), 3);
    assert.equal(pasteCalled, true);
  });

  it('should clean up event listeners and exit fullscreen on stop()', async () => {
    const ac = new AntiCheat();
    await ac.start();

    assert.equal(eventListeners['blur'].length, 1);
    assert.equal(documentEventListeners['copy'].length, 1);

    // Simulate being in fullscreen
    (globalThis as any).document.fullscreenElement = {};

    ac.stop();

    assert.equal(eventListeners['blur'].length, 0);
    assert.equal(documentEventListeners['fullscreenchange'].length, 0);
    assert.equal(documentEventListeners['copy'].length, 0);
    assert.equal(documentEventListeners['contextmenu'].length, 0);
    assert.equal(documentEventListeners['paste'].length, 0);

    assert.equal((globalThis as any).document.exitFullscreen.mock.callCount(), 1);
  });

  it('should handle exitFullscreen rejection gracefully on stop()', async () => {
    const ac = new AntiCheat();
    await ac.start();

    (globalThis as any).document.fullscreenElement = {};
    (globalThis as any).document.exitFullscreen = mock.fn(async () => {
      throw new Error('Exit fullscreen failed');
    });

    // Should not throw
    ac.stop();
    assert.equal((globalThis as any).document.exitFullscreen.mock.callCount(), 1);
  });

  it('should generate a browser fingerprint on start()', async () => {
    const ac = new AntiCheat();

    let snap = ac.snapshot();
    assert.equal(snap.fingerprint, undefined);

    await ac.start();

    snap = ac.snapshot();
    assert.equal(typeof snap.fingerprint, 'string');
    assert.equal(snap.fingerprint.length, 64); // SHA-256 hash length in hex
  });
});
