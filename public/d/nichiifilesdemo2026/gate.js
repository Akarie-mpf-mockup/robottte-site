'use strict';
// Canonical encrypted viewer. Session key is sensitive; never persist the password.
const ADAPTER_SOURCE="/* Service-guide adapter: all view navigation remains inside the document. */\n(() => {\n  'use strict';\n  const start = () => {\n    document.addEventListener('click',event=>{\n      const a=event.target.closest('a[href^=\"#\"]');\n      if(!a || event.defaultPrevented)return;\n      event.preventDefault();\n      const id=a.getAttribute('href').slice(1);\n      if(['top','main','choose'].includes(id) && typeof window.returnToCarousel==='function')window.returnToCarousel();\n      document.getElementById(id)?.scrollIntoView({block:'start',behavior:'auto'});\n    });\n    if (typeof stage === 'undefined' || typeof render !== 'function' || !window.returnToCarousel) return;\n    const config = JSON.parse(document.getElementById('rbt-viewer-config')?.textContent || '{}');\n    const embedded = parent !== window && typeof config.channel === 'string';\n    let applying = false;\n    const read = () => ({\n      view: !document.getElementById('referral-view').hidden ? 'referral'\n        : document.getElementById('experience').hidden ? 'choose' : exhibit === 'try' ? 'try' : 'screen',\n      stage, selected, jobMode, faq, intake, shift, area, slot, keeper, theme, consented,\n      compareMode, storyStep, hrpConcern, hrpJobOpen\n    });\n    const signature = s => JSON.stringify([s.view, s.stage]);\n    let previous = read();\n    const send = (type, state, mode) => {\n      if (embedded) parent.postMessage({namespace:'rbt-viewer-v1', channel:config.channel, type, state, mode}, '*');\n      else if (type === 'state') {\n        const record = {rbtGuide:1, state};\n        history[mode === 'push' ? 'pushState' : 'replaceState'](record, '');\n      }\n    };\n    function apply(s) {\n      if (!s || !['choose','screen','try','referral'].includes(s.view) || !Number.isInteger(s.stage) || s.stage < 0 || s.stage > 3) return;\n      applying = true;\n      stage=s.stage; selected=Number.isInteger(s.selected) ? Math.max(0,Math.min(3,s.selected)) : stage;\n      for (const [key, assign] of [\n        ['jobMode',v=>jobMode=v],['faq',v=>faq=v],['intake',v=>intake=v],['keeper',v=>keeper=v],\n        ['storyStep',v=>storyStep=v],['hrpConcern',v=>hrpConcern=v]\n      ]) if(Number.isInteger(s[key]) && s[key]>=-1 && s[key]<=20) assign(s[key]);\n      for (const [key,assign] of [['shift',v=>shift=v],['area',v=>area=v],['slot',v=>slot=v],['theme',v=>theme=v]])\n        if(typeof s[key]==='string' && s[key].length<=200) assign(s[key]);\n      consented=s.consented===true;hrpJobOpen=s.hrpJobOpen===true;\n      compareMode=s.compareMode==='before'?'before':'after';exhibit=s.view==='try'?'try':'screen';\n      selectCover(selected);render();\n      if(s.view==='choose')window.returnToCarousel();\n      else if(s.view==='referral')window.showReferral();\n      else {document.getElementById('experience').hidden=false;window.layoutAfterGo();}\n      previous=read();applying=false;\n    }\n    function publish() {\n      if (applying) return;\n      const state=read();\n      const changed=JSON.stringify(state)!==JSON.stringify(previous);\n      if(changed)send('state',state,signature(state)===signature(previous)?'replace':'push');\n      previous=state;\n    }\n    document.addEventListener('click', event => {\n      const anchor=event.target.closest('a[href^=\"#\"]');\n      if(anchor && !event.defaultPrevented){\n        event.preventDefault();\n        const id=anchor.getAttribute('href').slice(1);\n        if(['top','main','choose'].includes(id)) window.returnToCarousel();\n        const target=document.getElementById(id);\n        if(target)target.scrollIntoView({block:'start',behavior:'auto'});\n      }\n      publish();\n    });\n    document.addEventListener('change',publish);\n    document.addEventListener('keydown',()=>queueMicrotask(publish));\n    document.addEventListener('toggle',()=>queueMicrotask(publish),true);\n    if(embedded){\n      window.addEventListener('message',event=>{\n        const data=event.data;\n        if(event.source!==parent || data?.namespace!=='rbt-viewer-v1' || data.channel!==config.channel || data.type!=='restore')return;\n        apply(data.state);send('state',read(),'replace');\n      });\n      send('ready',read(),'replace');\n    }else{\n      const saved=history.state?.rbtGuide===1?history.state.state:null;\n      if(saved)apply(saved);\n      send('state',read(),'replace');\n      window.addEventListener('popstate',event=>{if(event.state?.rbtGuide===1)apply(event.state.state);});\n    }\n  };\n  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();\n})();\n";
const form=document.getElementById('unlock-form');
const password=document.getElementById('password');
const message=document.getElementById('message');
const button=document.getElementById('unlock');
const frame=document.getElementById('demo-frame');
const route=location.pathname.match(/^\/d\/([a-z0-9]{6,32})(?:\/|\/index\.html)?$/);
const code=route?.[1];
const SESSION_MS=30*60*1000;
const storageKey='rbt-demo-viewer-v1:'+code;
const decode=value=>Uint8Array.from(atob(value),char=>char.charCodeAt(0));
const encode=value=>btoa(String.fromCharCode(...new Uint8Array(value)));
let session=null, channel='', expiryTimer=null, initialState=null, viewerOpen=false;
button.disabled=false;
document.getElementById('show-password').addEventListener('change',event=>password.type=event.target.checked?'text':'password');
function forget(){try{sessionStorage.removeItem(storageKey);}catch{} session=null;}
function lock(expired=false){
  viewerOpen=false;clearTimeout(expiryTimer);forget();initialState=null;channel='';
  frame.removeAttribute('srcdoc');frame.src='about:blank';password.value='';
  document.getElementById('gate').hidden=false;document.getElementById('viewer').hidden=true;
  document.body.classList.remove('open');
  history.replaceState(null,'');
  message.textContent=expired?'閲覧時間が終了しました。もう一度パスワードを入力してください。':'';
  button.disabled=false;password.focus();
}
document.getElementById('lock').addEventListener('click',()=>lock());
function save(){try{sessionStorage.setItem(storageKey,JSON.stringify(session));}catch{/* Viewing remains available without storage. */}}
function validState(s){return s && ['choose','screen','try','referral'].includes(s.view) && Number.isInteger(s.stage) && s.stage>=0 && s.stage<4 && JSON.stringify(s).length<4096;}
function sendRestore(state){if(validState(state))frame.contentWindow.postMessage({namespace:'rbt-viewer-v1',channel,type:'restore',state},'*');}
window.addEventListener('message',event=>{
  const data=event.data;
  if(!viewerOpen || event.source!==frame.contentWindow || data?.namespace!=='rbt-viewer-v1' || data.channel!==channel || !validState(data.state))return;
  if(Date.now()>=session.expires){lock(true);return;}
  if(data.type==='ready'){
    if(validState(initialState))sendRestore(initialState);
    else {session.state=data.state;save();history.replaceState({rbtDemo:code,state:data.state},'');}
  }else if(data.type==='state'){
    session.state=data.state;save();
    const record={rbtDemo:code,state:data.state};
    history[data.mode==='push'?'pushState':'replaceState'](record,'');
  }
});
window.addEventListener('popstate',event=>{
  if(!viewerOpen)return;
  if(Date.now()>=session.expires){lock(true);return;}
  if(event.state?.rbtDemo===code)sendRestore(event.state.state);
});
async function fetchPayload(){
  if(!code)throw Error('route');
  const response=await fetch('/d/'+code+'/payload.json',{cache:'no-store'});
  if(!response.ok)throw Error('fetch');
  const payload=await response.json();
  if(payload.version!==1 || payload.iterations!==600000 || payload.code!==code)throw Error('format');
  return payload;
}
async function readCiphertext(payload){
  if(typeof payload.ciphertext==='string')return decode(payload.ciphertext);
  if(!/^payload(?:-b)?\.bin$/.test(payload.ciphertext_file))throw Error('format');
  const response=await fetch('/d/'+code+'/'+payload.ciphertext_file,{cache:'no-store'});
  if(!response.ok)throw Error('fetch');
  return new Uint8Array(await response.arrayBuffer());
}
async function restoreGuideSource(bytes,payload){
  if(payload.format!=='shared-media-v1'){
    if(payload.compression==='gzip')return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    return new TextDecoder().decode(bytes);
  }
  const envelope=JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
  if(!/^\/media\/[a-f0-9]{24}\.bin$/.test(envelope.media.path))throw Error('format');
  const response=await fetch(envelope.media.path,{cache:'no-store'});
  if(!response.ok)throw Error('media');
  const key=await crypto.subtle.importKey('raw',decode(envelope.media.key),'AES-GCM',false,['decrypt']);
  const common=await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(envelope.media.iv),additionalData:new TextEncoder().encode('shared-guide-media-v1')},key,await response.arrayBuffer());
  const images=JSON.parse(await new Response(new Blob([common]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
  return envelope.html.replace(/__RBT_COMMON_IMAGE_(\d+)__/g,(_,index)=>{
    const image=images[Number(index)];if(typeof image!=='string'||!image.startsWith('data:image/'))throw Error('format');return image;
  });
}
async function open(key,payload){
  const bytes=await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(payload.iv),additionalData:new TextEncoder().encode(code)},key,await readCiphertext(payload));
  let source=await restoreGuideSource(bytes,payload);
  const adapter='<script id="rbt-viewer-navigation">'+ADAPTER_SOURCE.replace(/<\/script/gi,'<\\/script')+'</script>';
  source=source.replace(/<\/body>/i,adapter+'</body>');
  channel=crypto.randomUUID();
  const config='<script id="rbt-viewer-config" type="application/json">'+JSON.stringify({channel})+'</script>';
  frame.removeAttribute('src');frame.srcdoc=source.replace(/<head\b[^>]*>/i,match=>match+config);
  password.value='';viewerOpen=true;
  document.getElementById('gate').hidden=true;document.getElementById('viewer').hidden=false;
  document.body.classList.add('open');
  document.querySelector('meta[name="viewport"]').content='width=device-width, initial-scale=1';
  clearTimeout(expiryTimer);expiryTimer=setTimeout(()=>lock(true),Math.max(0,session.expires-Date.now()));
  document.getElementById('lock').focus();
}
function binding(payload){return [payload.code,payload.salt,payload.iv].join(':');}
form.addEventListener('submit',async event=>{
  event.preventDefault();if(button.disabled)return;
  button.disabled=true;message.textContent='確認しています…';
  try{
    if(!crypto.subtle)throw Error('https');
    const payload=await fetchPayload();
    const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password.value),'PBKDF2',false,['deriveKey']);
    const key=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:decode(payload.salt),iterations:payload.iterations},material,{name:'AES-GCM',length:256},true,['decrypt']);
    const candidate={version:1,key:encode(await crypto.subtle.exportKey('raw',key)),binding:binding(payload),expires:Date.now()+SESSION_MS,state:null};
    session=candidate;initialState=null;
    await open(key,payload);save();message.textContent='';
  }catch(error){forget();message.textContent=['fetch','media','route'].includes(error.message)?'デモを読み込めませんでした。通信状況を確認して再度お試しください。':error.message==='https'?'HTTPSでアクセスし、最新のブラウザーをご利用ください。':'パスワードが一致しません。ご案内の内容をご確認ください。';password.focus();}
  finally{button.disabled=false;}
});
(async()=>{
  let saved;
  try{saved=JSON.parse(sessionStorage.getItem(storageKey));}catch{return;}
  if(!saved)return;
  if(saved.version!==1 || !Number.isFinite(saved.expires) || saved.expires<=Date.now() || saved.expires>Date.now()+SESSION_MS || typeof saved.key!=='string'){forget();return;}
  button.disabled=true;message.textContent='デモを復元しています…';
  try{
    const payload=await fetchPayload();
    if(saved.binding!==binding(payload)||decode(saved.key).length!==32)throw Error('binding');
    const key=await crypto.subtle.importKey('raw',decode(saved.key),'AES-GCM',false,['decrypt']);
    session=saved;initialState=history.state?.rbtDemo===code?history.state.state:saved.state;
    await open(key,payload);message.textContent='';
  }catch{forget();message.textContent='パスワードを入力してデモを開いてください。';}
  finally{button.disabled=false;}
})();
