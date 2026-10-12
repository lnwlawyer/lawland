import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('document sheet is selected from category parent, not home navigation history', () => {
  assert.match(source, /const parentMenuId = currentSubMenuItem\?\.parentMenuId \|\| historyStack\[0\];/);
  assert.match(source, /const docSheetName = `docs_\$\{parentMenuId\}`;/);
  assert.match(source, /const currentSubMenuItem = allSubMenus\.find\(sm => sm\.subMenuId === contentId\)/);
});
