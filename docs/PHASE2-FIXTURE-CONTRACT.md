# Phase 2 — Fixture API contract for browser acceptance

## Response envelope
The browser expects a JSON object with `success: true` and `data` as an array for every requested sheet. This contract is inferred from the current client code, **not independently verified against the deployed Apps Script**.

| sheetName | Expected records |
| --- | --- |
| MainMenu | `menuId` string; optional `menuTitle`, `icon` |
| SubMenu | `parentMenuId` string, `subMenuId` string; optional `subMenuTitle`, `imageUrl` |
| docs_<mainMenuId> | `parentSubMenuId` string; optional `docName`, `docUrl` |

## Minimal successful fixtures
```json
{"success":true,"data":[{"menuId":"law","menuTitle":"กฎหมาย","icon":"law"}]}
```
```json
{"success":true,"data":[{"parentMenuId":"law","subMenuId":"law-1","subMenuTitle":"กฎหมายทั่วไป"}]}
```
```json
{"success":true,"data":[{"parentSubMenuId":"law-1","docName":"ตัวอย่างเอกสาร","docUrl":"https://example.org/doc"}]}
```

## Negative fixtures
- `{"success":false,"data":[]}`: rejected
- `{"success":true,"data":{}}`: rejected
- HTTP 503: rejected
- Empty `{"success":true,"data":[]}`: valid empty sheet
- Null and malformed menu/document entries: ignored by current validation

## Limitations
This fixture contract does not prove Apps Script backend authorization, CORS compatibility, or real Firebase account permissions. Verify those separately using an approved non-production environment. Never embed credentials or real private documents in fixtures.
