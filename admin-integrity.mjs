// Pure, read-only integrity diagnostics for the LawLand menu/document catalog.
export function auditCatalog(mainMenus,subMenus,overrides,documents){
 const findings=[];
 const mains=new Map(mainMenus.map(x=>[x.menuId,x]));
 const subs=new Map(subMenus.map(x=>[x.subMenuId,x]));
 const seen=new Map();
 for(const m of mainMenus){const key=String(m.menuTitle||'').trim().toLocaleLowerCase('th');if(key&&seen.has(key))findings.push({severity:'warning',type:'duplicate-main-title',id:m.menuId,message:'ชื่อเมนูหลักซ้ำ: '+m.menuTitle});else if(key)seen.set(key,m.menuId)}
 const seenSubs=new Set();
 for(const s of subMenus){
  if(!mains.has(s.parentMenuId))findings.push({severity:'error',type:'orphan-submenu',id:s.subMenuId,message:'หมวดหมู่ไม่มีเมนูหลัก: '+s.subMenuTitle});
  const key=s.parentMenuId+'|'+String(s.subMenuTitle||'').trim().toLocaleLowerCase('th');
  if(seenSubs.has(key))findings.push({severity:'warning',type:'duplicate-submenu-title',id:s.subMenuId,message:'ชื่อหมวดหมู่ซ้ำภายใต้เมนูหลักเดียวกัน: '+s.subMenuTitle});
  seenSubs.add(key);
 }
 const hidden=new Set(overrides.filter(x=>x.active===false).map(x=>x.id));
 for(const doc of documents){
  const category=String(doc.category||'');
  if(!category)findings.push({severity:'warning',type:'uncategorized-document',id:doc.id,message:'เอกสารยังไม่กำหนดหมวดหมู่: '+String(doc.title||doc.id)});
  else if(hidden.has(category))findings.push({severity:'error',type:'hidden-document-category',id:doc.id,message:'เอกสารอยู่ในหมวดหมู่ที่ซ่อน: '+String(doc.title||doc.id)});
  else if(!subs.has(category))findings.push({severity:'warning',type:'unmapped-document',id:doc.id,message:'เอกสารไม่ตรงกับหมวดหมู่ที่แสดง: '+String(doc.title||doc.id)});
 }
 return findings;
}
