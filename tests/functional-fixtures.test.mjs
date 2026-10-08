import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
function functionSource(name, nextName) {
  const start = html.indexOf('        ' + (name === 'fetchData' ? 'async ' : '') + 'function ' + name + '(');
  const end = html.indexOf('        function ' + nextName + '(', start);
  assert.ok(start >= 0 && end > start, 'function boundaries: ' + name);
  return html.slice(start, end);
}
const fetchSource = functionSource('fetchData', 'buildDataStructures');
const buildSource = functionSource('buildDataStructures', 'escapeHtml');
const helpersStart = html.indexOf('        function escapeHtml(');
const helpersEnd = html.indexOf('        function renderSidebar(', helpersStart);
assert.ok(helpersStart >= 0 && helpersEnd > helpersStart);
const helperSource = html.slice(helpersStart, helpersEnd);

function fetchContext(payload, options = {}) {
  const calls = [];
  const messages = [];
  const context = {
    URL,
    WEB_APP_URL: 'https://example.test/exec',
    AbortController,
    setTimeout,
    clearTimeout,
    console: { error() {} },
    showMessage: (...args) => messages.push(args),
    fetch: async (url, init) => {
      calls.push({ url: String(url), init });
      if (options.reject) throw options.reject;
      return { ok: options.ok ?? true, status: options.status ?? 200, json: async () => payload };
    }
  };
  vm.createContext(context);
  vm.runInContext(fetchSource + '\nthis.callFetch = fetchData;', context);
  return { context, calls, messages };
}
test('valid API payload loads requested sheet using GET', async () => {
  const { context, calls } = fetchContext({ success: true, data: [{ menuId: 'home' }] });
  const rows = await context.callFetch('MainMenu');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].menuId, 'home');
  assert.equal(new URL(calls[0].url).searchParams.get('sheetName'), 'MainMenu');
  assert.equal(calls[0].init.method, 'GET');
  assert.ok(calls[0].init.signal);
});
test('invalid API payload fails closed and displays error', async () => {
  for (const payload of [null, {}, { success: false, data: [] }, { success: true, data: {} }]) {
    const { context, messages } = fetchContext(payload);
    await assert.rejects(context.callFetch('MainMenu'));
    assert.equal(messages.length, 1);
  }
});
test('HTTP failure is rejected', async () => {
  const { context } = fetchContext(null, { ok: false, status: 503 });
  await assert.rejects(context.callFetch('MainMenu'), /503/);
});
test('menu grouping preserves parent relationships', () => {
  const context = { mainMenuData: [], subMenuData: {} };
  vm.createContext(context);
  vm.runInContext(buildSource + '\nthis.group = buildDataStructures;', context);
  context.group([{ menuId: 'a' }], [{ parentMenuId: 'a', subMenuId: 'one' }, { parentMenuId: 'b', subMenuId: 'two' }]);
  assert.equal(context.subMenuData.a[0].subMenuId, 'one');
  assert.equal(context.subMenuData.b[0].subMenuId, 'two');
  assert.throws(() => context.group(null, []), /arrays/);
});
test('HTML escaping neutralizes untrusted markup and attributes', () => {
  const context = { window: { location: { href: 'https://example.test/' } }, URL };
  vm.createContext(context);
  vm.runInContext(helperSource + '\nthis.escape = escapeHtml; this.safe = safeExternalUrl;', context);
  assert.equal(context.escape('<img src="x" onerror=\'bad\'>&'), '&lt;img src=&quot;x&quot; onerror=&#39;bad&#39;&gt;&amp;');
  assert.equal(context.safe('javascript:alert(1)'), '');
  assert.equal(context.safe('data:text/html,bad'), '');
  assert.equal(context.safe('https://example.test/doc'), 'https://example.test/doc');
});
