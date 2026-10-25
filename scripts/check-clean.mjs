import fs from 'node:fs';
import path from 'node:path';
const errors=[];
const deny=JSON.parse(fs.readFileSync('rebrand-denylist.json','utf8'));
const legacy=[...deny.blockedStrings,...deny.blockedDomains].filter(Boolean);
const files=[];
const walk=dir=>{for(const item of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,item.name);if(item.isDirectory())walk(file);else if(/\.(tsx?|jsx?|html|json|js|css|svg)$/i.test(file))files.push(file);}};
walk('src');walk('public');files.push('index.html','site.config.json');
for(const file of files){const value=fs.readFileSync(file,'utf8');for(const rule of legacy)if(value.toLowerCase().includes(rule.toLowerCase()))errors.push(`${file}: ${rule}`);}
if(errors.length){console.error('Legacy identifiers found:\n'+errors.join('\n'));process.exit(1);}console.log(`CLEAN: ${files.length} active files checked against ${legacy.length} blocked customer identifiers. Every former-client identifier should be entered in rebrand-denylist.json.`);
