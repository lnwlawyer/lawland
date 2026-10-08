import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('blocked popup is not reported as successful open',()=>{
 assert.ok(html.includes("const opened = window.open(safeLink, '_blank', 'noopener,noreferrer')"));
 assert.ok(html.includes('if (opened === null)'));
 assert.ok(html.includes('เบราว์เซอร์อาจบล็อกการเปิดเอกสาร'));
});
