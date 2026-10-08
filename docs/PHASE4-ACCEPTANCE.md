# Phase 4 acceptance and release gates

## Scope
Phase 4 tasks 01–07: contextual empty state, multi-term document and submenu search, hidden-item CSS correction, responsive document actions, honest About contact state, and accessible search result counts.

## Browser checks required before release
- Search documents with multiple Thai words in different orders, whitespace and no query; ensure all terms must match.
- Search submenu cards with multiple words and clear the query; verify result counts and no-result text.
- Confirm hidden document and submenu cards are visually hidden, not keyboard-focusable and cannot be opened.
- On 320px, 375px, 768px and desktop viewports, confirm long document names wrap and all four document actions remain reachable.
- Verify favorites-only empty results, counts and filter reset.
- Use a screen reader to confirm search inputs describe live result counts.
- Verify About has no dead contact links.
- Verify authentication, navigation, original menu categories, source sheet loading, retry flows and safe external links.

## Deployment policy
Source-based Node tests are not browser E2E tests. Do not claim real-device acceptance without executing those checks. Require a successful tip-branch CI run, human review of the aggregate diff, explicit merge/deploy approval, and post-deploy GitHub Pages SHA verification. Do not change Firebase production, Apps Script production, billing, or paid services.

## Additional Tasks 09–14
- Confirm the shared Thai search predicate passes behavioral tests with multiple terms, reordered terms, case normalization, empty strings and null source values.
- Confirm filtered menu cards are not Tab targets; when the focused card disappears, focus returns to submenu search.
- Confirm focused document action returns focus to document search if filtering hides it.
- Confirm installed PWA identity resolves under `/lawland/`, not the GitHub Pages origin root; reinstall may be needed when changing the app identity.
- Confirm mobile pinch zoom works on Android and iOS.
- Check remote manifest icon availability and installed app behavior on real Android devices; the existing icons are hosted on a third-party URL and installation reliability is not yet verified.
