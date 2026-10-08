import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document actions wrap on mobile and meet minimum touch size',()=>{
 assert.ok(html.includes('flex-wrap: wrap;'));
 assert.ok(html.includes('overflow-wrap: anywhere;'));
 assert.ok(html.includes('min-height: 44px;'));
 assert.ok(html.includes('@media (max-width: 640px)'));
});
