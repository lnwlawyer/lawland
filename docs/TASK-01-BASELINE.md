# Lawland — Task 01 Baseline & Regression Safety Net

Scope: repository `lnwlawyer/lawland`, branch `codex/task-01-baseline-regression`. This change adds only documentation and read-only Node.js tests. It does not change application files, production data, deployment, Firebase configuration, or Google Apps Script.

## Source inventory
- `index.html`: single-page Thai document application; inline CSS and JavaScript; Tailwind CSS CDN and Sarabun font; Firebase Authentication via CDN; Google Apps Script endpoint for menu/document data; dynamic sidebar, cards, documents, themes and mobile navigation.
- `manifest.json`: PWA metadata, relative start URL/scope and externally hosted icon URLs.
- No existing test suite or package manifest was present in the inspected root inventory.

## Verified code locations (main baseline)
- `index.html:575-577`: Firebase module imports.
- `index.html:581-602`: service worker created from Blob and registered; requires real browser verification.
- `index.html:606-624`: Firebase initialization.
- `index.html:642-740`: auth state, Google/email login, logout, UI handlers.
- `index.html:755`: Apps Script endpoint.
- `index.html:833-859`: fetch and response handling.
- `index.html:875-903`: sidebar HTML generation and listeners.
- `index.html:918-1079`: dynamic content, documents, theme selection.
- `index.html:1097-1135`: initial data load and navigation.
- `manifest.json`: PWA identity and icon metadata.

## Risks and investigation queue
1. **High / potential XSS**: external data is interpolated into markup and assigned via `innerHTML` (e.g. sidebar/menu/document rendering). Audit and encode text and attributes, and validate URL schemes. This is a risk identified from source, not a demonstrated exploit.
2. **High / unverified authorization**: Firebase sign-in in the client does not by itself establish authorization at the separate Apps Script endpoint. Audit the server-side deployment permissions and identity checks; server source is not in this repository.
3. **Medium / robustness**: API loading needs tests for network failure, invalid JSON, empty datasets, retry/timeout and state restoration.
4. **Medium / PWA**: Blob-based service-worker registration and external icons need browser/install testing; source review alone cannot confirm installability.
5. **Medium / maintainability**: one large HTML file couples authentication, fetching, rendering and styling.
6. **Medium / dependency resilience**: CSS and Firebase modules are loaded from external CDNs. Validate compatibility and offline behavior.

Firebase web `apiKey` is a client configuration identifier, not automatically a secret. Security depends on backend rules and endpoint authorization, neither verified by this task.

## Read-only regression checks
Run with Node.js 20 or later from the repository root:

```sh
node --test tests/baseline.test.mjs
```

Tests assert stable application identity, both login paths, data/navigation symbols, themes/mobile controls and manifest structure. They are **source-level smoke tests only**, not functional, security, API or browser tests. Do not interpret them as proof that production behavior works.

## Next phase acceptance criteria
- Browser tests cover Google/email login (using non-production test accounts), logout, menu/submenu/document navigation, mobile viewport and theme persistence.
- API tests use mocks; production Apps Script must not be called by automated tests.
- Introduce DOM safety tests and reject unsafe URLs before changing renderers.
- Verify PWA installation in a test environment.
- Require green automated tests and reviewable diffs before merge. Do not deploy or merge automatically.
