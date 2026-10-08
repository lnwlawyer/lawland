import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('hidden search results are hidden even when display styles are applied',()=>assert.ok(html.includes('.hidden, [hidden] { display: none !important; }')));
test('keyboard focus and reduced motion preferences are supported',()=>{
 assert.ok(html.includes(':focus-visible'));
 assert.ok(html.includes('prefers-reduced-motion: reduce'));
});
test('document viewer validates link before setting iframe source',()=>{
 const start=html.indexOf('function openDocumentViewer(name, link)');
 const end=html.indexOf('const documentViewer =',start);
 const block=html.slice(start,end);
 assert.ok(block.includes('const safeUrl = safeExternalUrl(link)'));
 assert.ok(block.includes('if (!safeUrl)'));
 assert.ok(block.indexOf('if (!safeUrl)')<block.indexOf('frame.src = documentEmbedUrl(safeUrl)'));
});
