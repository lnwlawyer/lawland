import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('authentication failure never enables demo bypass',()=>{
 assert.ok(!html.includes('demo@user.com'));
 assert.ok(!html.includes('Allow demo login'));
 assert.ok(html.includes('showError("ไม่สามารถเชื่อมต่อระบบยืนยันตัวตนได้'));
});
test('sign-out clears initialization state',()=>{
 assert.match(html,/function showLoginScreen\(\)\s*\{\s*activeAuthenticatedUid = null;\s*authSessionGeneration\+\+;\s*window\.appInitialized = false;/);
});
test('login and logout methods remain',()=>{
 for(const symbol of ['signInWithPopup','signInWithEmailAndPassword','onAuthStateChanged','signOut'])assert.ok(html.includes(symbol));
});
