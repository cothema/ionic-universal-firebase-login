import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import * as firebase from "firebase";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { StorageUserModel } from "../model/storage-user-model";
import { UserModel } from "../model/user-model";
import { IStorageProvider } from "./i-storage-provider";

@Injectable({
    providedIn: "root",
})
export class FirebaseStorage<User extends UserModel = UserModel>
    implements IStorageProvider<User> {
    public constructor(
        protected angularFireAuth: AngularFireAuth,
        protected angularFirestore: AngularFirestore,
        protected config: UniFirebaseLoginConfig,
    ) {}

    public async updateStoredDataByUser(user: User): Promise<void> {
        if (user.uid) {
            const userRef = this.getUserRef(user.uid);

            const data = this.config.storageUserFactoryFunc(
                this.config.mapUserToStorageFunc(user),
            );

            await userRef.set(Object.assign({}, data), { merge: true });
        } else {
            throw new Error("Firebase user has no UID.");
        }
    }

    public getUserRef(
        userUid: string,
    ): AngularFirestoreDocument<StorageUserModel> {
        if (this.config.storageUserTable === null) {
            throw new Error("userTable is not specified!");
        }

        return this.angularFirestore
            .collection(this.config.storageUserTable)
            .doc(userUid);
    }

    public async updateStoredDataByFirebaseUser(
        firebaseUser: firebase.User,
    ): Promise<void> {
        if (firebaseUser.uid) {
            const userRef = this.getUserRef(firebaseUser.uid);

            const data = this.config.storageUserFactoryFunc(
                this.config.mapFirebaseUserToStorageFunc(firebaseUser),
            );

            await userRef.set(Object.assign({}, data), { merge: true });
        } else {
            throw new Error("Firebase user has no UID.");
        }
    }

    public async fetchUser(): Promise<User | null> {
        return this.subscribeUser().toPromise();
    }

    public subscribeUser(): Observable<User | null> {
        // Get the auth state, then fetch the Firestore user document or return null
        return this.angularFireAuth.authState.pipe(
            switchMap((user: any) => {
                if (user) {
                    // User is logged in
                    return this.angularFirestore
                        .doc<StorageUserModel>(
                            `${this.config.storageUserTable}/${user.uid}`,
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
        ) as Observable<User | null>;
    }

    /**
     * Override this method if you want to use custom model class
     */
    protected getNewUser(): User {
        return this.config.userFactoryFunc() as User;
    }
}
