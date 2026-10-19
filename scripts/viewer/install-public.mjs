// GitHub Pages/Vite adapter for the canonical viewer. Customer ciphertext stays unchanged.
import {readFile,writeFile,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {viewerFiles} from './build.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const code=process.argv[2];
if(!/^[a-z0-9]{6,32}$/.test(code??''))throw Error('Usage: node scripts/viewer/install-public.mjs ROUTE_CODE');
const route=path.join(root,'public/d',code);
for(const folder of [path.join(root,'public'),path.join(root,'public/d'),route]){
 const st=await lstat(folder);if(st.isSymbolicLink()||!st.isDirectory())throw Error('Route must be an ordinary directory');
}
const files=await viewerFiles(await readFile(path.join(route,'index.html'),'utf8'),await readFile(path.join(route,'gate.css'),'utf8'));
for(const name of Object.keys(files)){
 const st=await lstat(path.join(route,name));if(st.isSymbolicLink()||!st.isFile())throw Error('Asset must be an ordinary file');
}
for(const [name,body] of Object.entries(files))await writeFile(path.join(route,name),body);
console.log('Generated canonical viewer for selected public route; ciphertext preserved.');
