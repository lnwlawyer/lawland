import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
const reload=html.slice(html.indexOf('async function reload(uid,generation){'),html.indexOf("form.addEventListener('submit'"));
const audit=html.slice(html.indexOf('async function runIntegrityAudit(){'),html.indexOf("field('runAudit').addEventListener"));
test('Firebase menu-read readiness is false by default and on reload',()=>{
 assert.match(html,/menuOverridesReadable=false/);
 assert.match(reload,/overrides=\[\];menuOverridesReadable=false/);
 assert.match(reload,/menuOverridesReadable=true;field\('save'\)\.disabled=false/);
});
test('audit refuses potentially incomplete catalog if overrides read fails',()=>{
 assert.match(audit,/if\(!menuOverridesReadable\)/);
 assert.match(audit,/ยังอ่านเมนู Firebase ไม่สำเร็จ/);
 assert.match(audit,/if\(!actor\|\|actor.uid!==authorizedUid\|\|auditBusy\)return/);
});
test('late rejected audit cannot overwrite current status',()=>{
 assert.match(audit,/catch\(error\)\{if\(auditRun===auditGeneration&&generation===authGeneration&&auth.currentUser\?\.uid===actor.uid\)/);
});
