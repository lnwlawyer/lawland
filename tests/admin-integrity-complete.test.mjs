import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {auditSheetDocuments,summarizeFindings} from '../admin-integrity.mjs';
const menus=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
const documents=readFileSync(new URL('../admin-documents.html',import.meta.url),'utf8');
test('Google Sheets document audit detects missing or invalid submenu IDs',()=>{
 const findings=auditSheetDocuments([{subMenuId:'valid'}],[{id:'a',parentSubMenuId:'valid'},{id:'b',parentSubMenuId:'missing',title:'B'},{id:'c',parentSubMenuId:''}]);
 assert.deepEqual(findings.map(x=>x.type),['sheet-document-unmapped','sheet-document-without-submenu']);
});
test('summary counts severity without modifying input',()=>{
 const input=[{type:'a',severity:'error'},{type:'a',severity:'warning'},{type:'b',severity:'warning'}];
 assert.deepEqual(summarizeFindings(input),{errors:1,warnings:2,byType:{a:2,b:1}});
 assert.equal(input[0].severity,'error');
});
test('Google Sheets audit is opt-in, bounded and read-only',()=>{
 assert.match(menus,/id="includeSheetAudit"/);
 assert.match(menus,/menuIds\.slice\(0,20\)/);
 assert.match(menus,/sheet\('docs_'\+menuId\)/);
 assert.match(menus,/ผล Google Sheets บางส่วน/);
 assert.match(menus,/ตรวจสอบต้นฉบับ Google Sheets/);
 assert.doesNotMatch(menus,/updateDoc\(/);
});
test('flagged Firebase documents open only after verified Admin authentication',()=>{
 assert.match(menus,/admin-documents\.html\?auditDoc=/);
 assert.match(documents,/new URLSearchParams\(location.search\)\.get\('auditDoc'\)/);
 assert.match(documents,/await actor.getIdTokenResult\(true\)/);
 assert.match(documents,/token.claims.admin!==true/);
 assert.match(documents,/await getDoc\(doc\(db,'managedDocuments',id\)\)/);
 assert.match(documents,/กดบันทึกด้วยตนเอง/);
 assert.match(documents,/verification!==authVerificationGeneration/);
});
