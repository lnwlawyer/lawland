import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('filtered submenu cards leave keyboard tab order',()=>{
 assert.match(html,/card\.hidden = !matches;\s*card\.tabIndex = matches \? 0 : -1;/);
});
