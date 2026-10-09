import test,{before,after} from 'node:test';
import assert from 'node:assert/strict';
import {initializeTestEnvironment,assertSucceeds,assertFails} from '@firebase/rules-unit-testing';
import {doc,setDoc,deleteDoc,getDoc,getDocs,collection,query,where,serverTimestamp} from 'firebase/firestore';
let env;
const db=(uid,admin)=>env.authenticatedContext(uid,admin?{admin:true}:{}).firestore();
const documentData=(uid,status='draft',version=1)=>({title:'Sample',category:'Test',url:'https://example.org/document.pdf',description:'Test document',status,version,updatedBy:uid,updatedAt:serverTimestamp()});
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-lawland'});await env.withSecurityRulesDisabled(async ctx=>{const adminDb=ctx.firestore();await setDoc(doc(adminDb,'managedDocuments','draft'),{...documentData('owner'),updatedAt:new Date()});await setDoc(doc(adminDb,'managedDocuments','published'),{...documentData('owner','published'),updatedAt:new Date()})})});
after(async()=>{if(env)await env.cleanup()});
test('unauthenticated user cannot read drafts or list entire collection',async()=>{const d=env.unauthenticatedContext().firestore();await assertFails(getDoc(doc(d,'managedDocuments','draft')));await assertFails(getDocs(collection(d,'managedDocuments')));await assertSucceeds(getDoc(doc(d,'managedDocuments','published')));await assertSucceeds(getDocs(query(collection(d,'managedDocuments'),where('status','==','published'))))});
test('regular user cannot write or read draft',async()=>{const d=db('reader',false);await assertFails(getDoc(doc(d,'managedDocuments','draft')));await assertFails(setDoc(doc(d,'managedDocuments','new-user'),documentData('reader')));await assertFails(setDoc(doc(d,'managedDocuments','published'),documentData('reader','published',2)))});
test('admin can create and update with sequential version, but cannot delete or skip version',async()=>{const d=db('owner',true);await assertSucceeds(getDoc(doc(d,'managedDocuments','draft')));await assertSucceeds(setDoc(doc(d,'managedDocuments','new-admin'),documentData('owner')));await assertSucceeds(setDoc(doc(d,'managedDocuments','new-admin'),documentData('owner','published',2)));await assertFails(setDoc(doc(d,'managedDocuments','new-admin'),documentData('owner','published',4)));});
test('invalid URLs and arbitrary fields are rejected',async()=>{const d=db('owner',true);await assertFails(setDoc(doc(d,'managedDocuments','bad-url'),{...documentData('owner'),url:'javascript:alert(1)'}));await assertFails(setDoc(doc(d,'managedDocuments','extra'),{...documentData('owner'),adminOverride:true}))});
test('other collections remain closed and public About remains readable',async()=>{const d=env.unauthenticatedContext().firestore();await assertFails(getDoc(doc(d,'private','item')));await assertSucceeds(getDoc(doc(d,'publicContent','about')));await assertFails(setDoc(doc(d,'publicContent','about'),{name:'test'}))});

test('only Admin can permanently delete a trashed document',async()=>{
 const owner=db('owner',true),reader=db('reader',false);
 await assertFails(deleteDoc(doc(owner,'managedDocuments','draft')));
 await assertFails(deleteDoc(doc(reader,'managedDocuments','published')));
 await assertSucceeds(setDoc(doc(owner,'managedDocuments','trash-for-delete'),documentData('owner','trashed')));
 await assertFails(getDoc(doc(reader,'managedDocuments','trash-for-delete')));
 await assertFails(deleteDoc(doc(reader,'managedDocuments','trash-for-delete')));
 await assertSucceeds(deleteDoc(doc(owner,'managedDocuments','trash-for-delete')));
});
test('unpublishing removes public access and restoration remains private',async()=>{
 const owner=db('owner',true),reader=db('reader',false);
 await assertSucceeds(setDoc(doc(owner,'managedDocuments','lifecycle'),documentData('owner','published')));
 await assertSucceeds(getDoc(doc(reader,'managedDocuments','lifecycle')));
 await assertSucceeds(setDoc(doc(owner,'managedDocuments','lifecycle'),documentData('owner','draft',2)));
 await assertFails(getDoc(doc(reader,'managedDocuments','lifecycle')));
 await assertSucceeds(setDoc(doc(owner,'managedDocuments','lifecycle'),documentData('owner','trashed',3)));
 await assertFails(getDoc(doc(reader,'managedDocuments','lifecycle')));
 await assertSucceeds(setDoc(doc(owner,'managedDocuments','lifecycle'),documentData('owner','draft',4)));
 await assertFails(getDoc(doc(reader,'managedDocuments','lifecycle')));
});
