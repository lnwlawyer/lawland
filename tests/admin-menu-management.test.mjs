import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {mergeMenuCatalog} from '../menu-catalog.mjs';
const rules=readFileSync(new URL('../firestore/lawland.rules',import.meta.url),'utf8');
const admin=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
const app=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const docs=readFileSync(new URL('../admin-documents.html',import.meta.url),'utf8');
test('overlay retains original Sheets records and applies main/sub edits and order',()=>{
 const original=[{menuId:'a',menuTitle:'เดิม',menuOrder:10},{menuId:'b',menuTitle:'รอง',menuOrder:20}];
 const subs=[{subMenuId:'s',parentMenuId:'a',subMenuTitle:'หมวดเดิม',subMenuOrder:10}];
 const result=mergeMenuCatalog(original,subs,[{id:'a',kind:'main',title:'ใหม่',order:30,active:true},{id:'s',kind:'sub',title:'หมวดแก้ไข',parentMenuId:'b',order:2,active:true},{id:'custom-1',kind:'main',title:'เพิ่มใหม่',order:1,active:true}]);
 assert.deepEqual(result.mainMenus.map(x=>x.menuId),['custom-1','b','a']);
 assert.equal(result.subMenus[0].parentMenuId,'b');assert.equal(result.subMenus[0].subMenuTitle,'หมวดแก้ไข');
 assert.equal(original[0].menuTitle,'เดิม');assert.equal(subs[0].parentMenuId,'a');
});
test('inactive custom menu does not affect Sheets, orphan submenus are not displayed',()=>{
 const r=mergeMenuCatalog([{menuId:'a',menuTitle:'A'}],[{subMenuId:'s',parentMenuId:'a',subMenuTitle:'S'}],[{id:'custom-z',kind:'main',active:false},{id:'orphan',kind:'sub',active:true,title:'X',parentMenuId:'missing',order:2}]);
 assert.deepEqual(r.mainMenus.map(x=>x.menuId),['a']);assert.deepEqual(r.subMenus.map(x=>x.subMenuId),['s']);
});
test('rules restrict writes to Admin and validate menu schema/version',()=>{
 assert.match(rules,/match \/menuOverrides\/\{menuId\}/);
 assert.match(rules,/allow create: if admin\(\)/);assert.match(rules,/allow update: if admin\(\) && validMenuOverride\(\)/);
 assert.match(rules,/allow delete: if false/);assert.match(rules,/request.resource.data.version==resource.data.version\+1/);
 assert.match(rules,/d.keys\(\).hasOnly\(\['kind','title','parentMenuId','order','active','version','updatedBy','updatedAt'\]\)/);
});
test('Admin editor checks claim and stale version in transaction, original Sheets remain read-only',()=>{
 assert.match(admin,/token.claims.admin!==true/);
 assert.match(admin,/runTransaction\(db,async tx=>/);
 assert.match(admin,/stale-menu-reload-required/);
 assert.match(admin,/fetch\(url,\{signal:controller.signal\}\)/);
 assert.match(admin,/crypto.randomUUID\(\)/);
 assert.doesNotMatch(admin,/deleteDoc\(/);
});
test('main app and Admin document editor consume the same overlays',()=>{
 assert.match(app,/mergeMenuCatalog\(mainMenus,subMenus,overrides\)/);
 assert.match(app,/where\('active','==',true\),limit\(500\)/);
 assert.match(app,/จัดการเมนูหลักและหมวดหมู่ย่อย/);
 assert.match(docs,/mergeMenuCatalog\(parents,children,overlays\)/);
 assert.match(docs,/await loadRealMenus\(\)/);
});
