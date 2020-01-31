import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseUserModel, UserModel } from '..';
import { IStorageConcreteProviderOptions } from './i-storage-concrete-provider-options';
import { IStorageProvider } from './i-storage-provider';
import { IStorageProviderOptions } from './i-storage-provider-options';

@Injectable({
    providedIn: 'root',
})
export class FirebaseStorage<User extends UserModel = UserModel>
    implements IStorageProvider<User> {

    options: IStorageConcreteProviderOptions = {
        userTable: 'users',
    }

    public constructor(
        protected angularFireAuth: AngularFireAuth,
        protected angularFirestore: AngularFirestore,
    ) {
    }

    public async updateStoredDataByUser(user: User): Promise<void> {
        if (user.uid) {
            const userRef = this.getUserRef(user.uid);

            const data = new FirebaseUserModel({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
            });

            return userRef.set(Object.assign({}, data), {merge: true});
        } else {
            return;
        }
    }

    public getUserRef(
        userUid: string,
    ): AngularFirestoreDocument<FirebaseUserModel> {
        if (this.options.userTable === null) {
            throw new Error('userTable is not specified!');
        }

        return this.angularFirestore
            .collection(this.options.userTable)
            .doc(userUid);
    }

    public updateStoredDataByFirebaseUser(firebaseUser: firebase.User): Promise<void> {
        if (firebaseUser.uid) {
            const userRef = this.getUserRef(firebaseUser.uid);

            const data = new FirebaseUserModel({
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL,
                uid: firebaseUser.uid,
            });

            return userRef.set(Object.assign({}, data), {
                merge: true,
            });
        } else {
            throw new Error('Firebase user has no UID.');
        }
    }

    public fetchUser(): Promise<User | unknown | null> {
        return this.subscribeUser().toPromise();
    }

    public subscribeUser(): Observable<User | unknown | null> {
        // Get the auth state, then fetch the Firestore user document or return null
        return this.angularFireAuth.authState.pipe(
            switchMap((user: any) => {
                if (user) {
                    // User is logged in
                    return this.angularFirestore
                        .doc<FirebaseUserModel>(
                            `${this.options.userTable}/${user.uid}`,
                        )
                        .valueChanges()
                        .pipe(
                            switchMap((userFirebase: any) => {
                                return new Observable(subscriber => {
                                    subscriber.next(
                                        Object.assign<User, any>(
                                            this.getNewUser(),
                                            userFirebase,
                                        ),
                                    );
                                    subscriber.complete();
                                });
                            }),
                        );
                }
                // Logged out
                return of(null);
            }),
        );
    }

    /**
     * Override this method if you want to use custom model class
     */
    protected getNewUser(): User {
        return new UserModel() as User;
    }
}
