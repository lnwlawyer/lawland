import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('startup menu failure offers retry with current auth generation',()=>{
 assert.ok(html.includes('id="retryAppInit"'));
 assert.ok(html.includes("initApp(authSessionGeneration)"));
 assert.ok(html.includes('ลองโหลดข้อมูลใหม่'));
});
