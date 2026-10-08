import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('clear search button resets text, filtering and focus',()=>{
 for(const part of ['id="clearDocumentSearch"',"document.getElementById('clearDocumentSearch')","documentSearch.value = ''","documentSearch.dispatchEvent(new Event('input'))","documentSearch.focus()"])assert.ok(html.includes(part),part);
});
