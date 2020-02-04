import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { IStorageProvider } from "./i-storage-provider";

export abstract class AbstractStorage<User extends UserModel = UserModel>
    implements IStorageProvider<User> {
    protected config: UniFirebaseLoginConfig;

    protected constructor(
        protected angularFireAuth: AngularFireAuth,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
    }

    public abstract async updateStoredDataByUser(user: User): Promise<void>;

    public abstract async updateStoredDataByFirebaseUser(
        firebaseUser: firebase.User,
    ): Promise<void>;

    public async fetchUser(): Promise<User | null> {
        return this.subscribeUser().toPromise();
    }

    public subscribeUser(): Observable<User | null> {
        // Get the auth state, then fetch the Firestore user document or return null
        return this.angularFireAuth.authState.pipe(
            switchMap((user: any) => {
                if (user) {
                    this.fetchUserFromStorageByFirebaseUser(user);
                }
                // Logged out
                return of(null);
            }),
        ) as Observable<User | null>;
    }

    protected abstract fetchUserFromStorageByFirebaseUser(
        user: User,
    ): Observable<User | null>;

    /**
     * Override this method if you want to use custom model class
     */
    protected getNewUser(): User {
        return this.config.userFactoryFunc() as User;
    }
}
