import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const worker=readFileSync(new URL('../service-worker.js',import.meta.url),'utf8');
test('PWA worker is registered from a same-origin path',()=>{
 assert.ok(html.includes("navigator.serviceWorker.register('./service-worker.js')"));
 assert.ok(!html.includes('URL.createObjectURL(blob)'));
});
test('worker does not cache authenticated content',()=>{
 assert.ok(worker.includes("self.addEventListener('install'"));
 assert.ok(worker.includes("self.addEventListener('activate'"));
 assert.ok(!worker.includes('caches.open('));
 assert.ok(!worker.includes("addEventListener('fetch'"));
});
