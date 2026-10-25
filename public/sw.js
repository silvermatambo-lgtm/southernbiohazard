const CACHE_NAME="wdp-southern-biohazard-cleaning-v1";const OFFLINE_URL='/offline.html';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll([OFFLINE_URL])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('wdp-')&&n!==CACHE_NAME).map(n=>caches.delete(n)));await self.clients.claim();})());});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;if(req.mode==='navigate'){event.respondWith(fetch(req).catch(async()=>await caches.match(OFFLINE_URL)));}});
