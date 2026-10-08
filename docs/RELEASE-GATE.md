# Release gate — Lawland
1. Run `node --test tests/*.test.mjs` on the proposed commit.
2. Inspect the source diff for unauthorized changes to Firebase configuration, Apps Script endpoint or production resources.
3. Test login/logout and menu/document navigation in a non-production browser session.
4. Test malformed API responses, empty lists, escaped markup, unsafe URL rejection and keyboard navigation with local fixtures.
5. Verify PWA service worker registration and installation in an HTTPS test environment.
6. Verify Google Apps Script access control separately with its owner; client Firebase login is not proof of server authorization.
7. Merge stacked draft PRs in order only after review and green tests; do not enable deployment in this workflow.

CI only runs local source checks; it does not contact production APIs or deploy. No secrets or billing configuration are needed.
