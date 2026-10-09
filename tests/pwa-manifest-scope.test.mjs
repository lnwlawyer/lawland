import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const manifest=JSON.parse(readFileSync(new URL('../manifest.json',import.meta.url),'utf8'));
test('PWA identity and navigation stay within GitHub Pages subpath',()=>{
 assert.equal(manifest.id,'./');
 assert.equal(manifest.scope,'./');
 assert.equal(manifest.start_url,'./index.html');
 assert.equal(manifest.display,'standalone');
});

test('PWA icons are local and backed by committed assets',()=>{
 for (const icon of manifest.icons) {
  assert.match(icon.src,/^\.\/icon-(192|512)\.png$/);
  assert.equal(icon.type,'image/png');
  assert.ok(readFileSync(new URL('../'+icon.src,import.meta.url)).length>0);
 }
});
