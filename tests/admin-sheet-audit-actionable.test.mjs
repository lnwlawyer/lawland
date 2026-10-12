import test from 'node:test';import assert from 'node:assert/strict';import {auditSheetDocuments} from '../admin-integrity.mjs';
test('Sheets findings use real docName and include category ID',()=>{
 const f=auditSheetDocuments([{subMenuId:'valid'}],[{parentSubMenuId:'missing',docName:'เอกสารตัวอย่าง',docUrl:'https://example.org'}]);
 assert.equal(f.length,1);assert.equal(f[0].type,'sheet-document-unmapped');
 assert.match(f[0].message,/เอกสารตัวอย่าง/);assert.match(f[0].message,/missing/);
 assert.doesNotMatch(f[0].message,/ไม่ระบุชื่อ/);
});
test('valid referenced category has no false positive',()=>{
 assert.equal(auditSheetDocuments([{subMenuId:'valid'}],[{parentSubMenuId:' valid ',docName:'ชื่อ'}]).length,0);
});
test('missing category shows real document name and explicit missing ID',()=>{
 const f=auditSheetDocuments([],[{docName:'หนังสือเวียน'}]);
 assert.match(f[0].message,/หนังสือเวียน/);assert.match(f[0].message,/รหัสหมวดหมู่: ไม่ระบุ/);
});
test('null or invalid Sheets records do not crash audit',()=>{
 assert.deepEqual(auditSheetDocuments([],[null,undefined]),[]);
});
