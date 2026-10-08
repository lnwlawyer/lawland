import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('search shortcut is replaced when navigating to another page',()=>{
 assert.ok(html.includes("document.removeEventListener('keydown', documentSearchShortcutHandler)"));
 assert.ok(html.includes("document.addEventListener('keydown', documentSearchShortcutHandler)"));
});
test('slash focuses search and escape clears it',()=>{
 assert.ok(html.includes("event.key === '/'"));
 assert.ok(html.includes("event.key === 'Escape'"));
 assert.ok(html.includes("activeDocumentSearch.dispatchEvent(new Event('input'))"));
});
