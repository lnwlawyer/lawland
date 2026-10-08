import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('login initialization is tied to an authentication generation',()=>{
 assert.ok(html.includes('let authSessionGeneration = 0;'));
 assert.ok(html.includes('const sessionGeneration = authSessionGeneration;'));
 assert.ok(html.includes('initApp(sessionGeneration).catch('));
});
test('logout invalidates pending initialization',()=>{
 assert.match(html,/function showLoginScreen\(\)\s*\{\s*authSessionGeneration\+\+;/);
});
test('late data and late errors cannot alter a new session',()=>{
 const start=html.indexOf('async function initApp(sessionGeneration');
 const end=html.indexOf('// --- EVENT LISTENERS ---',start);
 const block=html.slice(start,end);
 assert.equal(block.split('sessionGeneration !== authSessionGeneration').length-1,2);
});
