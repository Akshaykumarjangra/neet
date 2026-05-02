import { createRoot } from "react-dom/client";
import App from "./App";
import "./variables.css";
import "./index.css";
import "./styles/premium.css";

// Ensure all fetch calls include credentials by default so session cookies are sent
const originalFetch = window.fetch.bind(window);
window.fetch = (input, init = {}) => {
  const nextInit = { credentials: "include", ...init };
  return originalFetch(input as RequestInfo, nextInit as RequestInit);
};

createRoot(document.getElementById("root")!).render(<App />);

// Register PWA Service Worker (Phase 6.3 — Offline Mode)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => console.log('[PWA] SW registered:', reg.scope))
      .catch((err) => console.warn('[PWA] SW registration failed:', err));
  });
}

// Web Vitals reporting (Phase 0.4 — Observability)
if (typeof PerformanceObserver !== 'undefined') {
  try {
    const vitalsBuffer: any[] = [];
    const flushVitals = () => {
      if (vitalsBuffer.length > 0) {
        fetch('/api/telemetry/vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vitalsBuffer.splice(0)),
        }).catch(() => {});
      }
    };

    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        vitalsBuffer.push({
          name: entry.entryType,
          value: entry.startTime,
          url: window.location.pathname,
        });
      }
      if (vitalsBuffer.length >= 5) flushVitals();
    });

    obs.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    // Flush on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushVitals();
    });
  } catch {}
}
