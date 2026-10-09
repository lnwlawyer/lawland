import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const index=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const page=readFileSync(new URL('../published-documents.html',import.meta.url),'utf8');
test('Firestore public listing and unified search use bounded reads',()=>{assert.match(index,/where\('status', '==', 'published'\), limit\(firebaseSearchPageSize\)/);assert.match(page,/where\('status','==','published'\),limit\(100\)/);assert.match(index,/firebaseSearchLoadState = 'pending'/);});
