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

// Force unregister all Service Workers to clear stale caches causing routing errors
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
        .then(success => {
          if (success) console.log('Successfully unregistered stale ServiceWorker.');
        })
        .catch(err => console.error('Failed to unregister ServiceWorker:', err));
    }
  }).catch(err => console.error('Error getting ServiceWorker registrations:', err));
  
  // Also clear caches to ensure fresh files are loaded
  if ('caches' in window) {
    caches.keys().then((names) => {
      for (const name of names) {
        caches.delete(name);
      }
    });
  }
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
