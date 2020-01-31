import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Observable, Subscriber } from "rxjs";
import { FirebaseUserModel, UserModel } from "..";
import { IStorageProvider } from "./i-storage-provider";

@Injectable({
    providedIn: "root",
})
export class InMemoryStorage<User extends UserModel = UserModel>
    implements IStorageProvider<User> {
    private userData: any;
    private subscribers: Array<Subscriber<unknown>> = [];

    public async updateStoredDataByUser(user: User): Promise<void> {
        this.userData = user;
        this.onUserDataChanged();
    }

    public updateStoredDataByFirebaseUser(
        firebaseUser: firebase.User,
    ): Promise<void> {
        if (firebaseUser.uid) {
            const data = new FirebaseUserModel({
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL,
                uid: firebaseUser.uid,
            });

            Object.assign(this.userData, data);

            return new Promise(resolve => resolve());
        } else {
            throw new Error("Firebase user has no UID.");
        }
    }

    public fetchUser(): Promise<User | unknown | null> {
        return this.subscribeUser().toPromise();
    }

    public subscribeUser(): Observable<User | unknown | null> {
        return new Observable(subscriber => {
            this.subscribers.push(subscriber);
            subscriber.next(this.userData);
        });
    }

    private onUserDataChanged() {
        for (const subscriber of this.subscribers) {
            subscriber.next(this.userData);
        }
    }
}
