// Network-only: do not cache authenticated document data or API responses.
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
// Fetches use the browser's normal network behavior; offline content is not promised.
