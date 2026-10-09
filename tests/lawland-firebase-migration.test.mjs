import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {lawlandFirebaseConfig} from '../firebase/lawland.config.mjs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('dedicated Firebase config has consistent project identifiers',()=>{
 assert.equal(lawlandFirebaseConfig.projectId,'land-law-ea2bb');
 assert.equal(lawlandFirebaseConfig.authDomain,'land-law-ea2bb.firebaseapp.com');
 assert.match(lawlandFirebaseConfig.appId,/^1:857909535391:web:/);
});
test('live app uses dedicated Firebase config',()=>{
 assert.match(html,/projectId:\s*["']land-law-ea2bb["']/);
 assert.doesNotMatch(html,/projectId:\s*["']lnwlawyer["']/);
});
