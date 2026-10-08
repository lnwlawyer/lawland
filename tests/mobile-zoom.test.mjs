import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('mobile users can zoom the interface',()=>{
 const viewport=html.match(/<meta name="viewport" content="([^"]+)"/)?.[1];
 assert.ok(viewport);
 assert.ok(viewport.includes('width=device-width'));
 assert.ok(!viewport.includes('user-scalable=no'));
 assert.ok(!viewport.includes('maximum-scale=1'));
});
