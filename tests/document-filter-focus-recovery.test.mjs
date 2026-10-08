import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('focused document action filtering restores focus to document search',()=>{
 assert.ok(html.includes('if (!matches && item.contains(document.activeElement)) documentSearch.focus();'));
});
