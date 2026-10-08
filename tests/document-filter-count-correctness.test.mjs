import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('favorites-only filter reports filtered results even without search text',()=>{
 assert.ok(html.includes('(query || favoritesOnly?.checked)'));
 assert.ok(html.includes('const total = mainContentDisplay.querySelectorAll'));
 assert.ok(html.includes('เอกสารทั้งหมด ${total} รายการ'));
});
