import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document search is scoped to the displayed list and does not request backend data',()=>{
 assert.ok(html.includes('id="documentSearch" type="search"'));
 assert.ok(html.includes("documentSearch.addEventListener('input'"));
 assert.ok(html.includes("querySelectorAll('#documentList .document-item')"));
 assert.ok(html.includes('item.hidden = !matches'));
});
test('search results expose an accessible empty state',()=>{
 assert.ok(html.includes('id="documentSearchEmpty"'));
 assert.ok(html.includes('role="status">ไม่พบเอกสารที่ตรงกับคำค้นหา'));
});
