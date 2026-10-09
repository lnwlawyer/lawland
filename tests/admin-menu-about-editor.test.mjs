import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
test('Admin menu appears below About only for verified Admin', () => {
 const a = html.indexOf('staticMenus.forEach(item =>');
 const b = html.indexOf('if (verifiedAdmin) {', a);
 const c = html.indexOf('admin-management', b);
 assert.ok(a >= 0 && b > a && c > b);
 assert.match(html, /token\.claims\.admin === true/);
});
test('reader has no large Admin panel', () => {
 assert.doesNotMatch(html, /ADMIN WORKSPACE|mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2/);
});
test('About draft is Admin-only and locally stored', () => {
 assert.match(html, /if \(!verifiedAdmin \|\| !auth\.currentUser\) return;/);
 assert.match(html, /localStorage\.setItem\(ABOUT_DRAFT_PREFIX \+ auth\.currentUser\.uid/);
 assert.match(html, /escapeHtml\(aboutInfo\.name\)/);
 assert.match(html, /บันทึกฉบับร่างไว้ในเบราว์เซอร์/);
});
