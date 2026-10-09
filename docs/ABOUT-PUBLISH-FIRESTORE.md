# Publish “เกี่ยวกับฉัน” to all LawLand users

The reader and Admin editor now support a **single public Firestore document** at `publicContent/about` in Firebase project `lnwlawyer`. All users can read it; only a signed-in Admin with the verified Firebase custom claim `admin: true` can create/update it. The browser uses a Firestore transaction and server timestamp, so concurrent edits retry with incremented version. The published content is rendered as escaped text; no HTML is accepted.

## One-time production setup (required before the Publish button works)

1. In Firebase Console, select project `lnwlawyer` and inspect whether **Cloud Firestore** already exists and whether enabling it would change billing. Do not enable paid services without explicit approval.
2. **Back up the existing deployed Firestore rules**. Open Firestore Database → Rules and insert the match block and functions from `firestore/about.rules.fragment` **inside the existing `match /databases/{database}/documents` block**. Do not replace other collections' rules. The fragment is not a complete deployable rules file.
3. Check the merged rules for naming conflicts, run Firebase Rules emulator tests (unauthenticated reads; User write denied; Admin write allowed; malformed data denied; non-About writes unchanged) and publish the merged rules using an authorized Firebase project owner.
4. Confirm the Admin's UID already has `admin: true` claim; log out/in to refresh token.
5. In LawLand, open **จัดการระบบ → แก้ไขเมนูเกี่ยวกับฉัน**, edit and press **เผยแพร่ให้ผู้ใช้ทุกคน**. Verify in another User session that the same values appear, and verify a non-Admin cannot write.

## Deployment boundary

Merging the GitHub Pages UI **does not deploy Firebase Firestore rules**. Until the production rules are explicitly reviewed and published, the Publish action will fail closed with a permission error. The existing public About defaults remain visible if the Firestore document is absent or inaccessible. This feature does not change Google Apps Script, Google Sheets, Firebase Authentication users, or production documents.

## Caveats

Firestore availability and free-tier limits depend on the project's actual configuration. The UI reads the document when the About page is opened; there is no automatic cross-device real-time update while a page remains open. A browser-local draft is not public until Publish succeeds. This phase does not implement an audit history beyond the document's latest `updatedBy`, `updatedAt`, and `version`; a separate audit design is required for full review/approval workflows.
