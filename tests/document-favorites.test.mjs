import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('favorites are accessible, in-memory and filterable',()=>{
 for(const part of ['const favoriteDocumentLinks = new Set();','id="favoritesOnly"','class="btn-favorite-document"','aria-pressed="false"','favoriteDocumentLinks.has(favoriteKey)'])assert.ok(html.includes(part),part);
});
test('favorites are cleared at logout and account switch',()=>{
 assert.ok(html.split('favoriteDocumentLinks.clear();').length>=3);
 assert.ok(!html.includes('localStorage.setItem(\'favorites'));
});
