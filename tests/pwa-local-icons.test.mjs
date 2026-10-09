import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('../manifest.json',import.meta.url),'utf8'));
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('PWA manifest keeps project-relative identity',()=>{
 assert.equal(manifest.id,'./');
 assert.equal(manifest.scope,'./');
 assert.equal(manifest.start_url,'./index.html');
});
test('PWA install icons use same-origin paths and supported sizes',()=>{
 for(const icon of manifest.icons){
  assert.ok(!/^https?:\/\//i.test(icon.src),'remote icon makes install dependent on third party');
  assert.ok(/^\.\//.test(icon.src),'icon should resolve under project path');
  assert.ok(['192x192','512x512'].includes(icon.sizes));
 }
});
test('Apple touch icon uses local resource',()=>{
 assert.match(html,/<link\s+rel="apple-touch-icon"\s+href="\.\//);
});
