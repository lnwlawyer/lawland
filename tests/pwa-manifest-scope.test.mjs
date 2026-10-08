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
