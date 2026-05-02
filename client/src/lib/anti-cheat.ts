/**
 * Mock-test anti-cheat client utilities (Phase 7/04).
 * Caller decides what to do with the events (warn / flag / submit).
 */
export interface AntiCheatEvents {
  onBlur?: (count: number) => void;
  onFullscreenExit?: () => void;
  onCopyAttempt?: () => void;
  onContextMenu?: () => void;
  onPaste?: () => void;
}

export class AntiCheat {
  private blurCount = 0;
  private fingerprint?: string;
  private cleanup: (() => void)[] = [];

  constructor(private events: AntiCheatEvents = {}) {}

  async start(el: HTMLElement = document.documentElement) {
    try { await el.requestFullscreen(); } catch {}
    const onBlur = () => { this.blurCount++; this.events.onBlur?.(this.blurCount); };
    const onFs = () => { if (!document.fullscreenElement) this.events.onFullscreenExit?.(); };
    const block = (cb?: () => void) => (e: Event) => { e.preventDefault(); cb?.(); };
    const copy = block(this.events.onCopyAttempt);
    const ctx = block(this.events.onContextMenu);
    const paste = block(this.events.onPaste);
    window.addEventListener("blur", onBlur);
    document.addEventListener("fullscreenchange", onFs);
    document.addEventListener("copy", copy);
    document.addEventListener("contextmenu", ctx);
    document.addEventListener("paste", paste);
    this.cleanup.push(
      () => window.removeEventListener("blur", onBlur),
      () => document.removeEventListener("fullscreenchange", onFs),
      () => document.removeEventListener("copy", copy),
      () => document.removeEventListener("contextmenu", ctx),
      () => document.removeEventListener("paste", paste),
    );
    this.fingerprint = await fingerprintBrowser();
  }

  stop() { this.cleanup.forEach(fn => fn()); this.cleanup = []; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }
  snapshot() { return { blurCount: this.blurCount, fingerprint: this.fingerprint }; }
}

async function fingerprintBrowser(): Promise<string> {
  const data = [
    navigator.userAgent, navigator.language, screen.width + "x" + screen.height,
    new Date().getTimezoneOffset(), navigator.hardwareConcurrency, (navigator as any).deviceMemory,
  ].join("|");
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}
