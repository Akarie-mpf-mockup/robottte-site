import fs from 'node:fs';
import path from 'node:path';
export function verifyDemoAccess(root = 'public') {
  const fail = message => { throw new Error(`Demo access check: ${message}`); };
  const entry = path.join(root, 'demo', 'index.html');
  if (fs.existsSync(entry)) {
    const html = fs.readFileSync(entry, 'utf8');
    const target = html.match(/http-equiv="refresh"[^>]*content="0;url=(\/d\/([a-z0-9]{6,32})\/)"/);
    if (!target || !fs.existsSync(path.join(root, target[1], 'payload.json'))) fail('/demo/ must lead to an encrypted demo');
    if (/customerGuide|data-cover|<iframe|<script/i.test(html) || html.length > 2048) fail('/demo/ contains demo content');
  }
  const routes = path.join(root, 'd');
  if (!fs.existsSync(routes)) return;
  for (const code of fs.readdirSync(routes)) {
    const dir = path.join(routes, code);
    if (!fs.statSync(dir).isDirectory()) continue;
    const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
    if (!html.includes('id="unlock-form"') || !html.includes('type="password"') || /customerGuide|data-cover/.test(html)) fail(`${code}: unprotected demo HTML`);
    const meta = JSON.parse(fs.readFileSync(path.join(dir, 'payload.json'), 'utf8'));
    if (meta.version !== 1 || meta.code !== code || meta.iterations !== 600000 || !/^payload(?:-b)?\.bin$/.test(meta.ciphertext_file || '')) fail(`${code}: invalid encrypted payload`);
    const bytes = fs.readFileSync(path.join(dir, meta.ciphertext_file));
    if (bytes.length < 16 || bytes.subarray(0,256).toString().includes('<html')) fail(`${code}: invalid ciphertext`);
    if (fs.readdirSync(dir).some(name => !['index.html','gate.js','gate.css','payload.json',meta.ciphertext_file].includes(name))) fail(`${code}: unexpected public file`);
  }
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  verifyDemoAccess(process.argv[2]); console.log('Demo access bundle verified');
}
