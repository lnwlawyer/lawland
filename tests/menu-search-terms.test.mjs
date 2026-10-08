import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('menuSearch uses shared multi-term predicate',()=>{
 assert.ok(html.includes('function matchesSearchTerms(source, query)'));
 assert.ok(html.includes('matchesSearchTerms(card.dataset.menuSearch, query)'));
});
