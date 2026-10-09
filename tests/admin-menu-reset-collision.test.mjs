import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../admin-menus.html',import.meta.url),'utf8');
test('menu reset button cannot shadow native HTMLFormElement.reset()',()=>{assert.match(html,/function reset\(\)\{form\.reset\(\)/);assert.match(html,/id="resetMenuButton"/);assert.match(html,/field\('resetMenuButton'\)\.addEventListener\('click',reset\)/);assert.doesNotMatch(html,/id="reset"/)});
test('menu form has no named control shadowing native reset method',()=>{const form=html.match(/<form id="menuForm">([\s\S]*?)<\/form>/);assert.ok(form);assert.doesNotMatch(form[1],/\b(?:id|name)="reset"/)});
