import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
test('document categories expose a manual refresh button and status', () => {
 assert.ok(html.includes('id="refreshDocumentCatalog"'));
 assert.ok(html.includes('อัปเดตรายการเอกสาร'));
 assert.ok(html.includes('id="refreshDocumentStatus" role="status"'));
});
test('refresh fetches a fresh snapshot, replacing only the parent menu categories', () => {
 const start = html.indexOf('async function refreshDocumentSheet(');
 const end = html.indexOf('let latestNavigationRequest = 0;', start);
 const fn = html.slice(start, end);
 assert.ok(fn.includes('await fetchData(sheetName)'));
 assert.ok(fn.indexOf('await fetchData(sheetName)') < fn.indexOf('documentData[id] = replacement[id]'));
 assert.ok(fn.includes('new Set((subMenuData[parentMenuId] || []).map(item => item.subMenuId))'));
 assert.ok(fn.includes('session !== authSessionGeneration'));
 assert.ok(fn.includes('refreshingDocumentSheets.has(sheetName)'));
});
test('failed refresh preserves cached data and leaves the button retryable', () => {
 assert.ok(html.includes('อัปเดตไม่สำเร็จ รายการเดิมยังใช้งานได้'));
 assert.ok(html.includes('refreshButton.disabled = false'));
 assert.ok(html.includes('refreshingDocumentSheets.clear()'));
});
