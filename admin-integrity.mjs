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
  // Trashed records are intentionally outside the active navigation catalog.
  if(doc.status==='trashed')continue;
  const category=String(doc.category||'');
  if(!category)findings.push({severity:'warning',type:'uncategorized-document',id:doc.id,message:'เอกสารยังไม่กำหนดหมวดหมู่: '+String(doc.title||doc.id)});
  else if(hidden.has(category))findings.push({severity:'error',type:'hidden-document-category',id:doc.id,message:'เอกสารอยู่ในหมวดหมู่ที่ซ่อน: '+String(doc.title||doc.id)});
  else if(!subs.has(category))findings.push({severity:'warning',type:'unmapped-document',id:doc.id,message:'เอกสารไม่ตรงกับหมวดหมู่ที่แสดง: '+String(doc.title||doc.id)});
 }
 return findings;
}

export function auditSheetDocuments(subMenus,documents){
 const findings=[],ids=new Set(subMenus.map(x=>x.subMenuId));
 for(const item of documents){
  const category=String(item.parentSubMenuId||'').trim();
  if(!category)findings.push({severity:'warning',type:'sheet-document-without-submenu',id:String(item.id||''),message:'เอกสาร Google Sheets ไม่ระบุหมวดหมู่: '+String(item.title||item.docTitle||item.id||'ไม่ระบุชื่อ')});
  else if(!ids.has(category))findings.push({severity:'warning',type:'sheet-document-unmapped',id:String(item.id||''),message:'เอกสาร Google Sheets อ้างหมวดหมู่ที่ไม่แสดง: '+String(item.title||item.docTitle||item.id||'ไม่ระบุชื่อ')});
 }
 return findings;
}
export function summarizeFindings(findings){
 const result={errors:0,warnings:0,byType:{}};
 for(const finding of findings){if(finding.severity==='error')result.errors++;else result.warnings++;result.byType[finding.type]=(result.byType[finding.type]||0)+1}
 return result;
}

export function exportAuditCsv(findings,meta={}){
 const cell=value=>{
  const raw=String(value??'');
  // Neutralize spreadsheet formulas, including leading whitespace/control characters.
  const safe=/^[\s\u0000-\u001f]*[=+@-]/u.test(raw)?"'"+raw:raw;
  return '"'+safe.replaceAll('"','""')+'"';
 };
 const rows=[['severity','type','id','message'],...findings.map(x=>[x.severity,x.type,x.id,x.message])];
 const prefix=['# LawLand integrity audit (read-only)','# Firebase complete: '+Boolean(meta.firebaseComplete),'# Sheets complete: '+(meta.sheetsRequested?Boolean(meta.sheetsComplete):'not requested'),'# Sheets requested: '+Boolean(meta.sheetsRequested)];
 return '\uFEFF'+prefix.join('\r\n')+'\r\n'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
}

export function auditMenuOverrides(overrides,mainMenus,subMenus){
 const findings=[],mains=new Set(mainMenus.map(x=>x.menuId)),subs=new Set(subMenus.map(x=>x.subMenuId));
 for(const entry of overrides){
  if(!entry||entry.active!==true)continue;
  if(entry.kind==='sub'&&!mains.has(entry.parentMenuId)){
   findings.push({severity:'error',type:'override-missing-parent',id:entry.id,message:'หมวดหมู่ที่แก้ไขผ่าน Firebase อ้างเมนูหลักที่ไม่แสดง: '+String(entry.title||entry.id)});
  }
  if(entry.kind==='main'&&!mains.has(entry.id)){
   findings.push({severity:'warning',type:'override-not-visible',id:entry.id,message:'เมนูหลักที่เปิดใช้งานไม่ปรากฏในรายการ: '+String(entry.title||entry.id)});
  }
  if(entry.kind==='sub'&&!subs.has(entry.id)&&mains.has(entry.parentMenuId)){
   findings.push({severity:'warning',type:'override-submenu-not-visible',id:entry.id,message:'หมวดหมู่ที่เปิดใช้งานไม่ปรากฏในรายการ: '+String(entry.title||entry.id)});
  }
 }
 return findings;
}
