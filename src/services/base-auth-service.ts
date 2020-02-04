import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import * as firebase from "firebase";
import { auth } from "firebase/app";
import { Observable } from "rxjs";
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
    protected config: UniFirebaseLoginConfig;

    public constructor(
        protected router: Router,
        protected platform: Platform,
        protected authProvider: AuthProvider,
        protected authStorageProvider: AuthStorageProvider<User>,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
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

    public get currentFirebaseUser(): firebase.User | null {
        return firebase.auth().currentUser;
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

    /**
     * Get user profile data
     */
    public getUser(fromCache: boolean = true): Observable<User | null> {
        if (fromCache) {
            return this.authStorageProvider.getUser();
        } else {
            return this.authStorageProvider.getUserNonCached();
        }
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
}
