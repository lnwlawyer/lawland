import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('remote fetch uses abort signal and finite timeout',()=>{
 assert.ok(html.includes('new AbortController()'));
 assert.ok(html.includes('setTimeout(() => controller.abort(), 15000)'));
 assert.ok(html.includes('signal: controller.signal'));
 assert.ok(html.includes('clearTimeout(timeoutId)'));
});
test('API contract remains GET with sheetName',()=>{
 assert.ok(html.includes("url.searchParams.append('sheetName', sheetName)"));
 assert.ok(html.includes("method: 'GET'"));
});
