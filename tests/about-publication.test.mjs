import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const rules=readFileSync(new URL('../firestore/about.rules.fragment',import.meta.url),'utf8');
test('all readers load public About without admin gate',()=>{
 assert.match(html,/getDoc\(doc\(contentDb,'publicContent','about'\)\)/);
 assert.match(html,/if \(contentId === 'about'\) void loadPublishedAbout\(navigationRequest\)/);
 assert.match(html,/target\.textContent = publishedAbout\[key\]/);
});
test('only Admin may publish and transaction records actor/version',()=>{
 assert.match(html,/if \(!verifiedAdmin \|\| !auth\.currentUser \|\| !contentDb/);
 assert.match(html,/token\.claims\.admin !== true/);
 assert.match(html,/runTransaction\(contentDb/);
 assert.match(html,/updatedBy:actor\.uid,updatedAt:serverTimestamp\(\)/);
});
test('rules allow public read, Admin writes, no delete or other pages',()=>{
 assert.match(rules,/allow get: if pageId == 'about'/);
 assert.match(rules,/allow create: if pageId == 'about' && isLawlandAdmin\(\)/);
 assert.match(rules,/allow update: if pageId == 'about' && isLawlandAdmin\(\)/);
 assert.match(rules,/allow delete: if false/);
 assert.match(rules,/request\.auth\.token\.admin == true/);
 assert.match(rules,/d\.updatedAt == request\.time/);
});
