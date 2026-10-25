import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const escapeHTML = (x = '') => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const b = config.brand, p = config.pwa, feature = config.features;
const domain = (b.domain || config.contact.website || '').replace(/\/$/, '');
const title = `${b.name} | ${b.tagline}`;
const noindex = config.mode !== 'client-ready';
const icon = b.logo;
const iconType = icon.toLowerCase().endsWith('.png') ? 'image/png' : icon.toLowerCase().endsWith('.ico') ? 'image/x-icon' : 'image/svg+xml';
const socialImage = domain && b.socialImage ? `${domain}${b.socialImage}` : '';
const meta = `<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>${escapeHTML(title)}</title>
<meta name="description" content="${escapeHTML(b.description)}" />
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow'}" />
<meta name="author" content="${escapeHTML(b.name)}" />
${domain ? `<link rel="canonical" href="${escapeHTML(domain)}/" />` : ''}
<link rel="icon" href="${escapeHTML(icon)}" type="${escapeHTML(iconType)}" />
<meta name="theme-color" content="${escapeHTML(b.accent)}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${escapeHTML(title)}" />
<meta property="og:description" content="${escapeHTML(b.description)}" />
${socialImage ? `<meta property="og:image" content="${escapeHTML(socialImage)}" />` : ''}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHTML(title)}" />
<meta name="twitter:description" content="${escapeHTML(b.description)}" />
${socialImage ? `<meta name="twitter:image" content="${escapeHTML(socialImage)}" />` : ''}
${domain ? `<meta property="og:url" content="${escapeHTML(domain)}/" />` : ''}
${feature.pwaEnabled ? `<link rel="manifest" href="/manifest.json" />
<link rel="apple-touch-icon" href="${escapeHTML(p.icon192)}" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-title" content="${escapeHTML(p.shortName)}" />` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>
</html>
`;
fs.writeFileSync(path.join(root, 'index.html'), meta);
fs.writeFileSync(path.join(root, 'public/robots.txt'), noindex ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`);
const sitemapFile=path.join(root,'public/sitemap.xml');
if(noindex){fs.rmSync(sitemapFile,{force:true});}
else{
 const pages=['/','/about','/services',...(feature.showGallery?['/gallery']:[]),'/faq',...(feature.showTestimonials&&config.testimonials.length?['/testimonials']:[]),'/contact'];
 const urls=pages.map(r=>`  <url><loc>${escapeHTML(domain+r)}</loc></url>`).join('\n');
 fs.writeFileSync(sitemapFile,`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}
const manifest = {
 name:b.name,short_name:p.shortName,description:b.description,start_url:'/',scope:'/',display:'standalone',
 background_color:'#171d2d',theme_color:b.accent,lang:'en-ZA',
 icons:[{src:p.icon192,sizes:'192x192',type:'image/png',purpose:'any maskable'}, {src:p.icon512,sizes:'512x512',type:'image/png',purpose:'any maskable'}]
};
fs.writeFileSync(path.join(root, 'public/manifest.json'), JSON.stringify(manifest,null,2) + '\n');
const offline = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="${escapeHTML(b.accent)}"/><title>${escapeHTML(b.name)} · Offline</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#171d2d;color:#fff;font-family:system-ui,sans-serif;text-align:center}main{padding:2rem;max-width:30rem}h1{color:${escapeHTML(b.accent)}}p{color:#d5d5d5;line-height:1.6}</style></head><body><main><h1>${escapeHTML(b.name)}</h1><p>You are offline. Reconnect to the internet and refresh this page.</p></main></body></html>`;
fs.writeFileSync(path.join(root,'public/offline.html'), offline);
// Network-first navigation, same-origin static files only. Never cache external client assets or API responses.
const cacheName = `wdp-${config.clientId}-${p.cacheVersion}`;
const worker = `const CACHE_NAME=${JSON.stringify(cacheName)};const OFFLINE_URL='/offline.html';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll([OFFLINE_URL])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(n=>n.startsWith('wdp-')&&n!==CACHE_NAME).map(n=>caches.delete(n)));await self.clients.claim();})());});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;if(req.mode==='navigate'){event.respondWith(fetch(req).catch(async()=>await caches.match(OFFLINE_URL)));}});
`;
fs.writeFileSync(path.join(root,'public/sw.js'), worker);
if (!noindex) { const {execFileSync}=await import('node:child_process'); execFileSync(process.execPath, ['scripts/check-release.mjs'], {cwd:root,stdio:'inherit'}); }
console.log(`[WebDevPro Ultra Max 6] Synced static metadata for ${b.name} (${config.mode}); PWA ${feature.pwaEnabled ? 'on' : 'off'}`);
