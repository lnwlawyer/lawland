# Phase 2 — Browser and Backend Verification Gate

This repository is a static client. The Firebase login state in the browser is **not** proof that the Google Apps Script endpoint authorizes each data request. Backend authorization and data visibility must be verified with the endpoint owner; no live production endpoint is called by these tests.

## Manual acceptance scenarios (non-production account / fixture backend)
- Sign in via Google and email/password; sign out; sign in as a different user; verify prior document names, lists, and navigation do not remain.
- Begin slow MainMenu/SubMenu loading, sign out, then let it finish; the login screen must remain visible.
- Begin a slow document request, navigate elsewhere, then let it finish; the new page must remain visible.
- Load an empty document category twice; the second visit should not repeat the request.
- Return malformed JSON, HTTP 503, and an unresponsive endpoint; verify errors are shown without leaking credentials or exposing stale content.
- Attempt a `javascript:` document URL; verify no window opens.
- Use Tab, Enter and Space on menu cards and verify visible focus and correct navigation.
- Verify same-origin service worker installation on HTTPS; confirm no authenticated content is cached.
- Test narrow mobile viewport, theme switching, logout, and back navigation.

## Release criteria
- All Node tests pass on the exact candidate SHA.
- Browser acceptance scenarios pass using fixtures and test accounts.
- Endpoint owner verifies Apps Script access control and the actual schema contract.
- Reviewer checks changed-file diff, GitHub Actions permissions, and absence of deployment secrets.
- Merge and deployment require explicit release decision; no Firebase or Apps Script production modifications are part of Phase 2.
