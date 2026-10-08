# Phase 3 UX/UI release review checklist

## Scope
This branch includes the stacked Phase 2 reliability work and Phase 3 UX 01–19 changes. All pull requests remain drafts; **do not merge or deploy** before manual review.

## Manual checks (desktop and mobile)
- Sign in, navigate to a top-level menu, open nested submenu cards and return.
- Search Thai submenu titles; confirm filtered count, empty state and clear button.
- Search document titles; verify count, sort ก–ฮ / ฮ–ก / original order and reset.
- Add/remove document favorites, filter favorites only, then switch accounts and sign out; verify favorites are cleared.
- Use keyboard: Tab, Shift+Tab, Enter, Space, / and Escape. Confirm visible focus and hidden cards are not activatable.
- Open documents using อ่าน and เปิดในแท็บใหม่; verify popup-blocked feedback and safe links.
- Copy document URLs using HTTPS context; check unsupported clipboard feedback.
- Simulate document fetch failure and initial menu fetch failure; use retry actions.
- Confirm settings only show functional controls and Thai-language capability.
- Check narrow viewport, long Thai document names, contrast, touch target spacing and screen reader labels.

## Release gates
1. Confirm latest stacked branch GitHub Actions pass.
2. Perform browser-based regression testing against safe fixture data.
3. Review all stacked PR diffs for security, privacy and unintended changes.
4. Obtain explicit authorization before merging or deploying.
5. After any authorized deployment, verify GitHub Pages and compare expected commit SHA.

## Safety constraints
No Firebase production writes, no Google Apps Script production modifications, no paid services, and no unapproved deployment.
