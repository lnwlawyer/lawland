import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const settings=html.slice(html.indexOf("if (contentId === 'settings')"),html.indexOf("else if (contentId === 'about')"));
test('settings do not advertise unsupported notification or language controls',()=>{
 assert.ok(settings.includes('id="theme-selector"'));
 assert.ok(settings.includes('ยังไม่มีระบบแจ้งเตือนเอกสารใหม่'));
 assert.ok(!settings.includes('type="checkbox" checked'));
 assert.ok(!settings.includes('<option>English</option>'));
});
