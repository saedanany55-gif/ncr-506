const C = "ncr506-v4";
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"]))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))); self.clients.claim(); });
// الشبكة أولاً حتى تصل التحديثات، والنسخة المحفوظة عند انقطاع الإنترنت
self.addEventListener("fetch", e => { e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html")))); });
