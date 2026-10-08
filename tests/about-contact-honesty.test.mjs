import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('about page does not advertise placeholder contact links',()=>{
 assert.ok(html.includes('ยังไม่ได้ระบุช่องทางติดต่อสำหรับหน้านี้'));
 assert.ok(!html.includes('<a href="#" class="text-emerald-600 hover:text-emerald-800">'));
});
