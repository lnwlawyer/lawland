import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('global document search is available as a compact sidebar option',()=>{
 assert.ok(html.includes('data-content-id="global-search"'));
 assert.ok(html.includes('id="globalDocumentSearch"'));
 assert.ok(html.includes('id="globalDocumentResults"'));
 assert.ok(html.includes('global-search-open'));
});
test('global search only searches metadata and opens authorized document viewer',()=>{
 assert.ok(html.includes('matchesSearchTerms(doc.docName, query)'));
 assert.ok(html.includes('safeExternalUrl(doc.docUrl)'));
 assert.ok(html.includes('openDocumentViewer(entry.name, entry.url)'));
 assert.ok(html.includes('results.slice(0, 150)'));
});
test('global results update as background sheets arrive and indicate incomplete results',()=>{
 assert.ok(html.includes("if (historyStack[historyStack.length - 1] === 'global-search') renderGlobalDocumentSearch();"));
 assert.ok(html.includes('ผลการค้นหายังไม่ครบทุกหมวด'));
 assert.ok(html.includes("loadedDocumentSheets].filter(name => name.startsWith('docs_'))"));
});
