import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('published Firebase library is available in main app to regular users',()=>{assert.doesNotMatch(s,/data-content-id="firebase-published"/);assert.match(s,/mergedCategoryDocuments\(contentId\)/);assert.match(s,/where\('status', '==', 'published'\)/);});
test('published Firebase library uses safe DOM and session navigation guards',()=>{assert.match(s,/rows\.replaceChildren\(\)/);assert.match(s,/title\.textContent = String\(item\.title/);assert.match(s,/session !== authSessionGeneration/);assert.match(s,/navigationRequest !== latestNavigationRequest/);assert.match(s,/rel = 'noopener noreferrer'/);});
