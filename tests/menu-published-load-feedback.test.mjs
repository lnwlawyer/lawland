import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('submenu shows a visible Firebase error without hiding Sheets documents',()=>{
 assert.match(s,/firebaseSearchLoadState==='error'/);
 assert.match(s,/ไม่สามารถโหลดเอกสาร Firebase ได้ในขณะนี้ เอกสารจากคลังเดิมยังใช้งานได้/);
 assert.match(s,/id="retryMenuPublished"/);
 assert.match(s,/if \(!documentData\[contentId\]\) documentData\[contentId\] = \[\]/);
 assert.match(s,/mergedCategoryDocuments\(contentId\)/);
});
test('load-more and retry use one bounded batch, not four automatic batches',()=>{
 assert.match(s,/firebaseSearchPageSize = 50/);
 assert.match(s,/loadMenuPublishedDocuments\(session,1\)/);
 assert.match(s,/renderContent\(contentId,true,0\)/);
 assert.match(s,/firebaseBatches = 4/);
 assert.match(s,/loadMenuPublishedDocuments\(authSessionGeneration,firebaseBatches\)/);
 assert.match(s,/id="loadMoreMenuPublished"/);
 assert.match(s,/โหลดเพิ่มเติมอีก 50 รายการ/);
});
test('retry guards active user, stale navigation, session and duplicate request',()=>{
 assert.match(s,/!button\|\|!auth.currentUser\|\|firebaseSearchPromise/);
 assert.match(s,/session!==authSessionGeneration\|\|nav!==latestNavigationRequest/);
 assert.match(s,/button.disabled=true/);
 assert.match(s,/if\(!contentDb\)return/);
 assert.match(s,/firebaseSearchLoadState==='error'\|\|session!==authSessionGeneration/);
});
