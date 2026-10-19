import {readFile,writeFile,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
export async function viewerFiles(template,css){
  const adapter=await readFile(path.join(root,'scripts/viewer/service-guide-navigation.js'),'utf8');
  const source=await readFile(path.join(root,'scripts/viewer/gate.js'),'utf8');
  if(source.split('/*__ADAPTER_SOURCE__*/').length!==2)throw Error('Missing adapter marker');
  const js=source.replace("/*__ADAPTER_SOURCE__*/''",JSON.stringify(adapter));
  let html=template.replace('href="/gate.css"','href="./gate.css"').replace('src="/gate.js"','src="./gate.js"');
  html=html.replace('<form id="unlock-form">','<form id="unlock-form" method="post">');
  if(!/id="unlock"[^>]*\bdisabled/.test(html))html=html.replace('id="unlock" type="submit"','id="unlock" type="submit" disabled');
  html=html.replace('パスワードが不明な場合は、ご案内元の担当者へお問い合わせください。','このタブでは最大30分、閲覧状態を保持します。「デモを閉じる」で解除します。パスワードが不明な場合は、ご案内元へお問い合わせください。');
  if(!html.includes('id="unlock-form"')||!html.includes('id="demo-frame"'))throw Error('Unrecognized gate template');
  return {'index.html':html,'gate.js':js,'gate.css':css.replace('#demo-frame{min-width:1280px}#viewer{overflow-x:auto}','#demo-frame{min-width:0}#viewer{width:100%}')};
}
export async function installViewer(code){
  if(!/^[a-z0-9]{6,32}$/.test(code))throw Error('Invalid code');
  const destination=path.join(root,'dist/d',code);
  for(const part of [path.join(root,'dist'),path.join(root,'dist/d'),destination]){
    const st=await lstat(part);if(!st.isDirectory()||st.isSymbolicLink())throw Error('Route must be an ordinary directory');
  }
  const files=await viewerFiles(await readFile(path.join(root,'templates/gate.html'),'utf8'),await readFile(path.join(root,'dist/gate.css'),'utf8'));
  for(const [name,body] of Object.entries(files)){
    try{const st=await lstat(path.join(destination,name));if(!st.isFile()||st.isSymbolicLink())throw Error('Route asset must be an ordinary file');}catch(e){if(e.code!=='ENOENT')throw e;}
    if(Buffer.byteLength(body)>26214400)throw Error('Viewer exceeds size limit');
  }
  for(const [name,body] of Object.entries(files))await writeFile(path.join(destination,name),body);
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  await installViewer(process.argv[2]);console.log('Installed selected route viewer (encrypted payload unchanged).');
}
