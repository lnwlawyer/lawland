import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('home category clear button appears only for an active query',()=>{
 assert.ok(html.includes('aria-label="ล้างคำค้นหาหมวดย่อย" hidden'));
 assert.ok(html.includes("clearMenuButton.hidden = !query"));
 assert.ok(html.includes('.home-category-search button[hidden] { display: none; }'));
 assert.ok(html.includes("menuSearch.dispatchEvent(new Event('input'))"));
});
