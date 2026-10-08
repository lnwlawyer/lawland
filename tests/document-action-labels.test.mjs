import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document action labels are specific and favorite state updates accessibly',()=>{
 assert.ok(html.includes('aria-label="อ่านเอกสาร ${escapeHtml(doc.docName)}"'));
 assert.ok(html.includes('data-document-name="${escapeHtml(doc.docName)}" aria-pressed="false"'));
 assert.ok(html.includes("button.setAttribute('aria-label',"));
 assert.ok(html.includes("button.setAttribute('aria-pressed', String(selected))"));
});
