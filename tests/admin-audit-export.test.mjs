import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {exportAuditCsv} from '../admin-integrity.mjs';
const html=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
test('CSV export escapes quotes and multiline text and neutralizes formulas',()=>{
 const csv=exportAuditCsv([{severity:'warning',type:'test',id:'=SUM(1,1)',message:'  +formula "quoted"\nnext'},{severity:'error',type:'test',id:'@cmd',message:'-2'}],{firebaseComplete:false,sheetsComplete:true,sheetsRequested:true});
 assert.ok(csv.startsWith('\uFEFF'));
 assert.ok(csv.includes('"\'=SUM(1,1)"'));
 assert.ok(csv.includes('"\'  +formula ""quoted""\nnext"'));
 assert.ok(csv.includes('"\'@cmd"'));
 assert.ok(csv.includes('"\'-2"'));
 assert.ok(csv.includes('# Firebase complete: false'));
 assert.ok(csv.includes('# Sheets requested: true'));
});
test('CSV report contains all findings without truncation',()=>{
 const findings=Array.from({length:125},(_,i)=>({severity:'warning',type:'x',id:String(i),message:'test'}));
 const csv=exportAuditCsv(findings);
 assert.ok(csv.includes('"124"'));
 assert.equal(csv.split('"warning","x"').length-1,125);
});
test('Admin audit export only enabled after successful scan and cleared on auth change',()=>{
 assert.match(html,/id="downloadAudit" disabled/);
 assert.match(html,/auditExport=exportAuditCsv\(findings/);
 assert.match(html,/auditExport=null;field\('downloadAudit'\)\.disabled=true/);
 assert.match(html,/auth\.currentUser\?\.uid!==authorizedUid/);
 assert.match(html,/URL\.revokeObjectURL\(url\)/);
});
