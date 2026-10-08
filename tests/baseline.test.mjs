// Lawland Task 01: dependency-free, read-only source regression checks.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));
test('Thai document application identity is preserved', () => {
  assert.match(html, /<html lang="th">/);
  assert.match(html, /<title>ระบบจัดเก็บเอกสาร<\/title>/);
  assert.equal(manifest.name, 'Land Law');
  assert.equal(manifest.display, 'standalone');
});
test('both supported Firebase login methods remain wired', () => {
  for (const symbol of ['GoogleAuthProvider', 'signInWithPopup', 'signInWithEmailAndPassword', 'onAuthStateChanged', 'signOut', 'handleGoogleLogin', 'handleEmailLogin', 'handleLogout']) {
    assert.ok(html.includes(symbol), 'Missing auth integration: ' + symbol);
  }
});
test('data integration and navigation functions remain present', () => {
  for (const symbol of ['WEB_APP_URL', 'fetchData(', 'buildDataStructures(', 'renderSidebar(', 'renderContent(', 'initApp(', 'data-content-id', 'data-document-link']) {
    assert.ok(html.includes(symbol), 'Missing baseline symbol: ' + symbol);
  }
});
test('theme and mobile navigation baseline remains present', () => {
  for (const symbol of ['applyTheme(', 'loadTheme(', 'toggleSidebar(', 'document_system_theme']) {
    assert.ok(html.includes(symbol), 'Missing UI baseline symbol: ' + symbol);
  }
});
test('PWA manifest uses relative app entrypoint and icons', () => {
  assert.equal(manifest.start_url, './index.html');
  assert.equal(manifest.scope, './');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 1);
  assert.match(html, /rel="manifest" href="manifest.json"/);
});
