# LawLand — production readiness audit (9 October 2026)

## Verified baseline
- Main at `0576d2f7cbf5aa321b812e3ded3e7d13571e9e26` when audit began.
- GitHub Pages and read-only test workflows most recently reported success.
- Phase 4 release branch diverged from main (30 commits ahead / 29 behind). **Do not merge stacked draft PRs blindly.**

## Required gates before declaring production ready
- [ ] Reconcile Phase 4 changes against current main, preserving all newer fixes.
- [ ] Run complete `node --test tests/*.test.mjs` suite on the exact proposed release SHA.
- [ ] Verify no regressions in document category counts, search, reader, favorites, filtering, loading retries, authentication and logout.
- [ ] Browser checks at 320/375/768px and desktop, including keyboard and screen-reader accessibility.
- [ ] Verify PWA manifest scope, local icon reliability, service worker and real Android installation.
- [ ] Verify Google Apps Script authorization server-side with its owner, not just client-side Firebase login.
- [ ] Check Firebase/Apps Script endpoint diffs, secrets, billing and production data are unchanged.
- [ ] Review release candidate PR and obtain approval for production deployment.
- [ ] Merge and verify Pages deployed SHA and smoke-test production URL.

**Status:** NOT YET RELEASE-READY. No production settings changed and no deployment requested in this audit.
