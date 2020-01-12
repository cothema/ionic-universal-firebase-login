import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
    AngularFirestore,
    AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Facebook } from "@ionic-native/facebook/ngx";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Platform } from "@ionic/angular";
import { Cacheable } from "ngx-cacheable";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { FirebaseUserModel } from "../model/firebase-user-model";
import { UserModel } from "../model/user-model";
import { FacebookAuth } from "../modules/facebook/facebook-auth";
import { GoogleAuth } from "../modules/google/google-auth";
import { IAuthOptions } from "./i-auth-options";
import { IAuthProviderOptions } from "./i-auth-provider-options";
import { IAuthService } from "./i-auth-service";

@Injectable({
    providedIn: "root",
})
export class BaseAuthService<User extends UserModel = UserModel>
    implements IAuthService {
    protected options: IAuthOptions = {
        afterLoginPage: "/",
        firebaseUserTable: "users",
        loginPage: "/login",
    };
    protected providerOptions: IAuthProviderOptions = {
        google: {
            offline: true,
            scopes: "profile email",
            webClientId: "xxxxxx.apps.googleusercontent.com",
        },
    };

    public constructor(
        private angularFireAuth: AngularFireAuth,
        private angularFirestore: AngularFirestore,
        private router: Router,
        private platform: Platform,
        private googleAuth: GooglePlus,
        private facebookAuth: Facebook,
        private authGoogle: GoogleAuth,
        private authFacebook: FacebookAuth,
    ) {}

    /**
     * Get user from cache if possible
     */
    @Cacheable()
    public getUser(): Observable<User | null> {
        console.log("Get user NOT from cache.");
        return this.fetchUser();
    }

    public async signInViaGoogle(): Promise<any> {
        return await this.authGoogle.handleLogin().then((credential: any) => {
            this.updateDbDataByFirebaseUser(credential.user);
            this.onAfterLogin();
        });
    }

    public async signInViaFacebook(): Promise<any> {
        return await this.authFacebook.handleLogin().then((credential: any) => {
            this.updateDbDataByFirebaseUser(credential.user);
            this.onAfterLogin();
        });
    }

    public async updateDbDataByUser(user: User): Promise<void> {
        if (user.uid) {
            const userRef = this.getUserRef(user.uid);

            const data = new FirebaseUserModel({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
            });

            return userRef.set(Object.assign({}, data), { merge: true });
        } else {
            return;
        }
    }

    public async signOut(): Promise<void> {
        await this.angularFireAuth.auth.signOut();

        this.router.navigate([this.options.loginPage]);
    }

    protected onAfterLogin() {
        this.router.navigate([this.options.afterLoginPage]);
    }

    protected fetchUser(): Observable<any> {
        // Get the auth state, then fetch the Firestore user document or return null
        return this.angularFireAuth.authState.pipe(
            switchMap((user: any) => {
                if (user) {
                    // User is logged in
                    return this.angularFirestore
                        .doc<FirebaseUserModel>(
                            `${this.options.firebaseUserTable}/${user.uid}`,
                        )
                        .valueChanges()
                        .pipe(
                            switchMap((userFirebase: any) => {
                                return Object.assign(
                                    this.getNewUser(),
                                    userFirebase,
                                );
                            }),
                        );
                }
                // Logged out
                return of(null);
            }),
        );
    }

    protected getNewUser() {
        return new UserModel();
    }

    protected getUserRef(
        userUid: string,
    ): AngularFirestoreDocument<FirebaseUserModel> {
        return this.angularFirestore.doc(
            `${this.options.firebaseUserTable}/${userUid}`,
        );
    }

    protected updateDbDataByFirebaseUser(firebaseUser: FirebaseUserModel) {
        if (firebaseUser.uid) {
            const userRef = this.getUserRef(firebaseUser.uid);

            return userRef.set(Object.assign({}, firebaseUser), {
                merge: true,
            });
        } else {
            console.error("Firebase user has no UID.");
        }
    }
}
