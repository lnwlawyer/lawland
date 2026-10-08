import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document link copy action uses safe URL validation',()=>{
 assert.ok(html.includes('class="btn-copy-document"'));
 assert.ok(html.includes('safeExternalUrl(button.dataset.documentLink)'));
 assert.ok(html.includes('await navigator.clipboard.writeText(safeLink)'));
 assert.ok(html.includes('ไม่สามารถคัดลอกลิงก์ได้'));
});
