import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('submenu count shows total and live filtered count',()=>{
 assert.ok(html.includes('id="menuCount"'));
 assert.ok(html.includes('หมวดทั้งหมด ${subMenuData[contentId].length} รายการ'));
 assert.ok(html.includes('พบ ${visible} จาก ${mainContentDisplay.querySelectorAll'));
});
