import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";
import { auth } from "firebase";
import { UniFirebaseLoginConfig } from "../config/uni-firebase-login-config";
import { UniFirebaseLoginConfigProvider } from "../config/uni-firebase-login-config-provider";
import { IAuthProvider } from "./i-auth-provider";

export abstract class AbstractAuth implements IAuthProvider {
    public abstract readonly providerKey:
        | "anonymous"
        | "email"
        | "facebook"
        | "github"
        | "google"
        | "phone"
        | "twitter";
    public readonly defaultOptions: any = {};
    protected config: UniFirebaseLoginConfig;

    protected constructor(
        protected angularFireAuth: AngularFireAuth,
        protected platform: Platform,
        configProvider: UniFirebaseLoginConfigProvider,
    ) {
        this.config = configProvider.config;
        this.applyDefaultOptions();
    }

    public abstract handleNativeLogin(
        options: any,
    ): Promise<auth.UserCredential | null>;

    public handleLogin(options: any = {}): Promise<auth.UserCredential | null> {
        if (this.platform.is("cordova")) {
            return this.handleNativeLogin(options);
        } else {
            return this.handleBrowserLogin();
        }
    }

    public async handleNativeLogout(): Promise<void> {
        if (this.angularFireAuth.auth.currentUser === null) {
            console.warn("Unknown currentUser!");
        }
    }

    public async handleBrowserLogout(): Promise<void> {
        return this.angularFireAuth.auth.signOut();
    }

    public async handleSignOut(): Promise<void> {
        if (this.platform.is("cordova")) {
            return this.handleNativeLogout();
        } else {
            return this.handleBrowserLogout();
        }
    }

    public async handleBrowserLogin(): Promise<auth.UserCredential | null> {
        const provider = this.getBrowserLoginProvider();
        const authX = this.angularFireAuth.auth;

        switch (this.defaultOptions.signInType) {
            case "popup":
                return await authX.signInWithPopup(provider);
            case "redirect":
                await authX.signInWithRedirect(provider);
                // TODO: implement redirect resolution: https://stackoverflow.com/questions/40219478/firebaseauth-googleauthprovider-signinwithredirect
                throw new Error("Not implemented!");
        }

        throw new Error("Invalid signInType!");
    }

    /**
     * Apply default options to configuration for the provider
     */
    protected applyDefaultOptions(): any {
        if (this.config.providers[this.providerKey] === undefined) {
            this.config.providers[this.providerKey] = {};
        }
        return Object.assign(
            this.config.providers[this.providerKey],
            this.defaultOptions,
        );
    }

    protected abstract getBrowserLoginProvider(): any | null;
}
