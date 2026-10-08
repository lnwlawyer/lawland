import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('navigation requests carry monotonically increasing generation',()=>{
 assert.ok(html.includes('let latestNavigationRequest = 0;'));
 assert.ok(html.includes('const navigationRequest = ++latestNavigationRequest;'));
});
test('stale fetch completion cannot render over latest view',()=>{
 assert.ok(html.includes('if (navigationRequest !== latestNavigationRequest) return;'));
 assert.ok(html.indexOf('if (navigationRequest !== latestNavigationRequest) return;') < html.indexOf("mainContentDisplay.innerHTML = '<section id=\"readerWorkspace\"></section>' + htmlContent;"));
});
