import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('in-app viewer offers external fallback for blocked embeds',()=>{
 assert.ok(html.includes('เว็บไซต์ต้นทางไม่อนุญาตให้ฝังเอกสาร'));
 assert.ok(html.includes('documentViewerExternal'));
 assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
});
