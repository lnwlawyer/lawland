import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
const invalidate=html.slice(html.indexOf('function invalidateAudit(){'),html.indexOf('async function runIntegrityAudit(){'));
const audit=html.slice(html.indexOf('async function runIntegrityAudit(){'),html.indexOf("field('runAudit').addEventListener"));
test('canceling audit frees single-flight lock and re-enables scan button',()=>{
 assert.match(invalidate,/auditGeneration\+\+/);
 assert.match(invalidate,/auditBusy=false/);
 assert.match(invalidate,/field\('runAudit'\)\.disabled=false/);
 assert.match(invalidate,/auditExport=null/);
 assert.match(invalidate,/field\('downloadAudit'\)\.disabled=true/);
});
test('late Google Sheets success or failure cannot modify a canceled report',()=>{
 assert.match(audit,/const sheetDocs=await sheet\('docs_'\+menuId\);\s*if\(generation!==authGeneration\|\|auditRun!==auditGeneration/);
 assert.match(audit,/catch\(error\)\{if\(generation!==authGeneration\|\|auditRun!==auditGeneration/);
 assert.match(audit,/finally\{if\(auditRun===auditGeneration\)/);
});
