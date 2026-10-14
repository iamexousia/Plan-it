import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {join} from 'node:path';
const root='dist/client',hash=createHash('sha256');
function include(directory){for(const item of readdirSync(directory,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const path=join(directory,item.name);if(item.isDirectory())include(path);else if(item.name!=='sw.js'){hash.update(path);hash.update(readFileSync(path));}}}
include(root);
const version=hash.digest('hex').slice(0,16),path=join(root,'sw.js');
const worker=readFileSync(path,'utf8').replace(/const CACHE="[^"]+";/,`const CACHE="plan-it-${version}";`);
writeFileSync(path,worker);
console.log(`PWA update version: ${version}`);
