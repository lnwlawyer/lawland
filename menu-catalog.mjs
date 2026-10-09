// Menu overrides are additive to the read-only Google Sheets menu catalog.
// Existing IDs retain their identity; no Sheet records are rewritten or deleted.
export function mergeMenuCatalog(mainMenus,subMenus,overrides){
 const main=new Map(mainMenus.filter(x=>x&&typeof x.menuId==='string').map(x=>[x.menuId,{...x}]));
 const sub=new Map(subMenus.filter(x=>x&&typeof x.subMenuId==='string').map(x=>[x.subMenuId,{...x}]));
 for(const entry of overrides){
  if(!entry||typeof entry.id!=='string'||!['main','sub'].includes(entry.kind))continue;
  if(entry.kind==='main'){
   const previous=main.get(entry.id);
   if(!previous&&entry.active!==true)continue;
   if(entry.active!==true){main.delete(entry.id);continue}
   main.set(entry.id,{...previous,menuId:entry.id,menuTitle:entry.title,icon:previous?.icon||'book',menuOrder:entry.order});
  }else{
   const previous=sub.get(entry.id);
   if(!previous&&entry.active!==true)continue;
   if(entry.active!==true){sub.delete(entry.id);continue}
   sub.set(entry.id,{...previous,subMenuId:entry.id,subMenuTitle:entry.title,parentMenuId:entry.parentMenuId,subMenuOrder:entry.order});
  }
 }
 const order=(a,b,key)=>Number(a[key]??9999)-Number(b[key]??9999);
 const mains=[...main.values()].sort((a,b)=>order(a,b,'menuOrder'));
 const ids=new Set(mains.map(x=>x.menuId));
 const subs=[...sub.values()].filter(x=>ids.has(x.parentMenuId)).sort((a,b)=>order(a,b,'subMenuOrder'));
 return {mainMenus:mains,subMenus:subs};
}
