import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('clear submenu search resets filtering and restores focus',()=>{
 for(const part of ['id="clearMenuSearch"',"menuSearch.value = ''","menuSearch.dispatchEvent(new Event('input'))","menuSearch.focus()"])assert.ok(html.includes(part),part);
});
