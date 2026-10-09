import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {mergeMenuCatalog,duplicateMenuTitle,orderedSiblingIds,reorderSiblingIds} from '../menu-catalog.mjs';
const html=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
const docs=readFileSync(new URL('../admin-documents.html',import.meta.url),'utf8');
const originals=[{menuId:'m1',menuTitle:'กฎหมาย',menuOrder:2},{menuId:'m2',menuTitle:'คำสั่ง',menuOrder:1}];
const subs=[{subMenuId:'s1',subMenuTitle:'ทะเบียน',parentMenuId:'m1',subMenuOrder:1},{subMenuId:'s2',subMenuTitle:'ที่ดิน',parentMenuId:'m1',subMenuOrder:2}];
test('reorder operates only within siblings and does not mutate input',()=>{const c=mergeMenuCatalog(originals,subs,[]);assert.deepEqual(orderedSiblingIds(c,'main'),['m2','m1']);assert.deepEqual(reorderSiblingIds(['s1','s2'],'s2','s1'),['s2','s1']);assert.deepEqual(reorderSiblingIds(['s1','s2'],'missing','s1'),['s1','s2']);assert.equal(subs[0].subMenuOrder,1)});
test('duplicates are scoped to kind and parent and ignore current item',()=>{const c=mergeMenuCatalog(originals,subs,[]);assert.equal(duplicateMenuTitle(c,'main',' กฎหมาย '),true);assert.equal(duplicateMenuTitle(c,'main','กฎหมาย','','m1'),false);assert.equal(duplicateMenuTitle(c,'sub','ทะเบียน','m1'),true);assert.equal(duplicateMenuTitle(c,'sub','ทะเบียน','m2'),false)});
test('hidden override leaves source intact and keeps unrelated items',()=>{const c=mergeMenuCatalog(originals,subs,[{id:'s1',kind:'sub',active:false}]);assert.deepEqual(c.subMenus.map(x=>x.subMenuId),['s2']);assert.equal(subs.length,2)});
test('UI includes drag/drop, keyboard alternatives, safe visibility, and version checks',()=>{for(const fragment of ['dragstart','dragover','dragleave',"'drop'","'↑'","'↓'","'ซ่อนเมนู'","'แสดงเมนู'","runTransaction(db,async tx=>","conflict-reload-required","duplicateMenuTitle(","where('category','==',id)","ต้องย้ายหรือซ่อนหมวดหมู่ย่อยก่อนซ่อนเมนูหลัก"])assert.ok(html.includes(fragment),fragment)});
test('documents preserve category IDs and Admin has menu navigation',()=>{assert.match(docs,/รหัสหมวดหมู่ย่อยเดิม/);assert.match(docs,/admin-menus\.html/);assert.doesNotMatch(html,/id="reset"/)});

test('legacy Sheets menus cannot be hidden accidentally',()=>{assert.match(html,/mainSheets.some\(x=>x.menuId===id\)/);assert.match(html,/subSheets.some\(x=>x.subMenuId===id\)/);assert.match(html,/ป้องกันเอกสารเดิมหายจากการนำทาง/)});
