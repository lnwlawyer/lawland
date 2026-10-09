import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const page=readFileSync(new URL('../firebase-auth-setup.html',import.meta.url),'utf8');
const live=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('isolated bootstrap targets only dedicated Firebase project',()=>{
 assert.match(page,/projectId:"land-law-ea2bb"/);
 assert.doesNotMatch(page,/projectId:"lnwlawyer"/);
 assert.match(page,/signInWithPopup\(auth,provider\)/);
 assert.match(page,/onAuthStateChanged/);
 assert.doesNotMatch(page,/getFirestore|setDoc|addDoc|runTransaction|localStorage/);
});
test('live app uses new Firebase after cutover',()=>{
 assert.match(live,/projectId:\s*["']land-law-ea2bb["']/);
});
