import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('sheet-derived fields are escaped at render sinks',()=>{
 for(const expression of ['escapeHtml(item.menuId)','escapeHtml(item.menuTitle)','escapeHtml(item.subMenuId)','escapeHtml(item.subMenuTitle)','escapeHtml(doc.docName)','escapeHtml(title)']) {
  assert.ok(html.includes(expression),expression);
 }
});
test('external document and image URLs are protocol filtered',()=>{
 assert.match(html,/function safeExternalUrl\(/);
 assert.ok(html.includes("['https:', 'http:'].includes(url.protocol)"));
 assert.ok(html.includes('safeExternalUrl(doc.docUrl)'));
 assert.ok(html.includes('safeExternalUrl(imageUrl)'));
 assert.ok(html.includes('rel="noopener noreferrer"'));
});
test('no raw external values remain in HTML attribute interpolation',()=>{
 for(const expression of ['data-document-link="${doc.docUrl}"','data-menu-item="${item.subMenuId}"','data-content-id="${item.menuId}"']) {
  assert.ok(!html.includes(expression),expression);
 }
});
