import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const start=html.indexOf('function showLoginScreen()');
const end=html.indexOf('function showError(',start);
const logout=html.slice(start,end);
test('logout clears session-scoped menu and document caches',()=>{
 for(const line of ['latestNavigationRequest++;','historyStack = [];','documentData = {};','mainMenuData = [];','subMenuData = {};'])assert.ok(logout.includes(line),line);
});
test('logout hides the authenticated application',()=>{
 assert.ok(logout.includes("mainLayout.classList.add('hidden')"));
 assert.ok(logout.includes("loginPage.classList.remove('hidden')"));
});
