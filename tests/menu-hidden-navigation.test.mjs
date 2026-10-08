import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('hidden submenu cards cannot be opened by keyboard or click',()=>{
 assert.ok(html.includes('target.hidden || !target.dataset.menuItem'));
 assert.ok(html.includes('target && !target.hidden && target.dataset.menuItem'));
 assert.ok(html.includes("if (e.key !== 'Enter' && e.key !== ' ') return;"));
});
