import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document list shows initial and filtered totals',()=>{
 assert.ok(html.includes('id="documentCount"'));
 assert.ok(html.includes('เอกสารทั้งหมด ${visibleCategoryDocuments.length} รายการ'));
 assert.ok(html.includes('พบ ${visible} จาก ${mainContentDisplay.querySelectorAll'));
});
