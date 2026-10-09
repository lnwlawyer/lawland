import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('viewer close event releases both PDF frames regardless of close mechanism',()=>{
 const start=html.indexOf("const documentViewer = document.getElementById('documentViewer');");
 const end=html.indexOf("document.getElementById('readerSaveLater')",start);
 const code=html.slice(start,end);
 assert.ok(code.includes("documentViewer.addEventListener('close'"));
 assert.ok(code.includes("document.getElementById('documentViewerFrame').removeAttribute('src')"));
 assert.ok(code.includes("document.getElementById('readerCompareFrame').removeAttribute('src')"));
 assert.ok(code.includes("document.getElementById('readerComparePane').hidden = true"));
 assert.ok(code.includes('currentReaderDocument = null'));
 assert.ok(code.includes("documentViewer.close()"));
});
