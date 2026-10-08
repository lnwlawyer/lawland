import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('reader workspace is collapsed by default and preserves open state on refresh',()=>{
 assert.ok(html.includes("const wasOpen = root.querySelector('details')?.open || false"));
 assert.ok(html.includes("root.innerHTML = '<details' + (wasOpen ? ' open' : '')"));
 assert.ok(html.includes('<summary>คลังอ่านส่วนตัว'));
});
test('reader lists are bounded and independently scrollable',()=>{
 assert.ok(html.includes('#readerWorkspace .reader-workspace-list'));
 assert.ok(html.includes('max-height: 144px; overflow-y: auto'));
 assert.ok(html.includes('text-overflow: ellipsis'));
});
test('reader controls still open validated saved documents',()=>{
 assert.ok(html.includes("button[data-reader-kind]"));
 assert.ok(html.includes('safeExternalUrl(entry.url)) openDocumentViewer'));
});
