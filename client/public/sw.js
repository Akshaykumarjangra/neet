/**
 * PWA Service Worker — Offline Mode
 * Phase 6.3 — Cache questions, flashcards, notes for offline use
 */
const CACHE_NAME = 'neet-prep-v1';
const STATIC_CACHE = 'neet-static-v1';
const DATA_CACHE = 'neet-data-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline',
];

const CACHEABLE_API_PATTERNS = [
  /\/api\/chapters\/.*/,
  /\/api\/questions\?/,
  /\/api\/flashcards/,
  /\/api\/learn\/keypoints/,
  /\/api\/learn\/formulas/,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== STATIC_CACHE && key !== DATA_CACHE)
        .map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API requests: network-first, fallback to cache
  if (url.pathname.startsWith('/api/')) {
    const isCacheable = CACHEABLE_API_PATTERNS.some(p => p.test(url.pathname));
    
    if (isCacheable) {
      event.respondWith(
        fetch(request)
          .then(response => {
            const clone = response.clone();
            caches.open(DATA_CACHE).then(cache => cache.put(request, clone));
            return response;
          })
          .catch(() => caches.match(request))
      );
      return;
    }
  }

  // Static assets: cache-first
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then(cache => cache.put(request, clone));
        }
        return response;
      });
    }).catch(() => {
      if (request.destination === 'document') {
        return caches.match('/offline');
      }
    })
  );
});

// Background sync for offline practice submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-practice') {
    event.waitUntil(syncPracticeData());
  }
});

async function syncPracticeData() {
  const cache = await caches.open('neet-pending-v1');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await cache.match(request);
      if (response) {
        const data = await response.json();
        await fetch(request.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        await cache.delete(request);
      }
    } catch {
      // Will retry on next sync
    }
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'NEET Prep';
  const options = {
    body: data.body || 'Time to study!',
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    data: data.url || '/',
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow(event.notification.data || '/'));
  }
});
