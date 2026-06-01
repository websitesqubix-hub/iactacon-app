const CACHE_VERSION = 'v2';

self.addEventListener("install", (event) => {
  console.log("Service Worker Installed", CACHE_VERSION);
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
