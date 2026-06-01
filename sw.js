const CACHE = 'freelines-v2';

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => clients.claim());

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

self.addEventListener('message', e => {
  if(e.data && e.data.type === 'NOTIFY'){
    self.registration.showNotification(e.data.title || '💼 عهدة جديدة', {
      body: e.data.body || '',
      icon: './icon-192.png',
      badge: './icon-192.png',
      dir: 'rtl',
      lang: 'ar',
      vibrate: [200, 100, 200],
      tag: 'custody-notify',
      renotify: true
    });
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      if(list.length) return list[0].focus();
      return clients.openWindow('./');
    })
  );
});
