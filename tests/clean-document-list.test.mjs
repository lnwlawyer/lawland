import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document list shows read and favorite immediately and groups secondary actions',()=>{
 const start=html.indexOf('documentData[contentId].forEach((doc, originalIndex)');
 const end=html.indexOf('htmlContent += `</div>',start);
 const list=html.slice(start,end);
 assert.ok(list.indexOf('class="btn-read"') < list.indexOf('class="document-more-actions"'));
 assert.ok(list.indexOf('class="btn-favorite-document"') < list.indexOf('class="document-more-actions"'));
 assert.ok(list.includes('<summary aria-label="ตัวเลือกเพิ่มเติมสำหรับ'));
 assert.ok(list.includes('class="btn-open-document'));
 assert.ok(list.includes('class="btn-copy-document'));
});
