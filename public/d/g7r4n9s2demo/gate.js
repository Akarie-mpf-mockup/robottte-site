'use strict';
const form = document.getElementById('unlock-form');
const password = document.getElementById('password');
const message = document.getElementById('message');
const button = document.getElementById('unlock');
const decode = value => Uint8Array.from(atob(value), char => char.charCodeAt(0));
document.getElementById('show-password').addEventListener('change', event => {
  password.type = event.target.checked ? 'text' : 'password';
});
document.getElementById('lock').addEventListener('click', () => location.reload());
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (button.disabled) return;
  if (!crypto.subtle) {
    message.textContent = 'HTTPSでアクセスし、最新のブラウザーをご利用ください。';
    return;
  }
  const secret = password.value;
  button.disabled = true;
  message.textContent = '確認しています…';
  let payload;
  try {
    const route = location.pathname.match(/^\/d\/([a-z0-9]{6,32})(?:\/|\/index\.html)?$/);
    if (!route) throw new Error('route');
    const base = '/d/' + route[1] + '/';
    const response = await fetch(base + 'payload.json', {cache: 'no-store'});
    if (!response.ok) throw new Error('fetch');
    payload = await response.json();
    if (payload.version !== 1 || payload.iterations !== 600000 || payload.code !== route[1]) throw new Error('format');
  } catch {
    message.textContent = 'デモを読み込めませんでした。通信状況を確認して再度お試しください。';
    button.disabled = false;
    return;
  }
  try {
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey({name:'PBKDF2', hash:'SHA-256', salt:decode(payload.salt), iterations:payload.iterations}, material, {name:'AES-GCM',length:256}, false, ['decrypt']);
    const bytes = await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(payload.iv),additionalData:new TextEncoder().encode(payload.code)}, key, await readCiphertext(payload));
    const frame = document.getElementById('demo-frame');
    frame.srcdoc = await restoreGuideSource(bytes, payload);
    password.value = '';
    document.getElementById('gate').hidden = true;
    document.getElementById('viewer').hidden = false;
    document.body.classList.add('open');
    // Keep the original desktop demo layout, including on narrow devices.
    document.querySelector('meta[name="viewport"]').content = 'width=device-width, initial-scale=1';
    document.getElementById('lock').focus();
  } catch (error) {
    message.textContent = error.message === 'media'
      ? '資料を読み込めませんでした。通信状況を確認して再度お試しください。'
      : 'パスワードが一致しません。ご案内の内容をご確認ください。';
    password.focus();
  } finally {
    button.disabled = false;
  }
});

async function readCiphertext(payload) {
  if (typeof payload.ciphertext === 'string') return decode(payload.ciphertext);
  if (!/^[a-z0-9]{6,32}$/.test(payload.code) || !/^payload(?:-b)?\.bin$/.test(payload.ciphertext_file)) throw new Error('format');
  const response = await fetch('/d/' + payload.code + '/' + payload.ciphertext_file, {cache: 'no-store'});
  if (!response.ok) throw new Error('fetch');
  return new Uint8Array(await response.arrayBuffer());
}

async function restoreGuideSource(bytes, payload) {
  if (payload.format !== 'shared-media-v1') return new TextDecoder().decode(bytes);
  try {
  const envelope = JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
  if (!/^\/media\/[a-f0-9]{24}\.bin$/.test(envelope.media.path)) throw new Error('format');
  const response = await fetch(envelope.media.path, {cache: 'no-store'});
  if (!response.ok) throw new Error('media');
  const key = await crypto.subtle.importKey('raw', decode(envelope.media.key), 'AES-GCM', false, ['decrypt']);
  const common = await crypto.subtle.decrypt({name: 'AES-GCM', iv: decode(envelope.media.iv),
    additionalData: new TextEncoder().encode('shared-guide-media-v1')}, key, await response.arrayBuffer());
  const images = JSON.parse(await new Response(new Blob([common]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
  return envelope.html.replace(/__RBT_COMMON_IMAGE_(\d+)__/g, (_, index) => {
    const image = images[Number(index)];
    if (typeof image !== 'string' || !image.startsWith('data:image/')) throw new Error('format');
    return image;
  });
  } catch {
    throw new Error('media');
  }
}
