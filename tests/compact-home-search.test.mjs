import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('home has side-by-side equal width document and category search',()=>{
 assert.ok(html.includes('class="home-search-pair"'));
 assert.ok(html.includes('grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)'));
 assert.ok(html.includes('id="homeDocumentSearchForm"'));
 assert.ok(html.includes('id="menuSearch"'));
 assert.ok(html.includes('class="home-category-search"'));
});
test('category search is always visible and can be cleared without hiding it',()=>{
 assert.ok(!html.includes('home-category-filter'));
 assert.ok(html.includes('id="clearMenuSearch"'));
 assert.ok(html.includes("menuSearch.dispatchEvent(new Event('input'))"));
 assert.ok(html.includes('id="subMenuGrid"'));
 assert.ok(html.includes('@media (max-width: 640px)'));
});
