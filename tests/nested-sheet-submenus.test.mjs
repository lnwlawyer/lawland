import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeMenuCatalog } from '../menu-catalog.mjs';

test('retains nested Google Sheets submenus used by docs_home', () => {
 const main=[{menuId:'home',menuTitle:'หน้าแรก'}];
 const sub=[
  {subMenuId:'A0001',subMenuTitle:'คนต่างด้าว',parentMenuId:'home'},
  {subMenuId:'B0001',subMenuTitle:'หมวดย่อย',parentMenuId:'A0001'},
  {subMenuId:'C0001',subMenuTitle:'ระดับถัดไป',parentMenuId:'B0001'},
  {subMenuId:'ORPHAN',parentMenuId:'missing'}
 ];
 const result=mergeMenuCatalog(main,sub,[]);
 assert.deepEqual(new Set(result.subMenus.map(x=>x.subMenuId)),new Set(['A0001','B0001','C0001']));
});

test('preserves existing nested submenus when an additive override is present',()=>{
 const result=mergeMenuCatalog([{menuId:'home'}],[{subMenuId:'A0001',parentMenuId:'home'},{subMenuId:'B0001',parentMenuId:'A0001'}],[{id:'A0001',kind:'sub',active:true,title:'คนต่างด้าว',parentMenuId:'home'}]);
 assert.ok(result.subMenus.some(x=>x.subMenuId==='B0001'&&x.parentMenuId==='A0001'));
});
