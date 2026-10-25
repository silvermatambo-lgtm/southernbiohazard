import fs from 'node:fs';
import path from 'node:path';
const config=JSON.parse(fs.readFileSync('site.config.json','utf8'));
const deny=JSON.parse(fs.readFileSync('rebrand-denylist.json','utf8'));
const terms=[...deny.blockedStrings,...deny.blockedDomains].filter(Boolean);
const buildDir='dist';
if(!fs.existsSync(buildDir)) {console.error('Missing dist output');process.exit(1);}
const files=[];
const walk=dir=>{for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())walk(file);else if(/\.(?:html|js|css|json|svg|txt)$/.test(file))files.push(file);}};
walk(buildDir);
const faults=[];
for(const file of files){const content=fs.readFileSync(file,'utf8').toLowerCase();for(const term of terms){if(content.includes(term.toLowerCase()))faults.push(`Blocked previous-client identifier in ${file}`);}}
const index=fs.readFileSync('dist/index.html','utf8');
if(config.mode==='client-ready') {
 if(index.includes('noindex'))faults.push('Client-ready site still has noindex');
 if(!index.includes(config.brand.name))faults.push('Client name missing from generated page metadata');
 if(index.includes('placeholder'))faults.push('Placeholder metadata leaked to release build');
 if(config.features.pwaEnabled&&!index.includes('manifest.json'))faults.push('Client PWA manifest link is missing');
} else if(!index.includes('noindex')) faults.push('Starter demo should be noindex');
if(faults.length){console.error('BUILD AUDIT FAILED:\n'+faults.join('\n'));process.exit(1);}
console.log(`Build audit passed (${files.length} built text files).`);
