import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('PDF full-text search controls available in document reader',()=>{
 for(const id of ['pdfTextSearch','pdfLoadFromLink','pdfLocalFile','pdfSearchQuery','pdfSearchButton','pdfSearchResults','pdfCancelSearch']) assert.ok(html.includes('id="'+id+'"'));
});
test('extracts text on every PDF page using PDF.js and renders page snippets',()=>{
 assert.ok(html.includes('pdfJsLibrary.getDocument'));
 assert.ok(html.includes('number <= doc.numPages'));
 assert.ok(html.includes('await page.getTextContent()'));
 assert.ok(html.includes("content.items.map(item => item.str || '').join(' ')"));
 assert.ok(html.includes("frame.src = pdfSearchSourceUrl.split('#')[0] + '#page=' + number"));
});
test('does not send local files to app backend and enforces size limit',()=>{
 assert.ok(html.includes('await file.arrayBuffer()'));
 assert.ok(html.includes('URL.createObjectURL(file)'));
 assert.ok(html.includes('PDF_MAX_BYTES = 30 * 1024 * 1024'));
 assert.ok(html.includes("credentials: 'omit'"));
 assert.ok(html.includes("mode: 'cors'"));
 assert.ok(html.includes('pdfSearchGeneration++'));
 assert.ok(html.includes('ไม่พบชั้นข้อความ'));
});
