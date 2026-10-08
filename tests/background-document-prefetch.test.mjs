import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
test('background prefetch starts after menus are rendered', () => {
 const init = html.slice(html.indexOf('async function initApp('));
 assert.ok(init.indexOf("renderContent('home');") < init.indexOf('beginDocumentPrefetch(sessionGeneration);'));
 assert.ok(html.includes("const sheets = menuIds.map(id => 'docs_' + id)"));
});
test('bounded concurrent requests share the existing sheet cache', () => {
 assert.ok(html.includes('DOCUMENT_PREFETCH_CONCURRENCY = 2'));
 assert.ok(html.includes('await ensureDocumentSheet(sheet, session)'));
 assert.ok(html.includes('pendingDocumentSheets.has(sheetName)'));
 assert.ok(html.includes('loadedDocumentSheets.has(sheet)'));
});
test('prefetch never downloads PDFs and stops on session changes', () => {
 assert.ok(html.includes('generation === documentPrefetchGeneration'));
 assert.ok(html.includes('session === authSessionGeneration'));
 assert.ok(html.includes('documentPrefetchGeneration++'));
 assert.ok(html.includes('requestIdleCallback'));
 assert.ok(html.includes('Background document preload skipped'));
});
