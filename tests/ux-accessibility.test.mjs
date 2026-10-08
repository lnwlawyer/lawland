import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('hidden search results are hidden even when display styles are applied',()=>assert.ok(html.includes('.hidden, [hidden] { display: none !important; }')));
test('keyboard focus and reduced motion preferences are supported',()=>{
 assert.ok(html.includes(':focus-visible'));
 assert.ok(html.includes('prefers-reduced-motion: reduce'));
});
test('document success toast occurs only after safe URL validation',()=>{
 const start=html.indexOf("const safeLink = safeExternalUrl(docLink)");
 const end=html.indexOf("showMessage('ลิงก์เอกสารไม่ถูกต้อง",start);
 const block=html.slice(start,end);
 assert.ok(block.indexOf('if (safeLink)')>=0);
 assert.ok(block.indexOf('if (safeLink)')<block.indexOf('กำลังเปิดเอกสาร'));
});
