import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document fetch deduplication uses a sheet-level cache',()=>{
 assert.ok(html.includes('let loadedDocumentSheets = new Set();'));
 assert.ok(html.includes('!loadedDocumentSheets.has(docSheetName)'));
 assert.ok(html.includes('loadedDocumentSheets.add(docSheetName)'));
});
test('sheet cache is cleared on logout and account switch',()=>{
 const resets=html.split('loadedDocumentSheets = new Set();').length-1;
 assert.ok(resets>=3,'initialization, logout and account switch');
});
