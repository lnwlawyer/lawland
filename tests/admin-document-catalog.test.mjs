import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('admin catalog is role gated and read only',()=>{
 assert.match(source,/contentId === 'admin-management' && verifiedAdmin/);
 assert.match(source,/adminDocumentCatalogButton/);
 assert.match(source,/if \(!verifiedAdmin \|\| !auth\.currentUser\) return/);
 assert.match(source,/Object\.values\(documentData\)\.filter\(Array\.isArray\)\.flat\(\)/);
 assert.match(source,/rows\.replaceChildren\(\)/);
 assert.match(source,/name\.textContent = String\(doc\.docName/);
 assert.match(source,/\^https:/);
});
