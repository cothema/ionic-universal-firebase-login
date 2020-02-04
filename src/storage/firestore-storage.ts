import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { StorageUserModel } from "../model/storage-user-model";
import { UserModel } from "../model/user-model";
import { AbstractStorage } from "./abstract-storage";
import { IStorageProvider } from "./i-storage-provider";

@Injectable({
    providedIn: "root",
})
export class FirestoreStorage<User extends UserModel = UserModel>
    extends AbstractStorage<User>
    implements IStorageProvider<User> {
    public constructor(
        protected angularFirestore: AngularFirestore,
        angularFireAuth: AngularFireAuth,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        super(angularFireAuth, configProvider);
    }

    public async updateStoredDataByUser(user: User): Promise<void> {
        if (user.uid) {
            const userRef = this.getUserRef(user.uid);

            const data = this.config.storageUserFactoryFunc(
                this.config.mapUserToStorageFunc(user),
            );

            await userRef.set(JSON.parse(JSON.stringify(data)), {
                merge: true,
            });
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

            await userRef.set(JSON.parse(JSON.stringify(data)), {
                merge: true,
            });
        } else {
            throw new Error("Firebase user has no UID.");
        }
    }

    protected fetchUserFromStorageByFirebaseUser(
        user: User,
    ): Observable<User | null> {
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
            ) as Observable<User>;
    }
}
