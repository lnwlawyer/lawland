import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document fetch failure renders retry without caching failure',()=>{
 assert.ok(html.includes('await ensureDocumentSheet(docSheetName)'));
 assert.ok(html.includes('catch (error)'));
 assert.ok(html.includes('id="retryDocumentLoad"'));
 assert.ok(html.includes("renderContent(contentId, true)"));
 assert.ok(html.indexOf('loadedDocumentSheets.add(sheetName)') > html.indexOf('const task = fetchData(sheetName).then(docs =>'));
});
