# Phase 2 — Integration and release decision record

## Completed development scope
1. Isolated API and menu behavior fixtures
2. Empty document caching and safe document links
3. Latest-navigation generation guard
4. Logout session cache reset
5. Timeout covering response body parsing
6. Authentication-session generation guard
7. Browser and backend acceptance checklist
8. Authentication error hygiene
9. Malformed menu record validation and prototype-safe submenu lookup

## Verification evidence to collect before release
- GitHub Actions read-only Node test workflow succeeds for the **exact integration head SHA**.
- Verify the Google Apps Script response contract using an approved test endpoint, not production.
- Test Google/email login, logout, empty documents, malformed API responses, navigation races, keyboard access, mobile UI, and PWA behavior in a browser.
- Confirm server-side authorization; browser Firebase sign-in alone does not protect the Apps Script endpoint.
- Check no changes were made to Firebase Production, Apps Script Production, billing, or secrets.
- Check GitHub Pages deployment only after an explicit release decision.

## Status
This file records implementation and review gates; it is **not** evidence that manual browser tests or backend authorization checks have passed. Do not label the phase production-ready until those checks are complete.
