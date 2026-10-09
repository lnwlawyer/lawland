import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
const audit=html.slice(html.indexOf('async function runIntegrityAudit(){'),html.indexOf("field('runAudit').addEventListener"));
test('audit is single-flight and invalidated on menu reload',()=>{
 assert.match(html,/auditGeneration=0,auditBusy=false/);
 assert.match(audit,/if\(!actor\|\|actor.uid!==authorizedUid\|\|auditBusy\)return/);
 assert.match(html,/async function reload\(uid,generation\)\{\s*invalidateAudit\(\)/);
 assert.match(html,/const generation=\+\+authGeneration;authorizedUid=null;menuOverridesReadable=false;invalidateAudit\(\)/);
});
test('stale async Firebase and Sheets results cannot overwrite newer audit',()=>{
 assert.ok((audit.match(/auditRun!==auditGeneration/g)||[]).length>=3);
 assert.match(audit,/if\(auditRun===auditGeneration\)\{auditBusy=false;button.disabled=false\}/);
 assert.match(html,/field\('downloadAudit'\)\.disabled=true/);
});
