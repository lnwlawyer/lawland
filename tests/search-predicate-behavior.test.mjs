import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const match=html.match(/function matchesSearchTerms\(source, query\) \{[\s\S]*?\n        \}/);
assert.ok(match,'shared search predicate is present');
const matches=vm.runInNewContext('('+match[0]+')');
test('Thai words match regardless of order',()=>{
 assert.equal(matches('การโอนมรดกที่ดิน','ที่ดิน มรดก'),true);
 assert.equal(matches('การโอนมรดกที่ดิน','มรดก ภาษี'),false);
});
test('whitespace, casing and missing fields are safe',()=>{
 assert.equal(matches('Land Registry','  REGISTRY   land '),true);
 assert.equal(matches('ที่ดิน','   '),true);
 assert.equal(matches(null,'ที่ดิน'),false);
 assert.equal(matches(undefined,''),true);
});
