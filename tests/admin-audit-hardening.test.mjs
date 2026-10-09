import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {auditCatalog,auditMenuOverrides,exportAuditCsv} from '../admin-integrity.mjs';
const html=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
test('trashed documents are not false-positive unmapped or hidden findings',()=>{
 const result=auditCatalog([],[],[],[{id:'old',status:'trashed',category:'missing'},{id:'active',status:'published',category:'missing'}]);
 assert.deepEqual(result.map(x=>x.id),['active']);
});
test('active menu override with missing parent is reported',()=>{
 const f=auditMenuOverrides([{id:'s1',kind:'sub',title:'A',parentMenuId:'missing',active:true},{id:'s2',kind:'sub',title:'B',parentMenuId:'missing',active:false}],[],[]);
 assert.deepEqual(f.map(x=>x.type),['override-missing-parent']);
});
test('active menu overrides that are not visible are detected',()=>{
 const f=auditMenuOverrides([{id:'m',kind:'main',title:'M',active:true},{id:'s',kind:'sub',title:'S',parentMenuId:'known',active:true}],[{menuId:'known'}],[]);
 assert.deepEqual(f.map(x=>x.type),['override-not-visible','override-submenu-not-visible']);
});
test('CSV metadata distinguishes skipped Sheets from complete Sheets audit',()=>{
 const csv=exportAuditCsv([],{firebaseComplete:true,sheetsComplete:true,sheetsRequested:false});
 assert.match(csv,/# Sheets complete: not requested/);
});
test('Admin audit includes override diagnostics and full-report disclosure',()=>{
 assert.match(html,/auditMenuOverrides\(overrides,catalog.mainMenus,catalog.subMenus\)/);
 assert.match(html,/รายการทั้งหมดอยู่ในรายงาน CSV/);
});
