import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('background metadata failures do not trigger global error banners',()=>{
 assert.ok(html.includes('async function fetchData(sheetName, { notifyOnError = true } = {})'));
 assert.ok(html.includes("if (notifyOnError) showMessage("));
 assert.ok(html.includes('fetchData(sheetName, { notifyOnError: false }).then'));
});
test('foreground document failure keeps inline retry action',()=>{
 assert.ok(html.includes('ไม่สามารถโหลดรายการเอกสารได้ กรุณาลองอีกครั้ง'));
 assert.ok(html.includes('id="retryDocumentLoad"'));
});
