import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('original green, blue and dark theme palettes remain available',()=>{
 for(const name of ['mint','blue','dark']) assert.ok(html.includes("            "+name+": {"));
 for(const name of ['เขียวมินต์','น้ำเงิน','ธีมมืด']) assert.ok(html.includes(name));
});
test('optional themes use modern indigo rose sand and slate labels while preserving saved keys',()=>{
 for(const name of ['อินดิโก','โรส','แซนด์','สเลต']) assert.ok(html.includes(name));
 for(const key of ['purple','pink','orange','classic']) assert.ok(html.includes('data-theme="'+key+'"'));
});
test('privacy controls require confirmation and preserve other reader state',()=>{
 for(const id of ['settingClearRecent','settingClearLater','settingClearNotes','settingReaderStatus','settingPrivacyMessage']) assert.ok(html.includes('id="'+id+'"'));
 assert.ok(html.includes("window.confirm('ต้องการลบ'"));
 assert.ok(html.includes("const state = readReaderState()"));
 assert.ok(html.includes("state[field] = field === 'notes' ? {} : []"));
 assert.ok(html.includes('writeReaderState(state)'));
});
