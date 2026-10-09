import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('home keeps categories while providing a prominent cross-category search',()=>{
 assert.ok(html.includes("contentId === 'home'"));
 assert.ok(html.includes('id="homeDocumentSearchForm"'));
 assert.ok(html.includes('id="homeDocumentSearch"'));
 assert.ok(html.includes("historyStack = ['global-search']"));
 assert.ok(html.includes("search.value = query"));
 assert.ok(html.includes("subMenuData[contentId].forEach(item =>"));
});
test('explicit global search loads missing metadata even with prefetch disabled',()=>{
 assert.ok(html.includes("const searchSession = authSessionGeneration"));
 assert.ok(html.includes("filter(sheet => !loadedDocumentSheets.has(sheet))"));
 assert.ok(html.includes("await ensureDocumentSheet(sheet, searchSession)"));
 assert.ok(html.includes("void Promise.all([loadMore(), loadMore()])"));
});
