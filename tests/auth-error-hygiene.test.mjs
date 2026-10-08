import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('Google login errors are not directly reflected in the page',()=>{
 assert.ok(!html.includes('showError("เกิดข้อผิดพลาดในการล็อกอินผ่าน Google: " + error.message)'));
 assert.ok(html.includes('ไม่สามารถเข้าสู่ระบบด้วย Google ได้ กรุณาลองใหม่อีกครั้ง'));
});
test('auth initialization failure is not described as mock login mode',()=>{
 assert.ok(!html.includes('Using mock mode for UI preview'));
 assert.ok(!html.includes('Reload for demo mode'));
});
