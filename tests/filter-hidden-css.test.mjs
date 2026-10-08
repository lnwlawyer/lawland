import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('hidden filter items override flex layout',()=>{
 assert.match(html,/\.menu-card\[hidden\],\s*#documentList \.document-item\[hidden\]\s*\{\s*display:\s*none\s*!important/);
});
