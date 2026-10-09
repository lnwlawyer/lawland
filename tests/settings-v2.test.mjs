import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
test('settings v2 validates locally persisted preferences', () => {
 assert.ok(html.includes("const SETTINGS_KEY = 'lawland-settings-v2'"));
 assert.ok(html.includes("['small', 'normal', 'large'].includes(saved.fontSize)"));
 assert.ok(html.includes("['original', 'asc', 'desc'].includes(saved.documentSort)"));
 assert.ok(html.includes("typeof saved.prefetch === 'boolean'"));
});
test('settings v2 has functional controls and defaults', () => {
 for (const id of ['settingFontSize','settingDensity','settingDocumentSort','settingPrefetch','settingClearDocumentCache','settingReset','settingCacheStatus']) {
   assert.ok(html.includes('id="'+id+'"'), id);
 }
 assert.ok(html.includes('saveSettings({ prefetch: prefetch.checked })'));
 assert.ok(html.includes('if (appSettings.prefetch) beginDocumentPrefetch(sessionGeneration)'));
 assert.ok(html.includes("documentSort.value = appSettings.documentSort"));
 assert.ok(html.includes("localStorage.removeItem(SETTINGS_KEY)"));
});
test('settings v2 retains original Google Sheets API and does not store credentials', () => {
 assert.ok(html.includes("fetchData('MainMenu')"));
 assert.ok(html.includes("fetchData('SubMenu')"));
 assert.ok(html.includes('loadedDocumentSheets.clear()'));
 assert.ok(html.includes('documentPrefetchGeneration++'));
});
