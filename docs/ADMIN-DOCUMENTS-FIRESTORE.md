# LawLand Admin documents (Spark)

This phase adds `admin-documents.html` for authenticated Admin users and `published-documents.html` for published documents. Existing Google Sheets documents remain unchanged. Drafts are not publicly readable.

## Required manual activation

1. In Firebase Console, open **land-law-ea2bb** → Firestore Database → Rules.
2. Replace the entire existing rules text with the complete contents of [firestore/lawland.rules](../firestore/lawland.rules) and click Publish. Do not add only a fragment, and do not apply to the old **lnwlawyer** project.
3. Test an Admin save and publication. Test published document access in a signed-out session. Test that a signed-out session cannot read drafts, and a regular User cannot write.
4. If rules are not published, document saves will fail with `permission-denied`. The original About feature remains supported by the complete rules.
5. The new documents are separate from Google Sheets. This first version uses HTTPS links to existing files; it does not upload binary files or migrate existing documents.

No Cloud Functions, Storage upload, billing or Analytics are required. Firestore Spark quotas still apply. No deletion operation is provided.
