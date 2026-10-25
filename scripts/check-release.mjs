import fs from 'node:fs';
import path from 'node:path';
const c=JSON.parse(fs.readFileSync('site.config.json','utf8'));
const errors=[];
const fail=(description)=>errors.push(description);
const placeholder= /placeholder|your |service one|service two|service three|new-client|example\.|demo text|replace with|insert |tbd/i;
const required=(value,description)=>{if(!value||placeholder.test(String(value)))fail(description);};
if(c.mode!=='client-ready')fail('Set mode to client-ready after completing client verification');
required(c.clientId,'Set a unique clientId');
required(c.brand.name,'Replace brand.name with the verified client name');
required(c.brand.shortName,'Replace brand.shortName');
required(c.brand.tagline,'Replace brand.tagline');
required(c.brand.description,'Write a verified SEO description');
required(c.brand.aboutIntro,'Replace about text');
required(c.brand.mission,'Replace mission');
required(c.brand.vision,'Replace vision');
required(c.brand.domain,'Set deployed canonical domain in brand.domain');
required(c.contact.serviceArea,'Set actual service area');
required(c.contact.hours,'Confirm business hours');
if(!c.contact.phone&&!c.contact.whatsapp&&!c.contact.email)fail('Provide at least one verified contact method');
if(c.contact.whatsapp&&!/^\d{8,15}$/.test(c.contact.whatsapp.replace(/\D/g,'')))fail('WhatsApp number needs country code and digits');
if(c.contact.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.contact.email))fail('Invalid business email');
if(c.brand.domain&&!/^https:\/\/[a-z\d.-]+(?::\d+)?$/i.test(c.brand.domain))fail('brand.domain should be a full https:// origin without trailing slash/path');
if(!/^#[0-9a-f]{6}$/i.test(c.brand.accent))fail('brand.accent must be #RRGGBB');
const asset=(pathValue,name)=>{
 required(pathValue,name);
 if (typeof pathValue!=='string'||!pathValue.startsWith('/brand/')){fail(`${name} must be an absolute local /brand/... path`);return;}
 if(!fs.existsSync(path.join('public',pathValue.replace(/^\//,''))))fail(`${name} file does not exist: ${pathValue}`);
};
asset(c.brand.logo,'brand.logo');
asset(c.brand.socialImage,'Social sharing image');
required(c.pwa.shortName,'PWA short name');
asset(c.pwa.icon192,'PWA 192 icon');
asset(c.pwa.icon512,'PWA 512 icon');
for(const [i,val] of c.brand.values.entries())required(val,`Brand value ${i+1}`);
for(const [i,s] of c.heroSlides.entries())required(s.eyebrow,`Hero slide ${i+1} eyebrow`);
for(const [i,s] of c.heroSlides.entries()) {required(s.heading,`Hero slide ${i+1} heading`);required(s.highlight,`Hero slide ${i+1} highlight`);required(s.description,`Hero slide ${i+1} description`);asset(s.image,`Hero slide ${i+1} image`);}
if(c.heroSlides.length<2)fail('Add at least 2 genuine hero slides');
for(const [i,s] of c.services.entries()){required(s.name,`Service ${i+1} name`);required(s.id,`Service ${i+1} ID`);required(s.summary,`Service ${i+1} summary`);required(s.details,`Service ${i+1} details`);asset(s.image,`Service ${i+1} image`);}
if(!c.services.length)fail('Define client services');
for(const [i,g] of c.gallery.entries()){required(g.title,`Gallery ${i+1} title`);required(g.category,`Gallery ${i+1} category`);asset(g.image,`Gallery ${i+1} photo`);}
for(const [i,f] of c.faqs.entries()){required(f.question,`FAQ ${i+1} question`);required(f.answer,`FAQ ${i+1} answer`);}
if(c.features.showTestimonials&&!c.testimonials.length)fail('Disable testimonials section or add approved real testimonials');
if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.clientId))fail('clientId must be a unique lowercase hyphenated slug');
if(c.features.showInstallPrompt && !c.features.pwaEnabled)fail('Cannot show PWA install prompt while PWA is disabled');
const deny = JSON.parse(fs.readFileSync('rebrand-denylist.json','utf8'));
const banned = [...deny.blockedStrings,...deny.blockedDomains].filter(Boolean);
const scan=(file)=>{const content=fs.readFileSync(file,'utf8').toLowerCase();for(const value of banned)if(content.includes(value.toLowerCase()))fail(`Legacy customer string found in ${file}`);};
const walk=(dir)=>{for(const e of fs.readdirSync(dir,{withFileTypes:true})){const name=path.join(dir,e.name);if(e.isDirectory())walk(name);else if(/\.(?:tsx?|jsx?|html|json|js|css|svg)$/i.test(e.name))scan(name);}};
walk('src');walk('public');for(const f of ['index.html','site.config.json'])scan(f);
if(errors.length){console.error('\nRELEASE BLOCKED:');for(const e of [...new Set(errors)])console.error('  ✗ '+e);process.exit(1);}console.log('Release checks passed. Verify visually, check links and proofread before launch.');
