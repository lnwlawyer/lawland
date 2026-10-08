import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('direct document link is safe and supports opening in a new tab',()=>{
 assert.ok(html.includes('class="btn-open-document'));
 assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
 assert.ok(html.includes("safeExternalUrl(doc.docUrl) || '#'"));
 assert.ok(html.includes("link.setAttribute('aria-disabled', 'true')"));
});
