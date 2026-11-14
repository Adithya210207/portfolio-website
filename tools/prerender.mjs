// Copies the sections that js/app.js draws (work, skills, credentials, journey) into
// index.html as plain HTML, so search engines and link previews can read them without
// running JavaScript. app.js still re-draws them on load, so nothing changes for visitors.
//
// Run after editing js/data.js:   node server.js   (in one terminal), then
//                                 node tools/prerender.mjs
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const URL_ = process.argv[2] || 'http://127.0.0.1:8082/';
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(p => fs.existsSync(p));
const IDS = ['work-list', 'skills-list', 'filters', 'cert-list', 'journey-list'];
const port = 9344, sleep = ms => new Promise(r => setTimeout(r, ms));

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'prerender-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page'); } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Page.navigate', { url: URL_ }); await sleep(3000);
const res = await send('Runtime.evaluate', { returnByValue: true, expression: `(${JSON.stringify(IDS)}).reduce((o, id) => {
  const el = document.getElementById(id).cloneNode(true);
  el.querySelectorAll('[style]').forEach(n => n.removeAttribute('style'));   // drop animation state
  o[id] = el.innerHTML.trim(); return o; }, {})` });
ws.close(); chrome.kill();
const parts = res.result.result.value;

const file = path.join(ROOT, 'index.html');
let html = fs.readFileSync(file, 'utf8');
for (const key of IDS) {
  if (!parts[key]) throw new Error(`#${key} came back empty - is the server running at ${URL_}?`);
  const open = new RegExp(`(id="${key}"[^>]*>)(<!--pre-->[\\s\\S]*?<!--/pre-->)?`);
  if (!open.test(html)) throw new Error(`#${key} not found in index.html`);
  html = html.replace(open, (_, tag) => `${tag}<!--pre-->${parts[key]}<!--/pre-->`);
}
fs.writeFileSync(file, html);
console.log('prerendered:', IDS.map(k => `${k} ${(parts[k].length / 1024).toFixed(1)} KB`).join(', '));
