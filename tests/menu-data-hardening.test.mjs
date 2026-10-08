import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const start=html.indexOf('function buildDataStructures(');
const end=html.indexOf('function escapeHtml(',start);
const src=html.slice(start,end);
test('invalid menu records are ignored and special keys are safe',()=>{
 const context={mainMenuData:[],subMenuData:{}};
 vm.createContext(context);
 vm.runInContext(src+'\nthis.build = buildDataStructures;',context);
 context.build([null,{menuId:'valid'},{}],[null,{}, {parentMenuId:'__proto__',subMenuId:'safe'}, {parentMenuId:'valid',subMenuId:'child'}]);
 assert.equal(context.mainMenuData.length,1);
 assert.equal(context.subMenuData.valid[0].subMenuId,'child');
 assert.equal(context.subMenuData['__proto__'][0].subMenuId,'safe');
 assert.equal(Object.getPrototypeOf(context.subMenuData),null);
});
