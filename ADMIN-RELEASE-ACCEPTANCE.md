# LawLand Admin — Release acceptance checklist

This checklist is for an authorized administrator. It does **not** require changing production data.

## Automated checks (GitHub)
- [ ] GitHub Actions “Lawland Read-Only Tests” is green on the merged main commit.
- [ ] GitHub Pages build and deployment is green on the same commit.
- [ ] The deployed Admin menus page loads without a blank screen.

## Authenticated browser acceptance (manual, read-only)
1. Sign in through the LawLand home page with the authorized Admin Google account.
2. Open `admin-menus.html`. Confirm the menu list is populated, with the expected main/submenus.
3. If the page says Firebase menus cannot be read, **stop**; do not rely on an integrity report until permissions are verified. Do not deploy Rules as a workaround without separate approval.
4. Click **ตรวจสอบความครบถ้วน**. Confirm the counts and findings render and **ส่งออกรายงาน CSV** becomes enabled.
5. Optionally select **ตรวจสอบเอกสาร Google Sheets ด้วย** and rerun the scan. Check whether the report warns about a partial scan (1,000 Firebase documents / 20 Sheets main menus) or unavailable Sheets.
6. Download the CSV and verify that its completeness indicators match the on-screen warning. A zero finding count on a partial scan is **not** proof that all records are correct.
7. Open a flagged Firebase document using the report link, if one exists. Confirm the Admin editor opens the correct document. **Do not click Save** during a read-only acceptance test.
8. Reload the menus page while a scan is in progress. Verify that a new scan can be started and a stale CSV is not downloadable.
9. Sign out or change account. Verify that Admin controls and the previous report are no longer accessible.

## Security and operating boundaries
- Google Sheets source data is read-only.
- Firestore Rules are not automatically deployed by GitHub Pages.
- Do not use live production writes merely to test an editor; schedule a separately approved controlled test.
- Do not enable billing or paid Firebase services.
- Browser authentication, permissions, and actual content coverage cannot be established by static CI alone.

**Release decision:** Record the tested URL, commit SHA, tester, date, actual Admin test results, and any open defects before marking end-to-end acceptance complete.
