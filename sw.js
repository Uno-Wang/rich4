const V='rich4-4507351a';const CORE=['./','index.html','manifest.json','icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;
if(/\/(assets|sfx|voice|music)\//.test(u.pathname)){e.respondWith(caches.open(V).then(async c=>{const r=await c.match(e.request);if(r)return r;const n=await fetch(e.request);if(n.ok)c.put(e.request,n.clone());return n}));return}
e.respondWith(fetch(e.request).then(n=>{if(n.ok)caches.open(V).then(c=>c.put(e.request,n.clone()));return n}).catch(()=>caches.match(e.request)))});
