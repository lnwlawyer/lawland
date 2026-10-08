import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const start=html.indexOf('async function fetchData(');
const end=html.indexOf('function buildDataStructures(',start);
const source=html.slice(start,end);
test('timeout covers response body parsing as well as headers',()=>{
 const json=source.indexOf('result = await response.json()');
 const cleanup=source.indexOf('clearTimeout(timeoutId)');
 assert.ok(json>=0 && cleanup>json);
 assert.ok(source.includes('signal: controller.signal'));
});
