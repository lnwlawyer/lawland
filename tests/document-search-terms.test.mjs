import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document search uses all whitespace separated terms',()=>{
 assert.ok(html.includes("const terms = documentSearch.value.trim().toLocaleLowerCase('th').split(/\\s+/).filter(Boolean)"));
 assert.ok(html.includes('terms.every(term => item.dataset.documentSearch.includes(term))'));
});
