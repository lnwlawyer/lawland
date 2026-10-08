import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const match=html.match(/function documentEmbedUrl\(value\) \{[\s\S]*?\n        \}/);
assert.ok(match,'documentEmbedUrl is present');
const safeExternalUrl=value=>{try{const u=new URL(String(value),'https://lnwlawyer.github.io/lawland/');return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
const embed=vm.runInNewContext('('+match[0]+')',{safeExternalUrl,URL});
test('Google Drive file link becomes preview',()=>{
 assert.equal(embed('https://drive.google.com/file/d/abc123/view?usp=sharing'),'https://drive.google.com/file/d/abc123/preview');
});
test('other safe links stay unchanged',()=>{
 assert.equal(embed('https://example.com/guide.pdf'),'https://example.com/guide.pdf');
 assert.equal(embed('javascript:alert(1)'),'');
});
test('viewer has accessible close and external fallback',()=>{
 assert.match(html,/<dialog id="documentViewer" aria-labelledby="documentViewerTitle"/);
 assert.ok(html.includes('documentViewer.close()'));
 assert.ok(html.includes('documentViewerFrame'));
 assert.ok(html.includes('เปิดในแท็บใหม่'));
 assert.ok(html.includes('openDocumentViewer(button.dataset.documentName, button.dataset.documentLink)'));
});
