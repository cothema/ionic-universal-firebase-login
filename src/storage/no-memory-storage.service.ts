import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { AbstractStorage } from "./abstract-storage";
import { IStorageProvider } from "./i-storage-provider";

@Injectable({
    providedIn: "root",
})
export class NoMemoryStorage<User extends UserModel = UserModel>
    extends AbstractStorage<User>
    implements IStorageProvider<User> {
    public constructor(
        angularFireAuth: AngularFireAuth,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        super(angularFireAuth, configProvider);
    }

    public async updateStoredDataByUser(user: User): Promise<void> {
        // No memory, just mock
    }

    public async updateStoredDataByFirebaseUser(
        firebaseUser: firebase.User,
    ): Promise<void> {
        // No memory, just mock
    }

    protected fetchUserFromStorageByFirebaseUser(
        user: firebase.User,
    ): Observable<User | null> {
        return new Observable(subscriber => {
            console.log(this.config.mapFirebaseUserToStorageFunc(user));
            subscriber.next(
                this.config.mapFirebaseUserToStorageFunc(user) as User,
            );
            subscriber.complete();
        });
    }
}
