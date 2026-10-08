import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('document sorting supports original, ascending and descending Thai titles',()=>{
 assert.ok(html.includes('id="documentSort"'));
 for(const option of ['value="original"','value="asc"','value="desc"'])assert.ok(html.includes(option));
 assert.ok(html.includes("new Intl.Collator('th'"));
 assert.ok(html.includes('data-original-index="${originalIndex}"'));
 assert.ok(html.includes('items.forEach(item => list.appendChild(item))'));
});
