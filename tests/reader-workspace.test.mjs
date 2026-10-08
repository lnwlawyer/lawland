import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('reader workspace supports recent and read later',()=>{
 assert.ok(html.includes('lawland-reader-workspace-v1'));
 assert.ok(html.includes('state.recent = [entry, ...state.recent.filter'));
 assert.ok(html.includes('state.later = existing ?'));
 assert.ok(html.includes('data-reader-kind'));
});
test('comparison stays within app and validates URLs',()=>{
 assert.ok(html.includes('id="readerComparePane" hidden'));
 assert.ok(html.includes('id="readerCompareFrame"'));
 assert.ok(html.includes('const url = safeExternalUrl(event.target.value)'));
 assert.ok(html.includes('documentEmbedUrl(url)'));
});
test('notes stored only in browser with bounded size',()=>{
 assert.ok(html.includes('id="readerNote"'));
 assert.ok(html.includes('maxlength="3000"'));
 assert.ok(html.includes('.value.slice(0, 3000)'));
 assert.ok(html.includes('localStorage.setItem(readerStorageKey'));
});
