import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('home search awaits destination rendering before assigning query',()=>{
 const handler=html.slice(html.indexOf("homeSearchForm?.addEventListener('submit'"),html.indexOf("if (contentId === 'global-search') {",html.indexOf("homeSearchForm?.addEventListener('submit'")));
 assert.ok(handler.includes("addEventListener('submit', async event"));
 assert.ok(handler.includes("await renderContent('global-search')"));
 assert.ok(handler.indexOf("await renderContent('global-search')")<handler.indexOf("document.getElementById('globalDocumentSearch')"));
 assert.ok(handler.includes('latestNavigationRequest !== requestedNavigation'));
 assert.ok(handler.includes("historyStack[historyStack.length - 1] !== 'global-search'"));
});
