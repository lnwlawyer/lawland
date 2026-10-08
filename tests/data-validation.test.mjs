import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('API response is checked for success and array data',()=>{
 assert.ok(html.includes("result.success !== true"));
 assert.ok(html.includes("!Array.isArray(result.data)"));
});
test('menu structure validates input arrays',()=>{
 assert.ok(html.includes("!Array.isArray(mainMenus) || !Array.isArray(allSubMenus)"));
});
test('document lists require array payload',()=>{
 assert.ok(html.includes("Array.isArray(docs) && docs.length > 0"));
});
