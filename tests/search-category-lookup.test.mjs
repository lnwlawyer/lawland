import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('global search builds a category title map once per render',()=>{
 const start=html.indexOf('function renderGlobalDocumentSearch()');
 const end=html.indexOf('function renderSidebar()',start);
 const section=html.slice(start,end);
 assert.ok(section.includes('const categoryTitles = new Map()'));
 assert.ok(section.includes('categoryTitles.set(item.subMenuId, item.subMenuTitle)'));
 assert.ok(section.includes('categoryTitles.get(subId) || subId'));
 assert.ok(!section.includes('Object.values(subMenuData).flat().find'));
});
