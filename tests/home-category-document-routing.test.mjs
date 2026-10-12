import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('nested categories resolve document sheets through the root main menu', () => {
 assert.match(source,/function documentRootMenuId\(contentId\)/);
 assert.match(source,/while \(!mainIds\.has\(id\) && !visited\.has\(id\)\)/);
 assert.match(source,/const parentMenuId = documentRootMenuId\(contentId\);/);
 assert.match(source,/const docSheetName = `docs_\$\{parentMenuId\}`;/);
 assert.match(source,/refreshDocumentSheet\('docs_' \+ parentMenuId, parentMenuId, session\)/);
});
