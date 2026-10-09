# LawLand dedicated Firebase migration checklist

Dedicated project ID: `land-law-ea2bb` (Spark). Current production project: `lnwlawyer`. The staged web configuration is in `firebase/lawland.config.mjs`, intentionally unused by the production web page.

1. In Firebase Console for **land-law-ea2bb**, enable Authentication → Sign-in method → Google, and authorize the exact GitHub Pages domain `lnwlawyer.github.io`. Verify the Firebase Auth OAuth flow works for a test user. Do not import old Firebase Auth users automatically: Firebase UIDs/custom claims do not carry over.
2. Confirm Cloud Firestore `(default)` exists under the new project, with no paid service or billing activation. Add secure rules for `publicContent/about` from the existing `firestore/about.rules.fragment`, incorporated into a complete ruleset. **Do not copy the old project's wildcard `allow read, write: if true` rule.** Deny all other collections unless explicitly designed.
3. Provision the new Admin claim `admin: true` through a trusted Firebase Admin SDK environment using the **new** project's service identity. The old UID and claims are not valid authorization in the new project. Verify the new Admin's claim server-side and sign in again to refresh the ID token.
4. In a separate feature branch, switch `index.html` to the new Firebase config; run tests and a browser staging smoke test covering User login, Admin login, About public read, Admin publish, denied User write, and existing Google Sheets/Apps Script document search.
5. Only after those checks, merge the switch to `main` to trigger GitHub Pages deployment. Confirm the deployed commit and actual login/publication in two independent sessions. Do not modify the old `lnwlawyer` project's Firestore rules or data as part of migration.

The supplied `measurementId` is omitted because Analytics is not needed for authentication or publishing and should not be enabled without a separate privacy review. The old site's Google Sheets/Apps Script data remains independent of Firebase project switching.

## Minimal new-project Firestore rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.admin == true;
    }
    function validAbout() {
      let d = request.resource.data;
      return d.keys().hasAll(['name','role','description','contact','version','updatedBy','updatedAt'])
        && d.keys().hasOnly(['name','role','description','contact','version','updatedBy','updatedAt'])
        && d.name is string && d.name.size() > 0 && d.name.size() <= 120
        && d.role is string && d.role.size() > 0 && d.role.size() <= 150
        && d.description is string && d.description.size() > 0 && d.description.size() <= 1000
        && d.contact is string && d.contact.size() > 0 && d.contact.size() <= 250
        && d.version is int && d.version > 0
        && d.updatedBy == request.auth.uid
        && d.updatedAt == request.time;
    }
    match /publicContent/{pageId} {
      allow get: if pageId == 'about';
      allow list, delete: if false;
      allow create: if pageId == 'about' && isAdmin() && validAbout()
        && request.resource.data.version == 1;
      allow update: if pageId == 'about' && isAdmin() && validAbout()
        && resource.data.version is int
        && request.resource.data.version == resource.data.version + 1;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

The above rules are a proposed **new-project-only** ruleset; they have not been deployed. Test with the Firestore emulator before publication.
