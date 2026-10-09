# LawLand Phase 5 — Two-role administration contract

## Roles and trust boundary
Only two roles exist: **User** (default) and **Admin**. An Admin is a User with a verified Firebase Auth custom claim `admin === true`. The browser's role check only controls presentation; **every privileged write must independently verify the Firebase ID token server-side**. Never trust an email address, query parameter, localStorage flag, client-provided role, or an unauthenticated Apps Script request to grant Admin access.

The current repository contains a static GitHub Pages client and a read-only Google Apps Script/Sheets integration. It contains **no trusted document-write API**. The Admin portal is therefore deliberately read-only until the backend has been implemented, verified, and explicitly configured.

## Document lifecycle
- `draft`: Admin creates or edits a document; changes are not public.
- `pending_review`: Admin submits the draft for checking.
- `returned_for_revision`: Admin returns it with a mandatory reason.
- `approved`: Admin approves a reviewed revision.
- `published`: Admin publishes the approved revision to the User catalog.
- `archived`: Admin withdraws an item without permanently deleting its history.

Allowed transitions: draft → pending_review; pending_review → approved or returned_for_revision; returned_for_revision → draft; approved → published; published → archived. Editing a published document creates a new draft revision; the previously published revision remains available until replacement is approved.

The same Admin role may submit and approve. Each transition records the authenticated actor UID, time, revision, prior/new state, and reason when relevant. A stronger two-person approval rule can be added without creating a third role.

## Backend implementation gate
1. Select a trusted backend capable of verifying Firebase ID tokens and writing to the authoritative document store. **Do not add public write endpoints to the current Apps Script deployment.** A Google Apps Script endpoint is not automatically a Firebase-authenticated backend.
2. Verify `aud`, `iss`, `exp`, signature, project ID, and the server-trusted Admin claim for every privileged operation. Enforce least-privilege service credentials and per-action authorization.
3. Validate document IDs, parent category IDs, title length, links, file metadata, revision number and allowed status transitions on the server. Sanitize user-controlled text when rendered.
4. Use optimistic concurrency or atomic revision checks to prevent overwriting other Admin edits. Record append-only audit events; never trust actor IDs or timestamps supplied by the browser.
5. Separate draft/review data from the published User feed. Users must never receive unpublished data in API responses.
6. Add abuse controls, idempotency for retries, recovery/backup and tests for unauthorized calls, stale tokens, invalid transitions, race conditions, and broken document links.
7. Establish an authorized initial Admin claim through a trusted owner-controlled provisioning procedure; never grant Admin automatically to the first user or based on email alone.

## Release gate
Before enabling any write button: complete backend authorization tests, production-data migration review, rollback plan, browser smoke tests for both roles, and explicit verification of the authoritative published catalog. No change to Firebase production, Google Apps Script deployment, or billing is made by this documentation.
