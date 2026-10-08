import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('empty document result distinguishes favorites-only and search',()=>{
 assert.ok(html.includes("emptyState.textContent = favoritesOnly?.checked"));
 assert.ok(html.includes('ไม่พบรายการโปรดที่ตรงกับตัวกรอง'));
 assert.ok(html.includes('ไม่พบเอกสารที่ตรงกับคำค้นหา'));
});
