import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('reset button restores all document list controls',()=>{
 for(const fragment of ['id="resetDocumentFilters"',"sort.value = 'original'","favorites.checked = false","search.value = ''","sort.dispatchEvent(new Event('change'))","search?.dispatchEvent(new Event('input'))"])assert.ok(html.includes(fragment),fragment);
});
