import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('global search shows a retry control only after failed sheets',()=>{
 assert.ok(html.includes('const globalSearchFailedSheets = new Set()'));
 assert.ok(html.includes('id="retryGlobalSearch" type="button" hidden'));
 assert.ok(html.includes('retry.hidden = globalSearchFailedSheets.size === 0'));
 assert.ok(html.includes('globalSearchFailedSheets.add(sheet)'));
 assert.ok(html.includes('globalSearchFailedSheets.delete(sheet)'));
 assert.ok(html.includes('loadSearchSheets([...globalSearchFailedSheets].filter(sheet => !loadedDocumentSheets.has(sheet)))'));
});
test('retry stays within active authenticated search and limits concurrency',()=>{
 assert.ok(html.includes('searchSession === authSessionGeneration'));
 assert.ok(html.includes("historyStack[historyStack.length - 1] === 'global-search'"));
 assert.ok(html.includes('Promise.all([loadMore(), loadMore()])'));
});
