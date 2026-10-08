import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('dynamic menu cards expose keyboard semantics',()=>{
 assert.ok(html.includes('class="menu-card" role="button" tabindex="0"'));
 assert.ok(html.includes('aria-label="${escapeHtml(item.subMenuTitle)}"'));
});
test('Enter and Space trigger menu navigation',()=>{
 assert.ok(html.includes("mainContentDisplay.addEventListener('keydown'"));
 assert.ok(html.includes("e.key !== 'Enter' && e.key !== ' '"));
 assert.ok(html.includes('renderContent(target.dataset.menuItem)'));
});
