import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
test('empty document categories are cached and displayed as empty', () => {
  assert.ok(html.includes("if (!documentData[contentId]) documentData[contentId] = [];"));
  assert.ok(html.includes("Array.isArray(visibleCategoryDocuments) && visibleCategoryDocuments.length > 0"));
  assert.ok(html.includes('ยังไม่มีเนื้อหาในหมวดนี้'));
});
test('malformed document entries are skipped', () => {
  assert.ok(html.includes("!doc || typeof doc !== 'object' || typeof doc.parentSubMenuId !== 'string' || !doc.parentSubMenuId"));
});
test('invalid document links do not open the viewer', () => {
  assert.ok(html.includes('const safeUrl = safeExternalUrl(link)'));
  assert.ok(html.includes('if (!safeUrl)'));
  assert.ok(html.includes('frame.src = documentEmbedUrl(safeUrl)'));
});

test('document map is prototype-free at initialization and logout', () => {
  assert.ok(html.includes('let documentData = Object.create(null);'));
  assert.ok(html.includes('documentData = Object.create(null);'));
});
