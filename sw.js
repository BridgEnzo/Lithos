/*
 * Service worker : rend le guide utilisable hors ligne.
 * - fichiers du site : « réseau d'abord » (toujours la dernière version quand
 *   il y a du réseau), copie en cache pour le hors-ligne ; si le réseau ne
 *   répond pas en 4 s, la copie en cache est servie ;
 * - photos Wikimedia et tuiles de carte consultées : gardées en cache
 *   (300 éléments max) pour être revues sans réseau.
 * Pensez à changer VERSION après chaque modification du site.
 */
const VERSION = 'v6';
const APP = 'roches-app-' + VERSION;
const MEDIA = 'roches-media';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/style.css',
  'js/app.js', 'js/texture.js',
  'js/data/magmatiques.js', 'js/data/sedimentaires.js', 'js/data/metamorphiques.js', 'js/data/reference.js', 'js/data/legendes.js', 'js/data/gisements.js',
  'vendor/leaflet/leaflet.js', 'vendor/leaflet/leaflet.css',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'
];

self.addEventListener('install', (e) => {
  // cache: 'reload' contourne le cache HTTP (GitHub Pages garde les fichiers 10 min)
  e.waitUntil(caches.open(APP)
    .then((c) => c.addAll(FILES.map((u) => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((k) => k.startsWith('roches-app-') && k !== APP).map((k) => caches.delete(k))
  )).then(() => self.clients.claim()));
});

async function trim(cache, max) {
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Fichiers du site : réseau d'abord (revalidé), cache en secours
  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(APP);
      const key = url.origin + url.pathname;
      const net = fetch(key, { cache: 'no-cache' }).then((res) => {
        if (res.ok) c.put(key, res.clone());
        return res;
      });
      const timeout = new Promise((resolve) => setTimeout(resolve, 4000, null));
      try {
        const res = await Promise.race([net, timeout]);
        if (res) return res;
      } catch (err) { /* hors ligne */ }
      const hit = await c.match(key, { ignoreSearch: true });
      if (hit) return hit;
      try { return await net; } catch (err) {
        return (await c.match(new URL('index.html', self.registration.scope).href)) || Response.error();
      }
    })());
    return;
  }

  // Photos et tuiles : cache d'abord
  if (/(^|\.)upload\.wikimedia\.org$|tile\.openstreetmap\.org$/.test(url.hostname)) {
    e.respondWith(caches.open(MEDIA).then(async (c) => {
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res.ok || res.type === 'opaque') { c.put(req, res.clone()); trim(c, 300); }
        return res;
      } catch (err) { return Response.error(); }
    }));
  }
});
