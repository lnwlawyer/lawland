import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const start=html.indexOf('function showMainApp(user)');
const end=html.indexOf('function showLoginScreen()',start);
const source=html.slice(start,end);
test('changing authenticated user invalidates old async work and caches',()=>{
 assert.ok(html.includes('let activeAuthenticatedUid = null;'));
 assert.ok(source.includes('activeAuthenticatedUid !== user.uid'));
 for(const s of ['authSessionGeneration++;','latestNavigationRequest++;','documentData = Object.create(null);','mainMenuData = [];','window.appInitialized = false;'])assert.ok(source.includes(s),s);
});
test('signout forgets active authenticated user',()=>{
 assert.match(html,/function showLoginScreen\(\)\s*\{\s*activeAuthenticatedUid = null;/);
});
