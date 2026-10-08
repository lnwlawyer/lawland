import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('search inputs reference their live result count status',()=>{
 assert.ok(html.includes('aria-controls="subMenuGrid" aria-describedby="menuCount"'));
 assert.ok(html.includes('aria-controls="documentList" aria-describedby="documentCount"'));
});
