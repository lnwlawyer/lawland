import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('submenu card search filters in memory and provides empty feedback',()=>{
 for(const part of ['id="menuSearch"','id="subMenuGrid"','data-menu-search=','id="menuSearchEmpty"',"menuSearch?.addEventListener('input'","card.hidden = !matches"])assert.ok(html.includes(part),part);
});
