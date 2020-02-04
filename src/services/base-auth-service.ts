import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
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
    implements IAuthService {
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
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        const credential = await provider.handleLogin();
        if (
            this.config.storage !== false &&
            credential &&
            credential.user !== null
        ) {
            await this.authStorageProvider
                .getProvider()
                .updateStoredDataByFirebaseUser(credential.user);
        }
        await callbackBeforeRedirect(credential);
        if (redirect) {
            await this.redirectAfterLogin();
        }
    }

    public async signInAnonymously(
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        await this.signInByProvider(
            this.authProvider.authAnonymous,
            redirect,
            callbackBeforeRedirect,
        );
    }

    public async signInViaEmail(
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        await this.signInByProvider(
            this.authProvider.authEmail,
            redirect,
            callbackBeforeRedirect,
        );
    }

    public async signInViaFacebook(
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        await this.signInByProvider(
            this.authProvider.authFacebook,
            redirect,
            callbackBeforeRedirect,
        );
    }

    public async signInViaGithub(
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        await this.signInByProvider(
            this.authProvider.authGithub,
            redirect,
            callbackBeforeRedirect,
        );
    }

    public async signInViaGoogle(
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        await this.signInByProvider(
            this.authProvider.authGoogle,
            redirect,
            callbackBeforeRedirect,
        );
    }

    public async signInViaPhone(
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        await this.signInByProvider(
            this.authProvider.authPhone,
            redirect,
            callbackBeforeRedirect,
        );
    }

    public async signInViaTwitter(
        redirect: boolean = true,
        callbackBeforeRedirect: (
            credential: auth.UserCredential | null,
        ) => Promise<void> | void = () => undefined,
    ): Promise<void> {
        await this.signInByProvider(
            this.authProvider.authTwitter,
            redirect,
            callbackBeforeRedirect,
        );
    }

    /**
     * Handle sign out request
     */
    public async signOut(): Promise<void> {
        const currentUser = auth().currentUser;

        if (currentUser) {
            const providers = this.authProvider.getProvidersByUser(currentUser);

            for (const provider of providers) {
                await provider.handleSignOut();
            }
        }
        await this.redirectAfterSignOut();
    }

    public async updateUserData(user: User) {
        await this.authStorageProvider
            .getProvider()
            .updateStoredDataByUser(user);
    }

    protected async redirectAfterSignOut() {
        if (this.config.signInPage) {
            await this.router.navigate([this.config.signInPage]);
        }
    }

    protected async redirectAfterLogin() {
        if (this.config.afterSignInPage) {
            console.log("Redirect ", this.config.afterSignInPage);
            await this.router.navigate([this.config.afterSignInPage]);
        }
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
                    .subscribe(result => {
                        this._user.next(result);
                    });
            } else {
                // Logged out
                this._user.next(null);
            }
            if (!this._userInitialized.getValue()) {
                this._userInitialized.next(true);
            }
        });
    }
}
