/*
 * Service worker : rend le guide utilisable hors ligne.
 * - fichiers du site : mis en cache à l'installation, servis depuis le cache
 *   puis mis à jour en arrière-plan ;
 * - photos Wikimedia et tuiles de carte consultées : gardées en cache
 *   (300 éléments max) pour être revues sans réseau.
 * Pensez à changer VERSION après chaque modification du site.
 */
const VERSION = 'v1';
const APP = 'roches-app-' + VERSION;
const MEDIA = 'roches-media';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/style.css',
  'js/app.js', 'js/texture.js',
  'js/data/magmatiques.js', 'js/data/sedimentaires.js', 'js/data/metamorphiques.js', 'js/data/reference.js',
  'vendor/leaflet/leaflet.js', 'vendor/leaflet/leaflet.css',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(APP).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
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

  // Fichiers du site : cache d'abord, mise à jour en arrière-plan
  if (url.origin === location.origin) {
    e.respondWith(caches.open(APP).then(async (c) => {
      const hit = await c.match(req, { ignoreSearch: true });
      const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => null);
      return hit || (await net) || c.match('index.html');
    }));
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
