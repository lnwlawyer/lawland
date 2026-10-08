import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('active submenu card filtering restores focus to search input',()=>{
 assert.ok(html.includes('if (!matches && card.contains(document.activeElement)) menuSearch.focus();'));
});
