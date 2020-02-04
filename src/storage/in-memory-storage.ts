import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { BehaviorSubject, Observable } from "rxjs";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { AbstractStorage } from "./abstract-storage";
import { IStorageProvider } from "./i-storage-provider";

@Injectable({
    providedIn: "root",
})
export class InMemoryStorage<User extends UserModel = UserModel>
    extends AbstractStorage<User>
    implements IStorageProvider<User> {
    private userData: BehaviorSubject<User | null> = new BehaviorSubject(
        null as User | null,
    );

    public constructor(
        angularFireAuth: AngularFireAuth,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        super(angularFireAuth, configProvider);
    }

    public async updateStoredDataByUser(user: User): Promise<void> {
        this.userData.next(user);
    }

    public async updateStoredDataByFirebaseUser(
        storageUser: firebase.User,
    ): Promise<void> {
        if (storageUser.uid) {
            this.userData.next(
                this.config.storageUserFactoryFunc(storageUser) as User,
            );
        } else {
            throw new Error("Firebase user has no UID.");
        }
    }

    protected fetchUserFromStorageByFirebaseUser(
        user: User,
    ): Observable<User | null> {
        return new Observable(subscriber => {
            subscriber.next(this.userData.getValue());
            subscriber.complete();
        });
    }
}
