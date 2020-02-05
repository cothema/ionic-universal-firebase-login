import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { auth as firebaseAuth, User as FirebaseUser } from "firebase";
import { auth } from "firebase/app";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { UserModel } from "../model/user-model";
import { AuthProvider } from "../providers/auth-provider";
import { IAuthProvider } from "../providers/i-auth-provider";
import { AuthStorageProvider } from "../storage/auth-storage-provider.service";
import { IAuthService } from "./i-auth-service";

@Injectable({
    providedIn: "root",
})
export class BaseAuthService<User extends UserModel = UserModel>
    implements IAuthService<User> {
    public get user(): User | null {
        return this._user.getValue();
    }

    public get user$(): Observable<User | null> {
        return this._user;
    }

    public get userInitialized(): boolean {
        return this._userInitialized.getValue();
    }

    public get userInitialized$(): Observable<boolean> {
        return this._userInitialized;
    }

    public get currentFirebaseUser(): FirebaseUser | null {
        return firebaseAuth().currentUser;
    }

    protected config: UniFirebaseLoginConfig;
    protected _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
        null,
    );
    protected _userInitialized: BehaviorSubject<boolean> = new BehaviorSubject<
        boolean
    >(false);
    private userDataSubscription: Subscription | undefined;

    public constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected platform: Platform,
        protected authProvider: AuthProvider,
        protected authStorageProvider: AuthStorageProvider<User>,
        protected angularFireAuth: AngularFireAuth,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
        this.subscribeUserChanges();
    }

    public async signInByProvider(
        provider: IAuthProvider,
    ): Promise<auth.UserCredential | null> {
        const credential = await provider.signIn();
        if (
            this.config.storage !== false &&
            credential &&
            credential.user !== null
        ) {
            await this.authStorageProvider
                .getProvider()
                .updateStoredDataByFirebaseUser(credential.user);
        }
        return credential;
    }

    public async signInAnonymously(): Promise<auth.UserCredential | null> {
        return this.signInByProvider(this.authProvider.authAnonymous);
    }

    public async signInViaEmail(): Promise<auth.UserCredential | null> {
        return this.signInByProvider(this.authProvider.authEmail);
    }

    public async signInViaFacebook(): Promise<auth.UserCredential | null> {
        return this.signInByProvider(this.authProvider.authFacebook);
    }

    public async signInViaGithub(): Promise<auth.UserCredential | null> {
        return this.signInByProvider(this.authProvider.authGithub);
    }

    public async signInViaGoogle(): Promise<auth.UserCredential | null> {
        return this.signInByProvider(this.authProvider.authGoogle);
    }

    public async signInViaPhone(): Promise<auth.UserCredential | null> {
        return this.signInByProvider(this.authProvider.authPhone);
    }

    public async signInViaTwitter(): Promise<auth.UserCredential | null> {
        return this.signInByProvider(this.authProvider.authTwitter);
    }

    /**
     * Handle sign out request
     */
    public async signOut(): Promise<void> {
        const currentUser = auth().currentUser;

        if (currentUser) {
            const providers = this.authProvider.getProvidersByUser(currentUser);

            for (const provider of providers) {
                await provider.signOut();
            }
        }
    }

    public async updateUserData(user: User) {
        await this.authStorageProvider
            .getProvider()
            .updateStoredDataByUser(user);
    }

    private subscribeUserChanges(): void {
        this.angularFireAuth.authState.subscribe((user: any) => {
            if (user) {
                if (this.userDataSubscription) {
                    this.userDataSubscription.unsubscribe();
                }
                this.userDataSubscription = this.authStorageProvider
                    .getProvider()
                    .subscribeUserDataFromStorageByFirebaseUser(user)
                    .subscribe((resultUser: User | null) => {
                        this._user.next(resultUser);
                        this.setUserInitializedIfNotAlready();
                    });
            } else {
                // Logged out
                this._user.next(null);
                this.setUserInitializedIfNotAlready();
            }
        });
    }

    private setUserInitializedIfNotAlready() {
        if (!this._userInitialized.getValue()) {
            this._userInitialized.next(true);
        }
    }
}
