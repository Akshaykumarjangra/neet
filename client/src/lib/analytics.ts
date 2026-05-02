/**
 * Unified analytics fan-out (Phase 5/09). PostHog + GA4 + internal events table.
 */
type Props = Record<string, any>;

declare global { interface Window { posthog?: any; gtag?: any; } }

export function track(event: string, props: Props = {}) {
  try {
    window.posthog?.capture?.(event, props);
    window.gtag?.("event", event, props);
    fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ event, props, ts: Date.now(), url: location.pathname }),
      keepalive: true,
    }).catch(() => {});
  } catch (e) { /* silent */ }
}

export function identify(userId: string | number, traits: Props = {}) {
  window.posthog?.identify?.(String(userId), traits);
  window.gtag?.("set", { user_id: String(userId) });
}

export function captureUTM() {
  const q = new URLSearchParams(location.search);
  const utm: Props = {};
  ["source", "medium", "campaign", "term", "content"].forEach(k => {
    const v = q.get(`utm_${k}`); if (v) utm[`utm_${k}`] = v;
  });
  if (Object.keys(utm).length) {
    sessionStorage.setItem("utm", JSON.stringify(utm));
    track("utm_capture", utm);
  }
  return utm;
}
