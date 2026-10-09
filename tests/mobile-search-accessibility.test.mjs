import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('home search inputs and buttons have touch-friendly dimensions',()=>{
 const start=html.indexOf('/* Two equal search areas on desktop');
 const end=html.indexOf('/* Long Thai titles',start);
 const css=html.slice(start,end);
 assert.ok(css.includes('min-height: 44px; font-size: 16px'));
 assert.ok(css.includes('min-height: 44px;'));
 assert.ok(css.includes('.home-compact-search :focus-visible, .home-category-search :focus-visible'));
 assert.ok(css.includes('@media (max-width: 640px)'));
});
