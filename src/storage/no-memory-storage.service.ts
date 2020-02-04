import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User as FirebaseUser } from "firebase";
import { BehaviorSubject, Observable } from "rxjs";
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
    protected user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
        null,
    );

    public constructor(
        angularFireAuth: AngularFireAuth,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        super(angularFireAuth, configProvider);
    }

    public async updateStoredDataByUser(user: User): Promise<void> {
        this.user.next(user);
    }

    public async updateStoredDataByFirebaseUser(
        firebaseUser: FirebaseUser,
    ): Promise<void> {
        this.user.next(
            this.config.mapFirebaseUserToStorageFunc(firebaseUser) as User,
        );
    }

    public subscribeUserDataFromStorageByFirebaseUser(
        user: FirebaseUser,
    ): Observable<User | null> {
        this.user.next(this.config.mapFirebaseUserToStorageFunc(user) as User);
        return this.user;
    }
}
